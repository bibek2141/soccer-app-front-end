import AppRoutes from "./components/AppRoutes";
import React, { useState, useEffect } from "react";
import logo from "./assets/loading.gif";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, []);
  return (
    <>
      {loading === false ? (
        <AppRoutes />
      ) : (
        <div
          className="bg-white text-center loading container"
          style={{ width: 400 }}
        >
          <img src={logo} alt="loading..." />
        </div>
      )}
    </>
  );
}

export default App;
