"use client"

import { useEffect, useRef, useState } from "react";

const GRID = 15;

const layout = Array.from({ length: GRID }, () => {
  return new Array(GRID).fill("")
})


export default function Home() {

  const [snakeBody, setSnakeBody] = useState([[3, 5], [2, 5], [1, 5]])

  const directionRef = useRef([1, 0])

  useEffect(() => {
    const addInterval = setInterval(() => {
      setSnakeBody((prev) => {
        const newHead = [prev[0][0] + directionRef.current[0], prev[0][1] + directionRef.current[1]]

        if (newHead[0] < 0 || newHead[0] >= GRID || newHead[1] < 0 || newHead[1] >= GRID) {
          return [[3, 5], [2, 5], [1, 5]]
        }

        const copyBody = prev.map((arr) => [...arr])
        copyBody.pop()
        copyBody.unshift(newHead)
        return copyBody
      })
    }, 1000)


    const handleDirection = (e: any) => {
      const key = e.key
      if (key === "ArrowUp" && directionRef.current[1] != 1) {
        directionRef.current = [0, -1]
      }
      else if (key === "ArrowRight" && directionRef.current[0] != -1) {
        directionRef.current = [1, 0]
      }
      else if (key === "ArrowDown" && directionRef.current[1] != -1) {
        directionRef.current = [0, 1]
      }
      else if (key === "ArrowLeft" && directionRef.current[0] != 1) {
        directionRef.current = [-1, 0]
      }
    }

    window.addEventListener('keydown', handleDirection)

    return () => {
      clearInterval(addInterval)
      window.removeEventListener('keydown', handleDirection)
    }
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
