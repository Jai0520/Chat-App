import React, { useState } from 'react';
import '../App.css';
import Add from '../images/Add_Image.png';
import User from '../images/User_Image.png';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        console.log(file);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const storageRef = ref(storage, `${displayName}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                }
                catch(err){
                    console.log(err);
                    setErr(true);
                }
                });
            }
            );
        }
        catch (err) {
            setErr(true);
        }
    }

    return (
        <div className='formContainer'>
            <div className="formWrapper">
                <span className='logo'>Let's Chat</span>
                <span className="title">Welcome to Let's Chat</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='User Name'/>
                    <input type="email" placeholder='Email'/>
                    <input type="password" placeholder='Password'/>
                    <input style={{display:"none"}} type="file" id='file'/>
                    <label htmlFor="file">
                        <img src={Add} />
                        <span>Add profile picture</span>
                    </label>
                    <button>Sign Up</button>
                    {err && <span style={{color:"red"}}>Something went wrong!</span>}
                </form>
                <p>Alraedy have an Account? <Link to='/login'>Login</Link></p>
            </div>
        </div>
    );
}

export default Register;