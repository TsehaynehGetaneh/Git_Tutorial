import {useState} from "react";
import "./App.css";
import Header from "./components/Header";
import Tree from "./components/Tree";

function App() {
  const [zoomPercentage, setZoomPercentage] = useState(100);
  return (
    <div>
      <Header zoomPercentage={zoomPercentage} setZoomPercentage={setZoomPercentage} />
      <Tree zoomPercentage={zoomPercentage} />
    </div>
  );
}

export default App;
