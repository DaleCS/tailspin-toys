import { describe, it, expect } from 'vitest';
import { clampRating, formatRatingOutOfFive, formatStarRating, getRatingStarFills } from './ratings';

describe('clampRating', () => {
    it('returns the value unchanged when within range', () => {
        expect(clampRating(0)).toBe(0);
        expect(clampRating(3.5)).toBe(3.5);
        expect(clampRating(5)).toBe(5);
    });

    it('clamps values outside the 0–5 range', () => {
        expect(clampRating(-2)).toBe(0);
        expect(clampRating(7)).toBe(5);
    });
});

describe('getRatingStarFills', () => {
    it('returns full, half, and empty star positions for fractional ratings', () => {
        expect(getRatingStarFills(3.5)).toEqual(['full', 'full', 'full', 'half', 'empty']);
        expect(getRatingStarFills(4.75)).toEqual(['full', 'full', 'full', 'full', 'half']);
    });

    it('rounds fractions below one half down to empty stars', () => {
        expect(getRatingStarFills(3.4)).toEqual(['full', 'full', 'full', 'empty', 'empty']);
    });

    it('always returns five star positions and clamps out-of-range ratings', () => {
        expect(getRatingStarFills(0)).toEqual(['empty', 'empty', 'empty', 'empty', 'empty']);
        expect(getRatingStarFills(5)).toEqual(['full', 'full', 'full', 'full', 'full']);
        expect(getRatingStarFills(-1)).toEqual(['empty', 'empty', 'empty', 'empty', 'empty']);
        expect(getRatingStarFills(6)).toEqual(['full', 'full', 'full', 'full', 'full']);
    });
});

describe('formatStarRating', () => {
    it('formats ratings as text for catalog exports', () => {
        expect(formatStarRating(3.5)).toBe('★★★½☆');
        expect(formatStarRating(null)).toBe('Not yet rated');
    });
});

describe('formatRatingOutOfFive', () => {
    it('formats a rating as a value out of five', () => {
        expect(formatRatingOutOfFive(4.2)).toBe('4.2 / 5');
    });

    it('shows a fallback when the rating is null', () => {
        expect(formatRatingOutOfFive(null)).toBe('No rating');
    });

    it('clamps ratings outside the display range', () => {
        expect(formatRatingOutOfFive(6)).toBe('5.0 / 5');
    });
});
