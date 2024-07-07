import React, { useRef, useState, useEffect } from 'react';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';
import { GOOGLE_MAPS_API_KEY } from '../../env';

const libraries = ['places'];
const googleMapsApiKey = GOOGLE_MAPS_API_KEY;


const PlaceAutocomplete = ({ address, setAddress, setFilters }) => {
  const [inputValue, setInputValue] = useState('');

  const searchBoxRef = useRef(null);

  const handlePlaceChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    const place = places[0];
    setAddress(place?.vicinity || ''); 
    if (setFilters) {
      setFilters((prevFilters) => ({ ...prevFilters, area: place?.vicinity || '' }));
    }
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    if (event.target.value === '') { 
      setAddress('');

      setFilters((prevFilters) => {
        const { area, ...rest } = prevFilters; 
        return { ...rest };
      });

    }
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
      <StandaloneSearchBox
        onLoad={(ref) => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter your address"
          style={{
            boxSizing: `border-box`,
            border: `1px solid transparent`,
            width: `240px`,
            height: `32px`,
            padding: `0 12px`,
            borderRadius: `3px`,
            boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
            fontSize: `14px`,
            outline: `none`,
            textOverflow: `ellipses`,
          }}
        />
      </StandaloneSearchBox>
      <div>
        <h5><strong>Selected Area: </strong></h5>{address}
      </div>
    </LoadScript>
  );
};

export default PlaceAutocomplete;