import { useCallback, useEffect, useState } from "react";
import './autocomplete.css';

// Test fetch code
// async function getEggs() {
//     try {
//         const response = await fetch('https://reqres.in/api/users');
//         const eggs = await response.json();
//         console.log(eggs);
//     } catch (error) {
//         console.error();
//     }
// }
// getEggs();
// function debounce(funct, debounceTime = 600) {
//         let timer;
//         return (...args) => {
//             clearTimeout(timer);
//             timer = setTimeout(() => funct.apply(this, args), debounceTime);
//         };
//     }

function Autocomplete({ onSelected }) {

    const [state, setState] = useState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: '',
        debouncedInput: ''
    });

    const [selected, setSelected] = useState(false);

    // const suggestions = ['Bogota', 'Cali', 'Buenaventura', 'Medellin', 'Leticia', 'Suesca'];

    // const handleChange = debounce((event) => getCities(event));

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
                'X-RapidAPI-Key': 'b41b6ed316msh1f1ef6714b5d239p14e412jsn027b91fe2679',
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

    // async function getCities(event) {
    //     const cityInput = event.target.value;
    //     // const cityInput = event;
    //     // console.log(cityInput);
    //     const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${cityInput}&sort=-population&minPopulation=1000`;
    //     const options = {
    //         method: 'GET',
    //         headers: {
    //             'X-RapidAPI-Key': 'b41b6ed316msh1f1ef6714b5d239p14e412jsn027b91fe2679',
    //             'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    //         }
    //     };

    //     try {
    //         const response = await fetch(url, options);
    //         const suggestions = await response.json();
    //         console.log(suggestions);
    //         const names = suggestions.data.map((cityInfo) => cityInfo.name);
    //         updateSuggestions(cityInput, names);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // }

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

function TextInput({ handleChange, handleKeyDown, inputVal }) {
    return (
        <div>
            <label htmlFor="autocomplete-city">City: </label>
            <input
                id="autocomplete-city"
                type="text"
                autoComplete="false"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={inputVal}
            />
        </div>
    );
}

function SuggestionsList({ state, handleClick }) {
    if (state.showSuggestions && state.userInput) {
        if (state.filteredSuggestions.length) {
            return (
                <ul>
                    {state.filteredSuggestions.map((suggestion, index) => {
                        let liClass = 'li-inactive';
                        if (index === state.activeSuggestion) {
                            liClass = 'li-active';
                        }
                        // return (
                        //     <li key={index} className={liClass} onClick={handleClick}>{suggestion}</li>
                        // );
                        return (
                            <li 
                                key={index} 
                                className={liClass}
                                onClick={handleClick}
                            >{suggestion.name}</li>
                        );
                    })}
                </ul>
            );
        }
    }
}

export default Autocomplete;