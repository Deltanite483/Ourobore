import React, { useEffect, useRef } from "react";
import './background.css'

export const Initialise = (props) => {
    const backgroundref = useRef();

    useEffect(()=>{
        if(backgroundref.current.clientWidth > 10){
            props.GreenSignal()
        }
    }, [backgroundref])

    return(
        <div id = "background" className="background" ref={backgroundref}>
        </div>
    )
}