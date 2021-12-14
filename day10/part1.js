const fs = require('fs'), filename = process.argv[2];
fs.readFile(filename, 'utf8', (err, data) => {
  const lines = data.trim().split("\n").map(l => {
    return l.split('')
  })
  //console.log(lines)
  lines.some(line => {
    // console.log(line)
    const stack = {
      '(': 0,
      '[': 0,
      '<': 0,
      '{': 0,
    }
    let lastToken
    line.some(token => {
      // console.log(token);
      switch (token) {
        case '(':
        case '[':
        case '<':
        case '{':
          stack[token]++
          break;
        case ')':
          stack['(']--
          break;
        case ']':
          stack['[']--
          break;
        case '>':
          stack['<']--
          break;
        case '}':
          stack['{']--
          break;
      }
      const isValid = check(stack)
      lastToken = token;
      return !isValid;
    })
    console.log(lastToken)
    return false;
  })
  let solution = 0
  console.log(`Solution: ${solution}`)

  function check(stack) {
    let valid = true;
    Object.values(stack).forEach(v => {
      if (v < 0) {
        valid = false;
      }
    })
    return valid
  }
});

