import React from 'react';
import ReactDOM from 'react-dom';
import Overlay from 'react-overlays/lib/Overlay';
import PropTypes from 'prop-types';

const PopoverStyle = {
  position: 'absolute',
  padding: '0 5px'
};

const PopoverInnerStyle = {
  width: 200,
  padding: '10px 14px',
  color: '#666',
  backgroundColor: '#fff',
  boxShadow: '0 0 30px rgba(39, 43, 55, 0.15)'
};

const PopoverArrowStyle = {
  position: 'absolute',
  width: 0,
  height: 0,
  borderRightColor: 'transparent',
  borderLeftColor: 'transparent',
  borderTopColor: 'transparent',
  borderBottomColor: 'transparent',
  borderStyle: 'solid'
};

const PopoverContent = props => {
  const placementStyle = {
      tooltip: {
          marginBottom: 3,
          padding: '5px 0',
          zIndex: 99
      },
      arrow: {
          top: 0,
          marginLeft: -5,
          borderWidth: '0 5px 5px',
          borderBottomColor: '#fff'
      }
  };

  const {
    style,
    innerStyle,
    arrowOffsetLeft: left = placementStyle.arrow.left,
    arrowOffsetTop: top = placementStyle.arrow.top,
    children
  } = props;

  return (
    <div style={{ ...PopoverStyle, ...placementStyle.tooltip, ...style }}>
      <div
        style={{ ...PopoverArrowStyle, ...placementStyle.arrow, left, top }}
      />
      <div style={{ ...PopoverInnerStyle, ...innerStyle }}>{children}</div>
    </div>
  );
};

const Popover = props => {
  return (
    <Overlay
      show={props.show}
      onHide={props.onHide}
      placement='bottom'
      container={props.container}
      target={props.target}
      rootClose={props.hideWithOutsideClick}
      shouldUpdatePosition={true}
    >
      <PopoverContent innerStyle={props.style} style={props.containerStyle}>
        {props.children}
      </PopoverContent>
    </Overlay>
  );
};

Popover.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func,
  placement: PropTypes.string,
  target: PropTypes.object,
  style: PropTypes.object,
  containerStyle: PropTypes.object,
  container: PropTypes.object,
  hideWithOutsideClick: PropTypes.bool,
  children: PropTypes.element.isRequired
};

Popover.defaultProps = {
  onHide: () => {},
  hideWithOutsideClick: true
};

export default Popover;