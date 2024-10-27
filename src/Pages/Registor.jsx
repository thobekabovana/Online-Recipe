import { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import '../index.css';

export function Register() {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(""); // Reset error message

        // Validate user input
        if (!user.name || !user.email || !user.password || !user.confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (user.password !== user.confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
            const response = await fetch('https://localhost:3000/user', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(user),
            });

            if (!response.ok) {
                throw new Error("Failed to register. Please try again.");
            }

            // Successfully registered, navigate to the recipe app
            navigate('/recipe');
        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
            <form className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md" onSubmit={handleSubmit}>
                <h1 className="text-white text-2xl font-bold mb-6 text-center">Register</h1>

                {error && <p className="text-red-500 mb-4">{error}</p>}

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Name"
                        value={user.name}
                        onChange={(event) => setUser({ ...user, name: event.target.value })}
                        className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Email"
                        value={user.email}
                        onChange={(event) => setUser({ ...user, email: event.target.value })}
                        className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                <div className="mb-4">
                    <input
                        type="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={(event) => setUser({ ...user, password: event.target.value })}
                        className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                <div className="mb-6">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={user.confirmPassword}
                        onChange={(event) => setUser({ ...user, confirmPassword: event.target.value })}
                        className="w-full p-3 bg-gray-700 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-gray-500"
                    />
                </div>

                <div className="flex items-center justify-between mb-4">
                    <button className="w-full bg-gray-600 hover:bg-gray-500 text-white font-bold py-2 rounded focus:outline-none focus:ring-2 focus:ring-gray-500" type="submit">
                        Submit
                    </button>
                </div>

                <div className="text-center">
                    <p className="text-gray-400">
                        Already have an account? <Link to="/log-in" className="text-white underline">Login here</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}
