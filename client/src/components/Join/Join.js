import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';

import './Join.css';

const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    let navigate = useNavigate();

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div>
                    <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}
                        onKeyDown={event => event.key === 'Enter' ? navigate(`${process.env.PUBLIC_URL}/chat?name=${name}&room=${room}`) : null}
                     />
                </div>

                <Link onClick={event => (!name || !room) ? event.preventDefault() : null} to={`${process.env.PUBLIC_URL}/chat?name=${name}&room=${room}`}>
                    <button className="button mt-20" type="sunmit">Sign In</button>
                </Link>
            </div>
        </div>
    )
}

export default Join;