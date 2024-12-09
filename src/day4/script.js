import { ROOT_DIR_2024 } from "../helpers/constants.js";
import { readFileLines } from "../helpers/input_helpers.js";


export const question = async () => {
  const grid = await readFileLines(`${ROOT_DIR_2024}/day4/input.txt`);
  const word = 'XMAS';
  const reversedWord = 'SAMX';
  const n = grid.length
  let count = 0;


  // Horizontal Search: Check each row for "XMAS" or "SAMX"
  for (let row = 0; row < n; row++) {
    let rowString = grid[row];
    for (let col = 0; col <= n - 4; col++) {
      let substring = rowString.substring(col, col + 4);
      if (substring === word || substring === reversedWord) {
        count++;
      }
    }
  }

  // Vertical Search: Check each column for "XMAS" or "SAMX"
  for (let col = 0; col < n; col++) {
    let colString = '';
    for (let row = 0; row < n; row++) {
      colString += grid[row][col];
    }
    for (let row = 0; row <= n - 4; row++) {
      let substring = colString.substring(row, row + 4);
      if (substring === word || substring === reversedWord) {
        count++;
      }
    }
  }

  // Diagonal Search (Top-Left to Bottom-Right)
  for (let row = 0; row <= n - 4; row++) {
    for (let col = 0; col <= n - 4; col++) {
      let diagonalString = '';
      for (let i = 0; i < 4; i++) {
        diagonalString += grid[row + i][col + i];
      }
      if (diagonalString === word || diagonalString === reversedWord) {
        count++;
      }
    }
  }

  // Diagonal Search (Top-Right to Bottom-Left)
  for (let row = 0; row <= n - 4; row++) {
    for (let col = 3; col < n; col++) {
      let diagonalString = '';
      for (let i = 0; i < 4; i++) {
        diagonalString += grid[row + i][col - i];
      }
      if (diagonalString === word || diagonalString === reversedWord) {
        count++;
      }
    }
  }

  let count2 = 0;

  for (let row = 1; row < n - 1; row++) {  // Avoid the first and last rows
    for (let col = 1; col < n - 1; col++) {  // Avoid the first and last columns
      if (grid[row][col] === 'A') {
        // Check the four corners around the "A"
        const corners = [
          grid[row - 1][col - 1],  // top-left
          grid[row - 1][col + 1],  // top-right
          grid[row + 1][col - 1],  // bottom-left
          grid[row + 1][col + 1]   // bottom-right
        ];

        const possibleCorners = [
          ["S", "S", "M", "M"],
          ["S", "M", "S", "M"],
          ["M", "S", "M", "S"],
          ["M", "M", "S", "S"]
        ]

        const isMatch = possibleCorners.some(possible => {
          return JSON.stringify(possible) === JSON.stringify(corners)
        })

        if (isMatch) {
          count2++
        }

        
      }
    }
  }

  console.log("Answer to part 1: ", count)
  console.log("Answer to part 2: ", count2)

  return Promise.resolve();
};

question();