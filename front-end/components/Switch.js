// Components/Switch.js

import { useState } from "react";
import "./Switch.scss";

const Switch = props => {

    const [check, setCheck] = useState(props.value);
    const [itemKey, setItemKey] = useState(props.itemKey);

    return (
        <label className="switch">
            <input type="checkbox" checked={check} 
                onChange={(e) => {
                    setCheck(!check); 
                    setItemKey(itemKey);
                    props.handleSwitch(!check, itemKey);
                }} />
            <span className="slider round"></span>
        </label>
    )
}

export default Switch;