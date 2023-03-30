const exporess = require('express');
const socketio = require('socket.io');
const http = require('http');

const {addUser, removeUser, getUser, getUsersInRoom} =  require('./users.js');

const PORT = process.env.PORT || 5000;

const cors = require('cors');
const router = require('./router');

const app = exporess();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connection', (socket) => {
    // console.log('>> 새로운 유저가 접속했습니다.');

    /* 'join'으로 정보 수신 */
    socket.on('join', ({name, room}, callback) => {
        const now = new Date();
        const timsstamp = now.getHours().toString().padEnd(2,0) + ":" + now.getMinutes().toString().padStart(2,0);

        const { error, user } = addUser({id : socket.id, name, room});

        if (error) {
            return callback(error);
        }

        const users = getUsersInRoom(user.room);
        if (users.length == 1) console.log(`>> '${user.room}' 방이 만들어졌습니다.`);

        console.log(`>> '${room}'에 '${name}'유저가 들어왔습니다.`);

        // 채팅방에 들어온 유저에게만
        socket.emit('message', {user : 'admin', text : `'${user.name}' 님, '${user.room}'에 오신 것을 환영합니다.`, timsstamp});
        // 채팅방 안의 모든 유저에게
        socket.broadcast.to(user.room).emit('message', {user : 'admin', text : `'${user.name}' 님이 들어오셨습니다.`, timsstamp});

        socket.join(user.room);

        // 채팅방 내의 유저 정보 저장
        io.to(user.room).emit('roomData', {room : user.room, users : getUsersInRoom(user.room)});

        callback();
    });

    /* 메세지 전송 */
    socket.on('sendMessage', (message, callback) => {
        const now = new Date();
        const timsstamp = now.getHours().toString().padEnd(2,0) + ":" + now.getMinutes().toString().padStart(2,0);

        const user = getUser(socket.id);
        io.to(user.room).emit('message', {user : user.name, text : message, timsstamp});

        callback();
    });

    /* 채팅방 나가기 */
    socket.on('disconnect', () => {
        const now = new Date();
        const timsstamp = now.getHours().toString().padEnd(2,0) + ":" + now.getMinutes().toString().padStart(2,0);
        
        // 유저 삭제
        const user = removeUser(socket.id);
        
        if (user) {
            // 채팅방에 유저가 남아있을 경우 메세지 표시
            io.to(user.room).emit('message', {user : 'admin', text : `'${user.name}' 님이 '${user.room}'에서 나갔습니다.`, timsstamp});
            // 채팅방 내의 유저 정보 저장
            io.to(user.room).emit('roomData', {room : user.room, users : getUsersInRoom(user.room)});

            console.log(`<< '${user.name}'유저가 '${user.room}'에서 나갔습니다.`);

            const users = getUsersInRoom(user.room);
            if (users.length < 1) console.log(`<< '${user.room}' 방이 터졌습니다.`);
        }

        // console.log('<< 유저가 퇴장했습니다.');
    });
});


server.listen(PORT, () => 
    console.log(`Server has started on port ${PORT}`)
);