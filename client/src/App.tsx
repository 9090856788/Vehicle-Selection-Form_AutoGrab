import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import VehicleForm from "./components/VehicleForm";
import UploadPage from "./components/UploadPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<VehicleForm />} />
        <Route path="/upload" element={<UploadPage />} />
      </Routes>
    </Router>
  );
};

export default App;
