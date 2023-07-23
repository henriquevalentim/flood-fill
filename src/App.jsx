import { useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material'
import './App.css'
import { createMatriz, getColor } from './utils/matriz'

function App() {
  const [lines, setLines] = useState(70)
  const [columns, setColumns] = useState(70)
  const [matriz, setMatriz] = useState()

  useEffect(() => {
    setMatriz(createMatriz(lines, columns))
  }, [])

  const callCreateMatriz = () => {
    setMatriz(createMatriz(lines, columns))
  }

  const paintInitialPosition = (line, column, matriz) => {
    const newMatriz = matriz.map((row) => [...row])
    newMatriz[line][column] = 5
    setMatriz(newMatriz)
    floodFill(newMatriz, line, column)
  }

  const paintPosition = (line, column, matriz) => {
    const newMatriz = matriz.map((row) => [...row])
    newMatriz[line][column] = 1
    setMatriz(newMatriz)
  }

  const floodFill = (matrix, row, col) => {
    const numRows = matrix.length
    const numCols = matrix[0].length

    // Verifica se as coordenadas estão dentro dos limites da matriz e se a célula é um espaço vazio
    function isValidMove(row, col) {
      return (
        row >= 0 &&
        row < numRows &&
        col >= 0 &&
        col < numCols &&
        (matrix[row][col] === 0 || matrix[row][col] === 5)
      )
    }

    // Função para aguardar o intervalo de 0.1 segundo antes de chamar a próxima recursão
    function waitAndFill(row, col) {
      setTimeout(() => recursiveFill(row, col), 100)
    }

    function recursiveFill(row, col) {
      // console.log('row:', row, 'col:', col)
      if (!isValidMove(row, col)) {
        return
      }

      // Marca a célula como visitada
      matrix[row][col] = 1
      paintPosition(row, col, matrix)

      // Chama a função recursivamente para as células vizinhas com intervalo de 1 segundo
      waitAndFill(row + 1, col)
      waitAndFill(row - 1, col)
      waitAndFill(row, col + 1)
      waitAndFill(row, col - 1)
    }

    // Encontra a posição do ponto inicial (valor 5)
    let startRow, startCol
    for (let i = 0; i < numRows; i++) {
      for (let j = 0; j < numCols; j++) {
        if (matrix[i][j] === 5) {
          startRow = i
          startCol = j
          break
        }
      }
    }

    // Chama a função de preenchimento recursivo a partir do ponto inicial
    recursiveFill(startRow, startCol)

    return matrix
  }

  return (
    <>
      <div>
        <TextField
          label='numero de linhas'
          variant='outlined'
          type='number'
          defaultValue={lines}
          onChange={(e) => setLines(e.target.value)}
        />
        <TextField
          label='numero de colunas'
          variant='outlined'
          type='number'
          defaultValue={lines}
          onChange={(e) => setColumns(e.target.value)}
        />
        <Button variant='contained' onClick={() => callCreateMatriz()}>
          Criar
        </Button>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <div>
          {matriz &&
            matriz.map((line, l) => (
              <div key={`${line}-${l}`} style={{ display: 'flex' }}>
                {line.map((column, c) => {
                  return (
                    <div
                      key={`${column}-${c}`}
                      style={{
                        width: 10,
                        height: 10,
                        margin: 0.5,
                        backgroundColor: getColor(column)
                      }}
                      onClick={() => paintInitialPosition(l, c, matriz)}
                    >
                      {/* {column} */}
                    </div>
                  )
                })}
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default App
