/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-undef */
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";

export default function () {

return(
    <Draggable
            handle=".handle"
            grid={[1, 1]}
            scale={1}
            cancel=".cancel"
        >
            <div
            id="start1"
            className="handle"
            style={{
                padding: '10px',
                // marginRight: '10%',
                border: '1px solid rgb(66 63 63)',
                width: '42%',
                height: '10%',
                color: 'rgb(66 63 63)',
                position: 'relative',
                left: '45%'
               }}
          >
            <div className="drag">Teoria</div>
          </div>
        </Draggable>
)
    
}