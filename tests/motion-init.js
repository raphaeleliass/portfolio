// Capture the real entrance from the first hydrated frame, before test commands run.
window.__entranceFrames = [];
let started;
function capture(now) {
	const root = document.querySelector(".motion-scope");
	const lines = document.querySelectorAll(".title-line > span");
	if (root?.dataset.motionReady === "true" && lines.length === 2) {
		started ??= now;
		window.__entranceFrames.push({
			time: now - started,
			y: new DOMMatrix(getComputedStyle(lines[0]).transform).m42,
			secondY: new DOMMatrix(getComputedStyle(lines[1]).transform).m42,
			opacity: Number(getComputedStyle(lines[0]).opacity),
		});
	}
	if (started === undefined || now - started < 3600)
		requestAnimationFrame(capture);
}
requestAnimationFrame(capture);
