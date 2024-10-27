import { useState, useEffect } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../index.css';

export function LogIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState("");
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch registered users from the JSON server
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/user');
        const data = await response.json();
        setRegisteredUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    

    // Check if the user is registered
    const user = registeredUsers.find(user => user.email === email);
    
    if (!user) {
      // User is not registered
      alert("Please register first.");
      return;
    }

    // Check for correct password
    if (user.password !== password) {
      alert("Please use the correct details.");
      return;
    }

    // Successful login
    navigate('/recipe'); // Change this to your desired route
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-800">
      <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl text-white text-center mb-4">Log In</h1>
        
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        <div className="mb-4">
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-500" 
            required
          />
        </div>

        <div className="mb-4">
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            className="w-full p-2 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring focus:ring-gray-500" 
            required
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <button type="submit" className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-500 focus:outline-none">
            Log In
          </button>
        </div>

        <p className="text-gray-400 text-center">
          Don't have an account? <Link to="/sign-up" className="text-white hover:underline">Click here</Link>
        </p>
      </form>
    </div>
  );
}
