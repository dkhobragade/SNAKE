"use client"

import { useEffect, useRef, useState } from "react";

const GRID = 15;

const layout = Array.from({ length: GRID }, () => {
  return new Array(GRID).fill("")
})

const initialBody = [[5, 5]]

const generateFood = () => {
  const x = Math.floor(Math.random() * GRID)
  const y = Math.floor(Math.random() * GRID)
  return [x, y]
}


export default function Home() {

  const [snakeBody, setSnakeBody] = useState(initialBody)
  const directionRef = useRef([1, 0])
  const food = useRef(generateFood())


  const snakeBodyDiv = (xc: any, yc: any) => {
    return snakeBody.some(([x, y]) => {
      return x === xc && y === yc
    })
  }


  useEffect(() => {
    const addInterval = setInterval(() => {
      setSnakeBody((prev) => {
        const newHead = [prev[0][0] + directionRef.current[0], prev[0][1] + directionRef.current[1]]

        if (newHead[0] < 0 || newHead[0] >= GRID || newHead[1] < 0 || newHead[1] >= GRID || prev.some(([x, y]) => {
          return newHead[0] === x && newHead[1] === y
        })) {
          directionRef.current = [1, 0]
          return initialBody
        }

        const copyBody = prev.map((arr) => [...arr])
        if (newHead[0] === food.current[0] && newHead[1] === food.current[1]) {
          food.current = generateFood()
        }
        else {
          copyBody.pop()
        }
        copyBody.unshift(newHead)
        return copyBody
      })
    }, 100)


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

  return <div className="contianer">
    {layout.map((row, yc) => {
      return row.map((cell, xc) => {
        return <div className={`cell ${snakeBodyDiv(xc, yc) ? 'snakebody' : ''} ${food.current[0] === xc && food.current[1] === yc ? 'food' : ''}`}></div>
      })
    })}
  </div>
}
