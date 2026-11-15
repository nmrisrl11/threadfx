/**
 * Threads DOM Action Detector
 *
 * Dedicated classifier for identifying user interactions on Meta Threads (threads.com / threads.net).
 * Strictly discriminates between Like, Unlike, Repost, Bookmark, Publish, and non-target buttons
 * to eliminate false-positive audio/particle triggers on unrelated UI elements.
 */

export type ThreadActionType = "like" | "unlike" | "repost" | "bookmark" | "publish";

export interface ThreadAction {
	type: ThreadActionType;
	button: Element;
}

interface SvgHeartInfo {
	isHeart: boolean;
	isFilledHeart: boolean;
}

/**
 * Inspects SVG path data signatures to identify Meta Threads and standard heart vectors.
 * Avoids broad substring checks (such as d*="M12") that collide with common icon coordinate grids.
 */
function getSvgHeartInfo(button: Element): SvgHeartInfo {
	const paths = button.querySelectorAll("svg path");
	let hasOutlineHeart = false;
	let hasFilledHeart = false;

	for (const path of paths) {
		const d = path.getAttribute("d") || "";

		// 1. Meta / Threads / Instagram Outline Heart:
		// Distinctive anchors: M16.792 3.904A4.989 4.989 0 0 1 21.5 9.122...
		if (d.includes("16.792") || (d.includes("3.904") && d.includes("4.989"))) {
			hasOutlineHeart = true;
		}

		// 2. Meta / Threads / Instagram Filled (Liked) Heart:
		// Distinctive anchors:
		// - 48x48 viewport: M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6...
		// - 24x24 viewport: M18 2.084c-3.26 0-6 2.05-6 4.33... or M17.3 1.55... or 13.916
		if (
			d.includes("34.6 3.1") ||
			d.includes("M34.6") ||
			d.includes("18 2.084") ||
			d.includes("13.916") ||
			d.includes("2.084c") ||
			d.includes("17.3 1.55")
		) {
			hasFilledHeart = true;
		}

		// 3. Generic standard heart path (Material / Lucide / FontAwesome fallback):
		if (d.includes("21.35") || (d.startsWith("M12") && d.includes("15.36"))) {
			hasOutlineHeart = true;
		}
	}

	// Filled heart always takes precedence if detected on the element
	if (hasFilledHeart) {
		return { isHeart: true, isFilledHeart: true };
	}
	if (hasOutlineHeart) {
		return { isHeart: true, isFilledHeart: false };
	}
	return { isHeart: false, isFilledHeart: false };
}

/**
 * Checks whether an RGB or Hex color string represents the signature red used for likes.
 * Meta uses #FF3040 / rgb(255, 48, 64) and #ED4956 / rgb(237, 73, 86).
 */
function isRedColor(colorStr: string): boolean {
	if (!colorStr) return false;
	const m = colorStr.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
	if (m && m[1] && m[2] && m[3]) {
		const r = parseInt(m[1], 10);
		const g = parseInt(m[2], 10);
		const b = parseInt(m[3], 10);
		return r > 180 && g < 110 && b < 120;
	}
	const hex = colorStr.toLowerCase();
	return (
		hex.includes("ff3040") ||
		hex.includes("ed4956") ||
		hex.includes("fe0034") ||
		hex.includes("ff0034")
	);
}

/**
 * Checks whether an element contains the signature red color used by Meta for active likes.
 * Inspects HTML attributes, inline styles, and computed styles (for CSS variable classes).
 */
