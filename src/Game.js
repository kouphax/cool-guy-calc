import * as React from "react";
import { Link, Route, Routes } from "react-router-dom";
import { App as Sums } from "./App";
import { LandingPage } from "./LandingPage";

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/times/:numbers" element={<Sums />} />
        <Route path="/times/:numbers/:count" element={<Sums />} />
      </Routes>
    </div>
  );
}

export default App;
