import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/esm/Container';
import { Button, Col, Form, FormGroup, Row, Card } from 'react-bootstrap';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditOrchid() {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_URL;

  const [api, setApi] = useState({});
  const [imagePreview, setImagePreview] = useState('');

  // Inline styles
  const styles = {
    container: {
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px 0'
    },
    card: {
      borderRadius: '15px',
      boxShadow: '0 8px 25px rgba(0,0,0,0.1)',
      border: 'none',
      backgroundColor: 'white'
    },
    title: {
      color: '#495057',
      fontSize: '32px',
      fontWeight: '700',
      marginBottom: '20px'
    },
    divider: {
      border: 'none',
      height: '3px',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      borderRadius: '2px',
      marginBottom: '30px'
    },
    formLabel: {
      color: '#495057',
      fontWeight: '600',
      marginBottom: '8px',
      fontSize: '16px'
    },
    formControl: {
      borderRadius: '10px',
      border: '2px solid #e9ecef',
      padding: '12px 15px',
      fontSize: '16px',
      transition: 'all 0.2s ease'
    },
    switchLabel: {
      color: '#495057',
      fontWeight: '600',
      fontSize: '16px'
    },
    previewContainer: {
      backgroundColor: '#f8f9fa',
      padding: '20px',
      borderRadius: '15px',
      border: '2px solid #e9ecef'
    },
    previewTitle: {
      color: '#495057',
      fontSize: '18px',
      fontWeight: '600',
      marginBottom: '15px'
    },
    previewImage: {
      width: '100%',
      maxHeight: '300px',
      objectFit: 'cover',
      borderRadius: '10px',
      border: '3px solid #e9ecef'
    },
    noImageContainer: {
      height: '250px',
      backgroundColor: '#ffffff',
      border: '2px dashed #dee2e6',
      borderRadius: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#6c757d'
    },
    saveButton: {
      background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
      border: 'none',
      borderRadius: '10px',
      padding: '12px 25px',
      fontWeight: '600',
      color: 'white',
      boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
      transition: 'all 0.2s ease'
    },
    cancelButton: {
      backgroundColor: 'transparent',
      border: '2px solid #6c757d',
      borderRadius: '10px',
      padding: '12px 25px',
      color: '#6c757d',
      fontWeight: '600',
      transition: 'all 0.2s ease'
    }
  };

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const watchedImageUrl = watch('orchidUrl');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (watchedImageUrl && watchedImageUrl.match(/(https?:\/\/.*)/i)) {
      setImagePreview(watchedImageUrl);
    } else {
      setImagePreview('');
    }
  }, [watchedImageUrl]);

  const loadData = async () => {
    try {
      const res = await axios.get(`${baseUrl}/orchids/${id}`);
      const data = res.data.result;
      setApi(data);

      setValue('name', data.name);
      setValue('orchidUrl', data.orchidUrl);
      setValue('isNatural', data.isNatural);
      setImagePreview(data.orchidUrl);
    } catch (error) {
      toast.error('Load orchid failed');
    }
  };

  const onSubmit = async (data) => {
    try {
      await axios.put(`${baseUrl}/orchids/${id}`, data);
      toast.success('Updated successfully');
      navigate('/');
    } catch (error) {
      toast.error('Update failed');
    }
  };

  return (
    <div style={styles.container}>
      <Container>
        <Toaster position="top-right" />
        <Row className="justify-content-center">
          <Col lg={10}>
            <Card style={styles.card} className="p-4">
              <h2 style={styles.title}>
                <i className="bi bi-flower1 me-3"></i>
                Edit Orchid: {api.name}
              </h2>
              <hr style={styles.divider} />
              
              <form onSubmit={handleSubmit(onSubmit)}>
                <Row>
                  <Col md={6}>
                    <FormGroup className="mb-4">
                      <Form.Label style={styles.formLabel}>
                        <i className="bi bi-flower1 me-2"></i>
                        Orchid Name
                      </Form.Label>
                      <Controller
                        name="name"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => (
                          <Form.Control 
                            {...field} 
                            type="text" 
                            style={styles.formControl}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                          />
                        )}
                      />
                      {errors.name && (
                        <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                          <i className="bi bi-exclamation-circle me-1"></i>
                          Name is required
                        </p>
                      )}
                    </FormGroup>

                    <FormGroup className="mb-4">
                      <Form.Label style={styles.formLabel}>
                        <i className="bi bi-image me-2"></i>
                        Image URL
                      </Form.Label>
                      <Controller
                        name="orchidUrl"
                        control={control}
                        rules={{
                          required: true,
                          pattern: /(https?:\/\/.*)/i,
                        }}
                        render={({ field }) => (
                          <Form.Control 
                            {...field} 
                            type="text" 
                            placeholder="https://example.com/image.jpg"
                            style={styles.formControl}
                            onFocus={(e) => e.target.style.borderColor = '#667eea'}
                            onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                          />
                        )}
                      />
                      {errors.orchidUrl && (
                        <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                          <i className="bi bi-exclamation-circle me-1"></i>
                          Please enter a valid image URL
                        </p>
                      )}
                    </FormGroup>

                    <FormGroup className="mb-4">
                      <Form.Check
                        type="switch"
                        label="Natural Orchid"
                        {...register('isNatural')}
                        style={styles.switchLabel}
                      />
                    </FormGroup>

                    <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                      <Button 
                        type="submit" 
                        style={styles.saveButton}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        <i className="bi bi-check-circle me-2"></i>
                        Save Changes
                      </Button>
                      <Button 
                        type="button"
                        onClick={() => navigate('/')}
                        style={styles.cancelButton}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = '#6c757d';
                          e.target.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = 'transparent';
                          e.target.style.color = '#6c757d';
                        }}
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Cancel
                      </Button>
                    </div>
                  </Col>
                  
                  <Col md={6}>
                    <div style={styles.previewContainer}>
                      <h5 style={styles.previewTitle}>
                        <i className="bi bi-image me-2"></i>
                        Image Preview
                      </h5>
                      {imagePreview ? (
                        <img 
                          src={imagePreview} 
                          alt="Orchid preview" 
                          style={styles.previewImage}
                          onError={(e) => {
                            e.target.style.display = 'none';
                            setImagePreview('');
                          }}
                        />
                      ) : (
                        <div style={styles.noImageContainer}>
                          <div className="text-center">
                            <i className="bi bi-image" style={{ fontSize: '3rem', marginBottom: '15px' }}></i>
                            <p style={{ margin: 0, fontSize: '16px', fontWeight: '500' }}>No image to preview</p>
                            <small style={{ color: '#adb5bd' }}>Enter a valid image URL above</small>
                          </div>
                        </div>
                      )}
                    </div>
                  </Col>
                </Row>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
