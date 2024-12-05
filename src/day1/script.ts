import { ROOT_DIR_2024 } from "../helpers/constants";
import { readFileLines } from "../helpers/input_helpers";

export const question = async () => {
  const lines = await readFileLines(`${ROOT_DIR_2024}/day1/input.txt`);
  lines.forEach(line => {
    console.log(line);
  });

  return Promise.resolve();
};

question();