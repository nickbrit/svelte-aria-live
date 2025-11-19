import { writable } from "svelte/store";

/** Announcement item shape */
export interface Announcement {
    id: number; // unique incrementing id for keyed list rendering
    text: string; // message announced to screen readers
    politeness: "polite" | "assertive"; // which live region
    priority: number; // higher number surfaces earlier
    ts: number; // timestamp for stable ordering among equal priorities
    ttlMs: number; // time to live in milliseconds
    dedupeKey?: string; // if provided, replaces any previous announcements with same key
}

/** Options accepted by announce() */
export interface AnnounceOptions {
    politeness?: "polite" | "assertive";
    priority?: number; // default 0; higher renders first
    ttlMs?: number; // default 5000ms
    dedupeKey?: string; // logically unique message grouping
}

let _id = 0;

/** Internal writable store holding the queue */
export const announcements = writable<Announcement[]>([]);

/**
 * Announce a message to assistive tech.
 * - Items are kept in memory for ttlMs then auto-removed.
 * - Sorted by priority (desc) then timestamp (asc).
 * - dedupeKey removes existing entries with same key before adding.
 */
export function announce(text: string, opts: AnnounceOptions = {}): number {
    const {
        politeness = "polite",
        priority = 0,
        ttlMs = 5000,
        dedupeKey,
    } = opts;

    const id = ++_id;
    const ts = Date.now();
    const item: Announcement = {
        id,
        text,
        politeness,
        priority,
        ts,
        ttlMs,
        dedupeKey,
    };

    announcements.update((list: Announcement[]) => {
        let next: Announcement[] = list.slice();

        // Dedupe by key: remove existing items with same dedupeKey
        if (dedupeKey) {
            next = next.filter((a: Announcement) => a.dedupeKey !== dedupeKey);
        }

        next.push(item);

        // Sort: priority desc, timestamp asc
        next.sort((a: Announcement, b: Announcement) => {
            if (a.priority !== b.priority) return b.priority - a.priority;
            return a.ts - b.ts;
        });

        return next;
    });

    // Schedule removal after ttlMs
    setTimeout(() => {
        announcements.update((list: Announcement[]) =>
            list.filter((a: Announcement) => a.id !== id)
        );
    }, ttlMs);

    return id;
}
