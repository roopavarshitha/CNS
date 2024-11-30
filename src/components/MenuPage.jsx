import React from "react";
import { Link } from "react-router-dom";

const MenuPage = () => {
    return (
        <div>
            <h1>Menu</h1>
            <Link to="/user">User</Link>
            <br />
            <Link to="/requester">Requester</Link>
        </div>
    );
};

export default MenuPage;
