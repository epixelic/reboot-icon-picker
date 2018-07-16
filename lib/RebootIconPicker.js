import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper  from './components/Wrapper';

const ICON_PICKER_INPUT_SELECTOR = '.behavior-reboot-iconpicker';

class RebootIconPicker {
    constructor(){
        // init icon picker
        let iconPickerInputs = document.querySelectorAll(ICON_PICKER_INPUT_SELECTOR);

        let renderNode = document.createElement('div')
        renderNode.id = 'reboot-icon-picker-container';
        document.body.appendChild(renderNode);

        ReactDOM.render(<Wrapper/>, renderNode);
    }
}

export default RebootIconPicker;