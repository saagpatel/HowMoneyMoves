import { useEffect } from "react";

function setMetaTag(property: string, content: string, isOg = false) {
	const attr = isOg ? "property" : "name";
	let el = document.querySelector(`meta[${attr}="${property}"]`);
	if (!el) {
		el = document.createElement("meta");
		el.setAttribute(attr, property);
		document.head.appendChild(el);
	}
	el.setAttribute("content", content);
}

/**
 * Sets document.title and updates meta/OG tags for the current page.
 * Reverts to defaults on unmount.
 */
export function useDocumentHead(title: string, description: string) {
	useEffect(() => {
		const prevTitle = document.title;
		document.title = title;

		setMetaTag("description", description);
		setMetaTag("og:title", title, true);
		setMetaTag("og:description", description, true);
		setMetaTag("twitter:title", title);
		setMetaTag("twitter:description", description);

		return () => {
			document.title = prevTitle;
		};
	}, [title, description]);
}
