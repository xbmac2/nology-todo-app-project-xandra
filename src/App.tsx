// import { useEffect, useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import { ToastContainer, Slide } from "react-toastify";
import "./App.scss";
import "react-toastify/dist/ReactToastify.css";

import AppWrapper from "./containers/AppWrapper/AppWrapper";
import EditModeContextProvider from "./context/EditModeContextProvider";

function App() {
  return (
    <>
      {/* <TasksPage /> */}
      <EditModeContextProvider>
        <AppWrapper />
        <ToastContainer
          position="bottom-center"
          autoClose={4000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Slide}
        />
      </EditModeContextProvider>
    </>
  );
}

export default App;
