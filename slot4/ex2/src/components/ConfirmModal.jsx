import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ConfirmModal({ show, title, message, onConfirm, onHide }) {
  return (
    <Modal show={show} onHide={onHide} centered>
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
            fontSize: '1.3rem'
          }}>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ 
          background: 'rgba(255, 255, 255, 0.98)',
          backdropFilter: 'blur(10px)',
          padding: '2rem'
        }}>
          <p style={{ 
            fontSize: '1.1rem',
            color: '#495057',
            lineHeight: '1.6',
            marginBottom: 0
          }}>
            {message}
          </p>
        </Modal.Body>
        <Modal.Footer style={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
          border: 'none',
          padding: '1rem 2rem'
        }}>
          <Button 
            onClick={onConfirm}
            style={{
              background: 'linear-gradient(45deg, #667eea, #764ba2)',
              border: 'none',
              borderRadius: '25px',
              padding: '10px 25px',
              fontWeight: '600',
              boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </div>
    </Modal>
  );
}

export default ConfirmModal;