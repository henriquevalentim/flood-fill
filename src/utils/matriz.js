function createMatriz(line, column) {
  let matriz = []
  for (let i = 0; i < line; i++) {
    matriz[i] = []
    for (let j = 0; j < column; j++) {
      matriz[i][j] = 0
    }
  }
  return matriz
}

function getColor(value) {
  // 0 = vazio
  // 1 = preenchido
  // -1 = parede

  if (value === 0) {
    return 'blue'
  } else if (value === -1) {
    return 'black'
  } else if (value === 1) {
    return 'yellow'
  }
}

export { createMatriz, getColor }
