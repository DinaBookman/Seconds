import React, { useState } from 'react';
import 'antd/dist/reset.css';
import { Slider } from 'antd';

const SearchSlider = ({setFilters}) => {
  const [range, setRange] = useState([1, 10000]);

  const onChange = (value) => {
    setRange(value);
  };
  return (
    <div style={{ padding: '50px' }}>
      <h5>select price range</h5>
      <div
        onMouseUp={()=> {setFilters((prevFilters)=>({...prevFilters,priceMin:range[0],priceMax:range[1]}))}}
        onTouchEnd={()=> {setFilters((prevFilters)=>({...prevFilters,priceMin:range[0],priceMax:range[1]}))}}
      >
      <Slider
        range
        value={range}
        onChange={onChange}
        min={0}
        max={10000}
      />
      </div>
      <div>
        Selected Range: {range[0]} - {range[1]}
      </div>
    </div>
  );
};

export default SearchSlider;
