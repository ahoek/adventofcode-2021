const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  let vs = data.trim().split("\n").map(l => {
    return l.split('-');
  })
  vsAll = [...vs, ...vs.map(n => [...n].reverse())]

  let solution = 0;
  console.log(vsAll, "\n\n")
  next('start', [...vsAll], 2);

  console.log(`Solution: ${solution}`)

  function next(p1, vs, i) {
    console.log(i, p1, vs);

    const vsN = vs.filter(v => v[0] === p1)
    let vsNew
    if (isLower(p1)) {
      // lower case vertex can only be used once
      vsNew = [...vs.filter(v => v[1] !== p1)]
    } else {
      vsNew = [...vs];
    }

    vsN.forEach(v => {
      const p2 = v[1]
      if (p2 === 'end') {
        solution++
      } else {
        next(p2, [...vsNew], i++)
      }
    })
  }
});

function diff(arr1, arr2) {
  return arr1.filter(x => !arr2.includes(x));
}

function isLower(x) {
  return x.toLowerCase() === x
}