function hasRedLikeColor(button: Element): boolean {
	// 1. Direct attribute and inline style inspection
	const hasAttrRed =
		button.querySelector('svg[color*="255, 48, 64"]') !== null ||
		button.querySelector('svg[color*="237, 73, 86"]') !== null ||
		button.querySelector('svg[style*="255, 48, 64"]') !== null ||
		button.querySelector('svg[style*="237, 73, 86"]') !== null ||
		button.querySelector('svg path[fill*="255, 48, 64"]') !== null ||
		button.querySelector('svg path[fill*="237, 73, 86"]') !== null ||
		button.querySelector('svg[color*="rgb(255,"]') !== null ||
		button.querySelector('svg[color*="rgb(237,"]') !== null ||
		button.querySelector('svg[style*="rgb(255,"]') !== null ||
		button.querySelector('svg[style*="rgb(237,"]') !== null ||
		button.querySelector('svg path[fill*="rgb(255,"]') !== null ||
		button.querySelector('svg path[fill*="rgb(237,"]') !== null ||
		button.querySelector('svg[color*="#ff3040" i]') !== null ||
		button.querySelector('svg[color*="#ed4956" i]') !== null ||
		button.querySelector('svg[style*="#ff3040" i]') !== null ||
		button.querySelector('svg[style*="#ed4956" i]') !== null ||
		button.querySelector('svg path[fill*="#ff3040" i]') !== null ||
		button.querySelector('svg path[fill*="#ed4956" i]') !== null;

	if (hasAttrRed) return true;

	// 2. Computed style inspection (resolves dynamic Tailwind / CSS variable colors)
	try {
		const svg = button.querySelector("svg");
		if (svg && typeof window !== "undefined" && window.getComputedStyle) {
			const cs = window.getComputedStyle(svg);
			if (isRedColor(cs.color) || isRedColor(cs.fill)) {
				return true;
			}
			const path = svg.querySelector("path");
			if (path) {
				const pathCs = window.getComputedStyle(path);
				if (isRedColor(pathCs.fill) || isRedColor(pathCs.color)) {
					return true;
				}
			}
		}
	} catch {
		// Ignore any computed style access errors
	}

	return false;
}

/**
 * Matches accessible labels indicating an unliked state across primary supported languages.
 */
function isLikeLabel(label: string): boolean {
	const l = label.trim().toLowerCase();
	return (
		l === "like" ||
		l === "me gusta" ||
		l === "curtir" ||
		l === "j'aime" ||
		l === "j’aime" ||
		l === "gefällt mir" ||
		l === "mi piace" ||
		l === "いいね！" ||
		l === "いいね" ||
		l === "赞" ||
		l === "좋아요" ||
		l === "нравится" ||
		l === "أعجبني" ||
		l.startsWith("like ") ||
		l.startsWith("like,") ||
		l.startsWith("like (") ||
		l.startsWith("me gusta,") ||
		l.startsWith("curtir,")
	);
}

/**
 * Matches accessible labels indicating an already liked (retraction / unlike) state.
 */
function isUnlikeLabel(label: string): boolean {
	const l = label.trim().toLowerCase();
	return (
		l === "unlike" ||
		l.includes("unlike") ||
		l === "liked" ||
		l.startsWith("liked") ||
		l.includes("ya no me gusta") ||
		l.includes("descurtir") ||
		l.includes("je n'aime plus") ||
		l.includes("je n’aime plus") ||
		l.includes("gefällt mir nicht mehr") ||
		l.includes("non mi piace più") ||
		l.includes("いいねを取り消す") ||
		l.includes("取消赞") ||
		l.includes("좋아요 취소") ||
		l.includes("не нравится") ||
		l.includes("remove like")
	);
}

/**
 * Determines whether the button matches an explicit non-like UI action that should be
 * ignored or prevented from triggering like effects.
 */
function isExplicitNonLikeButton(label: string, text: string): boolean {
	const l = label.toLowerCase();
	const t = text.toLowerCase();

	// 1. Post action bar: Reply / Comment
	if (
		l.includes("reply") ||
		l.includes("replies") ||
		l.includes("responder") ||
		l.includes("comment")
	) {
		return true;
	}

	// 2. Post action bar: Share / Send / Copy Link
	if (
		l.includes("share") ||
		l.includes("compartilhar") ||
		l.includes("send") ||
		l.includes("copy link") ||
		l.includes("enviar")
	) {
		return true;
	}

	// 3. Post header / overflow: More options
	if (
		l === "more" ||
		l.includes("more options") ||
		l.includes("opciones") ||
		l.includes("mais opções")
	) {
		return true;
	}

	// 4. Media playback & volume controls
	if (
		l.includes("audio") ||
		l.includes("video") ||
		l.includes("mute") ||
		l.includes("unmute") ||
		l.includes("play") ||
		l.includes("pause") ||
		l.includes("seek") ||
		l.includes("scrub") ||
		l.includes("volume") ||
		l.includes("playback")
	) {
		return true;
	}

	// 5. Carousel navigation arrows
	if (l.includes("next") || l.includes("previous")) {
		return true;
	}

	// 6. Global app shell navigation & search
	if (
		l === "home" ||
		l === "search" ||
		l === "activity" ||
		l === "profile" ||
		l === "create" ||
		l === "back" ||
		l === "close" ||
		l.includes("navigation") ||
		l.includes("switch feed") ||
		l.includes("open menu")
	) {
		return true;
	}

	// 7. Like count links & activity modal openers (e.g. "42 likes", "View likes", "1 like")
	// The actual like button is an icon labeled "Like", while count links display numbers
	if (/^\d+[\s,.]*likes?$/i.test(l) || /^\d+[\s,.]*me gusta$/i.test(l)) {
		return true;
	}
	if (l.includes("view likes") || l.includes("see likes") || l.includes("ver me gusta")) {
		return true;
	}
	if ((l === "likes" || l === "me gusta") && /\d/.test(t)) {
		return true;
	}

	// 8. Plain text buttons (Follow, Following, Cancel, etc.)
	if (
		t === "follow" ||
		t === "following" ||
		t === "seguir" ||
		t === "siguiendo" ||
		t === "cancel" ||
		t === "cancelar"
	) {
		return true;
	}

	return false;
}

