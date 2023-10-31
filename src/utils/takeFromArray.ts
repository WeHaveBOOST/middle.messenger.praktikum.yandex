export default function takeFromArray(arr: any[], length = 1) {
  if (!Array.isArray(arr)) throw new TypeError('The First argument must be an array');
  if (typeof length !== "number") throw new TypeError('The Second argument must be a number');

  const res = [];

  for (let [i, value] of arr.entries()) {
    i += 1;

    if (i > length) break;

    res.push(value);
  }

  return res;
}
