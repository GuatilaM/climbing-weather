import { CloudinessIcon } from "./icons-modules/cw-details-icons";

function Cloudiness({ data }) {
    return (
        <div className="details-component">
            <CloudinessIcon />
            <div className="dc-text">
                <h5 className="heading-5">cloudiness</h5>
                <h3 className="heading-3">
                    {Math.round(data.clouds.all)}%
                </h3>
            </div>
        </div>
    );
}

export default Cloudiness;