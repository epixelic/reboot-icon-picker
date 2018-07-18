import React from 'react';
import PropTypes from 'prop-types';
import IconList from "./IconList";

class IconPreview extends React.Component {

    static ICON_SIZE = 130;
    static ICON_PADDING_SIZE = 15/100;


    render(){

        console.log()
        // if icons not loaded => loading animation
        return (
           <div style={{
               width: IconPreview.ICON_SIZE+2*IconPreview.ICON_PADDING_SIZE*IconPreview.ICON_SIZE,
               marginLeft: 14,
           }}>
               <div style={{
                   position: 'relative',
                   top: 80,
               }}>
                   <div style={{
                       padding: IconPreview.ICON_PADDING_SIZE*IconPreview.ICON_SIZE,
                       border: '1px solid #ddd',
                       borderRadius: 4,
                       height: IconPreview.ICON_SIZE + 2 * IconPreview.ICON_PADDING_SIZE * IconPreview.ICON_SIZE,
                       width: IconPreview.ICON_SIZE + 2 * IconPreview.ICON_PADDING_SIZE * IconPreview.ICON_SIZE,
                       margin: 'auto'
                   }}>
                       { this.props.icon &&
                           <svg role="img" xmlns="http://www.w3.org/2000/svg" className={this.props.icon.class} viewBox={this.props.icon.data.viewBox.join(' ')}
                                style={{
                                    display: 'block',
                                    margin: 'auto',
                                    fill: '#505050',
                                    height: IconPreview.ICON_SIZE,
                                    maxWidth: IconPreview.ICON_SIZE
                                }}
                           >
                               <path d={ this.props.icon.data.path }/>
                           </svg>
                       }
                   </div>
                   <div style={{
                       textAlign: 'center',
                       marginBottom: 5,
                       textTransform: 'capitalize'
                   }}>
                       <strong>{ this.props.icon && this.props.icon.label }</strong>
                   </div>
               </div>
           </div>
        );
    }
}

IconPreview.propTypes = {
    icon: PropTypes.object
};

export default IconPreview;