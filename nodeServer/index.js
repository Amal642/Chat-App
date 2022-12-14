//Node Server

// const io=require('socket.io')(8000)
// emit:
const io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
  });

const user={};

io.on('connection',socket=>{
    socket.on('new-user-joined',name1=>{
        user[socket.id]=name1;
        socket.broadcast.emit('user-joined',name1);
    });
    socket.on('send',message=>{
        socket.broadcast.emit('receive',{message:message,name1:user[socket.id]})
    }); 
    socket.on('disconnect',message=>{
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];
    });
    
})