import { useState } from "react";
import { useNavigate } from 'react-router-dom';
// import axios from "axios";
import { Link } from "react-router-dom";
import '../index.css'

export function Registor() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate('/recipe');
  }


    return(
        <>
        <form style={{backgroundColor: "#DDDCD9",
                     height: "80vh"
        }} onSubmit={handleSubmit}>
        <div>

            <div>

          <h1>Registor</h1>

              

        <div className="input-container">
              <div className="input-field">
                <input type="text" 
                       placeholder="Name"  
                       value={name} 
                       onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="input-field">
                <input type="text" 
                       placeholder="Email"  
                       value={email} 
                       onChange={(e) => setEmail(e.target.value)}
               />
             </div>

             <div className="input-field">
                <input type="text" 
                      placeholder="Password"  
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)}
                />
             </div>

             <div className="input-field">
                <input type="text" 
                       placeholder="Password" 
                       value={confirmPassword} 
                       onChange={(e) => setConfirmPassword(e.target.value)}
                />
             </div>

        </div>

             <div className="button-container">
                <button className="button" type="submit">Submit</button>
             </div>

             <div className="link-container">
                <br></br>
                   <p className="link">Already have an account? <Link to="/log-in">Login here</Link></p>
            </div>
            </div>

        </div>
        </form>
        </>
    )
}