import { Navigate } from 'react-router-dom';
import SearchBar from "./SearchBar";
import { useEffect,useState } from 'react';

function Home() {
  const token = localStorage.getItem("token");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [chats, setChats] = useState([])

  useEffect(()=>{
    if (!token) {
      setShouldRedirect(true);
    } else {
      fetch('http://0.0.0.0:8000/chats/habib1', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Token ' + token
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        data.results.reverse()
        setChats(data.results)
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [token])

  let handleLogout = (event)=>{
    localStorage.removeItem("token");
    setIsLoggedIn(false)
  }

  if (shouldRedirect) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="h-screen">
      <div className="flex justify-center w-screen items-center top-24 left-auto">
        <SearchBar />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleLogout}>
            Logout
          </button>
      </div>
      <div className="flex flex-col w-screen mt-24">
        <div className="flex justify-between bg-gray-200 p-4 border-b border-gray-300">
          <span className="font-bold">habib1</span>
          <button className="text-gray-600 hover:text-gray-900 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col p-4 overflow-y-scroll h-screen">
          {/* chat messages will be rendered here */}
          {/* <div className="bg-gray-200 p-4 rounded mb-4 text-black">
            <span>Hello, how are you?</span>
          </div>
          <div className="bg-blue-200 p-4 rounded mb-4 text-black">
            <span>I'm good, thanks!</span>
          </div> */}
          {
            chats.map((chat, index) => (
              <div key={index}>
                <div className={`p-4 rounded mb-4 text-black inline-block ${chat.sender === 'habib1' ? 'bg-gray-200' : 'bg-blue-200'}`}>
                  {chat.sender+": "+chat.message}
                </div>
              </div>
            ))
          }
        </div>
        <div className="flex p-4 border-t border-gray-300">
          <input type="text" className="w-full p-2 border border-gray-300 rounded" placeholder="Type a message..." />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;