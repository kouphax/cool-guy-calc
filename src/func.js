import { curry, chain, map } from "ramda";

const shuffle = curry((random, list) => {
  const len = list.length;
  const result = [];
  let idx = -1;
  let position;
  while (++idx < len) {
    position = Math.floor((idx + 1) * random());
    result[idx] = result[position];
    result[position] = list[idx];
  }
  return result;
})(Math.random);

const DEFAULT_OPS = [
  (a, b) => ({
    a: `${a}`,
    b: `${b}`,
    op: "✖",
    ans: `${a * b}`,
  }),
];

export function permute(as, bs, ops = DEFAULT_OPS) {
  return shuffle(
    chain(
      ([a, b]) => map((c) => c(a, b), ops),
      chain((a) => map((b) => [a, b], bs), as)
    )
  );
}
