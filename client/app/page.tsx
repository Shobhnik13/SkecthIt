'use client'
import { useDraw } from '@/hooks/useDraw'
import Image from 'next/image'
import {useState} from 'react'
import {ChromePicker} from 'react-color'

export default function Home() {
  const {canvasRef,onMouseDown,clear}=useDraw(drawLine)
  const [color,setColor]=useState<string>('#000')
  function drawLine({prevPoint,currentPoint,ctx}:Draw){
    const { x:currX , y:currY }=currentPoint
    const strokeStyle=color
    const lineWidth=5
    
    let startPoint=prevPoint ?? currentPoint
    ctx.beginPath() 
    
    ctx.lineWidth=lineWidth
    ctx.strokeStyle=strokeStyle
    ctx.moveTo(startPoint.x,startPoint.y)
    ctx.lineTo(currX,currY)
    ctx.stroke()

    ctx.fillStyle=strokeStyle
    ctx.beginPath()
    ctx.arc(startPoint.x,startPoint.y,2,0,2*Math.PI)
    ctx.fill()
  }
  return (
    <div className='h-screen w-screen flex items-center justify-center gap-x-4'>
    <div className='flex flex-col pr-10 gap-10'>
      <ChromePicker color={color}  onChange={(e)=>setColor(e.hex)} />
      <button onClick={clear} className='p-2 rounded-md border border-black'>Clear canvas</button>
    </div>
      <canvas onMouseDown={onMouseDown} ref={canvasRef} height={650} width={750} className='border border-black rounded-md'/>
    </div>
    )
}
