import React, { useEffect, useState } from "react";
import PlaceAutocomplete from "./PlaceAutoComplete";
import SearchSlider from "./SearchSlider";
import Select from 'react-select';
import makeAnimated from 'react-select/animated'
import { getStatuses } from "../../api";


const Searches = ({ address, setAddress, setSearchQuery, setFilters }) => {
    const [ascending, setAscending] = useState(true); // State to track order direction
    const [options, setOptions] = useState([]);

    const toggleOrder = () => {
        setAscending((prevAscending) => !prevAscending);
        setFilters((prevFilters) => ({ ...prevFilters, sortBy: 'adDate', direction: !ascending ? 'ASC' : 'DESC' }))
    };
    const animatecomponent = makeAnimated();

    const getOptions = async () => {
        try {
            const reasult = await getStatuses();
            console.log(reasult)
            const formattedOptions = reasult.map((status) => (
                { value: status.description, label: status.description.toUpperCase() }))
            setOptions(formattedOptions);
        }
        catch (error) {
            alert("oops somthing went wrong...")
        }
    }
    useEffect(() => {
        getOptions();
    }, [])

    const [selectedOption, setSelectedOption] = useState(null);
    const select = (e) => {
        if (e) {
            setFilters((prevFilters) => ({ ...prevFilters, status: e.value }))
        }
        else {
            setFilters((prevFilters) => {
                const newFilters = { ...prevFilters };
                delete newFilters.status;
                return newFilters;
            });
        }
    }


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
                onChange={(e) => select(e)}
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