function TextInput({ handleChange, handleKeyDown, inputVal }) {
    return (
        <div>
            <label htmlFor="autocomplete-city">City: </label>
            <input
                id="autocomplete-city"
                type="text"
                autoComplete="off"
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                value={inputVal}
            />
        </div>
    );
}

export default TextInput;