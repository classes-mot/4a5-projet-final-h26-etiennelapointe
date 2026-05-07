import React from "react";

import "../../Main.css";

const Avatar = (props) => {
    return (
        <div className={`avatar ${props.color}`}>
            <img src={props.image} alt={props.alt}/>
        </div>
    )
}

export default Avatar;