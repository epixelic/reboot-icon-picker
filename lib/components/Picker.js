import React from 'react';
import PropTypes from 'prop-types';

import Loader from 'react-loader';
import PackSelect from './PackSelect';
import IconList from './IconList';

class Picker extends React.Component {
    constructor(){
        super();
        this.state = {
            selectedPack: null,
            search: ''
        }

        this.onPackSelect = this.onPackSelect.bind(this);
        this.onInputSearch = this.onInputSearch.bind(this);
    }

    onPackSelect(pack){
        this.setState({
            selectedPack: pack
        });
    }

    onInputSearch(event){
        this.setState({search: event.target.value});
    }

    getFilteredIcons(){
        if(!this.state.search){
            return this.state.selectedPack.icons;
        }
        if(this.state.search.length < 1){
            return this.state.selectedPack.icons;
        }
        return this.state.selectedPack.icons.filter(icon => {
            return icon.terms.filter(term => {
                return term.toLowerCase().includes(this.state.search.toLowerCase());
            }).length >= 1 || icon.label.toLowerCase().includes(this.state.search.toLowerCase());
        });
    }

    render(){
        // if packs not loaded => loading animation

        return (
            <div style={this.props.packs.length <= 0 ? {
                padding: 50
            } : {}}>
                <Loader loaded={this.props.packs.length > 0} position='relative' color='#adadad'>
                    <div style={{
                        paddingTop: 5
                    }}>
                        <PackSelect 
                            packs={this.props.packs} 
                            onPackSelect={this.onPackSelect}
                            selectedPackSlug={this.props.selectedPackSlug}
                        />
                        <div style={{
                                position: 'relative'
                            }}
                        >
                            <input type="text" 
                                name="" 
                                value="" 
                                placeholder="Rechercher une icône"
                                style={{
                                    display: 'block',
                                    border: '1px solid #ddd',
                                    borderTop: 'none',
                                    color: '#404040',
                                    outline: 0,
                                    borderRadius: '0 0 4px 4px',
                                    width: '100%',
                                    height: 40,
                                    lineHeight: 20,
                                    boxSizing: 'border-box',
                                    padding: '10px 2.5%'
                                }}
                                value={this.state.search} 
                                onChange={this.onInputSearch}
                            />
                            <i className='fa fa-search'
                                style={{
                                    position: 'absolute',
                                    top: 10,
                                    right: 10
                                }}
                            />
                        </div>
                        {this.state.selectedPack &&
                            <IconList 
                                icons={this.getFilteredIcons()} 
                                onIconSelect={(icon) => {this.props.onIconSelect(icon, this.state.selectedPack)}}
                                selectedIconClass={this.props.selectedIconClass}
                            />
                        }
                    </div>
                </Loader>
            </div>
        );
    }
}

Picker.propTypes = {
    packs: PropTypes.arrayOf(PropTypes.object).isRequired,
    onIconSelect: PropTypes.func.isRequired
};

export default Picker;