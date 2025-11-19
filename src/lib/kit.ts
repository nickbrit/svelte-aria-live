import { announce, type AnnounceOptions } from "./store";

/**
 * Helper for SvelteKit routing transitions.
 * Provide a custom getTitle() to override document.title acquisition.
 */
export function announceRouteChange(
    getTitle?: () => string,
    opts: Omit<AnnounceOptions, "politeness" | "priority" | "dedupeKey"> = {}
) {
    const title =
        (getTitle
            ? getTitle()
            : typeof document !== "undefined"
            ? document.title
            : "") || "Page updated";
    announce(title, {
        politeness: "assertive",
        priority: 200,
        dedupeKey: "route",
        ...opts,
    });
}
