declare var require:any

const express=require('express')
const app=express()
const http=require('http')
const server=http.createServer(app)

import { Server } from "socket.io";
const io = new Server(server,{ 
    cors:{
        //allowingf anyone on the server we created as io 
        origin:"*",
    }
});

type Point={
    x:number,
    y:number;
}

type Drawline={
    prevPoint:null | Point,
    currentPoint: Point,
    color:string,
}

io.on("connection", (socket) => {
    socket.on('draw-line',({prevPoint,currentPoint,color}:Drawline)=>{
        socket.broadcast.emit('draw-line',{prevPoint,currentPoint,color})
    })
  });
  
server.listen(3001,()=>{
    console.log('listening on 3001')
})