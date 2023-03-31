import React from "react";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Join from './components/Join/Join';
import Chat from './components/Chat/Chat';

const App = () => (
    <Router>
        <Routes>
            <Route path={`${process.env.PUBLIC_URL}/`} exact element={<Join />} />
            <Route path={`${process.env.PUBLIC_URL}/chat`} element={<Chat />} />
        </Routes>
    </Router>
);

export default App;