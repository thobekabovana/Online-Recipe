// import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Components/Layout';
import LandingPage from './Pages/LandingPage';
import { Registor } from './Pages/Registor';
import { LogIn } from './Pages/LogIn';
import Recipe from './Pages/Recipe';
// import LogIn from './Pages/LogIn';
// import Todo from './Pages/Todo';

function App() {
 

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route path="/" element={<Layout/>}>
          

            <Route index element={<LandingPage />} />
            <Route path="/sign-up" element={<Registor />} />
            <Route path="/log-in" element={<LogIn />} />
            <Route path="/recipe" element={<Recipe />} />
          
          </Route>
        </Routes>
       
      </BrowserRouter>
    </>
  );
}

export default App;