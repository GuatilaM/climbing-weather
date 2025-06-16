function LocationInput({ handleChange }) {
    return (
        <div hidden={true}>
            <label htmlFor="i-lat">Latitude: </label>
            <input
                id='i-lat'
                type="text"
                name='latitude'
                onChange={(event) => handleChange(event, 'latitude')}
            />
            <label htmlFor="i-lon">Longitude: </label>
            <input
                id='i-lon'
                type="text"
                name='longitude'
                onChange={(event) => handleChange(event, 'longitude')}
            />
        </div>
    );
}

export default LocationInput;