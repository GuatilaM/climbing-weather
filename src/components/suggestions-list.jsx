function SuggestionsList({ state, handleClick }) {
    if (state.showSuggestions && state.userInput) {
        if (state.filteredSuggestions.length) {
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

export default SuggestionsList;