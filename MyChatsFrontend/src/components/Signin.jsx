import React, { useState } from 'react';

function Signin() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!password.match(/\d/)) {
      setError('Password must contain at least one digit');
    } else {
      // TO DO: Implement authentication logic here
      console.log('Submit:', { username, email, password });
    }
  };

  return (
    <div className="container mx-auto p-4 pt-6 mt-10 bg-white rounded-lg shadow-md w-1/2">
      <h1 className="text-3xl text-gray-900 leading-tight">Sign In</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="username" className="block text-sm text-gray-700">Username:</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter your username"
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-gray-700">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter your email"
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm text-gray-700">Password:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter your password (must contain at least one digit)"
            className="block w-full p-2 pl-10 text-sm text-gray-700 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Sign In</button>
      </form>
    </div>
  );
}

export default Signin;