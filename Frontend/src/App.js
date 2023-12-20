import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HeadlineCards from './components/HeadlineCards'
import Food from './components/Food'
import Category from './components/Category'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Landing from './components/notes'
import Homepage from './components/Homepage'

function App() {
  return (
    <div>
        <Navbar />
        <Homepage />
    </div>
  );
}

export default App;
{/* <Navbar />
<Hero />
<HeadlineCards />
<Food />
<Category /> */}
// <Router>
      //       <Navbar />
      //       <Routes>
      //         <Route path="/Home" element={<Home />} />
      //         {/* Add other routes here as needed */}
      //       </Routes>
      //     </Router>