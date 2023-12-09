export function maxFrequency(arr, filter) {
  const map = new Map();

  for (const item of arr) {
    if (filter && !filter(item)) continue;

    if (map.has(item)) {
      map.set(item, map.get(item) + 1);
    } else {
      map.set(item, 1);
    }
  }

  let max_count = 0;
  let max_element = null;
  map.forEach((value, key) => {
    if (max_count < value) {
      max_element = key;
      max_count = value;
    }
  });

  return max_element;
}
