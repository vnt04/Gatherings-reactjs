import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./layouts/Headers";
import Profile from "./components/Profile";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;
