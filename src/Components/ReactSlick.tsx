import  { Component } from "react";
import Slider from "react-slick";

export default class SimpleSlider extends Component{
    constructor(props:{}){
        super(props);

    }
  render() {
    console.log(this.props)
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    
    return (
      <div className="slickComponent">
        <Slider {...settings}>
          {this.props.data1.map(link => (
            <div>
                <img src={link.src} alt="Image" width={link.size} />
            </div>
          ))}
        </Slider>
      </div>
    );
  }
}