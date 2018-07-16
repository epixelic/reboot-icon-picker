import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper  from './components/Wrapper';

class RebootIconPicker {
    constructor(apiUrl, selector){
        let renderNode = document.createElement('div')
        renderNode.id = 'reboot-icon-picker-container';
        document.body.appendChild(renderNode);

        ReactDOM.render(<Wrapper apiUrl={apiUrl} selector={selector}/>, renderNode);
    }
}

export default RebootIconPicker;