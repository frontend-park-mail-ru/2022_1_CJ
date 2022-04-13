import * as elements from "./jsx/elements.js";
const root = document.getElementById("root");
document.addEventListener("DOMContentLoaded", () => {
    const body = (elements.createElement("div", null,
        elements.createElement("p", null, "hello world!")));
    if (root) {
        root.innerHTML = body;
    }
});
//# sourceMappingURL=index.js.map