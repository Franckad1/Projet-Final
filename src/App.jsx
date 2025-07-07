import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/auth/login";
// import Register from "./components/auth/register";
import Header from "./components/header";
import Home from "./components/home";
import Form from "./components/home/Form";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index path="/" element={<Login />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/Form/:id" element={<Form />}></Route>
        {/* <Route path="/register" element={<Register />}></Route> */}
      </Routes>
    </>
  );
}

export default App;
