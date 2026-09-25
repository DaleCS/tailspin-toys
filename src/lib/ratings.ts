/**
 * Pure formatting helpers for game star ratings.
 *
 * Kept framework-free and side-effect-free so the logic is unit-testable
 * without the Astro runtime (see `ratings.test.ts`). Consumed by the
 * `StarRating.astro` component.
 */

/**
 * Clamps a rating into the displayable 0–5 range.
 */
export function clampRating(rating: number): number {
    return Math.min(5, Math.max(0, rating));
}

/** Formats a rating as a value out of five, or a fallback for unrated games. */
export function formatRatingOutOfFive(rating: number | null): string {
    return rating === null ? 'No rating' : `${clampRating(rating).toFixed(1)} / 5`;
}

/** Returns the fill state for each star position in a rating. */
export function getRatingStarFills(rating: number): ('full' | 'half' | 'empty')[] {
    const clamped = clampRating(rating);
    const fullStars = Math.floor(clamped);
    const halfStar = clamped % 1 >= 0.5;

    return Array.from({ length: 5 }, (_, index) => {
        if (index < fullStars) return 'full';
        if (halfStar && index === fullStars) return 'half';
        return 'empty';
    });
}

/** Text representation for non-UI outputs such as catalog exports. */
export function formatStarRating(rating: number | null): string {
    if (rating === null) return 'Not yet rated';

    const starFills = getRatingStarFills(rating);
    return starFills.map((fill) => {
        if (fill === 'full') return '★';
        if (fill === 'half') return '½';
        return '☆';
    }).join('');
}
