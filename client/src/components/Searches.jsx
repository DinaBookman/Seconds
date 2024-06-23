import React from "react";
import PlaceAutocomplete from "./PlaceAutoComplete";
import SearchSlider from "./SearchSlider";


const Searches = ({address,setAddress,setSearchQuery}) => {

    return <>
    <div className="searches">
    <PlaceAutocomplete address={address} setAddress={setAddress}/>
    <SearchSlider setSearchQuery={setSearchQuery}/>
    </div>
    </>
}
export default Searches;