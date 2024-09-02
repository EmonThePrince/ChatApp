import { Navigate } from 'react-router-dom';
import SearchBar from "./SearchBar";
import { useEffect, useState, useContext } from 'react';
import { UsernameContext } from './usernameContext';

function Home() {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [chats, setChats] = useState([]);
  const [reciever, setReciever] = useState('');
  const [message, setMessage] = useState('');
  const { username } = useContext(UsernameContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!token) {
      setShouldRedirect(true);
    } else {
      fetch('http://0.0.0.0:8000/chats/' + reciever, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        }
      })
        .then((response) => response.json())
        .then((data) => {
          data.results.reverse();
          setChats(data.results);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }, [token, reciever]);
  useEffect(() => {
    // console.log(username)
    if (token && reciever && username) {
      const socket = new WebSocket(`ws://0.0.0.0:8000/ws/chat/${username + reciever}/?token=${token}`);
      setSocket(socket);
  
      socket.addEventListener("open", () => {
        console.log("Connected to the WebSocket server.");
      });
  
      socket.addEventListener("message", (event) => {
        try {

         
            const newMessage = JSON.parse(event.data);
          if(newMessage['sender'] !== username){
            newMessage.sender = reciever
            setChats((prevChats) => [...prevChats, newMessage]);
          } 
        } catch (error) {
          console.error('Error parsing message:', error);
        }
      });
  
      socket.addEventListener("error", () => {
        console.log("Error occurred while connecting to WebSocket server.");
      });
  
      socket.addEventListener("close", () => {
        console.log("Disconnected from the WebSocket server.");
      });
  
      return () => {
        socket.close();  
        setSocket(null); 
      };
    }
  }, [token, reciever, username]);

  const handleLogout = (event) => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleSendMessage = () => {
    if (socket) {
      try {
        const newMessage = {
          message: message,
          sender: username
        };
        socket.send(JSON.stringify(newMessage));
        setChats((prevChats) => [...prevChats, newMessage]);
        setMessage('');
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  if (shouldRedirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-screen">
      <div className="flex justify-center w-screen items-center top-24 left-auto">
        <SearchBar reciever={setReciever} />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="flex flex-col w-screen mt-24">
        <div className="flex justify-between bg-gray-200 p-4 border-b border-gray-300">
          <span className="font-bold">{reciever}</span>
          <button className="text-gray-600 hover:text-gray-900 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col p-4 overflow-y-scroll h-screen">
          {/* chat messages will be rendered here */}
          {
            chats.map((chat, index) => (
              <div key={index}>
                <div className={`p-4 rounded mb-4 text-black inline-block ${chat.sender === reciever ? 'bg-gray-200' : 'bg-blue-200'}`}>
                  {chat.sender + ": " + chat.message}
                </div>
              </div>
            ))
          }
        </div>
        <div className="flex p-4 border-t border-gray-300">
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Type a message..." value={message} onChange={(e) => setMessage(e.target.value)} />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
