import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ProductCard({product}) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={product.image} />
      <Card.Body>
        <Card.Title>{product.title}</Card.Title>
        <Card.Text>{product.desc}</Card.Text>
        <Card.Text>{product.Qte}</Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;