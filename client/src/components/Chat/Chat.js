import React, { useState, useEffect } from 'react'
import './Chat.css';
import ScrollToBootom from 'react-scroll-to-bottom';

const Chat = ({ socket, name, room }) => {

    const [currMessage, setCurrMessage] = useState("");//currentMessage
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async () => {
        if (currMessage) {
            const messageData = {
                room: room,
                sender: name,
                message: currMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
            };

            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
            setCurrMessage("");
        }
    };

    useEffect(() => {
        socket.on("receive_message", (data) => {
            //console.log(data);
            setMessageList((list) => [...list, data]);
        })
    }, [socket])


    return (
        <>
        <div className='chat-window'>
            <div className="chat-header">
                <p>Live Chat #{room}</p>
            </div>

            <div className="chat-body">
                <ScrollToBootom className="message-container">
                {messageList.map((messageContent) => {
                    return <div className="message" id={ name === messageContent.sender ? "you" : "other"} >
                        <div>
                            <div className="message-content">
                                <p>{messageContent.message}</p>
                            </div>
                            <div className="message-meta">
                                <p className='time'>{messageContent.time}</p>
                                <p className='author'>@{messageContent.sender}</p>
                            </div>
                        </div>
                    </div>;
                })}
                </ScrollToBootom>
            </div>

            <div className="chat-footer">
                <input
                    type="text"
                    value={currMessage}
                    placeholder='type your reply...'
                    onChange={(event) => {
                        setCurrMessage(event.target.value);
                    }}
                    onKeyPress={(event)=>{
                        event.key === "Enter" && sendMessage();
                    }}
                />
                <button onClick={sendMessage}>&#10148;</button>
            </div>
        </div>
        </>
    )
}

export default Chat