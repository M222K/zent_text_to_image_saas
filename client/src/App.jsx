import React, { useContext } from 'react'
import Home from "./pages/Home.jsx"
import Result from "./pages/Result.jsx"
import BuyCredit from "./pages/BuyCredit.jsx"
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx"
import Footer from './components/Footer.jsx';
import Login from './components/Login.jsx';
import { AppContext } from './context/AppContext.jsx';
import { ToastContainer} from 'react-toastify';

const App = () => {

  const { showLogin } = useContext(AppContext);

  return (
    <div
      className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>

      <ToastContainer position='bottom-right'/>

      <Navbar />
      {showLogin && <Login />}

      {/* //creates the routes in app only so it mounts page according to the route in which user is */}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/result' element={<Result />} />
        <Route path='/buy' element={<BuyCredit />} />
      </Routes>

      <Footer />



    </div>
  )
}

export default App
