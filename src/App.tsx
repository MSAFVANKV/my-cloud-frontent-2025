import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/navbar/SideBar";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden h-full">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default App;
