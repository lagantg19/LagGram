import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./scenes/LoginPage/LoginPage.jsx";
import ProfilePage from "./scenes/ProfilePage/ProfilePage.jsx";
import NavBar from "./scenes/NavBar/NavBar.jsx";
import HomePage from "./scenes/HomePage/HomePage.jsx";
import { useMemo } from "react";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { themeSettings } from "./Theme.jsx";

const App = () => {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <CssBaseline/>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile/:userId" element={<ProfilePage />} />
        </Routes>
      </ThemeProvider>
    
    </BrowserRouter>
  );
};

export default App;
