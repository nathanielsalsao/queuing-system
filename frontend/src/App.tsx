import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import JoinQueue from "./components/JoinQueue";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<Login />} />

        {/* Queue Page (protected or main app) */}
        <Route path="/queue" element={<JoinQueue />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;