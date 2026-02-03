import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form, Alert, Table, Spinner, Badge, InputGroup } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { orchidAPI } from '../api/orchidAPI';
import './AdminOrchidManagement.css';

const AdminOrchidManagement = () => {
  const { state } = useAuth();
  const [orchids, setOrchids] = useState([]);
  const [filteredOrchids, setFilteredOrchids] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingOrchid, setEditingOrchid] = useState(null);
  const [formData, setFormData] = useState({
    orchidName: '',
    description: '',
    category: '',
    isSpecial: false,
    price: 0,
    image: ''
  });

  // Kiểm tra quyền admin
  if (!state.isAuthenticated || state.role !== 'ADMIN') {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <div className="alert alert-danger shadow-lg border-0" style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
            color: 'white',
            borderRadius: '15px'
          }}>
            <div className="d-flex align-items-center justify-content-center">
              <i className="fas fa-shield-alt me-3" style={{fontSize: '2rem'}}></i>
              <div>
                <h4 className="mb-1">🚫 Access Denied</h4>
                <p className="mb-0">You need admin privileges to access this page.</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  // Fetch all orchids
  const fetchOrchids = async () => {
    setLoading(true);
    try {
      const data = await orchidAPI.getAllOrchids();
      setOrchids(data);
      setFilteredOrchids(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch orchids');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredOrchids(orchids);
    } else {
      const filtered = orchids.filter(orchid =>
        orchid.orchidName.toLowerCase().includes(term.toLowerCase()) ||
        orchid.category.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredOrchids(filtered);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (editingOrchid) {
        // Update existing orchid
        await orchidAPI.updateOrchid(editingOrchid.id, formData);
        setSuccess('🎉 Orchid updated successfully!');
      } else {
        // Create new orchid
        await orchidAPI.createOrchid(formData);
        setSuccess('🌸 New orchid created successfully!');
      }
      
      setShowModal(false);
      setEditingOrchid(null);
      resetForm();
      fetchOrchids();
    } catch (err) {
      setError(editingOrchid ? '❌ Failed to update orchid' : '❌ Failed to create orchid');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Handle delete
  const handleDelete = async (id, orchidName) => {
    const confirmDelete = window.confirm(`🗑️ Are you sure you want to delete "${orchidName}"?\n\nThis action cannot be undone.`);
    if (confirmDelete) {
      try {
        await orchidAPI.deleteOrchid(id);
        setSuccess('🗑️ Orchid deleted successfully!');
        fetchOrchids();
      } catch (err) {
        setError('❌ Failed to delete orchid');
        console.error(err);
      }
    }
  };

  // Handle edit
  const handleEdit = (orchid) => {
    setEditingOrchid(orchid);
    setFormData({
      orchidName: orchid.orchidName,
      description: orchid.description,
      category: orchid.category,
      isSpecial: orchid.isSpecial,
      price: orchid.price,
      image: orchid.image
    });
    setShowModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      orchidName: '',
      description: '',
      category: '',
      isSpecial: false,
      price: 0,
      image: ''
    });
  };

  // Handle modal close
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingOrchid(null);
    resetForm();
  };

  useEffect(() => {
    fetchOrchids();
  }, []);

  // Auto hide alerts
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => setSuccess(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <Container className="mt-4" style={{minHeight: '100vh'}}>
      {/* Header Section */}
      <div className="mb-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="mb-1" style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold'
            }}>
              🌸 Orchid Management
            </h2>
          </div>
          <Button 
            variant="primary" 
            size="lg"
            onClick={() => setShowModal(true)}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 24px',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.3)';
            }}
          >
            <i className="fas fa-plus me-2"></i>
            Add New Orchid
          </Button>
        </div>

        {/* Search Bar */}
        <Row className="mb-4">
          <Col md={6}>
            <div className="search-container">
              <InputGroup size="lg">
                <InputGroup.Text style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  border: 'none',
                  color: 'white'
                }}>
                  <i className="fas fa-search"></i>
                </InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Search orchids by name or category..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  style={{
                    border: 'none',
                    borderRadius: '0 12px 12px 0',
                    fontSize: '16px',
                    padding: '12px 16px'
                  }}
                />
              </InputGroup>
            </div>
          </Col>
          <Col md={6} className="d-flex justify-content-end align-items-center">
            <Badge 
              bg="info" 
              className="floating-card"
              style={{
                fontSize: '14px',
                padding: '8px 16px',
                borderRadius: '20px'
              }}
            >
              Total: {filteredOrchids.length} orchids
            </Badge>
          </Col>
        </Row>
      </div>

      {/* Alerts */}
      {error && (
        <Alert 
          variant="danger" 
          className="shadow-sm border-0 mb-4"
          style={{
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
            color: 'white'
          }}
        >
          <div className="d-flex align-items-center">
            <i className="fas fa-exclamation-triangle me-2"></i>
            {error}
          </div>
        </Alert>
      )}
      
      {success && (
        <Alert 
          variant="success" 
          className="shadow-sm border-0 mb-4"
          style={{
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
            color: 'white'
          }}
        >
          <div className="d-flex align-items-center">
            <i className="fas fa-check-circle me-2"></i>
            {success}
          </div>
        </Alert>
      )}

      {/* Orchids Table */}
      <Card className="shadow-lg border-0" style={{borderRadius: '20px', overflow: 'hidden'}}>
        <Card.Header style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          border: 'none',
          padding: '20px'
        }}>
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0">
              <i className="fas fa-table me-2"></i>
              Orchids Collection
            </h5>
            <Button 
              variant="light" 
              size="sm"
              onClick={fetchOrchids} 
              disabled={loading}
              style={{
                borderRadius: '20px',
                padding: '6px 16px',
                fontWeight: '500'
              }}
            >
              {loading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Loading...
                </>
              ) : (
                <>
                  <i className="fas fa-sync-alt me-2"></i>
                  Refresh
                </>
              )}
            </Button>
          </div>
        </Card.Header>
        <Card.Body style={{padding: '0'}}>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" style={{width: '3rem', height: '3rem'}} />
              <div className="mt-3 text-muted">Loading orchids...</div>
            </div>
          ) : (
            <div style={{overflowX: 'auto'}}>
              <Table hover className="mb-0">
                <thead style={{
                  background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
                  color: 'white'
                }}>
                  <tr>
                    <th style={{border: 'none', padding: '16px'}}>ID</th>
                    <th style={{border: 'none', padding: '16px'}}>Image</th>
                    <th style={{border: 'none', padding: '16px'}}>Name</th>
                    <th style={{border: 'none', padding: '16px'}}>Category</th>
                    <th style={{border: 'none', padding: '16px'}}>Price</th>
                    <th style={{border: 'none', padding: '16px'}}>Status</th>
                    <th style={{border: 'none', padding: '16px', textAlign: 'center'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrchids.map((orchid, index) => (
                    <tr 
                      key={orchid.id}
                      style={{
                        backgroundColor: index % 2 === 0 ? '#f8f9ff' : 'white',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#e3f2fd';
                        e.currentTarget.style.transform = 'scale(1.01)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = index % 2 === 0 ? '#f8f9ff' : 'white';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <td style={{padding: '16px', fontWeight: '500'}}>{orchid.id}</td>
                      <td style={{padding: '16px'}}>
                        <div style={{
                          width: '60px',
                          height: '60px',
                          borderRadius: '12px',
                          overflow: 'hidden',
                          boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                        }}>
                          <img 
                            src={orchid.image} 
                            alt={orchid.orchidName}
                            style={{ 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover',
                              transition: 'transform 0.3s ease'
                            }}
                            onError={(e) => {
                              e.target.src = '/images/placeholder.jpg';
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.transform = 'scale(1.1)';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.transform = 'scale(1)';
                            }}
                          />
                        </div>
                      </td>
                      <td style={{padding: '16px'}}>
                        <div style={{fontWeight: '600', color: '#333'}}>{orchid.orchidName}</div>
                        <div style={{fontSize: '12px', color: '#666', marginTop: '4px'}}>
                          {orchid.description?.substring(0, 50)}...
                        </div>
                      </td>
                      <td style={{padding: '16px'}}>
                        <Badge 
                          style={{
                            background: 'linear-gradient(135deg, #4ecdc4, #44a08d)',
                            padding: '6px 12px',
                            borderRadius: '20px',
                            fontSize: '12px'
                          }}
                        >
                          {orchid.category}
                        </Badge>
                      </td>
                      <td style={{padding: '16px', fontWeight: '600', color: '#2e7d32'}}>
                        {orchid.price?.toLocaleString()} VND
                      </td>
                      <td style={{padding: '16px'}}>
                        {orchid.isSpecial ? 
                          <Badge 
                            style={{
                              background: 'linear-gradient(135deg, #ffd54f, #ffb300)',
                              color: '#333',
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '12px'
                            }}
                          >
                            ⭐ Special
                          </Badge> : 
                          <Badge 
                            bg="secondary"
                            style={{
                              padding: '6px 12px',
                              borderRadius: '20px',
                              fontSize: '12px'
                            }}
                          >
                            Normal
                          </Badge>
                        }
                      </td>
                      <td style={{padding: '16px', textAlign: 'center'}}>
                        <Button 
                          variant="outline-primary" 
                          size="sm" 
                          className="me-2"
                          onClick={() => handleEdit(orchid)}
                          style={{
                            borderRadius: '20px',
                            padding: '6px 12px',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 8px rgba(0,123,255,0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          <i className="fas fa-edit me-1"></i>
                          Edit
                        </Button>
                        <Button 
                          variant="outline-danger" 
                          size="sm"
                          onClick={() => handleDelete(orchid.id, orchid.orchidName)}
                          style={{
                            borderRadius: '20px',
                            padding: '6px 12px',
                            fontWeight: '500',
                            transition: 'all 0.3s ease'
                          }}
                          onMouseEnter={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 4px 8px rgba(220,53,69,0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = 'none';
                          }}
                        >
                          <i className="fas fa-trash me-1"></i>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              
              {filteredOrchids.length === 0 && !loading && (
                <div className="text-center py-5">
                  <i className="fas fa-search" style={{fontSize: '3rem', color: '#ccc'}}></i>
                  <div className="mt-3 text-muted">
                    {searchTerm ? `No orchids found matching "${searchTerm}"` : 'No orchids available'}
                  </div>
                </div>
              )}
            </div>
          )}
        </Card.Body>
      </Card>

      {/* Add/Edit Modal */}
      <Modal 
        show={showModal} 
        onHide={handleCloseModal} 
        size="lg"
        centered
        backdrop="static"
      >
        <div style={{
          borderRadius: '20px',
          overflow: 'hidden',
          border: 'none',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
        }}>
          <Modal.Header 
            closeButton
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '20px 30px'
            }}
          >
            <Modal.Title style={{fontSize: '1.5rem', fontWeight: '600'}}>
              <i className={`fas ${editingOrchid ? 'fa-edit' : 'fa-plus-circle'} me-2`}></i>
              {editingOrchid ? 'Edit Orchid' : 'Add New Orchid'}
            </Modal.Title>
          </Modal.Header>
          
          <Form onSubmit={handleSubmit}>
            <Modal.Body style={{padding: '30px', background: '#f8f9ff'}}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label style={{fontWeight: '600', color: '#333', marginBottom: '8px'}}>
                      <i className="fas fa-seedling me-2 text-success"></i>
                      Orchid Name *
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.orchidName}
                      onChange={(e) => setFormData({...formData, orchidName: e.target.value})}
                      required
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #e1e5e9',
                        padding: '12px 16px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e1e5e9';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{fontWeight: '600', color: '#333', marginBottom: '8px'}}>
                      <i className="fas fa-tags me-2 text-info"></i>
                      Category *
                    </Form.Label>
                    <Form.Select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      required
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #e1e5e9',
                        padding: '12px 16px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e1e5e9';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      <option value="">Select Category</option>
                      <option value="Dendrobium">🌸 Dendrobium</option>
                      <option value="Phalaenopsis">🦋 Phalaenopsis</option>
                      <option value="Cattleya">🌺 Cattleya</option>
                      <option value="Oncidium">🌼 Oncidium</option>
                      <option value="Vanda">🌷 Vanda</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{fontWeight: '600', color: '#333', marginBottom: '8px'}}>
                      <i className="fas fa-dollar-sign me-2 text-success"></i>
                      Price (VND) *
                    </Form.Label>
                    <Form.Control
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: parseInt(e.target.value) || 0})}
                      required
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #e1e5e9',
                        padding: '12px 16px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e1e5e9';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </Form.Group>
                </Col>
                
                <Col md={6}>
                  <Form.Group className="mb-4">
                    <Form.Label style={{fontWeight: '600', color: '#333', marginBottom: '8px'}}>
                      <i className="fas fa-image me-2 text-warning"></i>
                      Image URL
                    </Form.Label>
                    <Form.Control
                      type="text"
                      value={formData.image}
                      onChange={(e) => setFormData({...formData, image: e.target.value})}
                      style={{
                        borderRadius: '12px',
                        border: '2px solid #e1e5e9',
                        padding: '12px 16px',
                        fontSize: '16px',
                        transition: 'all 0.3s ease'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#667eea';
                        e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e1e5e9';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <div className="d-flex align-items-center">
                      <Form.Check
                        type="checkbox"
                        id="isSpecial"
                        label=""
                        checked={formData.isSpecial}
                        onChange={(e) => setFormData({...formData, isSpecial: e.target.checked})}
                        style={{
                          transform: 'scale(1.2)',
                          marginRight: '12px'
                        }}
                      />
                      <Form.Label 
                        htmlFor="isSpecial" 
                        style={{
                          fontWeight: '600', 
                          color: '#333', 
                          marginBottom: '0',
                          cursor: 'pointer'
                        }}
                      >
                        <i className="fas fa-star me-2 text-warning"></i>
                        Special Orchid
                      </Form.Label>
                    </div>
                    <small className="text-muted">Mark this orchid as special for featured display</small>
                  </Form.Group>

                  {/* Image Preview */}
                  {formData.image && (
                    <div className="mb-4">
                      <Form.Label style={{fontWeight: '600', color: '#333', marginBottom: '8px'}}>
                        <i className="fas fa-eye me-2 text-primary"></i>
                        Image Preview
                      </Form.Label>
                      <div style={{
                        width: '100%',
                        height: '120px',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        border: '2px solid #e1e5e9',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: '#f8f9ff'
                      }}>
                        <img 
                          src={formData.image} 
                          alt="Preview"
                          style={{ 
                            maxWidth: '100%', 
                            maxHeight: '100%', 
                            objectFit: 'cover'
                          }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                          }}
                        />
                        <div style={{display: 'none', color: '#999'}}>
                          <i className="fas fa-image" style={{fontSize: '2rem'}}></i>
                          <div>Invalid image URL</div>
                        </div>
                      </div>
                    </div>
                  )}
                </Col>
              </Row>
              
              <Form.Group className="mb-0">
                <Form.Label style={{fontWeight: '600', color: '#333', marginBottom: '8px'}}>
                  <i className="fas fa-align-left me-2 text-secondary"></i>
                  Description *
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  required
                  placeholder="Enter a detailed description of the orchid..."
                  style={{
                    borderRadius: '12px',
                    border: '2px solid #e1e5e9',
                    padding: '12px 16px',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#667eea';
                    e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e1e5e9';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </Form.Group>
            </Modal.Body>
            
            <Modal.Footer style={{
              background: 'white',
              border: 'none',
              padding: '20px 30px'
            }}>
              <Button 
                variant="secondary" 
                onClick={handleCloseModal}
                disabled={submitting}
                style={{
                  borderRadius: '12px',
                  padding: '10px 20px',
                  fontWeight: '500',
                  border: '2px solid #6c757d'
                }}
              >
                <i className="fas fa-times me-2"></i>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="submit"
                disabled={submitting}
                style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '10px 20px',
                  fontWeight: '500',
                  minWidth: '120px'
                }}
              >
                {submitting ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    {editingOrchid ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <i className={`fas ${editingOrchid ? 'fa-save' : 'fa-plus'} me-2`}></i>
                    {editingOrchid ? 'Update' : 'Create'} Orchid
                  </>
                )}
              </Button>
            </Modal.Footer>
          </Form>
        </div>
      </Modal>
    </Container>
  );
};

export default AdminOrchidManagement;