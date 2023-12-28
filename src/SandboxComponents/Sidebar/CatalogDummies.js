import React from "react"

export const ArrayBlock = (props) => {
    return(
        <div style={{height: props.height, width: "100%", background: "linear-gradient(90deg, #00d2ff 0%, #3a47d5 100%)", borderRadius: props.borRad}}>
        </div>
    )
}

export const LinkedListBlock = (props) => {
    return(
        <div style={{height: props.height, width: "100%", background: "linear-gradient(to right, #2657eb, #de6161)", borderRadius: props.borRad}}>
        </div>
    )
}

export const Tree = (props) => {
    return(
        <div style={{height: props.height, width: "100%", background: "linear-gradient(to right, #a8e063, #56ab2f)", borderRadius: props.borRad}}>
        </div>
    )
}


export const Graph = (props) => {
    return(
        <div style={{height: props.height, width: "100%", background: "linear-gradient(90deg, #f5af19, #f12711)", borderRadius: props.borRad}}>
        </div>
    )
}