import { ROOT_DIR_2024 } from "../helpers/constants.js";
import { readFileLines } from "../helpers/input_helpers.js";

export const question = async () => {
  const lines = await readFileLines(`${ROOT_DIR_2024}/day1/input.txt`);
  const lefts = []
  const rights = []
  lines.forEach(line => {
    const [a, b] = line.split("   ")
    lefts.push(parseInt(a))
    rights.push(parseInt(b))
  });

  let total = 0
  lefts.forEach(number => {
    const filtered = rights.filter((r) => r === number)
    total += (filtered.length * number)
  })
  
  lefts.sort((a, b) => a - b)
  rights.sort((a, b) => a - b)

  let sum = 0
  for (let i=0; i < lefts.length; i++) {
    sum += Math.abs(lefts[i] - rights[i])
  }

  console.log("Answer to part 1: ", sum)
  console.log("Answer to part 2: ", total)

  return Promise.resolve();
};

question();