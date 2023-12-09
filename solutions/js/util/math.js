export function gcd(a, b) {
  while (b !== 0) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return Math.abs(a);
}

// https://en.wikipedia.org/wiki/Least_common_multiple
export function lcm(a, b) {
  return Math.abs(a * b) / gcd(a, b);
}
