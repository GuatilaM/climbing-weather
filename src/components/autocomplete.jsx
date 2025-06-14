import { useCallback, useEffect, useState } from "react";
import './autocomplete.css';
import TextInput from "./text-input";
import SuggestionsList from "./suggestions-list"

function Autocomplete({ onSelected }) {

    const [state, setState] = useState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: '',
        debouncedInput: ''
    });

    const [selected, setSelected] = useState(false);

    function updateUserInput(event) {
        setState({
            ...state,
            userInput: event.target.value
        });
        setSelected(false);
    }

    // Debounce user input change
    useEffect(() => {
        const timeout = setTimeout(() => {
            setState({
                ...state,
                debouncedInput: state.userInput
            });
        }, 600);
        return () => clearTimeout(timeout);
    }, [state, state.userInput]);

    const getCities = useCallback(async () => {
        const cityInput = state.debouncedInput;
        if (cityInput === ''){
            setState({
                ...state,
                activeSuggestion: 0,
                filteredSuggestions: [],
                showSuggestions: false,
            });
            return;
        }

        const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityInput}&sort=-population&minPopulation=1000`;
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '',
                'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
            }
        };

        try {
            const response = await fetch(url, options);
            if (!response.ok){
                throw new Error('Too many calls to API');
            }
            const suggestions = await response.json();
            console.log(suggestions);
            // const names = suggestions.data.map((cityInfo) => cityInfo.name);
            const names = suggestions.data.map((cityInfo) => {
                return ({
                    name: cityInfo.name,
                    latitude: cityInfo.latitude,
                    longitude: cityInfo.longitude
                });
            });
            //   updateSuggestions(cityInput, names);
            setState({
                ...state,
                activeSuggestion: 0,
                filteredSuggestions: names,
                showSuggestions: true
            });
        } catch (error) {
            console.error('Something went wrong...', error);
        }
    }, [state]);

    // Make calls to GeoDB API on debounced input change
    useEffect(() => {
        if (selected){
            console.log(state.filteredSuggestions);
            return;
        }
        getCities();
    }, [state.debouncedInput]);

    function updateInput(event) {
        const suggestions = state.filteredSuggestions;
        let clickedSuggestion;

        for (let city in suggestions){
            if (suggestions[city].name === event.target.innerHTML){
                clickedSuggestion = suggestions[city];
            } 
        }
        setState({
            ...state,
            activeSuggestion: 0,
            filteredSuggestions: clickedSuggestion,
            showSuggestions: false,
            userInput: event.target.innerHTML
        });
        setSelected(true);
        onSelected(clickedSuggestion);
    }

    function updateActiveSuggestion(event) {
        const { activeSuggestion, filteredSuggestions } = state;
        if (event.key === 'Enter') {
            setState({
                ...state,
                activeSuggestion: 0,
                filteredSuggestions: filteredSuggestions[activeSuggestion],
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion].name
            });
            setSelected(true);
            onSelected(filteredSuggestions[activeSuggestion]);
        }

        else if (event.key === 'ArrowUp') {
            if (activeSuggestion === 0) {
                return;
            }
            setState({
                ...state,
                activeSuggestion: activeSuggestion - 1
            });
        }

        else if (event.key === 'ArrowDown') {
            if (activeSuggestion + 1 === filteredSuggestions.length) {
                return;
            }
            setState({
                ...state,
                activeSuggestion: activeSuggestion + 1
            });
        }
    }

    return (
        <div>
            <TextInput
                handleChange={updateUserInput}
                handleKeyDown={updateActiveSuggestion}
                inputVal={state.userInput}
            />
            <SuggestionsList state={state} handleClick={updateInput} />
        </div>
    );
}

export default Autocomplete;