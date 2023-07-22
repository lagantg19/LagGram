import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./scenes/LoginPage/LoginPage.jsx";
import ProfilePage from "./scenes/ProfilePage/ProfilePage.jsx";
import NavBar from "./scenes/NavBar/NavBar.jsx";
import HomePage from "./scenes/HomePage/HomePage.jsx";
import Register from "./scenes/LoginPage/Register.jsx";
import { useSelector } from "react-redux";
import Test from "./scenes/HomePage/Test.jsx";



const App = () => {
  const user=useSelector((state)=>state.user);
  return (
    
      <BrowserRouter>
        <NavBar />
        <Routes>
         {!user && <Route path="/" element={<LoginPage />} />}
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path='/test' element={<Test/>}/>
        </Routes>
      </BrowserRouter>
    
  );
};

export default App;
