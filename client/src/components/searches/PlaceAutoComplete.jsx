import React, { useRef, useState, useEffect } from 'react';
import { LoadScript, StandaloneSearchBox } from '@react-google-maps/api';

const libraries = ['places'];
const googleMapsApiKey = 'AIzaSyC-zv83AST4XvhbahDnbXnCb--dYpaIxV0'; // Replace with your API key

const PlaceAutocomplete = ({ address, setAddress, setFilters }) => {
  // const [address, setAddress] = useState('');
  const searchBoxRef = useRef(null);

  const handlePlaceChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    //if (places.length === 0) return;

    const place = places[0];
    setAddress(place.vicinity);
    setAddress(place.vicinity);
    if (setFilters)
      setFilters((prevFilters) => ({ ...prevFilters, area: place.vicinity }))
    console.log(place); // Handle the place details as needed
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
      <StandaloneSearchBox
        onLoad={ref => (searchBoxRef.current = ref)}
        onPlacesChanged={handlePlaceChanged}
      >
        <input
          type="text"
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
        <strong>Selected Address: </strong>{address}
      </div>
    </LoadScript>
  );
};

export default PlaceAutocomplete;
