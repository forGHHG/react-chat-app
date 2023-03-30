import React from 'react';
import ReactEmoji from 'react-emoji';

import './Message.css';

const Message = ({message: {user, text, timsstamp}, name}) => {
    let isSentByCurrentUser = false;
    let isAdmin = false;

    const trimmedName = name.trim().toLowerCase();

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    if (user === 'admin') {
        isAdmin = true;
    }

    const backgroundColor = isAdmin ? 'backgroundAdmin' : 'backgroundLight';

    return (
        isSentByCurrentUser ? (
            <div className='messageContainer justifyEnd'>
                <p className='sentText pr-10'>{trimmedName}<br/>{timsstamp}</p>
                <div className='messageBox backgroundBlue'>
                    <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ) : (
            <div className='messageContainer justifyStart'>
                <div className={`messageBox ${backgroundColor}`}>
                    <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
                </div>
                <p className='sentText pl-10'>{user}<br/>{timsstamp}</p>
            </div>
        )
    )
}

export default Message;