import React, { useReducer } from 'react';
import { Container, Card, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import ConfirmModal from './ConfirmModal';

// 1. Khởi tạo trạng thái ban đầu cho form
const initialFormState = {
  identifier: '', // username hoặc email
  password: '',
  errors: {},
  showSuccessModal: false,
  countdown: 3 // Countdown timer
};

// 2. Định nghĩa reducer cho form
function formReducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return {
        ...state,
        [action.field]: action.value
      };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.message }
      };
    case 'CLEAR_ERROR':
      const { [action.field]: removed, ...restErrors } = state.errors;
      return {
        ...state,
        errors: restErrors
      };
    case 'SET_ERRORS':
      return {
        ...state,
        errors: action.errors
      };
    case 'SHOW_SUCCESS_MODAL':
      console.log('Setting showSuccessModal to true'); // Debug
      return {
        ...state,
        showSuccessModal: true,
        countdown: 3
      };
    case 'HIDE_SUCCESS_MODAL':
      return {
        ...state,
        showSuccessModal: false,
        countdown: 3
      };
    case 'UPDATE_COUNTDOWN':
      return {
        ...state,
        countdown: action.countdown
      };
    case 'RESET_FORM':
      return initialFormState;
    default:
      return state;
  }
}

function LoginForm() {
  const [formState, dispatch] = useReducer(formReducer, initialFormState);

  const { login, loading, error, clearError, user } = useAuth();
  const navigate = useNavigate();


  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmail = (v) => v.includes('@');

  // 6. Validation form
  const validateForm = () => {
    const errors = {};

    if (!formState.identifier.trim()) {
      errors.identifier = 'Username or Email is required.';
    } else if (isEmail(formState.identifier) && !emailRe.test(formState.identifier)) {
      errors.identifier = 'Email is invalid format.';
    }

    if (!formState.password.trim()) {
      errors.password = 'Password is required.';
    }

    return errors;
  };

  // 7. Xử lý thay đổi input
  const handleInputChange = (field, value) => {
    // Cập nhật giá trị field
    dispatch({ type: 'SET_FIELD', field, value });

    // Clear auth error khi user nhập
    clearError();

    // Clear validation error khi user nhập
    if (formState.errors[field]) {
      dispatch({ type: 'CLEAR_ERROR', field });
    }
  };

  // 8. Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    // Validate form
    const validationErrors = validateForm();
    dispatch({ type: 'SET_ERRORS', errors: validationErrors });

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    try {
      // Gọi login từ AuthContext
      const result = await login(formState.identifier.trim(), formState.password);
      
      if (result.ok) {
        // Hiển thị modal ngay lập tức khi login thành công
        dispatch({ type: 'SHOW_SUCCESS_MODAL' });
        
        // Countdown timer
        let timeLeft = 3;
        const countdownInterval = setInterval(() => {
          timeLeft -= 1;
          dispatch({ type: 'UPDATE_COUNTDOWN', countdown: timeLeft });
          
          if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            dispatch({ type: 'HIDE_SUCCESS_MODAL' });
            dispatch({ type: 'RESET_FORM' });
            navigate('/orchids');
          }
        }, 1000);
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  // 9. Xử lý reset form
  const handleCancel = () => {
    dispatch({ type: 'RESET_FORM' });
    clearError();
  };

  // 10. Xử lý đóng modal thành công
  const handleCloseSuccessModal = () => {
    dispatch({ type: 'HIDE_SUCCESS_MODAL' });
    dispatch({ type: 'RESET_FORM' });
    // Chuyển hướng đến trang list orchid
    navigate('/orchids');
  };

  return (
    <div style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      padding: '20px 0'
    }}>
      <Container fluid>
        <Row className="justify-content-center h-100">
          <Col xs={12} sm={10} md={8} lg={6} xl={4}>
            <Card style={{
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              border: 'none'
            }}>
              <Card.Body style={{ padding: '2.5rem' }}>
                <div className="text-center mb-4">
                  <h2 style={{
                    background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    fontWeight: '700',
                    fontSize: '2rem',
                    marginBottom: '0.5rem'
                  }}>
                    🌺 Orchid Shop
                  </h2>
                  <p className="text-muted" style={{ fontSize: '1.1rem' }}>Please sign in to continue</p>
                </div>
                
                {/* Hiển thị lỗi từ AuthContext */}
                {error && (
                  <Alert variant="danger" className="mb-3" style={{
                    borderRadius: '15px',
                    border: 'none',
                    background: 'linear-gradient(45deg, #ff6b6b, #feca57)',
                    color: 'white'
                  }}>
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label style={{ fontWeight: '600', color: '#2c3e50' }}>Username or Email</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter username or email"
                      value={formState.identifier}
                      onChange={(e) => handleInputChange('identifier', e.target.value)}
                      isInvalid={!!formState.errors.identifier}
                      disabled={loading}
                      style={{
                        borderRadius: '15px',
                        padding: '12px 16px',
                        border: '2px solid #e9ecef',
                        fontSize: '1rem'
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.identifier}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ fontWeight: '600', color: '#2c3e50' }}>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter password"
                      value={formState.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      isInvalid={!!formState.errors.password}
                      disabled={loading}
                      style={{
                        borderRadius: '15px',
                        padding: '12px 16px',
                        border: '2px solid #e9ecef',
                        fontSize: '1rem'
                      }}
                    />
                    <Form.Control.Feedback type="invalid">
                      {formState.errors.password}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <div className="d-grid gap-2">
                    <Button 
                      type="submit"
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '12px 24px',
                        fontWeight: '600',
                        fontSize: '1rem',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                        }
                      }}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Signing in...
                        </>
                      ) : (
                        'Login'
                      )}
                    </Button>
                    <Button 
                      type="button"
                      onClick={handleCancel}
                      disabled={loading}
                      style={{
                        background: 'linear-gradient(45deg, #95a5a6, #7f8c8d)',
                        border: 'none',
                        borderRadius: '25px',
                        padding: '12px 24px',
                        fontWeight: '600',
                        fontSize: '1rem',
                        boxShadow: '0 4px 15px rgba(149, 165, 166, 0.4)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (!loading) {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 6px 20px rgba(149, 165, 166, 0.6)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!loading) {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 15px rgba(149, 165, 166, 0.4)';
                        }
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Modal thông báo thành công */}
        <ConfirmModal
          show={formState.showSuccessModal}
          title="🎉 Login Successful!"
          message={user ? `Welcome back, ${user.username}! You have successfully logged in as an ${user.role}. 

Redirecting to orchid collection in ${formState.countdown} seconds...

Click OK to continue immediately.` : `Login successful! Redirecting to orchid collection in ${formState.countdown} seconds...`}
          onConfirm={handleCloseSuccessModal}
          onHide={handleCloseSuccessModal}
        />
      </Container>
    </div>
  );
}

export default LoginForm;