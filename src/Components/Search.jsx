import React, { useContext, useState } from "react";
import User from '../images/User_Image.png';
import { collection, query, where, getDocs, setDoc, doc, updateDoc, serverTimestamp, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";

const Search = () => {

    const [userName, setUserName] = useState("");
    const [user, setUser] = useState(null);
    const [err, setErr] = useState(false);

    const {currentUser} = useContext(AuthContext);

    const handleSearch = async () => {
        const q = query(
            collection(db, "users"),
            where("displayName","==",userName)
        );

        try {
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setUser(doc.data());
            });
        } catch(err) {
            setErr(true);
        }

    };

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch();
    };

    const handleSelect = async () => {
        // check if chats (in firebase data) exists, if not then create new data
        const combinedId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
        console.log("Combined ID:", combinedId);
        try {

            const res = await getDoc(doc(db, "chats", combinedId));
            if(!res.exists()) {
                // console.log("res not exists... creating new chat in db");
                // create a chat in database
                await setDoc(doc(db, "chats", combinedId), { messages : [] });
                // console.log("Chats document added successfully!");

                // create user chats which stores the last message, user, etc which will be displayed on sidebar.
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                    [combinedId + ".userInfo"] : {
                        uid : user.uid,
                        displayName : user.displayName,
                        photoURL : user.photoURL
                    },
                    [combinedId + ".date"] : serverTimestamp()
                });

                await updateDoc(doc(db, "userChats", user.uid), {
                    [combinedId + ".userInfo"] : {
                        uid : currentUser.uid,
                        displayName : currentUser.displayName,
                        photoURL : currentUser.photoURL
                    },
                    [combinedId + ".date"] : serverTimestamp()
                });
            }

        } catch (error) {
            console.error("Error adding chats document:", error);
            setErr(true);
        }
        setUser(null);
        if (userName.trim() !== "") {
            setUserName("");
        }
    };

    return (
        <div className="search">
            <div className="searchForm">
                <input 
                    type="text"
                    placeholder="Find a User"
                    onKeyDown={handleKey}
                    onChange={(e)=>setUserName(e.target.value)}
                    value={userName} 
                />
            </div>
            {err && <span>User not found!</span>}
            {user && <div className="userChat" onClick={handleSelect}>
                <img src={user.photoURL} />
                <div className="userInfo">
                    <span>{user.displayName}</span>
                </div>
            </div>}
        </div>
    );
}

export default Search;