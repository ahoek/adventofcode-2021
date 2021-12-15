const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  const lines = data.trim().split("\n").map(l => {
    return l.split('')
  })
  let solution = 0;
  lines.forEach(line => {
    const stack = [];
    let lastToken
    const invalidLine = line.some(token => {
      let isValid;
      let pop;
      switch (token) {
        case '(':
        case '[':
        case '<':
        case '{':
          isValid = true
          pop = undefined
          stack.push(token)
          break;
        case ')':
          pop = stack.pop()
          isValid = pop === '('
          break;
        case ']':
          pop = stack.pop()
          isValid = pop === '['
          break;
        case '>':
          pop = stack.pop()
          isValid = pop === '<'
          break;
        case '}':
          pop = stack.pop()
          isValid = pop === '{'
          break;
      }
      lastToken = token;
      return !isValid;
    })
    if (invalidLine) {
      const points = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137,
      }
      solution += points[lastToken]
    }
  })

  console.log(`Solution: ${solution}`)

});

