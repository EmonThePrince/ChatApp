import { Navigate } from 'react-router-dom';
import SearchBar from "./SearchBar";

function Home() {
//   const token = localStorage.getItem("token"); // assuming you're storing the token in local storage

//   if (!token) {
//     return <Navigate to="/login" />;
//   }

  return (
    <div className="h-screen">
      <div className="flex justify-center w-screen items-center top-24 left-auto">
        <SearchBar />
      </div>
      <div className="flex flex-col w-screen mt-24">
        <div className="flex justify-between bg-gray-200 p-4 border-b border-gray-300">
          <span className="font-bold">John Doe</span>
          <button className="text-gray-600 hover:text-gray-900 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex flex-col p-4 overflow-y-scroll h-screen">
          {/* chat messages will be rendered here */}
          <div className="bg-gray-200 p-4 rounded mb-4">
            <span>Hello, how are you?</span>
          </div>
          <div className="bg-blue-200 p-4 rounded mb-4">
            <span>I'm good, thanks!</span>
          </div>
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