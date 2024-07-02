import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AllEmployee from "./pages/read";
import CreateEmployee from "./pages/create";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/employee" element={<AllEmployee />} />
        <Route path="/create" element={<CreateEmployee />} />
        {/* Add more routes as needed */}
        <Route path="*" element={<Navigate to="/employee" />} />
      </Routes>
    </Router>
  );
}

export default App;
