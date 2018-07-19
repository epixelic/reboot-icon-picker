import React from 'react';
import ReactDOM from 'react-dom';
import RebootIconPicker from '../RebootIconPicker';
import Popover  from './Popover';
import Picker from './Picker';
import DropdownButton from '../DropdownButton';
import IconList from './IconList';
import similarity  from 'similarity';

let mountedIconPickerInputs = [];

class Wrapper extends React.Component {
    constructor(){
        super();
        this.state = {
            popoverOpen: false,
            openButtonTarget: null,
            inputTarget: null,
            buttonTarget: null,
            icons: null,
            selectedIcon: null,
            hoveredIcon: null,
            search: '',
            page: 0
        };

        this.onIconSelect = this.onIconSelect.bind(this);
        this.onInputSearch = this.onInputSearch.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.onIconHover = this.onIconHover.bind(this);
        this.onIconHoverLeft = this.onIconHoverLeft.bind(this);
        this.mountUnmountedIconPickerInputs = this.mountUnmountedIconPickerInputs.bind(this);
        this.refreshIconPickerInputs = this.refreshIconPickerInputs.bind(this);

        RebootIconPicker.refreshIconPickerInputs = this.refreshIconPickerInputs;
    }

    componentDidMount(){
        let iconPickerList = this.mountUnmountedIconPickerInputs();

        // close popover when click outside popover and input
        window.addEventListener('click', (event) => {
            if(!this.state.popoverOpen){
                return false;
            }

            let popoverNode = ReactDOM.findDOMNode(this);
            if (!this.state.openButtonTarget.contains(event.target) && !popoverNode.contains(event.target)) {
                if (Wrapper.isVisible(this.state.openButtonTarget) && Wrapper.isVisible(popoverNode) && Wrapper.isVisible(event.target)) {
                    this.setState({
                        popoverOpen: false,
                        openButtonTarget: null,
                        inputTarget: null,
                        buttonTarget: null,
                        selectedIcon: null,
                        hoveredIcon: null,
                        search: '',
                    });
                }
            }
        });

        // get icon list from API
        fetch(this.props.apiUrl, {credentials: 'same-origin'})
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            let icons = data.sort((a, b) => {
                if(a.packIndex === 3){
                    return 1;
                }
                if(b.packIndex === 3){
                    return -1;
                }
                if(a.class === b.class){
                    return a.packIndex - b.packIndex;
                }

                if (a.class > b.class) return 1;
                if (a.class < b.class) return -1;
                return 0;
            });

            this.setState({
                icons: icons
            });

            iconPickerList.forEach(iconPicker => {
                this.setSelectedIconWithInputValue(iconPicker.iconPickerInput, iconPicker.dropdownButton);
            })
        });
    }

    mountUnmountedIconPickerInputs(){
        let iconPickerInputs = Array.from(document.querySelectorAll(this.props.selector));
        iconPickerInputs = iconPickerInputs.filter((iconPickerInput) => {
            return !mountedIconPickerInputs.includes(iconPickerInput);
        });

        mountedIconPickerInputs = mountedIconPickerInputs.concat(iconPickerInputs);

        let iconPickerList = [];

        // open popover when click on input
        iconPickerInputs.forEach(iconPickerInput => {
            let dropdownButton = DropdownButton.generateElement();

            if(iconPickerInput.classList.contains('optional-form-input')){
                dropdownButton.unselectBtn.classList.add('optional-form-input');
                dropdownButton.iconBtn.classList.add('optional-form-input');
            }

            iconPickerInput.style.display = 'none';
            iconPickerInput.parentNode.insertBefore(dropdownButton.btnGrp, iconPickerInput);

            iconPickerList.push({
                iconPickerInput,
                dropdownButton
            });

            dropdownButton.iconBtn.addEventListener('click', () => {
                this.setState({
                    popoverOpen: true,
                    openButtonTarget: dropdownButton.iconBtn,
                    inputTarget: iconPickerInput,
                    buttonTarget: dropdownButton.iconBtn,
                    search: ''
                });

                let result = this.setSelectedIconWithInputValue(iconPickerInput, dropdownButton);
                if(!result.iconSelected){
                    this.setState({
                        search: result.inputIconClass
                    });
                }
            });

            dropdownButton.unselectBtn.addEventListener('click', () => {
                this.setState({
                    inputTarget: iconPickerInput,
                    buttonTarget: dropdownButton.iconBtn
                });

                this.onIconUnselect();
            });
        });

        return iconPickerList;
    }

    refreshIconPickerInputs(){
        let iconPickerList = this.mountUnmountedIconPickerInputs();

        iconPickerList.forEach(iconPicker => {
            this.setSelectedIconWithInputValue(iconPicker.iconPickerInput, iconPicker.dropdownButton);
        });
    }

    setSelectedIconWithInputValue(iconPickerInput, dropdownButton){
        let iconSelected = false;
        let inputIconClass = '';
        if(iconPickerInput.value && iconPickerInput.value !== ''){

            try{
                let decodedValue = JSON.parse(iconPickerInput.value);
                if(decodedValue.pack && decodedValue.icon  && this.state.icons){
                    let selectedIcon = this.state.icons.find((icon) => {
                        return icon.class == decodedValue.icon && icon.packSlug == decodedValue.pack
                    });

                    if(selectedIcon === undefined){
                        selectedIcon = null;
                        DropdownButton.generateSvg(null, dropdownButton.iconBtn);
                    }else{
                        iconSelected = true;
                        DropdownButton.generateSvg(selectedIcon, dropdownButton.iconBtn);

                        let foundedIconIndex = this.state.icons.findIndex(icon => {
                            return icon === selectedIcon;
                        });

                        let page = foundedIconIndex !== -1 ? Math.trunc(foundedIconIndex / (IconList.COL_NUMBER * IconList.ROW_NUMBER))  : 0;

                        this.setState({
                            selectedIcon,
                            page
                        });
                    }
                    inputIconClass = decodedValue.icon;
                }
            }catch(e){
                console.error(e);
            }
        }

        if(!iconSelected){
            this.setState({
                selectedIcon: null,
                page: 0
            });
        }

        return {
            iconSelected,
            inputIconClass
        };
    }

    onInputSearch(event){
        this.setState({
            search: event.target.value,
            page: 0
        });
    }

    /**
     * Get icon list filtered by state.search
     */
    getFilteredIcons(){
        if(!this.state.search || this.state.search.length < 1){
            return this.state.icons;
        }

        let trimmedSearchState = this.state.search.toLowerCase().trim();

        return this.state.icons.filter(icon => {
            return icon.terms.filter(term => {
                return term.toLowerCase().includes(trimmedSearchState) || (!trimmedSearchState.includes('fa-') && similarity(term, trimmedSearchState) >= 0.7);
            }).length >= 1 || icon.label.toLowerCase().includes(trimmedSearchState) || (!trimmedSearchState.includes('fa-') && similarity(icon.label, trimmedSearchState) >= 0.7);
        });
    }

    static isVisible(element){
        return(!!element && !!(element.offsetWidth || element.offsetHeight || element.getClientRects().length));
    }

    onIconSelect(icon){
        this.state.inputTarget.value = JSON.stringify({
            pack: icon.packSlug,
            icon: icon.class
        });

        DropdownButton.generateSvg(icon, this.state.buttonTarget);

        this.setState({
            popoverOpen: false,
            openButtonTarget: null,
            inputTarget: null,
            buttonTarget: null,
            selectedIcon: null,
            hoveredIcon: null,
            search: ''
        });
    }

    onIconUnselect(){
        this.state.inputTarget.value = '';
        this.state.buttonTarget.innerHTML = '';

        this.setState({
            selectedIcon: null
        });
    }

    onIconHover(icon){
        this.setState({
            hoveredIcon: icon,
        });
    }

    onIconHoverLeft(icon){
        if(this.state.hoveredIcon === icon){
            this.setState({
                hoveredIcon: null,
            });
        }
    }

    onPageChange(page){
        this.setState({
           page: page
        });
    }

    render(){
        return (
            <Popover
                container={document.body}
                show={this.state.popoverOpen}
                target={this.state.openButtonTarget}
                style={{
                    borderRadius: 4,
                    width: 'fit-content'
                }}
                >
                <Picker
                    icons={this.getFilteredIcons()}
                    search={this.state.search}
                    page={this.state.page}
                    onIconSelect={this.onIconSelect}
                    onInputSearch={this.onInputSearch}
                    selectedIcon={this.state.selectedIcon}
                    onPageChange={this.onPageChange}
                    onIconHover={this.onIconHover}
                    onIconHoverLeft={this.onIconHoverLeft}
                    hoveredIcon={this.state.hoveredIcon}
                />
            </Popover>
        );
    }
}

export default Wrapper;