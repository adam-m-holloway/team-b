export interface SlugifyOptions {
  /** Maximum slug length. Must be a positive integer. The result never ends on `-`. */
  maxLength?: number;
}

const COMBINING_MARKS = /\p{M}+/gu;
const NON_ALPHANUMERIC_RUN = /[^a-z0-9]+/g;
const EDGE_HYPHENS = /^-+|-+$/g;

/**
 * Turn any string into a URL-safe slug: lowercase ASCII letters and digits
 * joined by single hyphens, with diacritics stripped.
 *
 * @throws {RangeError} if `maxLength` is not a positive integer.
 */
export function slugify(input: string, options: SlugifyOptions = {}): string {
  const { maxLength } = options;
  if (maxLength !== undefined && (!Number.isInteger(maxLength) || maxLength <= 0)) {
    throw new RangeError(`maxLength must be a positive integer, got ${String(maxLength)}`);
  }

  const slug = input
    .normalize("NFKD")
    .replace(COMBINING_MARKS, "")
    .toLowerCase()
    .replace(NON_ALPHANUMERIC_RUN, "-")
    .replace(EDGE_HYPHENS, "");

  if (maxLength === undefined || slug.length <= maxLength) {
    return slug;
  }
  return slug.slice(0, maxLength).replace(EDGE_HYPHENS, "");
}
