import "./App.css";
import { Routes, Route } from "react-router-dom";
import Navigationpage from "./vendorDashboard/pages/navigationpage";
import PageNotFound from "./vendorDashboard/components/pageNotFound";
import { createContext, useState } from "react";
export const data = createContext();

const App = () => {
  const [isSidemenuopen, setsidemenu] = useState(false);

  return (
    <>
      <data.Provider
        value={{
          isSidemenuopen,
          setsidemenu,
        }}
      >
        <Routes>
          <Route path="/" Component={Navigationpage} />
          <Route path="/*" Component={PageNotFound} />
        </Routes>
      </data.Provider>
    </>
  );
};

export default App;
