"use client"

import { useEffect, useState } from "react";

const GRID = 15;

const layout = Array.from({ length: GRID }, () => {
  return new Array(GRID).fill("")
})


export default function Home() {

  const [snakeBody, setSnakeBody] = useState([[3, 5], [2, 5], [1, 5]])

  useEffect(() => {
    setInterval(() => {
      setSnakeBody((prev) => {
        const newHead = [prev[0][0] + 1, prev[0][1]]
        if (newHead[0] < 0 || newHead[0] >= GRID || newHead[1] < 0 || newHead[1] >= GRID) {
          return [[3, 5], [2, 5], [1, 5]]
        }
        const copyBody = prev.map((arr) => [...arr])
        copyBody.pop()
        copyBody.unshift(newHead)
        return copyBody
      })
    }, 10)
  }, [])


  const snakeBodyDiv = (xc: any, yc: any) => {
    return snakeBody.some(([x, y]) => {
      return x === xc && y === yc
    })

  }


  return <div className="contianer">
    {layout.map((row, yc) => {
      return row.map((cell, xc) => {
        return <div className={`cell ${snakeBodyDiv(xc, yc) ? 'snakebody' : ''}`}></div>
      })
    })}
  </div>
}
