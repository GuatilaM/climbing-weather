import { FeelsLikeIcon } from "./icons-modules/cw-details-icons";

function FeelsLike({ data }) {
    return (
        <div className="details-component">
            <FeelsLikeIcon />
            <div className="dc-text">
                <h5 className="heading-5">feels like</h5>
                <h3 className="heading-3">
                    {Math.round(data.main.feels_like)}°
                </h3>
            </div>
        </div>
    );
}

export default FeelsLike;