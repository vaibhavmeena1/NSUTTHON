import { useState } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import {NavigationBar } from "./components/navigation-bar";
import { AlertDialogDemo } from "./components/AlertDialogDemo";
import SignUp from "./pages/signup";
// import HomePage from "./pages/homePage";

function App() {
  return (
    // <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    //         <ModeToggle />
      <Router>
              <NavigationBar />

        <Routes>

          <Route path="/signup" element={<SignUp />} />
          {/* <Route path="/" element={<HomePage />} /> */}
        </Routes>

      </Router>
    // </ThemeProvider>
    );
}

export default App;
