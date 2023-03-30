import React from 'react';

import './Input.css';

const Input = ({message, setMessage, sendMessage}) => (
    <form className='form'>
        <input
            className='input'
            type='text'
            placeholder='내용을 입력하세요.'
            value={message} 
            onChange={(event) => setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <button className='sendButton' onClick={(event) => sendMessage(event)}>전송</button>
    </form>
)

export default Input;