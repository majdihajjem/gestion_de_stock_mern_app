import Carousel from 'react-bootstrap/Carousel';
import '../App.css';
function Home() {
  return (
    <Carousel className='homed'>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="999.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="555.jpg"
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="666.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="777.png"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="888.png"
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}
export default Home