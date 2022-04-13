import * as elements from "./jsx/elements.js";

const root = document.getElementById("root");

document.addEventListener("DOMContentLoaded", () => {
	const body = (
		<div>
			<p>hello world!</p>
		</div>
	);
	if (root) {
		root.innerHTML = body;
	}
});
