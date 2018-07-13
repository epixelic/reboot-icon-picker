import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper  from './components/Wrapper';

const ICON_PICKER_INPUT_SELECTOR = '.behavior-reboot-iconpicker';

class RebootIconPicker {
    constructor(){
        // init icon picker
        console.log('icon picker init');
        let iconPickerInputs = document.querySelectorAll(ICON_PICKER_INPUT_SELECTOR);
        iconPickerInputs.forEach(iconPickerInput => {
            console.log(iconPickerInput);
        });

        let renderNode = document.createElement('div')
        renderNode.id = 'reboot-icon-picker-modal';
        document.body.appendChild(renderNode);
        //renderNode.style.display = 'none';

        const popoverProps = {
            appendTarget: document.body,
            body: [
              <h1 key="a">Popover Title</h1>,
              <div key="b">Popover contents</div>,
            ],
          }
        
        ReactDOM.render((
            <Wrapper/>
        ), renderNode, () => {
            console.log('render done');
        });
    }
}

export default RebootIconPicker;