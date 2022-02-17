import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './components/Chat/Chat';

const socket = io.connect("http://localhost:3001");

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false)

  const joinRoom = () => {
    if (name && room) {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  }

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join!</h3>
          <input
            type="text"
            placeholder="name"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <input
            type="text"
            placeholder="room"
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button
            onClick={joinRoom}>Join chat</button>
        </div>
      )
        :
        (<Chat
          socket={socket}
          name={name}
          room={room}
        />)
      }
    </div>
  );
}

export default App;
