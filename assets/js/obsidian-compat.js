document.addEventListener("DOMContentLoaded", function () {
    processHighlights();
    processCallouts();
});

function processHighlights() {
    // Find all text nodes in the post content
    const content = document.querySelector(".post-content") || document.body;
    if (!content) return;

    const walker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT, null, false);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);

    nodes.forEach((node) => {
        if (node.nodeValue && node.nodeValue.includes("==")) {
            const parent = node.parentNode;
            // Skip if already in code or pre tags
            if (parent.tagName === "CODE" || parent.tagName === "PRE") return;

            const regex = /==([^=]+)==/g;
            if (regex.test(node.nodeValue)) {
                const span = document.createElement("span");
                span.innerHTML = node.nodeValue.replace(regex, "<mark>$1</mark>");
                parent.replaceChild(span, node);
            }
        }
    });
}

function processCallouts() {
    const blockquotes = document.querySelectorAll("blockquote");

    blockquotes.forEach((bq) => {
        const firstP = bq.querySelector("p");
        if (!firstP) return;

        // Get innerHTML to handle <br> and newlines
        const html = firstP.innerHTML;

        // Split identifying line from content
        // We look for the first newline or <br> to end the title line
        const lineBreakRegex = /<br\s*\/?>|\n/;
        const parts = html.split(lineBreakRegex);
        const firstLineHtml = parts[0];

        // Extract text from the first line to check for callout pattern
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = firstLineHtml;
        const firstLineText = tempDiv.textContent.trim();

        // Regex to match [!type] or [! type] with optional title
        const match = firstLineText.match(/^\[!\s*(\w+)\s*\](?:\s+(.*))?$/);

        if (match) {
            const type = match[1].toLowerCase();
            const title = match[2] || type.charAt(0).toUpperCase() + type.slice(1);

            // Remove the first line (callout identifier) from the content
            parts.shift();

            // Reconstruct the remaining content
            // If the original used <br>, we should preserve breaks, but <br> is safe generally
            const remainingContent = parts.join("<br>");
            firstP.innerHTML = remainingContent;

            // Create structure
            const container = document.createElement("div");
            container.className = "obsidian-callout";
            container.setAttribute("data-type", type);

            const header = document.createElement("div");
            header.className = "obsidian-callout-title";

            const icon = document.createElement("span");
            icon.className = "obsidian-callout-icon";
            icon.innerHTML = getIcon(type);

            header.appendChild(icon);
            header.appendChild(document.createTextNode(title));

            const content = document.createElement("div");
            content.className = "obsidian-callout-content";

            // Move all children of blockquote to content
            while (bq.firstChild) {
                content.appendChild(bq.firstChild);
            }

            container.appendChild(header);
            container.appendChild(content);

            bq.parentNode.replaceChild(container, bq);
        }
    });
}

function getIcon(type) {
    // Basic icons mapping (FontAwesome classes or SVG)
    // Assuming FontAwesome is available in the theme
    const iconMap = {
        note: '<i class="fa-solid fa-pencil"></i>',
        info: '<i class="fa-solid fa-circle-info"></i>',
        todo: '<i class="fa-solid fa-circle-check"></i>',
        tip: '<i class="fa-solid fa-fire-flame-curved"></i>',
        success: '<i class="fa-solid fa-check"></i>',
        question: '<i class="fa-solid fa-circle-question"></i>',
        warning: '<i class="fa-solid fa-triangle-exclamation"></i>',
        failure: '<i class="fa-solid fa-xmark"></i>',
        danger: '<i class="fa-solid fa-radiation"></i>',
        bug: '<i class="fa-solid fa-bug"></i>',
        example: '<i class="fa-solid fa-list"></i>',
        quote: '<i class="fa-solid fa-quote-left"></i>'
    };
    return iconMap[type] || '<i class="fa-solid fa-pencil"></i>';
}
