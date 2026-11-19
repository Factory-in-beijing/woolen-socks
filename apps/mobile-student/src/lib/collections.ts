/** Reads an item that must exist; fails loudly instead of returning undefined (the project forbids `!`). */
export function at<T>(items: readonly T[], index: number): T {
  const item = items[index];
  if (item === undefined) throw new RangeError(`No item at index ${index}`);
  return item;
}
