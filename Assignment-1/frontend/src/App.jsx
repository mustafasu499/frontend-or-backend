import { Route, Routes } from "react-router-dom";
import SignUp from "./From/SignUp";
import Login from "./From/Login";
import Home from "./From/Home";

function App() {
  return (
    <>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/sign-Up" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
