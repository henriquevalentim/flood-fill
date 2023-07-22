import { useEffect, useState } from 'react'
import { TextField, Button } from '@mui/material'
import './App.css'
import { createMatriz, getColor } from './utils/matriz'

function App() {
  const [lines, setLines] = useState(5)
  const [columns, setColumns] = useState(5)
  const [matriz, setMatriz] = useState()

  useEffect(() => {
    setMatriz(createMatriz(lines, columns))
  }, [])

  const callCreateMatriz = () => {
    setMatriz(createMatriz(lines, columns))
  }

  const paintPosition = (line, column, matriz) => {
    const newMatriz = matriz.map((row) => [...row])
    newMatriz[line][column] = 1
    setMatriz(newMatriz)
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
                        width: 50,
                        height: 50,
                        margin: 1,
                        backgroundColor: getColor(column)
                      }}
                      onClick={() => paintPosition(l, c, matriz)}
                    >
                      {column}
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
