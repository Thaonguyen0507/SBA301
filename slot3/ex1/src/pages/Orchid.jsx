import { Container, Row, Col, Card, Badge } from 'react-bootstrap';
import orchidImage from '../assets/download.jpg';
import './Orchid.css';

function Orchid() {

    const orchid = {
        id: 1,
        orchidName: "Ceasar 4N",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. or sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. or sit amet, consectetur adipiscing elit",
        image: orchidImage,
        price: 25.00,
        isSpecial: true
    };

    return (
        <div className="orchid-page">
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col lg={10} xl={8}>   
                        <div className="page-header text-center mb-5">
                            <h1 className="display-4 text-primary mb-3">Orchid Collection</h1>
                            <p className="lead text-muted">Discover the beauty of premium orchids</p>
                        </div>
                        
                        <Card className="orchid-card shadow-lg border-0">
                            <Row className="g-0">
                                <Col md={6}>
                                    <div className="image-container">
                                        <Card.Img 
                                            src={orchid.image} 
                                            className="orchid-image"
                                            alt={orchid.orchidName}
                                        />
                                        {orchid.isSpecial && (
                                            <Badge bg="warning" className="special-badge">
                                                ⭐ Special
                                            </Badge>
                                        )}
                                    </div>
                                </Col>
                                <Col md={6}>
                                    <Card.Body className="p-4">
                                        <div className="orchid-header mb-3">
                                            <Card.Title className="h2 text-primary mb-2">
                                                {orchid.orchidName}
                                            </Card.Title>
                                            <div className="orchid-meta">
                                                <small className="text-muted">Product ID: #{orchid.id.toString().padStart(3, '0')}</small>
                                            </div>
                                        </div>
                                        
                                        <div className="orchid-info mb-4">
                                            <div className="info-item mb-2">
                                                <strong>ID:</strong> {orchid.id}
                                            </div>
                                            <div className="info-item mb-2">
                                                <strong>Orchid Name:</strong> {orchid.orchidName}
                                            </div>
                                            <div className="info-item mb-2">
                                                <strong>Special:</strong> {orchid.isSpecial.toString()}
                                            </div>
                                        </div>
                                        
                                        <div className="orchid-description mb-4">
                                            <h5 className="text-secondary mb-2">Description</h5>
                                            <Card.Text className="text-justify">
                                                {orchid.description}
                                            </Card.Text>
                                        </div>
                                        
                                        <div className="orchid-details">
                                            <div className="price-section mb-3">
                                                <h4 className="text-success mb-0">
                                                    ${orchid.price.toFixed(2)}
                                                </h4>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Orchid;
