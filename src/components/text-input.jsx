function TextInput({ 
    handleChange, 
    handleKeyDown,  
    inputVal, 
    state 
}) {
    // Check if SuggestionsList is active (same method as in the component)
    let divClass = 'searchbar';
    if (state.showSuggestions && state.userInput) {
        if (state.filteredSuggestions.length) {
            divClass = 'searchbar-sl';
        }
    }
    return (
        <div className={divClass}>
            <label htmlFor="autocomplete-city" hidden={true}>City: </label>
            <svg width={24} height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11 19.5C15.4183 19.5 19 15.9183 19 11.5C19 7.08172 15.4183 3.5 11 3.5C6.58172 3.5 3 7.08172 3 11.5C3 15.9183 6.58172 19.5 11 19.5Z" stroke="#525875" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                <path 
                    d="M21 21.5L16.65 17.15" stroke="#525875" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
                className="heading-4"
                placeholder="Search City"
                id="autocomplete-city"
                type="text"
                autoComplete="off"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={inputVal}
                autoFocus={true}
            />
        </div>
    );
}

export default TextInput;