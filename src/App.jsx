import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import EditorPage from "./pages/EditorPage";
import Home from "./pages/Home";
import "./App.css";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <div>
        <Toaster
          position="center-top"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed88",
              },
            },
          }}
        ></Toaster>
      </div>

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/editor/:roomId" element={<EditorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
