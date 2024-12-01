import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import MenuPage from "./components/MenuPage";
import UserForm from "./components/User";
import RequesterForm from "./components/Requester";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/menu" element={<MenuPage />} />
                <Route path="/user" element={<UserForm />} />
                <Route path="/requester" element={<RequesterForm />} />
            </Routes>
        </Router>
    );
};

export default App;
