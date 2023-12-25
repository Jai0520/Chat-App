import React, { useContext } from "react";
import User from '../images/User_Image.png';
import { signOut } from 'firebase/auth';
import { auth } from "../firebase";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {

    const {currentUser} = useContext(AuthContext);

    return (
        <div className="navbar">
            <span className="logo">Let's Chat</span>
            <div className="user">
                <img src={currentUser.photoURL} />
                <span>{currentUser.displayName}</span>
                <button onClick={()=>signOut(auth)}>Logout</button>
            </div>
        </div>
    );
}

export default Navbar;