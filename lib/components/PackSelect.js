import React from 'react';
import PropTypes from 'prop-types';

let lastPackSlug = null;

class PackSelect extends React.Component {
    constructor(props){
        super(props);

        let foundedPackIndex = props.packs.findIndex(pack => {
            return pack.slug == props.selectedPackSlug;
        });

        this.state = {
            packIndex: foundedPackIndex !== -1 ? foundedPackIndex : 0
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.props.onPackSelect(this.props.packs[0]);
    }

    handleChange(event) {
        this.setState({
            packIndex: parseInt(event.target.value)
        });
        this.props.onPackSelect(this.props.packs[parseInt(event.target.value)]);
    }

    componentDidMount(){
        this.props.onPackSelect(this.props.packs[this.state.packIndex]);
    }

    static getDerivedStateFromProps(props, state){
        if(lastPackSlug !== props.selectedPackSlug){
            lastPackSlug = props.selectedPackSlug;
            let foundedPackIndex = props.packs.findIndex(pack => {
                return pack.slug == props.selectedPackSlug;
            });
    
            state.packIndex = foundedPackIndex !== -1 ? foundedPackIndex : 0;
            props.onPackSelect(props.packs[state.packIndex]);
        }

        return state;
    }

    render(){
        return (
            <select style={{
                    border: '1px solid #ddd',
                    color: '#404040',
                    outline: 0,
                    borderRadius: '4px 4px 0 0',
                    width: '100%',
                    height: 40,
                    lineHeight: 20,
                    padding: '10px 2.5%'
                }}
                value={this.state.packIndex}
                onChange={this.handleChange}
            >
                {this.props.packs.map((pack, index) => {
                    return <option key={index} value={index}>{pack.name}</option>
                })}
            </select>
        );
    }
}

PackSelect.propTypes = {
    packs: PropTypes.arrayOf(PropTypes.object).isRequired,
    onPackSelect: PropTypes.func.isRequired
};

export default PackSelect;