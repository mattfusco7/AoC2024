import { ROOT_DIR_2024 } from "../helpers/constants.js";
import { readFileLines } from "../helpers/input_helpers.js";


export const question = async () => {
  const lines = await readFileLines(`${ROOT_DIR_2024}/day3/input.txt`);
  const multiplications = [];
  
  lines.forEach(line => {
    const regex = /mul\((\d{1,3}),(\d{1,3})\)|do\(\)|don't\(\)/g;
    let matches;
    while ((matches = regex.exec(line)) !== null) {
      multiplications.push(matches[0]);
    }
  });

  let total = 0
  multiplications.forEach(pair => {
    if (!pair.startsWith("d")) {
      const [a, b] = pair.split("(")
      const [num1, c] = b.split(",")
      const [num2, _] = c.split(")")
      total += (num1 * num2)
    }
  })

  let total2 = 0
  let multEnabled = true
  multiplications.forEach(pair => {
    if (pair == "don't()") {
      multEnabled = false
    } else if (pair == "do()") {
      multEnabled = true
    } else { // we know we have numbers 
      if (multEnabled) {
        const [a, b] = pair.split("(")
        const [num1, c] = b.split(",")
        const [num2, _] = c.split(")")
        total2 += (num1 * num2)
      }
    } 
  })
  

  console.log("Answer to part 1: ", total)
  console.log("Answer to part 2: ", total2)

  return Promise.resolve();
};

question();