/**
 * Classifies a clicked DOM target into a discrete ThreadAction or returns null.
 */
export function classifyThreadAction(target: HTMLElement | null): ThreadAction | null {
	if (!target) return null;

	// Locate the nearest interactive button or container
	const button = target.closest('[role="button"]') || target.closest("button");
	if (!button) return null;

	// Extract accessible names from button, nested SVG, title tag, and text content
	const buttonAria = (button.getAttribute("aria-label") || "").trim().toLowerCase();
	const svg = button.querySelector("svg");
	const svgAria = (svg?.getAttribute("aria-label") || "").trim().toLowerCase();
	const titleText = (button.querySelector("svg title")?.textContent || "").trim().toLowerCase();
	const textContent = ((button as HTMLElement).innerText || "").trim().toLowerCase();

	const allLabels = [buttonAria, svgAria, titleText].filter(Boolean);
	const cleanText = textContent.toLowerCase();

	// 1. Detect Repost / Quote Action
	if (
		allLabels.some(
			(l) =>
				l === "repost" ||
				l.startsWith("repost") ||
				l === "quote" ||
				l.startsWith("quote") ||
				l.includes("republicar") ||
				l === "转发",
		)
	) {
		return { type: "repost", button };
	}

	// 2. Detect Save / Bookmark Action
	if (
		allLabels.some(
			(l) =>
				l === "save" ||
				l.startsWith("save ") ||
				l === "bookmark" ||
				l.startsWith("bookmark") ||
				l === "saved" ||
				l.includes("guardar") ||
				l.includes("salvar") ||
				l === "收藏",
		)
	) {
		return { type: "bookmark", button };
	}

	// 3. Detect Post / Publish Action in Composer
	if (
		(cleanText === "post" || cleanText === "publicar" || allLabels.includes("post")) &&
		(button.closest('[role="dialog"]') !== null ||
			button.closest("form") !== null ||
			button.closest('div[data-pressable-container="true"]') !== null)
	) {
		return { type: "publish", button };
	}

	// 4. Reject Explicit Non-Like Elements (Reply, Share, More, Audio, Like Counts, Navigation)
	if (allLabels.some((l) => isExplicitNonLikeButton(l, cleanText))) {
		return null;
	}

	// 5. Inspect Heart Vector Signatures and Visual State
	const heartInfo = getSvgHeartInfo(button);
	const isRed = hasRedLikeColor(button);
	const hasLikeLabel = allLabels.some((l) => isLikeLabel(l));
	const hasUnlikeLabel = allLabels.some((l) => isUnlikeLabel(l));
	const isAriaPressed =
		button.getAttribute("aria-pressed") === "true" ||
		button.querySelector('[aria-pressed="true"]') !== null;

	// Validate whether this element is genuinely a Like/Heart action target
	const isLikeTarget = heartInfo.isHeart || hasLikeLabel || hasUnlikeLabel || isRed;
	if (!isLikeTarget) {
		return null;
	}

	// 6. Check for Active / Retraction (Unlike) State
	const isAlreadyLiked = hasUnlikeLabel || isAriaPressed || heartInfo.isFilledHeart || isRed;
	if (isAlreadyLiked) {
		return { type: "unlike", button };
	}

	// 7. Confirmed Like Action!
	return { type: "like", button };
}
