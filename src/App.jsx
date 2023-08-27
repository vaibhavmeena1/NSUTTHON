import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import { NavigationBar } from "./components/navigation-bar";
import { AlertDialogDemo } from "./components/AlertDialogDemo";
// import SignUp from "./pages/signup";
// import Profile from "./pages/profile";
// import LoginPage from "./pages/login";
// import HomePage from "./pages/homePage";
import { Toaster } from "./components/ui/toaster"
import { AuthProvider } from "./components/auth/auth";
import { RequireAuth } from "./components/auth/RequireAuth";
import Leaderboard from "./pages/leaderboard";
import { Events } from "./pages/events";
import Teamregister from "./pages/teamregister";
import AdminLogin from "./pages/adminLogin";
import AdminPanel from "./pages/adminPanel";
function App() {
  return (

    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <Router>
          <Toaster />
          <NavigationBar />
          <Routes>


          {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/events" element={<Events />} />
            <Route path="/leaderboard" element={ <Leaderboard />} />
            <Route path="/register" element={<Teamregister/> }/>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<RequireAuth>  <AdminPanel />  </RequireAuth>} />
            {/* <Route path="/login" element={<LoginPage />} /> */}
            {/* <Route path="/profile" element={<RequireAuth>  <Profile />  </RequireAuth>} />
            <Route path="/signup" element={<SignUp />} /> */}
           
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
