import { ROOT_DIR_2024 } from "../helpers/constants.js";
import { readFileLines } from "../helpers/input_helpers.js";

const isReportSafe = nums => {
  if (nums[1] === nums[0]) {
    return false;
  }
  const direction = nums[1] - nums[0] > 0 ? 'asc' : 'desc';

  for (let i = 1; i < nums.length; i++) {
    if (direction === 'asc') {
      if (nums[i] <= nums[i-1]) {
        return false;
      }
    } else {
      if (nums[i] >= nums[i-1]) {
        return false;
      }
    }

    const difference = Math.abs(nums[i] - nums[i-1])
    if (difference > 3) {
      return false;
    }
  }

  return true;
};

export const question = async () => {
  const lines = await readFileLines(`${ROOT_DIR_2024}/day2/input.txt`);
  let total = 0;
  lines.forEach(line => {
    const reportNumbers = line.split(' ').map(n => parseInt(n));
    const isSafe = isReportSafe(reportNumbers);
    
    if (isSafe) {
      total++;
    }
  });

  console.log("Answer to part 1: ", total)

  let total2 =0;
  lines.forEach(line => {
    const reportNumbers = line.split(' ').map(n => parseInt(n));
    let isSafe = isReportSafe(reportNumbers);
    if (!isSafe) {
        for (let i = 0; i < reportNumbers.length; i++) {
          const copy = [...reportNumbers];
          copy.splice(i, 1);
          if (isReportSafe(copy)) {
            isSafe = true;
            break;
          }
        }
      }
  
    if (isSafe) {
      total2++;
    }}
  )

  console.log("Answer to part 2: ", total2)

  return Promise.resolve();
};

question();