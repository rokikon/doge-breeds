export function compareItems(current: string | number, next: string | number): number {
  if (typeof current === 'string' && typeof next === 'string') {
    return current.localeCompare(next)
  } else {
    return Number(current) - Number(next)
  }
}
