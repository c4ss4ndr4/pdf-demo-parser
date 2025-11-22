import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import JSONUpload from "./JSONUpload";
import Viewer from "./Viewer";

function App() {
  const [data, setData] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<JSONUpload onLoad={setData} />} />
      <Route path="/viewer" element={<Viewer data={data} />} />
    </Routes>
  );
}

export default App;
