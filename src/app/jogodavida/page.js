"use client"
import { useState, useEffect } from "react";

import Head from "next/head";

import styles from './page.module.css'

const BoardSize = 10; 

export default function JogoDaViada() {
    const [board, setBoard] = useState([]); // Tabuleiro
    const [running, setRunning] = useState(false); // Estado de execução do jogo
  
    // Inicialização do tabuleiro
    useEffect(() => {
      const newBoard = Array(BoardSize)
        .fill(null)
        .map(() => Array(BoardSize).fill(false));
      setBoard(newBoard);
    }, []);
  
    // Função para alternar o estado de uma célula
    const toggleCell = (row, col) => {
      const newBoard = [...board];
      newBoard[row][col] = !newBoard[row][col];
      setBoard(newBoard);
    };
  
    // Função para atualizar o tabuleiro
    const updateBoard = () => {
      const newBoard = board.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          const aliveNeighbors = countAliveNeighbors(rowIndex, colIndex);
          if (cell && (aliveNeighbors < 2 || aliveNeighbors > 3)) {
            return false; // Morte por subpopulação ou superpopulação
          } else if (!cell && aliveNeighbors === 3) {
            return true; // Reprodução
          } else {
            return cell; // Manter o estado atual
          }
        })
      );
      setBoard(newBoard);
    };
  
    // Função para contar o número de células vivas vizinhas
    const countAliveNeighbors = (row, col) => {
      let count = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (i === 0 && j === 0) continue; // Ignorar a célula atual
          const neighborRow = row + i;
          const neighborCol = col + j;
          if (
            neighborRow >= 0 &&
            neighborRow < BoardSize &&
            neighborCol >= 0 &&
            neighborCol < BoardSize &&
            board[neighborRow][neighborCol]
          ) {
            count++;
          }
        }
      }
      return count;
    };
  
    // Função para iniciar ou parar a execução do jogo
    const toggleRunning = () => {
      setRunning(!running);
    };
  
    // Loop de atualização contínua do jogo
    useEffect(() => {
      let intervalId;
      if (running) {
        intervalId = setInterval(updateBoard, 1000);
      }
      return () => clearInterval(intervalId);
    }, [running]);

    return <div>
        <Head>
            <title>Projeto | Jogo da Vida</title>
        </Head>
        <div className={styles.container}>
        <div className={styles.box}>
          <div>
            <button onClick={toggleRunning} className={styles.btn}>{running ? 'Parar' : 'Iniciar'}</button>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', width: "350px", justifyContent: "center"}}>
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  style={{
                    width: 30,
                    height: 30,
                    backgroundColor: cell ? 'black' : 'white',
                    border: '1px solid gray',
                  }}
                  onClick={() => toggleCell(rowIndex, colIndex)}
                />
              ))
            )}
          </div>
        </div>
        </div>
        </div>
    };
        
