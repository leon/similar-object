/**
 * The type of object we want to compare
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SimilarObject = Record<string, any>;

/**
 * The configuration object for comparing
 *
 * @example
 * const config = { price: 2, rooms: 3, area: 1 }
 */
// export interface SimilarConfig<T, K extends keyof T> {

//   [key: K]: number
// }

export type SimilarConfig<T> = {
  [K in T as string]: number;
};

/**
 *
 * @param a current item
 * @param b item to compare to
 * @param config an object containing all the keys you want to compare and their weights
 * @returns a number that is the sum of each comparison
 *
 * @example
 *   const unit1: Unit = { price: 1000, rooms: 3, area: 100 };
 *   const unit2: Unit = { price: 1000, rooms: 5, area: 50 };
 *   const config: SimilarConfig<Unit> = { price: 1, rooms: 2 };
 *   const score = similarObject(unit1, unit2, config);
 *
 *
 */
export function similarObject<
  T extends SimilarObject,
  C extends SimilarConfig<T>
>(a: T, b: T, config: C): number {
  return Object.entries(config).reduce((acc, [key, weight]) => {
    return acc + similarNumber(a[key], b[key]) * weight;
  }, 0);
}

/**
 * Compare two numbers return 0 - 1 based on how close
 * @param a base number
 * @param b to compare to
 * @returns 0 - 1 depending on how close a is to b
 */
function similarNumber(a: number, b: number): number {
  if (!a || !b) return 0;
  if (a === b) return 1;
  return 1 - Math.abs(a - b) / Math.max(a, b);
}
