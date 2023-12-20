import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import HeadlineCards from './components/HeadlineCards'
import Food from './components/Food'
import Category from './components/Category'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login'
import Landing from './components/notes'
import Homepage from './components/Homepage'
import ClientHome from './components/ClientHome'
import AgentHome from './components/AgentHome'
import ManagerHome from './components/ManagerHome'
import AdminHome from './components/AdminHome'

function App() {
  return (
    <Router>
      <div>
        {/* Your Navbar or any other components that should persist across routes */}
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/ClientHome" element={<ClientHome />} />
          <Route path="/AdminHome" element={<AdminHome />} />
          <Route path="/ManagerHome" element={<ManagerHome />} />
          <Route path="/AgentHome" element={<AgentHome />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;


// function App() {
//   return (
//     <div>
//         <Navbar />
//         <Homepage />
//     </div>
//   );
// }

// export default App;
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

      