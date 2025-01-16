import React from "react";

const Bar = ({ height, color }) => {
    return (
        <div className={`w-2 ${color}`} style={{ height: `${height}%` }}></div>
    );
};

export default Bar;
