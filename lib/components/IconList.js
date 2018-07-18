import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class IconList extends React.Component {
    static COL_NUMBER = 3*2;
    static ROW_NUMBER = 5;

    static ICON_LIST_SIZE = 30;
    static ICON_PADDING_LIST_SIZE = 15/100;

    constructor(props){
        super(props);
        this.state = {
            iconIndexHover: null,
            paginationIndexHover: null
        };

        this.onNextPage = this.onNextPage.bind(this);
        this.onPrevPage = this.onPrevPage.bind(this);
        this.onPaginationHover = this.onPaginationHover.bind(this);
    }

    onNextPage(){
        this.props.onPageChange(this.props.page + 1);
    }

    onPrevPage(){
        this.props.onPageChange(this.props.page - 1);
    }

    static setPageOnSelectedIcon(props, state){
        let foundedIconIndex = props.icons.findIndex(icon => {
            return icon === props.selectedIcon;
        });        

        state.page = foundedIconIndex !== -1 ? Math.trunc(foundedIconIndex / (IconList.COL_NUMBER * IconList.ROW_NUMBER))  : 0;
        return state;
    }

    onPaginationHover(enter, paginationIndex){
        if(enter){
            this.setState({
                paginationIndexHover: paginationIndex
            });
        }else{
            if(paginationIndex === this.state.paginationIndexHover){
                this.setState({
                    paginationIndexHover: null
                });
            }
        }
    }

    render(){
        let iconLabel = '';
        if(this.props.hoveredIcon){
            iconLabel = `${this.props.hoveredIcon.packName}`;
        }

        // 20 icons per page
        return(
            <div>
                <div className='icon-list' style={{
                    marginTop: 10,
                    marginBottom: 10,
                    marginLeft: -IconList.ICON_PADDING_LIST_SIZE,
                    marginRight: -IconList.ICON_PADDING_LIST_SIZE,
                    lineHeight: 0,
                    height: IconList.ROW_NUMBER*(
                        IconList.ICON_LIST_SIZE
                        + 2*IconList.ICON_PADDING_LIST_SIZE*IconList.ICON_LIST_SIZE
                        + 2*IconList.ICON_PADDING_LIST_SIZE*IconList.ICON_LIST_SIZE
                    ),

                }}>
                    { 
                        this.props.icons.slice((IconList.COL_NUMBER * IconList.ROW_NUMBER) * this.props.page, (IconList.COL_NUMBER * IconList.ROW_NUMBER) * this.props.page + (IconList.COL_NUMBER * IconList.ROW_NUMBER)).map((icon, index) => {
                            // 6 icons per line
                            return(
                                <div key={index} className="icon-box"
                                    style={{
                                        display: 'inline-block',
                                        cursor: 'pointer',
                                        padding: IconList.ICON_PADDING_LIST_SIZE * IconList.ICON_LIST_SIZE,
                                    }}
                                     onClick={() => {this.props.onIconSelect(icon)}}
                                     onMouseEnter={() => {this.props.onIconHover(icon)}}
                                     onMouseLeave={() => {this.props.onIconHoverLeft(icon)}}
                                >
                                    <div style={{
                                        borderRadius: 4,
                                        backgroundColor: (icon === this.props.selectedIcon || icon === this.props.hoveredIcon) ? '#e2e2e2' : 'initial',
                                        padding: IconList.ICON_PADDING_LIST_SIZE * IconList.ICON_LIST_SIZE,
                                        width: IconList.ICON_LIST_SIZE + 2*IconList.ICON_PADDING_LIST_SIZE*IconList.ICON_LIST_SIZE,
                                    }}

                                    >
                                        <svg role="img" xmlns="http://www.w3.org/2000/svg" className={icon.class} viewBox={icon.data.viewBox.join(' ')}
                                            style={{
                                                display: 'block',
                                                height: IconList.ICON_LIST_SIZE,
                                                maxWidth: IconList.ICON_LIST_SIZE,
                                                margin: 'auto',
                                                fill: '#505050'
                                            }}
                                        >
                                            <path d={icon.data.path}/>
                                        </svg>
                                    </div>
                                </div>
                            );
                        }) 
                    }
                </div>
                <div className="helper">
                    <div style={{
                        float: 'left',
                        fontSize: 10
                    }}>
                        {iconLabel}
                    </div>
                    <div style={{
                        float: 'right',
                        fontSize: 10,
                        marginRight: 2
                    }}>
                        {this.props.page + 1}/{Math.ceil(this.props.icons.length / (IconList.COL_NUMBER * IconList.ROW_NUMBER)) || 1} ({this.props.icons.length})
                    </div>
                </div>
                <div style={{
                    clear: 'both'
                }}>
                    <span style={{
                        display: 'block',
                        margin: 'auto',
                        width: 'fit-content',
                        marginTop: 14,
                        marginBottom: 6
                    }}>
                        <i className='fa fa-chevron-left'
                           onClick={this.props.page > 0 ? this.onPrevPage : null}
                           style={{
                                marginRight: 10,
                                cursor: this.props.page > 0 ? 'pointer' : 'initial',
                                padding: 10,
                                borderRadius: 4,
                                color: this.props.page > 0 ? '#666666' : '#b9b9b9',
                                backgroundColor: this.state.paginationIndexHover === 0 && this.props.page > 0 ? '#e2e2e2' : 'initial'
                           }}
                           onMouseEnter={() => {
                               this.onPaginationHover(true, 0)
                           }}
                           onMouseLeave={() => {
                               this.onPaginationHover(false, 0)
                           }}
                        />
                        <i className='fa fa-chevron-right'
                           onClick={this.props.page + 1 < this.props.icons.length / (IconList.COL_NUMBER * IconList.ROW_NUMBER) ? this.onNextPage : null}
                           style={{
                                marginLeft: 10,
                                cursor: this.props.page + 1 < this.props.icons.length / (IconList.COL_NUMBER * IconList.ROW_NUMBER) ? 'pointer' : 'initial',
                                padding: 10,
                                borderRadius: 4,
                                color: this.props.page + 1 < this.props.icons.length / (IconList.COL_NUMBER * IconList.ROW_NUMBER) ? '#666666' : '#b9b9b9',
                                backgroundColor: this.state.paginationIndexHover === 1 && this.props.page + 1 < this.props.icons.length / (IconList.COL_NUMBER * IconList.ROW_NUMBER) ? '#e2e2e2' : 'initial'
                           }}
                           onMouseEnter={() => {this.onPaginationHover(true, 1)}}
                           onMouseLeave={() => {this.onPaginationHover(false, 1)}}
                        />

                    </span>
                </div>
            </div>
        );
    }
}

IconList.propTypes = {
    icons: PropTypes.arrayOf(PropTypes.object).isRequired,
    onIconSelect: PropTypes.func.isRequired
};

export default IconList;