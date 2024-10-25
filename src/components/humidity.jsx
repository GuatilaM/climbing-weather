import { HumidityIcon } from "./icons-modules/cw-details-icons";

function Humidity({ data }) {
    return (
        <div className="details-component">
            <HumidityIcon />
            <div className="dc-text">
                <h5 className="heading-5">humidity</h5>
                <h3 className="heading-3">
                    {Math.round(data.main.humidity)}%
                </h3>
            </div>
        </div>
    );
}

export default Humidity;