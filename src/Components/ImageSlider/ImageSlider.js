import React, { Component } from 'react';
import { Slide } from 'react-slideshow-image';

const properties = {
    duration: 5000,
    transitionDuration: 500,
    infinite: true,
    // indicators: true,
    arrows: true
}

class Slideshow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slideImages: [...props.images]
        }
        console.log('Props*******', props)
    }



    render() {
        const { slideImages } = this.state;
        return (
            <Slide {...properties}>
                <div className="each-slide">
                    <div style={{ 'backgroundImage': `url(${slideImages[0]})`, width: '100%', height: '300px' }}>
                        <span>Slide 1</span>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{ 'backgroundImage': `url(${slideImages[1]})`, width: '100%', height: '300px' }}>
                        <span>Slide 2</span>
                    </div>
                </div>
                <div className="each-slide">
                    <div style={{ 'backgroundImage': `url(${slideImages[2]})`, width: '100%', height: '300px' }}>
                        <span>Slide 3</span>
                    </div>
                </div>
            </Slide>
        )
    }
}


export default Slideshow;