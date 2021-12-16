const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  let vs = data.trim().split("\n").map(l => {
    return l.split('-');
  })
  vsAll = [...vs, ...vs.map(n => [...n].reverse())]
  vsAll = vsAll.filter(v => v[1] !== 'start' && v[0] !== 'end')

  let solution = 0;
  console.log(vsAll, "\n")
  next('start', [...vsAll], [], false);

  console.log(`Solution: ${solution}`)

  function next(p1, vs, path, twice) {
    const vsN = vs.filter(v => v[0] === p1)
    let vsNew
    if (isLower(p1)) {
      if (path.includes(p1)) {
        twice = true
      }
      vsNew = [...vs.filter(v => v[1] !== p1)]
    } else {
      vsNew = [...vs];
    }
    path.push(p1)

    vsN.forEach(v => {
      const p2 = v[1]
      if (p2 === 'end') {
        console.log(path.join('-'))
        solution++
      } else {
        next(p2, [...vsNew], [...path])
      }
    })
  }
});

function isLower(x) {
  return x.toLowerCase() === x
}

function lowerNodeTwice(path) {
  // check if value exists twice in path
}
