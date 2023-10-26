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