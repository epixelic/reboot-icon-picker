import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class IconList extends React.Component {
    static COL_NUMBER = 6;
    static ROW_NUMBER = 6;

    constructor(props){
        super(props);
        this.state = {
            iconIndexHover: null,
            paginationIndexHover: null
        };

        this.onNextPage = this.onNextPage.bind(this);
        this.onPrevPage = this.onPrevPage.bind(this);
        this.onHover = this.onHover.bind(this);
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

    onHover(enter, iconIndex){
        if(enter){
            this.setState({
                iconIndexHover: iconIndex
            });
        }else{
            if(iconIndex === this.state.iconIndexHover){
                this.setState({
                    iconIndexHover: null
                });
            }
        }
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
        if(this.state.iconIndexHover !== null){
            let icon = this.props.icons[this.state.iconIndexHover + ((IconList.COL_NUMBER * IconList.ROW_NUMBER) * this.props.page)];
            if(icon){
                iconLabel = `${icon.label} (${icon.packName})`;
            }
        }

        // 20 icons per page
        return(
            <div>
                <div className='icon-list' style={{
                    paddingTop: 3,
                    marginLeft: -2,
                    marginRight: -2
                }}>
                    { 
                        this.props.icons.slice((IconList.COL_NUMBER * IconList.ROW_NUMBER) * this.props.page, (IconList.COL_NUMBER * IconList.ROW_NUMBER) * this.props.page + (IconList.COL_NUMBER * IconList.ROW_NUMBER)).map((icon, index) => {
                            // 6 icons per line
                            return(
                                <div key={index} className="icon-box"
                                    style={{
                                        display: 'inline-block',
                                        paddingTop: 2,
                                        paddingLeft:  2,
                                        paddingRight: 2,
                                        paddingBottom: 2,
                                        width: `calc(100% / ${IconList.COL_NUMBER})`,
                                        height: 40
                                    }}
                                >
                                    <div style={{
                                            border: '1px solid #ddd',
                                            borderRadius: 4,
                                            padding: 10,
                                            cursor: 'pointer',
                                            backgroundColor: (icon === this.props.selectedIcon || index === this.state.iconIndexHover) ? '#e2e2e2' : 'initial'
                                        }}
                                        onClick={() => {this.props.onIconSelect(icon)}}
                                        onMouseEnter={() => {this.onHover(true, index)}}
                                        onMouseLeave={() => {this.onHover(false, index)}}
                                    >
                                        <svg role="img" xmlns="http://www.w3.org/2000/svg" className={icon.class} viewBox={icon.data.viewBox.join(' ')}
                                            style={{
                                                display: 'block',
                                                height: 20,
                                                maxWidth: 20,
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
                <div style={{
                    position: 'absolute',
                    fontSize: 10
                }}>
                    {iconLabel}
                </div>
                <div style={{
                    float: 'right',
                    fontSize: 10,
                    marginRight: 2
                }}>
                    {this.props.page + 1}/{Math.ceil(this.props.icons.length / (IconList.COL_NUMBER * IconList.ROW_NUMBER)) || 1}
                </div>
                <div>
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
                                padding: 5,
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
                                padding: 5,
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