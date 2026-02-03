import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

function NavBar() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  // Inline styles
  const styles = {
    navbar: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      padding: '15px 0'
    },
    brand: {
      cursor: 'pointer',
      color: 'white',
      fontWeight: '700',
      fontSize: '24px',
      textDecoration: 'none',
      transition: 'all 0.2s ease'
    },
    navLink: {
      color: 'white',
      fontWeight: '500',
      fontSize: '16px',
      padding: '8px 15px',
      borderRadius: '8px',
      transition: 'all 0.2s ease',
      textDecoration: 'none',
      cursor: 'pointer'
    },
    dropdownToggle: {
      color: 'white',
      fontWeight: '500',
      fontSize: '16px',
      backgroundColor: 'transparent',
      border: 'none',
      padding: '8px 15px',
      borderRadius: '8px',
      transition: 'all 0.2s ease'
    },
    dropdownItem: {
      color: '#495057',
      fontWeight: '500',
      padding: '10px 20px',
      transition: 'all 0.2s ease'
    }
  };

  return (
    <Navbar expand="lg" style={styles.navbar}>
      <Container>
        <Navbar.Brand 
          onClick={handleHomeClick} 
          style={styles.brand}
          onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
          onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
          <i className="bi bi-flower1 me-2"></i>
          Orchid Demo
        </Navbar.Brand>
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          style={{ borderColor: 'white' }}
        />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              onClick={handleHomeClick} 
              style={styles.navLink}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <i className="bi bi-house me-1"></i>
              Home
            </Nav.Link>
            <Nav.Link 
              href="#about" 
              style={styles.navLink}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.2)'}
              onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
            >
              <i className="bi bi-info-circle me-1"></i>
              About
            </Nav.Link>
            <NavDropdown 
              title={
                <span style={{ color: 'white' }}>
                  <i className="bi bi-gear me-1"></i>
                  Actions
                </span>
              }
              id="basic-nav-dropdown"
              style={styles.dropdownToggle}
            >
              <NavDropdown.Item 
                href="#action/3.1"
                style={styles.dropdownItem}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <i className="bi bi-plus-circle me-2"></i>
                Add Orchid
              </NavDropdown.Item>
              <NavDropdown.Item 
                href="#action/3.2"
                style={styles.dropdownItem}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <i className="bi bi-tags me-2"></i>
                Categories
              </NavDropdown.Item>
              <NavDropdown.Item 
                href="#action/3.3"
                style={styles.dropdownItem}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <i className="bi bi-sliders me-2"></i>
                Settings
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item 
                href="#action/3.4"
                style={styles.dropdownItem}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f8f9fa'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <i className="bi bi-question-circle me-2"></i>
                Help
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
