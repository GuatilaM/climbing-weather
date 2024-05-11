function Welcome ({ hide }) {
    return (
        <div>
            {hide ? (
                <></>
            ) : (
                <div className="welcome-text" hidden={hide}  >
                    <h1 className="heading-1-medium">Welcome to <span>Climbing Weather</span></h1>
                    <h4 className="heading-4">Figure out how the weather is going to be at your climbing spot and get a rating on it</h4>
                </div>
            )}
        </div>
    );
}

export default Welcome;