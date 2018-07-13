import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

let lastIconLenght = null;

class IconList extends React.Component {
    constructor(props){
        super(props);
        console.log('-----');
        console.log(props.selectedIconClass);
        let foundedIconIndex = props.icons.findIndex(icon => {
            console.log(props.selectedIconClass);
            return icon.class == props.selectedIconClass;
        });
                

        this.state = {
            page: foundedIconIndex !== -1 ? Math.trunc(foundedIconIndex / 20)  : 0,
            selectedIcon: foundedIconIndex !== -1 ? props.icons[foundedIconIndex] : null
        };

        this.onNextPage = this.onNextPage.bind(this);
        this.onPrevPage = this.onPrevPage.bind(this);
        this.onIconSelect = this.onIconSelect.bind(this);
    }

    onNextPage(){
        this.setState({
            page: this.state.page + 1
        });
    }

    onPrevPage(){
        this.setState({
            page: this.state.page - 1
        });
    }

    onIconSelect(icon){
        this.setState({
            selectedIcon: icon
        });
        this.props.onIconSelect(icon);
    }

    static getDerivedStateFromProps(props, state){
        // if we change for différent icon pack, we must reste page
        if(!lastIconLenght){
            lastIconLenght = props.icons.length;
            return state;
        }
        if(lastIconLenght != props.icons.length){
            state.page = 0;
        }
        
        lastIconLenght = props.icons.length;
        
        return state;
    }

    render(){
        // 20 icons per page
        return(
            <div>
                <div className='icon-list' style={{
                    paddingTop: 3,
                    marginLeft: -2,
                    marginRight: -2
                }}>
                    { 
                        this.props.icons.slice(20 * this.state.page, 20 * this.state.page + 20).map((icon, index) => {
                            let isFirstLine = index < 5;
                            let isLastLine = index >= 15;
                            let isFirstOfLine = index % 5 == 0
                            let isLastOfLine = index == 4 || index == 9 || index == 14 || index == 19
                            // 5 icons per line
                            return(
                                <div key={index} className="icon-box"
                                    style={{
                                        display: 'inline-block',
                                        paddingTop: 1,
                                        paddingLeft:  2,
                                        paddingRight: 2,
                                        paddingBottom: 1,
                                        //paddingTop: isFirstLine ? 0 : 1,
                                        //paddingLeft: isFirstOfLine ? 0 : 2,
                                        //paddingRight: isLastOfLine ? 0 : 2,
                                        //paddingBottom: isLastLine ? 0 : 1,
                                        width: 'calc(100% * (1/5) - 4px)',
                                        height: 40
                                    }}
                                >
                                    <div style={{
                                        border: '1px solid #ddd',
                                        borderRadius: 4,
                                        padding: 10,
                                        cursor: 'pointer',
                                        backgroundColor: icon === this.state.selectedIcon ? '#e2e2e2' : 'initial'
                                        
                                    }}
                                    onClick={this.onIconSelect.bind(this, icon)}
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
                                            <path d={icon.data.path}></path>
                                        </svg>
                                    </div>
                                </div>
                            );
                        }) 
                    }
                </div>
                <div>
                    <span style={{
                        display: 'block',
                        margin: 'auto',
                        width: 'fit-content',
                        marginTop: 14,
                        marginBottom: 6
                    }}>
                        <i className={`fa ${this.state.page > 0 ? 'fa-chevron-left' : ''}`} onClick={this.onPrevPage} style={{
                            marginRight: 10,
                            cursor: 'pointer'
                        }}/>
                        <i className={`fa ${(this.state.page + 1 < this.props.icons.length / 20) ? 'fa fa-chevron-right' : ''}`} onClick={this.onNextPage} style={{
                            marginLeft: 10,
                            cursor: 'pointer'
                        }}/>
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