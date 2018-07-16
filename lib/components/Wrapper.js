import React from 'react';
import ReactDOM from 'react-dom';
import Popover  from 'react-simple-popover';
import Picker from './Picker';

const ICON_PICKER_INPUT_SELECTOR = '.behavior-reboot-iconpicker';
const API_URI = '/admin/iconpacklist';

class Wrapper extends React.Component {
    constructor(){
        super();
        this.state = {
            popoverOpen: false,
            currentTarget: null,
            packs: [],
            selectedPackSlug: null,
            selectedIconClass: null
        }

        this.onIconSelect = this.onIconSelect.bind(this);
    }

    componentDidMount(){
        let iconPickerInputs = document.querySelectorAll(ICON_PICKER_INPUT_SELECTOR);

        // open popover when click on input
        iconPickerInputs.forEach(iconPickerInput => {
            //iconPickerInput.style.visibility = 'hidden';
            iconPickerInput.addEventListener('click', (event) => {
                let newState = {
                    popoverOpen: true,
                    currentTarget: event.target
                };

                if(event.target.value){
                    try{
                        let decodedValue = JSON.parse(event.target.value);
                        if(decodedValue.pack && decodedValue.icon){
                            newState.selectedPackSlug = decodedValue.pack;
                            newState.selectedIconClass = decodedValue.icon;
                        }
                    }catch(e){

                    }
                }

                this.setState(newState);
            });
        });

        // close popover when click outside popover and input
        window.addEventListener('click', (event) => {
            if(!this.state.popoverOpen){
                return false;
            }
        
            let popoverNode = ReactDOM.findDOMNode(this);
            if (!this.state.currentTarget.contains(event.target) && !popoverNode.contains(event.target)) {
                if (this.isVisible(this.state.currentTarget) && this.isVisible(popoverNode)) {
                    this.setState({
                        popoverOpen: false,
                        currentTarget: null
                    });
                }
            }
        });
        
        // get icon list from API
        fetch(API_URI)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            this.setState({
                packs: data
            });
        });
    }

    isVisible(element){
        return(!!element && !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length));
    }

    onIconSelect(icon, pack){
        this.state.currentTarget.value = JSON.stringify({
            pack: pack.slug,
            icon: icon.class
        });

        this.setState({
            selectedPackSlug: pack.slug,
            selectedIconClass: icon.class
        });
    }

    render(){
        return (
            <Popover
                placement='right'
                container={document.body}
                show={this.state.popoverOpen}
                target={this.state.currentTarget}
                style={{
                    borderRadius: 4,
                    width: 300
                }}
                >
                <Picker 
                    packs={this.state.packs} 
                    onIconSelect={this.onIconSelect}
                    selectedPackSlug={this.state.selectedPackSlug}
                    selectedIconClass={this.state.selectedIconClass}
                />
            </Popover>
        );
    }
}

export default Wrapper;