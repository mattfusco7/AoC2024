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

const fixOrdering = (earlierNums, laterNums, listToFix) => {
  for(let i = 0; i < earlierNums.length; i++) {
    if (listToFix.includes(earlierNums[i]) && listToFix.includes(laterNums[i])){
      const earlierIndex = listToFix.indexOf(earlierNums[i])
      const laterIndex = listToFix.indexOf(laterNums[i])
      if (earlierIndex > laterIndex) {
        [listToFix[laterIndex], listToFix[earlierIndex]] = [listToFix[earlierIndex], listToFix[laterIndex]]
        return fixOrdering(earlierNums, laterNums, listToFix)
      }
    }
  }
  return listToFix
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

  const fixedLists = []
  falseLists.forEach(falseList => {
    const fixedList = fixOrdering(earlierValues, laterValues, falseList)
    fixedLists.push(fixedList)
  })

  let count2 = 0
  fixedLists.forEach(fixedList => {
    const index = Math.floor(fixedList.length/2)
    count2 += fixedList[index]
  })

  console.log("Answer to part 1: ", count)
  console.log("Answer to part 2: ", count2)

  return Promise.resolve();
};

question();