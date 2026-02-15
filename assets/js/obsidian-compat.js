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
            if (parent.closest("code") || parent.closest("pre")) return;

            // Regex for ==highlight==
            // Using a simple regex that captures content between ==
            const regex = /==([^=]+)==/g;
            if (regex.test(node.nodeValue)) {
                const span = document.createElement("span");
                // Use replace to wrap matches in <mark>
                // We need to be careful about HTML escaping if we assign to innerHTML
                // But node.nodeValue is text.
                // A safer way is to replace the text node with a fragment

                const fragment = document.createDocumentFragment();
                let lastIndex = 0;
                let text = node.nodeValue;

                // Reset regex
                regex.lastIndex = 0;
                let match;

                // We can't use regex.exec loop easily if we modify the string or need to handle non-matches
                // simpler approach: replace with a placeholder or split

                const parts = text.split(regex);
                // parts will be [pre, match, post, match, post...] if using capturing group
                // But split with capturing group includes the captures

                for (let i = 0; i < parts.length; i++) {
                    if (i % 2 === 0) {
                        // Regular text
                        if (parts[i]) fragment.appendChild(document.createTextNode(parts[i]));
                    } else {
                        // Highlighted text
                        const mark = document.createElement("mark");
                        mark.textContent = parts[i];
                        fragment.appendChild(mark);
                    }
                }

                parent.replaceChild(fragment, node);
            }
        }
    });
}

function processCallouts() {
    const blockquotes = document.querySelectorAll("blockquote");

    blockquotes.forEach((bq) => {
        // We look at the first text content to see if it starts with [!type]
        // The structure might be <p>[!type] Title<br>Content</p> or <p>[!type] Title</p><p>Content</p>

        // Strategy: textContent check first
        const text = bq.textContent.trim();
        const match = text.match(/^\[!\s*(\w+)\s*\]/);

        if (!match) return;

        const type = match[1].toLowerCase();

        // Find the element containing the definition
        // Usually it's the first child, often a <p>
        let firstChild = bq.firstElementChild;
        if (!firstChild && bq.firstChild) {
            // It might be a text node directly inside blockquote (unlikely in generated HTML but possible)
            // Wrap it in p for consistency if needed, or just handle it.
            // But for valid markdown output, it's usually a p.
            return;
        }

        if (firstChild.tagName !== 'P' && firstChild.tagName !== 'DIV') return; // unexpected structure

        // Now extracting title vs content
        // The [!type] tag is in the first element.
        // We need to separate the line containing [!type] from the rest.

        // Check innerHTML for <br> or newline
        let html = firstChild.innerHTML;

        // Check if there is a break
        const lineBreakRegex = /<br\s*\/?>|\n/;
        let splitIndex = html.search(lineBreakRegex);

        let titleHtml = "";
        let contentHtml = "";

        if (splitIndex !== -1) {
            // Found a break in the first element
            titleHtml = html.substring(0, splitIndex);
            // The rest is content, skipping the break
            // We need to find where the break ends (e.g. <br> is 4 chars)
            const matchBreak = html.match(lineBreakRegex);
            contentHtml = html.substring(splitIndex + matchBreak[0].length);

            // If there was only title in this P, contentHtml might be empty, 
            // and actual content is in subsequent siblings of firstChild
            firstChild.innerHTML = contentHtml; // Update first paragraph to remove title
        } else {
            // No break found in first element. 
            // The whole first element is the title line (minus the [!type])
            titleHtml = html;
            // The content is the *rest* of the blockquote's children
            firstChild.remove(); // Remove the title paragraph from content flow
        }

        // Parse title text to remove [!type]
        // We create a temp div to strip tags if we want to run regex on text
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = titleHtml;
        let titleText = tempDiv.textContent;

        const titleMatch = titleText.match(/^\[!\s*(\w+)\s*\](?:\s+(.*))?$/);
        let displayTitle = type.charAt(0).toUpperCase() + type.slice(1);

        if (titleMatch) {
            if (titleMatch[2]) {
                displayTitle = titleMatch[2];
            }
        }

        // Construct the callout structure
        const container = document.createElement("div");
        container.className = "obsidian-callout";
        container.setAttribute("data-type", type);

        const header = document.createElement("div");
        header.className = "obsidian-callout-title";

        const icon = document.createElement("span");
        icon.className = "obsidian-callout-icon";
        icon.innerHTML = getIcon(type);

        header.appendChild(icon);
        header.appendChild(document.createTextNode(displayTitle));

        const contentDiv = document.createElement("div");
        contentDiv.className = "obsidian-callout-content";

        // Append content
        if (splitIndex !== -1) {
            // We modified firstChild to hold the rest of the content
            // So we just append all children of bq (including firstChild)
            while (bq.firstChild) {
                contentDiv.appendChild(bq.firstChild);
            }
        } else {
            // firstChild was removed (it was just title)
            // Append remaining siblings
            while (bq.firstChild) {
                contentDiv.appendChild(bq.firstChild);
            }
        }

        container.appendChild(header);
        container.appendChild(contentDiv);

        bq.parentNode.replaceChild(container, bq);
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
