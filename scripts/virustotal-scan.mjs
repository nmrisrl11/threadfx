import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

// Load .env manually without external dependencies
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
	const content = fs.readFileSync(envPath, "utf-8");
	for (const line of content.split("\n")) {
		const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
		if (match) {
			const key = match[1];
			let val = match[2] || "";
			if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
			if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
			process.env[key] = val.trim();
		}
	}
}

const targetFile =
	process.argv[2] || path.resolve(process.cwd(), "extension/.output/threadfx-latest.zip");

if (!fs.existsSync(targetFile)) {
	console.error(`[Error] Target archive not found at: ${targetFile}`);
	process.exit(1);
}

// Calculate SHA-256 hash
const fileBuffer = fs.readFileSync(targetFile);
const hash = crypto.createHash("sha256").update(fileBuffer).digest("hex");
const reportUrl = `https://www.virustotal.com/gui/file/${hash}`;

console.log(`\n==================================================`);
console.log(`🛡️  VirusTotal Release Verification`);
console.log(`==================================================`);
console.log(`File:    ${path.basename(targetFile)} (${(fileBuffer.length / 1024).toFixed(2)} KB)`);
console.log(`SHA-256: ${hash}`);
console.log(`Report:  ${reportUrl}\n`);

const apiKey = process.env.VIRUSTOTAL_API_KEY;

if (!apiKey) {
	console.log(`[Info] VIRUSTOTAL_API_KEY not found in environment or .env.`);
	console.log(
		`[Action] You can open ${reportUrl} in your browser to inspect or manually upload the file.`,
	);
	console.log(`[Tip] For automated headless uploading & polling:`);
	console.log(`      1. Get a free API key at https://www.virustotal.com/gui/my-apikey`);
	console.log(`      2. Add VIRUSTOTAL_API_KEY=your_key to your local .env file.\n`);
	process.exit(0);
}

async function runScan() {
	console.log(`[1/3] Querying VirusTotal database for hash ${hash.slice(0, 12)}...`);

	try {
		const checkRes = await fetch(`https://www.virustotal.com/api/v3/files/${hash}`, {
			headers: { "x-apikey": apiKey },
		});

		if (checkRes.ok) {
			const data = await checkRes.json();
			const stats = data.data?.attributes?.last_analysis_stats;
			if (stats) {
				const malicious = stats.malicious || 0;
				const suspicious = stats.suspicious || 0;
				const total = (stats.harmless || 0) + (stats.undetected || 0) + malicious + suspicious;

				console.log(`\n✅ Scan completed (Already cached in VirusTotal):`);
				console.log(`   Detections: ${malicious} / ${total} engines flagged malicious`);
				console.log(`   Suspicious: ${suspicious}`);
				console.log(`   Direct Link: ${reportUrl}\n`);
				return;
			}
		}

		console.log(
			`[2/3] Hash not found in cache. Uploading file (${(fileBuffer.length / 1024).toFixed(2)} KB)...`,
		);

		const blob = new Blob([fileBuffer]);
		const formData = new FormData();
		formData.append("file", blob, path.basename(targetFile));

		const uploadRes = await fetch("https://www.virustotal.com/api/v3/files", {
			method: "POST",
			headers: { "x-apikey": apiKey },
			body: formData,
		});

		if (!uploadRes.ok) {
			const errText = await uploadRes.text();
			console.error(`[Error] Failed to upload to VirusTotal (${uploadRes.status}):`, errText);
			console.log(`You can still view or upload manually at: ${reportUrl}`);
			return;
		}

		const uploadJson = await uploadRes.json();
		const analysisId = uploadJson.data?.id;

		if (!analysisId) {
			console.error("[Error] No analysis ID returned from VirusTotal.");
			console.log(`Check report manually at: ${reportUrl}`);
			return;
		}

		console.log(`[3/3] Uploaded successfully (Analysis ID: ${analysisId}).`);
		console.log(`      Polling VirusTotal analysis engines (up to 2 minutes)...`);

		for (let attempt = 1; attempt <= 12; attempt++) {
			await new Promise((resolve) => setTimeout(resolve, 10000));
			process.stdout.write(`      Waiting for engine results (attempt ${attempt}/12)...\r`);

			const pollRes = await fetch(`https://www.virustotal.com/api/v3/analyses/${analysisId}`, {
				headers: { "x-apikey": apiKey },
			});

			if (pollRes.ok) {
				const pollJson = await pollRes.json();
				const status = pollJson.data?.attributes?.status;

				if (status === "completed") {
					const stats = pollJson.data?.attributes?.stats;
					const malicious = stats?.malicious || 0;
					const suspicious = stats?.suspicious || 0;
					const total = (stats?.harmless || 0) + (stats?.undetected || 0) + malicious + suspicious;

					console.log(`\n\n🎉 Analysis completed!`);
					console.log(`   Detections: ${malicious} / ${total} engines flagged malicious`);
					console.log(`   Report URL: ${reportUrl}\n`);
					return;
				}
			}
		}

		console.log(`\n[Notice] Analysis is still processing asynchronously.`);
		console.log(`         View results shortly at: ${reportUrl}\n`);
	} catch (err) {
		console.error("[Error] VirusTotal check encountered an error:", err.message);
		console.log(`View direct report at: ${reportUrl}\n`);
	}
}

runScan();
