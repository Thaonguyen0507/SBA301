import { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal } from 'react-bootstrap';
import './ListOrchid.css';
import pic1 from './assets/pic1.jpg';
import pic2 from './assets/pic2.jpg';
import pic3 from './assets/pic3.jpg';
import pic4 from './assets/pic4.jpg';
import pic5 from './assets/pic5.jpg';
import pic6 from './assets/pic6.jpg';
import pic7 from './assets/pic7.jpg';
import pic8 from './assets/pic8.jpg';

function ListOrchid() {
    const [showModal, setShowModal] = useState(false);
    const [selectedOrchid, setSelectedOrchid] = useState(null);

    const handleShowModal = (orchid) => {
        setSelectedOrchid(orchid);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedOrchid(null);
    };
    
    const orchids = [
        {
            id: 1,
            orchidName: "Dendrobium Nobile",
            description: "Beautiful purple orchid with delicate petals",
            image: pic1,
            price: 25.00,
            isSpecial: true,
            category: "Dendrobium",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 2,
            orchidName: "Phalaenopsis Pink",
            description: "Elegant pink orchid perfect for home decoration",
            image: pic2,
            price: 30.00,
            isSpecial: false,
            category: "Phalaenopsis",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 3,
            orchidName: "Cattleya Orange",
            description: "Vibrant orange orchid with stunning blooms",
            image: pic3,
            price: 35.00,
            isSpecial: true,
            category: "Cattleya",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 4,
            orchidName: "Oncidium Yellow",
            description: "Bright yellow orchid with multiple flowers",
            image: pic4,
            price: 28.00,
            isSpecial: false,
            category: "Oncidium",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 5,
            orchidName: "Vanda Green",
            description: "Exotic green orchid with unique patterns",
            image: pic5,
            price: 40.00,
            isSpecial: true,
            category: "Vanda",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 6,
            orchidName: "Cymbidium Purple",
            description: "Classic purple orchid with long-lasting blooms",
            image: pic6,
            price: 32.00,
            isSpecial: false,
            category: "Cymbidium",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 7,
            orchidName: "Paphiopedilum Spotted",
            description: "Unique spotted orchid with slipper-like shape",
            image: pic7,
            price: 45.00,
            isSpecial: true,
            category: "Paphiopedilum",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        },
        {
            id: 8,
            orchidName: "Miltonia Yellow",
            description: "Cheerful yellow orchid with pansy-like flowers",
            image: pic8,
            price: 26.00,
            isSpecial: false,
            category: "Miltonia",
            detailedDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla porta lobortis ex. Morbi cursus consectetur diam, non lobortis massa gravida eu. Duis molestie purus vel ligula suscipit, sit amet iaculis justo tempus. Cras pellentesque urna in feugiat fringilla. Vivamus dictum lacinia nulla, id rhoncus lectus fermentum et. Lorem ipsum dolor sit amet, consectetur adipiscing elit."
        }
    ];

    return (
        <div style={{ 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
            minHeight: '100vh',
            width: '100%',
            margin: 0,
            padding: 0
        }}>
            <Container fluid className="py-5">
                <div className="text-center mb-5">
                    <h1 className="display-4 fw-bold text-white mb-3" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>
                        🌺 Orchid Collection 🌺
                    </h1>
                    <p className="lead text-white-50">Discover the beauty of nature's most elegant flowers</p>
                </div>
                
                {/* Display orchids */}
                <Row className="g-4 justify-content-center">
                    {orchids.map((orchid) => (
                        <Col xl={3} lg={4} md={6} sm={12} key={orchid.id}>
                            <Card className="h-100 shadow-lg border-0 orchid-card" style={{ 
                                borderRadius: '20px', 
                                overflow: 'hidden',
                                transition: 'all 0.3s ease',
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(10px)',
                                maxWidth: '350px',
                                margin: '0 auto'
                            }}>
                                <div style={{ position: 'relative', overflow: 'hidden' }}>
                                    <Card.Img 
                                        variant="top" 
                                        src={orchid.image} 
                                        style={{ 
                                            height: '250px', 
                                            objectFit: 'cover',
                                            transition: 'transform 0.3s ease'
                                        }}
                                        className="orchid-image"
                                    />
                                    {orchid.isSpecial && (
                                        <div style={{
                                            position: 'absolute',
                                            top: '15px',
                                            right: '15px',
                                            background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                                            color: 'white',
                                            padding: '5px 12px',
                                            borderRadius: '20px',
                                            fontSize: '12px',
                                            fontWeight: 'bold',
                                            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                                        }}>
                                            ⭐ Special
                                        </div>
                                    )}
                                </div>
                                <Card.Body className="d-flex flex-column p-4">
                                    <Card.Title className="text-center mb-3" style={{ 
                                        color: '#2c3e50',
                                        fontSize: '1.3rem',
                                        fontWeight: '600'
                                    }}>
                                        {orchid.orchidName}
                                    </Card.Title>
                                    <Card.Text className="text-muted text-center mb-3" style={{ 
                                        fontSize: '0.9rem',
                                        lineHeight: '1.5'
                                    }}>
                                        {orchid.description}
                                    </Card.Text>
                                    <div className="mt-auto">
                                        <div className="text-center mb-3">
                                            <span style={{ 
                                                fontSize: '1.4rem',
                                                fontWeight: 'bold',
                                                color: '#27ae60',
                                                textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                                            }}>
                                                ${orchid.price}
                                            </span>
                                        </div>
                                        <div className="text-center">
                                            <Button 
                                                style={{
                                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                    border: 'none',
                                                    borderRadius: '25px',
                                                    padding: '8px 24px',
                                                    fontWeight: '600',
                                                    fontSize: '0.9rem',
                                                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                className="details-btn"
                                                onClick={() => handleShowModal(orchid)}
                                                onMouseEnter={(e) => {
                                                    e.target.style.transform = 'translateY(-2px)';
                                                    e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.target.style.transform = 'translateY(0)';
                                                    e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                                                }}
                                            >
                                                ✨ View Details
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>

            {/* Enhanced Modal for orchid details */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg" centered>
                <div style={{ 
                    borderRadius: '20px', 
                    overflow: 'hidden',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}>
                    <Modal.Header closeButton style={{ 
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: 'none'
                    }}>
                        <Modal.Title style={{ 
                            color: '#2c3e50',
                            fontWeight: '600',
                            fontSize: '1.5rem'
                        }}>
                            🌺 {selectedOrchid?.orchidName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ 
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        {selectedOrchid && (
                            <Row>
                                <Col md={6}>
                                    <img 
                                        src={selectedOrchid.image} 
                                        alt={selectedOrchid.orchidName}
                                        className="img-fluid"
                                        style={{ 
                                            width: '100%', 
                                            height: '350px', 
                                            objectFit: 'cover',
                                            borderRadius: '15px',
                                            boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                                        }}
                                    />
                                </Col>
                                <Col md={6}>
                                    <div className="p-3">
                                        <h5 style={{ 
                                            color: '#2c3e50',
                                            fontWeight: '600',
                                            marginBottom: '15px'
                                        }}>
                                            {selectedOrchid.orchidName}
                                        </h5>
                                        <p className="text-muted mb-3" style={{ 
                                            fontSize: '1rem',
                                            fontStyle: 'italic'
                                        }}>
                                            {selectedOrchid.description}
                                        </p>
                                        <p style={{ 
                                            lineHeight: '1.6',
                                            color: '#555'
                                        }}>
                                            {selectedOrchid.detailedDescription}
                                        </p>
                                        <div className="mt-4">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <span style={{ 
                                                    fontSize: '1.8rem',
                                                    fontWeight: 'bold',
                                                    color: '#27ae60',
                                                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
                                                }}>
                                                    ${selectedOrchid.price}
                                                </span>
                                                {selectedOrchid.isSpecial && (
                                                    <span style={{
                                                        background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                                                        color: 'white',
                                                        padding: '8px 16px',
                                                        borderRadius: '25px',
                                                        fontSize: '14px',
                                                        fontWeight: 'bold',
                                                        boxShadow: '0 4px 15px rgba(255, 107, 107, 0.3)'
                                                    }}>
                                                        ⭐ Special Orchid
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        )}
                    </Modal.Body>
                    <Modal.Footer style={{ 
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        border: 'none'
                    }}>
                        <Button 
                            onClick={handleCloseModal}
                            style={{
                                background: 'linear-gradient(45deg, #95a5a6, #7f8c8d)',
                                border: 'none',
                                borderRadius: '25px',
                                padding: '10px 25px',
                                fontWeight: '600',
                                boxShadow: '0 4px 15px rgba(149, 165, 166, 0.4)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 6px 20px rgba(149, 165, 166, 0.6)';
                            }}
                            onMouseLeave={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 4px 15px rgba(149, 165, 166, 0.4)';
                            }}
                        >
                            Close
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>
        </div>
    );
}

export default ListOrchid;