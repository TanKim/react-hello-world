import React, { Component } from 'react';
import WineInfo from './WineInfo'
import '../styles.css'

class WineInfoList extends Component {
    static defaultProps = {
        info: []
    }

    render() {
        const { info } = this.props;
        console.log("wineinfolist");
        console.log(info);
        const list = info.map(
            info => (<WineInfo key={info.id} info={info}/>)
        ) 
        return(
            <div className="WineInfoList">
                {list}
            </div>
        )
    }
}

export default WineInfoList;