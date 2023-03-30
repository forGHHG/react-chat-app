import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from 'socket.io-client';

import Infobar from "../InfoBar/Infobar";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import TextContainer from "../TextContainer/TextContainer";

import './Chat.css';

let socket;
const ENDPOINT = 'https://react-cha-server.fly.dev/';

const Chat = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState([]);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const {name, room} = queryString.parse(window.location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        // 'join'으로 name과 room 정보 송신
        socket.emit('join', {name, room}, (error) => {
            // 콜백함수 정의
            if (error) {
                window.location.replace("/");
                alert(error);
            }
        });

        return () => {
            socket.emit('disconnect');
            socket.off();
        }
        
    }, [ENDPOINT, window.location.search]);

    useEffect(() => {
        socket.on('message', (message) => {
            setMessages([...messages, message]);
        });

        socket.on('roomData', ({users}) => {
            setUsers(users);
        })

    }, [messages])

    const sendMessage = (event) => {
        event.preventDefault();

        if (message) {
            socket.emit('sendMessage', message, () => setMessage(''));
        }
    }

    return (
        <div className="outerContainer">
            <div className="container">
                <Infobar room={room} />
                <Messages messages={messages} name={name}/>
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
            </div>
            <TextContainer users={users} />
        </div>
    )
}

export default Chat;