import { WindSpeedIcon } from "./icons-modules/cw-details-icons";

function WindSpeed({ data }) {
    return (
        <div className="details-component">
            <WindSpeedIcon />
            <div className="dc-text">
                <h5 className="heading-5">wind speed</h5>
                <h3 className="heading-3">
                    {Math.round(data.wind.speed)}km/h
                </h3>
            </div>         
        </div>
    );
}

export default WindSpeed;