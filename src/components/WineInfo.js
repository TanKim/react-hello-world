import React, { Component } from 'react';
import '../styles.css'

class WineInfo extends Component {
    static defaultProps = {
        info: {
            id: 0,
            uuid: "",
            krName: "샤르도네",
            enName: "Chardonnay",
            nation: "Korea",
            typeCode: "RED",
            variety: "MERLOT",
            price: 30000,
            averageRating: 4.5,
            imageUrl: "s3a://chilling-image/wine/wine_name"
        }
    }

    render() {
        const { id, uuid, krName, enName, nation, typeCode, variety, price, averageRating, imageUrl
        } = this.props.info;
        return(
            <div className="WineInfo">
                <div><b>id: {id}</b></div>
                <div>uuid: {uuid}</div>
                <div>krName: {krName}</div>
                <div>enName: {enName}</div>
                <div>nation: {nation}</div>
                <div>typeCode: {typeCode}</div>
                <div>variety: {variety}</div>
                <div>price: {price}</div>
                <div>averageRating: {averageRating}</div>
                <div>imageUrl: {imageUrl}</div>
            </div>
        )
    }
}

export default WineInfo;