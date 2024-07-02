import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AllEmployee from "./pages/read";
import CreateEmployee from "./pages/create";
import UpdateEmployee from "./pages/update";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/employee" element={<AllEmployee />} />
        <Route path="/create" element={<CreateEmployee />} />
        <Route path="/update/:id" element={<UpdateEmployee />} />
       
      </Routes>
    </Router>
  );
}

export default App;
