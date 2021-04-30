import React  from "react";

const Loader = () => {
    return (
        <>
            <div className="loaderReact">
                <div
                    className="spinner-border text-primary"
                    style={{ width: "500px", height: "500px" }}
                    role="status"
                >
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        </>
    );
};

export default Loader;