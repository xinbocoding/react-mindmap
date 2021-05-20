import React, { useState } from "react";
import "./style/tree.css";
import CustomInput from "./components/CustomInput";
// import MindMap from "./components/MinMap";
import Tree from "react-tree-graph";
import { parseData } from "./utils/tools";

const App = () => {
  const [treeData, setTreeData] = useState({});

  const setNodeData = (data) => {
    console.log(data);
    let convertData = parseData(data);
    setTreeData(convertData);
  };

  return (
    <div>
      <nav className="navbar navbar-light bg-light">
        <div className="container">
          <span className="navbar-brand mb-0 h1" style={{color: '#80a8a0'}}>Mind Map</span>
        </div>
      </nav>
      <div className="container mt-3 mb-3">
        <div className="row">
          <div className="col-sm-12 col-xs-12 col-md-4 rounded-start">
            <CustomInput setNode={setNodeData} />
          </div>
          <div className="col-sm-12 col-xs-12 col-md-8 border rounded-end tree-container overflow-auto">
            {treeData.name && (
              <div className="custom-container">
                <Tree
                  data={treeData}
                  height={700}
                  width={800}
                  svgProps={{ className: "custom" }}
                />
              </div>
            )}
            {/* <MindMap getTreeData={treeData}/> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
