import { ROOT_DIR_2024 } from "../helpers/constants.js";
import { readFileLines } from "../helpers/input_helpers.js";


export const question = async () => {
  const lines = await readFileLines(`${ROOT_DIR_2024}/day7/input.txt`);
  lines.forEach(line => {
    console.log(line)
  });

  console.log("Answer to part 1: ",)
  console.log("Answer to part 2: ",)

  return Promise.resolve();
};

question();