
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './index.css';

const NaviButton = ( props:
    { position: string, fwd?: string, bwd: string } ) => {
    let history = useHistory();
    
    const [hideNextButton, setHideNextButton] = React.useState(false);

    useEffect(() => {
        if (document.URL.indexOf('descartes-q') > 0 ||
            document.URL.indexOf('einstein-q') > 0 ||
            document.URL.indexOf('tharp-q') > 0 ||
            document.URL.indexOf('clodomiro') > 0 ) {
            setHideNextButton(true);
        }
    }, []);

    if (props.position == "left") {
        return <div className='navi-button left' onClick={() => history.push('/' + props.bwd)}></div>;
    }
    return !hideNextButton ? <div className='navi-button right' onClick={() => history.push('/' + props.fwd)}></div> : null;
};

export default NaviButton;