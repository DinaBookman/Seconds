import React ,{useEffect, useState}from "react";
import PlaceAutocomplete from "./PlaceAutoComplete";
import SearchSlider from "./SearchSlider";
import Select from 'react-select';
import makeAnimated from 'react-select/animated'


const Searches = ({ address, setAddress, setSearchQuery, setFilters }) => {
    const [ascending, setAscending] = useState(true); // State to track order direction

    const toggleOrder = () => {
        setAscending((prevAscending) => !prevAscending);
        setFilters((prevFilters)=>({...prevFilters,sortBy:'adDate',direction:!ascending?'ASC':'DESC'}))
    };
    const animatecomponent = makeAnimated();
    const options = [
        { value: 'bad', label: 'Bad' },
        { value: 'not bad', label: 'Not Bad' },
        { value: 'good', label: 'Good' },
        { value: 'great', label: 'Great' },
        { value: 'new', label: 'New' }
    ];

    const [selectedOption, setSelectedOption] = useState(null);
    const select = (e) => {
        if(e){
        setFilters((prevFilters)=>({...prevFilters,state:e.value}))
        }
    else{
        setFilters((prevFilters) => {
            const newFilters = { ...prevFilters };
            delete newFilters.state;
            return newFilters;
        });
    }
    }
    // useEffect(()=>{
    //     // const selected = selectedOption.map
    //     setFilters((prevFilters)=>({...prevFilters,state:selectedOption?.map((option)=>option.value)}))

    //     console.log(selectedOption)
    // },[selectedOption])

    return <>
        <div className="searches">
            <PlaceAutocomplete address={address} setAddress={setAddress} setFilters={setFilters} />
            <SearchSlider setSearchQuery={setSearchQuery} setFilters={setFilters} />
            <Select
                defaultValue={selectedOption}
                autoFocus
                menuPlacement="auto"
                menuPosition="fixed"
                // placeholder='Search by product status...'
                components={animatecomponent}
                isSearchable={true}
                isClearable
                onChange={(e)=>select(e)}
                options={options}
                getOptionLabel={(options) => options["label"]}
                getOptionValue={(options) => options["value"]}
            />
            <div>
            <button onClick={toggleOrder}>
                {ascending ? 'New to Old' : 'Old to New'}
            </button>
        </div>
        </div>
    </>
}
export default Searches;