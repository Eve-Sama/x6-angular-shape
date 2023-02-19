export function random(min: number, max: number) {
  return Math.ceil(Math.random() * (min - max + 1) + max - 1);
}
