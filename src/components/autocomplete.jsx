import {useState} from "react";
import './autocomplete.css';

function Autocomplete(){

    const [state, setState] = useState({
        activeSuggestion: 0,
        filteredSuggestions: [],
        showSuggestions: false,
        userInput: ''  
    });

    // const handleChange = (event) => {
    //     const uInput = event.target.value;
    //     debounce((uInput) => getCities(uInput));
    //     setState({
    //         ...state,
    //         userInput: uInput
    //     });
    //     console.log(uInput);
    // } 
    // function updateInputValue(event){
    //     setState({
    //         ...state,
    //         userInput: event.target.value
    //     });
    //     getCities(event);
    // }


    const handleChange = debounce((event) => getCities(event));
    // const handleChange = debounce((event) => updateInputValue(event));
    // function handleChange(event) {
    //     debounce(console.log(event));
    //     setState({
    //         ...state,
    //         userInput: event.target.value
    //     });
    // }
    // const suggestions = ['Bogota', 'Cali', 'Buenaventura', 'Medellin', 'Leticia', 'Suesca'];

    function debounce(funct, debounceTime = 600){
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => funct.apply(this, args), debounceTime);
        }; 
    }

    async function getCities(event) {
        const cityInput = event.target.value;
        // const cityInput = event;
        // console.log(cityInput);
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
          const suggestions = await response.json();
          console.log(suggestions);
          const names = suggestions.data.map((cityInfo) => cityInfo.name);
          updateSuggestions(cityInput, names);
        } catch (error) {
          console.error(error);
        }
    }

    function updateSuggestions(input, suggestions){
        // const filtered = suggestions.filter(
        //     suggestion => suggestion.toLowerCase().indexOf(input.toLowerCase()) > -1
        // );
        setState({
            activeSuggestion: 0,
            filteredSuggestions: suggestions,
            showSuggestions: true,
            userInput: input
        })
    }

    function updateInput(event){
        setState({
            activeSuggestion: 0,
            filteredSuggestions: [],
            showSuggestions: false,
            userInput: event.target.value
        });
    }

    function updateActiveSuggestion(event){
        const {activeSuggestion, filteredSuggestions} = state;
        if (event.key === 'Enter'){
            setState({
                activeSuggestion: 0,
                showSuggestions: false,
                userInput: filteredSuggestions[activeSuggestion]
            });
        }

        else if (event.key === 'ArrowUp'){
            if (activeSuggestion === 0){
                return;
            }
            setState({
                ...state,
                activeSuggestion: activeSuggestion - 1
            });
        }

        else if (event.key === 'ArrowDown'){
            if (activeSuggestion + 1 === filteredSuggestions.length){
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
            <label htmlFor="autocomplete-city">City: </label>
            <input 
                id="autocomplete-city"
                type="text" 
                onChange={handleChange}
                onClick={updateInput}
                onKeyDown={updateActiveSuggestion}
                // value={state.userInput}
            />
            <SuggestionsList state={state} />
        </div>
    );
}

function SuggestionsList({state}){
    if (state.showSuggestions && state.userInput){
        if (state.filteredSuggestions.length){
            return (
                <ul>
                    {state.filteredSuggestions.map((suggestion, index) => {
                        let liClass = 'li-inactive';
                        if (index === state.activeSuggestion){
                            liClass = 'li-active';
                        }
                        return(
                            <li key={index} className={liClass}>{suggestion}</li>
                        );
                    })}
                </ul>
            );
        }
    }
}

export default Autocomplete;