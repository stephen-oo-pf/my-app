// File: views/D3Chart.jsx
// Date: 06/02/2020
// Note: Event Resonse Drill Chart Prototypes
//..............................................................................
import React, { useState, useEffect } from "react";
import * as d3 from "d3";

import UICircleChart from "../../ui/UICircleChart";

// import PieClass from "../../components/MyD3/PieClass";
// import PieHooks from "../../components/MyD3/PieHooks";
// import PieSVG from "../../components/MyD3/PieSVG";
// import AnimatedPieHooks from "../../components/MyD3/AnimatedPieHooks";
// import AnimatedPieSVG from "../../components/MyD3/AnimatedPieSVG";

function D3Chart() {
  const generateData = (value, length = 5) =>
    d3.range(length).map((item, index) => ({
      date: index,
      value: value === null || value === undefined ? Math.random() * 100 : value
    }));

  const [data, setData] = useState(generateData(0));
  const changeData = () => {
    setData(generateData());
  };

  useEffect(
    () => {
      setData(generateData());
    },
    [!data]
  );

  return (
    <div className="my-d3">
      <div>
        <button onClick={changeData}>Transform</button>
      </div>
      {/*         
      <div>
        <span className="label">Animated Pie SVG (React Spring)</span>
        <AnimatedPieSVG
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div>

      <div>
        <span className="label">Animated Pie Hooks (D3 animations)</span>
        <AnimatedPieHooks
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div>

      <div>
        <span className="label">SVG Elements</span>
        <PieSVG
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div>
      <div>   
        <span className="label">Hooks</span>
        <PieHooks
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      </div>

      <div>
        <span className="label">React Class</span>
        <PieClass
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
        */}
        <div>
          <span className="label">ReactJSX with D3.js Class Component</span>
        <UICircleChart
          data={data}
          width={200}
          height={200}
          innerRadius={60}
          outerRadius={100}
        />
      
        
      </div>
    </div>
  );
}

export default D3Chart;

// eof
