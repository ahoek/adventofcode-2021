const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  const boardData = data.trim().split("\n\n");
  const calls = boardData.shift().split(',').map(n => parseInt(n));
  const boards = boardData.map(b => b.split(/\s+/).map(n => parseInt(n)))

  function checkH(b) {
    return (
      b[0] + b[1] + b[2] + b[3] + b[4] === 500
      || b[5] + b[6] + b[7] + b[8] + b[9] === 500
      || b[10] + b[11] + b[12] + b[13] + b[14] === 500
      || b[15] + b[16] + b[17] + b[18] + b[19] === 500
      || b[20] + b[21] + b[22] + b[23] + b[24] === 500
    )
  }
  function checkV(b) {
    return (
      b[0] + b[5] + b[10] + b[15] + b[20] === 500
      || b[1] + b[6] + b[11] + b[16] + b[21] === 500
      || b[2] + b[7] + b[12] + b[17] + b[22] === 500
      || b[3] + b[8] + b[13] + b[18] + b[23] === 500
      || b[4] + b[9] + b[14] + b[19] + b[24] === 500
    )
  }

  let bingoI;
  let lastCall;
  calls.forEach(call => {
    boards.forEach((b, bi) => {
      const index = b.findIndex(v => v === call);
      if (index !== -1) {
        b[index] = 100;
      }
      if (checkH(b) || checkV(b)) {
        bingoBoard = [...b]
        boards.splice(bi, 1)
        lastCall = call
      }
    })
  })

  const sum = bingoBoard.reduce((acc, val) => acc + (val !== 100 ? val : 0), 0);
  console.log(boards, bingoBoard, lastCall)
  const solution = sum * lastCall;
  console.log(`Solution: ${solution}`)
});
