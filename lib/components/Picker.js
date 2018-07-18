import React from 'react';
import PropTypes from 'prop-types';

import Loader from 'react-loader';
// import PackSelect from './PackSelect';
import IconList from './IconList';

class Picker extends React.Component {
    renderLoadedContent(){
        return(
            <div style={{
                paddingTop: 5
            }}>
                <div style={{
                    position: 'relative'
                }}
                >
                    <input type="text"
                           name=""
                           placeholder="Rechercher une icône"
                           style={{
                               display: 'block',
                               border: '1px solid #ddd',
                               color: '#404040',
                               outline: 0,
                               borderRadius: 4,
                               width: '100%',
                               height: 40,
                               lineHeight: 20,
                               boxSizing: 'border-box',
                               padding: 10
                           }}
                           value={this.props.search}
                           onChange={this.props.onInputSearch}
                    />
                    <i className='fa fa-search'
                       style={{
                           position: 'absolute',
                           top: 12,
                           right: 10
                       }}
                    />
                </div>
                <IconList
                    icons={this.props.icons}
                    page={this.props.page}
                    onIconSelect={this.props.onIconSelect}
                    selectedIcon={this.props.selectedIcon}
                    onPageChange={this.props.onPageChange}
                />
            </div>
        );
    }

    render(){
        // if icons not loaded => loading animation
        return (
            <div style={this.props.icons === null ? {
                paddingLeft: 50,
                paddingRight: 50,
                paddingTop: 195,
                paddingBottom: 195
            } : {}}>
                <Loader loaded={this.props.icons !== null} position='relative' color='#adadad'>
                    { this.props.icons !== null &&
                        this.renderLoadedContent()
                    }
                </Loader>
            </div>
        );
    }
}

Picker.propTypes = {
    icons: PropTypes.arrayOf(PropTypes.object),
    search: PropTypes.string.isRequired,
    onIconSelect: PropTypes.func.isRequired,
    onInputSearch: PropTypes.func.isRequired
};

export default Picker;