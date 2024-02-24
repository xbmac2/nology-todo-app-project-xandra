import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.scss";
import TasksPage from "./pages/TasksPage/TasksPage";
import AppWrapper from "./containers/AppWrapper/AppWrapper";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {/* <TasksPage /> */}
      <AppWrapper />
    </>
  );
}

export default App;
