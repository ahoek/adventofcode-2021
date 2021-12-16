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
    if (twice && path.includes(p1) && isLower(p1)) {
      return false;
    }
    const vsN = vs.filter(v => v[0] === p1)
    let vsNew
    if (isLower(p1)) {
      if (path.includes(p1)) {
        twice = true
      }
      if (twice) {
        vsNew = [...vs.filter(v => v[1] !== p1)]
      } else {
        vsNew = [...vs]
      }
    } else {
      vsNew = [...vs]
    }
    path.push(p1)
    vsN.forEach(v => {
      const p2 = v[1]
      if (p2 === 'end') {
        //path.push(p2)
        console.log(path.join('-'))
        solution++
        return
      } else {
        next(p2, [...vsNew], [...path], twice)
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
