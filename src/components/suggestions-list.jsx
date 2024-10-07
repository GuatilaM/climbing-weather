function SuggestionsList({ state, handleClick, handleMouseEnter, handleSuggestionActive }) {
    let isActive;
    if (state.showSuggestions && state.userInput) {
        if (state.filteredSuggestions.length) {
            isActive = true;
            handleSuggestionActive(isActive);
            return (
                <ul className="suggestions-list">
                    {state.filteredSuggestions.map((suggestion, index) => {
                        let liClass = 'sl-inactive';
                        if (index === state.activeSuggestion) {
                            liClass = 'sl-active';
                        }
                        liClass += ' heading-4';  
                        return (
                            <li
                                key={index}
                                id={index}
                                className={liClass}
                                onMouseEnter={handleMouseEnter}
                                onClick={handleClick}
                            >{suggestion.name}</li>
                        );
                    })}
                </ul>
            );
        }
    } else {
        isActive = false;
        handleSuggestionActive(isActive);
    }
}

export default SuggestionsList;