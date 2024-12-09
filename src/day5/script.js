import { ROOT_DIR_2024 } from "../helpers/constants.js";
import { readFileLines } from "../helpers/input_helpers.js";


const checkOrdering = (earlierNums, laterNums, listToCheck) => {
  for(let i = 0; i < earlierNums.length; i++) {
    if (!(listToCheck.includes(earlierNums[i]) && listToCheck.includes(laterNums[i]))){
      continue;
    }
  
    if (listToCheck.indexOf(earlierNums[i]) > listToCheck.indexOf(laterNums[i])) {
      return false;
    }
  }

  return true;
}


export const question = async () => {
  const lines = await readFileLines(`${ROOT_DIR_2024}/day5/input.txt`);
  const earlierValues = []
  const laterValues = []
  const linesToCheck = []
  lines.forEach(line => {
    // console.log(line)
    if (line.includes("|")) {
      const [earlier, later] = line.split("|")
      earlierValues.push(parseInt(earlier))
      laterValues.push(parseInt(later))
    } else {
      const values = line.split(",").map(value => parseInt(value))
      linesToCheck.push(values)
    }
  });

  // console.log(earlierValues)
  // console.log(laterValues)
  // console.log(linesToCheck)

  const trueLists = []
  const falseLists = []
  linesToCheck.forEach(listToCheck => {
    if (checkOrdering(earlierValues, laterValues, listToCheck)) {
      trueLists.push(listToCheck)
    } else {
      falseLists.push(listToCheck)
    }
  })
  
  let count = 0
  trueLists.forEach(trueList => {
    const index = Math.floor(trueList.length/2)
    count += trueList[index]
  })

  console.log("Answer to part 1: ", count)
  console.log("Answer to part 2: ",)

  return Promise.resolve();
};

question();