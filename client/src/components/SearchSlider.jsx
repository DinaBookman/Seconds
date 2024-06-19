import React, { useState } from 'react';
import 'antd/dist/reset.css';
import { Slider } from 'antd';

const SearchSlider = ({setSearchQuery}) => {
  const [range, setRange] = useState([1, 10000]);

  const onChange = (value) => {
    setRange(value);
  };
  return (
    <div style={{ padding: '50px' }}>
      <h2>Range Slider Example</h2>
      <div
        onMouseUp={()=> {setSearchQuery(`priceMin=${range[0]}&priceMax=${range[1]}`)}}
        onTouchMove={()=> {setSearchQuery(`priceMin=${range[0]}&priceMax=${range[1]}`)}}
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
