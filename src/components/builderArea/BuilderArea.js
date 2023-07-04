import React, {useRef} from 'react'
import Draggable from "react-draggable";
import DraggableContent from '../draggleContentHipotesis';
import styles from './style.module.css'

export const BuilderArea = ({ activeDraggableTools, setActiveDraggableTools, disabled, setDisabled}) => {
const nodeRef = useRef(null);
  return (
    <div className={styles.builderArea}>
      {/* <DraggleContentLine /> */}

        <DraggableContent />
        {/* <Draggable
            defaultPosition={{x: 551, y: -225}}
            // nodeRef={nodeRef}
            grid={[1, 1]}
            scale={1}
        > */}
         <div
            id="end1"
            className="handle"
            style={{
              padding: "10px",
              width: '25%',
              height: '95%',
              position: 'relative',
              top: '6%',
              left: '37%',
              }} 
          >

            <img
              className="cancel"
              alt="noimaege"
              src="/img/Einstein.png"
              width="90%"
            />
          </div>  
        {/* </Draggable>   */}
    </div>
  )
}
