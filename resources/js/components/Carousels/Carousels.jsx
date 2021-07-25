import React from 'react';
import {
  UncontrolledCarousel
} from 'reactstrap';

class Carousels extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      sliders: []
    };
  }

  componentWillMount(){
    axios.get('http://127.0.0.1:8000/api/slide/')
    .then(res => {
      // this.setState({
      //   sliders: res.data,
      // })
      var lstImg = [];
      res.data.map((item) => {
        if(item.slide_status == 1){
          var objectSlide = {
            src: item.slide_image,
            altText: '',
            caption: ''
          };
          lstImg.push(objectSlide);
        }
      });

      this.setState({
        sliders: lstImg,
      })
    }).catch(err => console.log(err))
  }

  render() {
    return (
      <>
        <UncontrolledCarousel items= {this.state.sliders}/> 
      </>
    )
  }
}

export default Carousels;

