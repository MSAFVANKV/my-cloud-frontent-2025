import { Outlet } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import SideBar from "./components/navbar/SideBar";
import GridView from "./components/navbar/gridView";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 overflow-hidden h-full">
        <SideBar />
       <div className="flex flex-col w-full p-10">
       <GridView />
       <Outlet />
       </div>
      </div>
    </div>
  );
}

export default App;
