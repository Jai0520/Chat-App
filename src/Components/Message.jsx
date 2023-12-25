import React, { useContext, useEffect, useRef } from "react";
import User from "../images/User_Image.png"
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Message = ({message}) => {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const ref = useRef();

    useEffect(() => {
        ref.current?.scrollIntoView({behaviour:"smooth"})
    }, [message]);

    const formatDate = (timestamp) => {

        const date = timestamp.toDate();

        const dateFormatOptions = {
            day : "numeric",
            month : "short",
            year : "2-digit",
        };

        const timeFormatOptions = {
            hour : "numeric",
            minute : "numeric",
            hour12 : true,
            timeZoneName : "short",
        };

        const formattedDate = new Intl.DateTimeFormat("en-IN", dateFormatOptions).format(date);
        const formattedTime = new Intl.DateTimeFormat("en-IN", timeFormatOptions).format(date);

        return (
            <>
                <div>{formattedDate}</div>
                <div>{formattedTime}</div>
            </>
        );
    };

    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} />
                <span>{formatDate(message.date)}</span>
            </div>

            <div className="messageContent">
                <p>{message.text}</p>
                {message.img && <img src={message.img} />}
            </div>
        </div>
    );
}

export default Message;