import React from "react";
import "./App.css";
const App: React.FC = () => {
  console.log(
    "==http:NODE_ENV,",
    process.env.NODE_ENV,
    process.env.REACT_APP_BASEURL,
    process.env.REACT_APP_ENV
  );

  return <h2>你好，蒙面大婶</h2>;
};
export default App;
