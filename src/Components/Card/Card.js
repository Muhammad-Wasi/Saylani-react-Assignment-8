import React, { Component } from 'react';
import Slideshow from '../ImageSlider/ImageSlider';
import '../Card/Card.css';

class CardDiv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: { ...props.item }
        }
        console.log('Data*****', props.item)
    }
    render() {
        const { data } = this.state;

        return (
            <div className="CardDiv" >
                <div>
                    <div className="SlideDiv">
                        <Slideshow images={[data.image1, data.image2, data.image3]} />
                    </div>
                    <div className="HeadingDiv">
                        <span style={{ fontSize: '16px', fontWeight: 'bold', padding: '0px' }}>{data.name}</span>
                        <br />
                        <span>{data.nickname}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default CardDiv;
