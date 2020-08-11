import React, { useEffect } from "react";
import "./styles/base/overall.scss";
import GameContainer from "./components/GameContainer/GameContainer.component";
import Nokia from "./components/Nokia/Nokia.component";

function App() {
  return (
    <div className="App">
      <Nokia />
    </div>
  );
}

export default App;
