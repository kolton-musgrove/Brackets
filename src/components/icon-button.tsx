import React from "react";

export function IconButton(props: any){
    return(
        <button className="" onClick={props.link}>
            {props.icon}
        </button>
    )
}