import  { Component } from "react";
import Slider from "react-slick";
import { IImage } from "../Nodes/CarouselNode";

interface ISlickComponent{
  data1 : IImage[]
}

export default class SimpleSlider extends Component<ISlickComponent> {
    constructor(props:ISlickComponent){
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