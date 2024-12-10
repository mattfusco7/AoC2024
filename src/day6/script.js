import { ROOT_DIR_2024 } from "../helpers/constants.js";
import { readFileLines } from "../helpers/input_helpers.js";



const moveUp = (graph, currentI, currentJ) => {
  if (currentI - 1 === -1) {
    return ["up", currentI - 1, currentJ]
  }

  if (graph[currentI - 1][currentJ] !== "#") {
    graph[currentI][currentJ] = "X";
    graph[currentI - 1][currentJ] = "^"
    return ["up", currentI - 1, currentJ]
  } else {
    return ["right", currentI, currentJ]
  }
}

const moveDown = (graph, currentI, currentJ) => {
  if (currentI + 1 === graph.length) {
    return ["down", currentI + 1, currentJ]
  }

  if (graph[currentI + 1][currentJ] !== "#") {
    graph[currentI][currentJ] = "X";
    graph[currentI + 1][currentJ] = "v"
    return ["down", currentI + 1, currentJ]
  } else {
    return ["left", currentI, currentJ]
  }
}

const moveRight = (graph, currentI, currentJ) => {
  if (currentJ + 1 === graph.length) {
    return ["right", currentI, currentJ + 1]
  }

  if (graph[currentI][currentJ + 1] !== "#") {
    graph[currentI][currentJ] = "X";
    graph[currentI][currentJ + 1] = ">"
    return ["right", currentI, currentJ + 1]
  } else {
    return ["down", currentI, currentJ]
  }
}

const moveLeft = (graph, currentI, currentJ) => {
  if (currentJ - 1 === -1) {
    return ["left", currentI, currentJ - 1]
  }

  if (graph[currentI][currentJ - 1] !== "#") {
    graph[currentI][currentJ] = "X";
    graph[currentI][currentJ - 1] = "<"
    return ["left", currentI, currentJ - 1]
  } else {
    return ["up", currentI, currentJ]
  }
}

const move = (graph, currentI, currentJ, currentDirection) => {
  let moveDirection = currentDirection
  while (!((currentI === -1 && moveDirection === "up") || 
    (currentI === graph.length && moveDirection === "down") ||
    (currentJ === -1 && moveDirection === "left") ||
    (currentJ === graph.length && moveDirection === "right"))) {
      if (moveDirection === "up") {
        [moveDirection, currentI, currentJ] = moveUp(graph, currentI, currentJ, moveDirection)
      } else if (moveDirection === "down") {
        [moveDirection, currentI, currentJ] = moveDown(graph, currentI, currentJ, moveDirection)
      } else if (moveDirection === "right") {
        [moveDirection, currentI, currentJ] = moveRight(graph, currentI, currentJ, moveDirection)
      } else if (moveDirection === "left") {
        [moveDirection, currentI, currentJ] = moveLeft(graph, currentI, currentJ, moveDirection)
      }
  }
}

const findStartPosition = (graph) => {
  for(let i = 0; i < graph.length; i++) {
    for(let j = 0; j< graph.length; j++) {
      if (graph[i][j] === "^") {
        return [i, j]
      }
    }
   }
}

export const question = async () => {
  let lines = await readFileLines(`${ROOT_DIR_2024}/day6/input.txt`);
  const graph = lines.map(row => row.split(''));
  // console.log(graph)
  // console.log(graph)
  // return
  let [i, j] = findStartPosition(graph)
  console.log('start', i, j)
  
  move(graph, i, j, "up")

  let count = 0;
  for(let i=0; i<graph.length; i++){
    for (let j=0; j<graph.length; j++) {
      if (graph[i][j] === 'X') {
        count++
      }
    }
  }

  console.log("Answer to part 1: ", count + 1)
  console.log("Answer to part 2: ",)

  return Promise.resolve();
};

question();