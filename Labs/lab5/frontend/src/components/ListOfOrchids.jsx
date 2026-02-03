import { useEffect, useState } from "react";
import axios from "axios";
import { Table, Container, Button, Form, FormGroup, Image, Modal, Card } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function ListOfOrchids() {
  const baseUrl = import.meta.env.VITE_API_URL;

  const [api, setAPI] = useState([]);
  const [categories, setCategories] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      overflow: 'hidden'
    },
    cardHeader: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '20px',
      border: 'none'
    },
    table: {
      marginBottom: 0
    },
    tableHeader: {
      backgroundColor: '#f1f3f4',
      borderBottom: '2px solid #667eea'
    },
    tableHeaderCell: {
      color: '#495057',
      fontWeight: '600',
      padding: '15px',
      borderBottom: '2px solid #667eea'
    },
    tableCell: {
      padding: '15px',
      verticalAlign: 'middle'
    },
    orchidImage: {
      width: '70px',
      height: '70px',
      objectFit: 'cover',
      borderRadius: '10px',
      border: '3px solid #e9ecef',
      transition: 'transform 0.2s ease'
    },
    badge: {
      padding: '8px 12px',
      borderRadius: '20px',
      fontSize: '0.85rem',
      fontWeight: '500'
    },
    naturalBadge: {
      backgroundColor: '#28a745',
      color: 'white'
    },
    cultivatedBadge: {
      backgroundColor: '#fd7e14',
      color: 'white'
    },
    actionButton: {
      padding: '8px 15px',
      borderRadius: '8px',
      textDecoration: 'none',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
      border: 'none',
      marginRight: '10px'
    },
    editButton: {
      backgroundColor: '#17a2b8',
      color: 'white'
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: 'white'
    },
    addButton: {
      background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
      border: 'none',
      borderRadius: '10px',
      padding: '12px 20px',
      fontWeight: '600',
      boxShadow: '0 4px 15px rgba(40, 167, 69, 0.3)',
      transition: 'all 0.2s ease'
    },
    modal: {
      borderRadius: '15px',
      overflow: 'hidden'
    },
    modalHeader: {
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      border: 'none'
    },
    modalBody: {
      backgroundColor: '#f8f9fa',
      padding: '30px'
    },
    formLabel: {
      color: '#495057',
      fontWeight: '600',
      marginBottom: '8px'
    },
    formControl: {
      borderRadius: '10px',
      border: '2px solid #e9ecef',
      padding: '12px 15px',
      fontSize: '16px',
      transition: 'border-color 0.2s ease'
    },
    switchLabel: {
      color: '#495057',
      fontWeight: '600',
      fontSize: '16px'
    },
    submitButton: {
      background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)',
      border: 'none',
      borderRadius: '10px',
      padding: '12px 25px',
      fontWeight: '600'
    },
    cancelButton: {
      backgroundColor: 'transparent',
      border: '2px solid #6c757d',
      borderRadius: '10px',
      padding: '12px 25px',
      color: '#6c757d',
      fontWeight: '600'
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  /* ================= FETCH DATA ================= */
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseUrl}/orchids`);
      // nếu backend bọc ApiResponse
      const data = response.data.result ?? response.data;
      const sortedData = data.sort((a, b) => b.id - a.id);
      setAPI(sortedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Load orchid list failed!");
    }
  };

  /* ================= FETCH CATEGORIES ================= */
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${baseUrl}/categories`);
      const data = response.data.result ?? response.data;
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Load categories failed!");
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, []);

  /* ================= DELETE ================= */
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${baseUrl}/orchids/${id}`);
      toast.success("Orchid deleted successfully!");
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Orchid deleted failed!");
    }
  };

  /* ================= CREATE ================= */
  const onSubmit = async (data) => {
    try {
      // Đảm bảo có category
      const orchidData = {
        ...data,
        category: {
          id: parseInt(data.categoryId)
        },
        isAttractive: true, // mặc định
        orchidDescription: data.orchidDescription || "No description"
      };

      console.log("Sending data:", orchidData);

      await axios.post(`${baseUrl}/orchids`, orchidData, {
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Orchid added successfully!");
      handleClose();
      reset();
      fetchData();
    } catch (error) {
      console.error(error);
      toast.error("Orchid added failed!");
    }
  };

  return (
    <div style={styles.container}>
      <Container className="py-4">
        <Toaster position="top-right" />

        <Card style={styles.card}>
          <Card.Header style={styles.cardHeader}>
            <h2 style={{ margin: 0, fontSize: '28px' }}>
              <i className="bi bi-flower1 me-3"></i>
              Orchid Collection
            </h2>
          </Card.Header>
          <Card.Body style={{ padding: 0 }}>
            <Table hover style={styles.table}>
              <thead style={styles.tableHeader}>
                <tr>
                  <th style={styles.tableHeaderCell}>Image</th>
                  <th style={styles.tableHeaderCell}>Orchid Name</th>
                  <th style={styles.tableHeaderCell}>Type</th>
                  <th style={styles.tableHeaderCell}>
                    <Button
                      onClick={handleShow}
                      style={styles.addButton}
                      onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                      <i className="bi bi-plus-circle me-2" />
                      Add New Orchid
                    </Button>
                  </th>
                </tr>
              </thead>

              <tbody>
                {api.map((a) => (
                  <tr key={a.id} style={{ borderBottom: '1px solid #e9ecef' }}>
                    <td style={styles.tableCell}>
                      <img
                        src={a.orchidUrl || a.image}
                        alt={a.name}
                        style={styles.orchidImage}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                      />
                    </td>

                    <td style={{ ...styles.tableCell, fontWeight: '600', color: '#495057' }}>
                      {a.name || a.orchidName}
                    </td>

                    <td style={styles.tableCell}>
                      {a.isNatural ? (
                        <span style={{ ...styles.badge, ...styles.naturalBadge }}>
                          <i className="bi bi-leaf me-1"></i>
                          Natural
                        </span>
                      ) : (
                        <span style={{ ...styles.badge, ...styles.cultivatedBadge }}>
                          <i className="bi bi-gear me-1"></i>
                          Cultivated
                        </span>
                      )}
                    </td>

                    <td style={styles.tableCell}>
                      <Link
                        to={`/edit/${a.id}`}
                        style={{ ...styles.actionButton, ...styles.editButton }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                      >
                        <i className="bi bi-pencil-square me-1" /> Edit
                      </Link>

                      <button
                        style={{ ...styles.actionButton, ...styles.deleteButton }}
                        onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                        onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                        onClick={() => {
                          if (window.confirm("Are you sure you want to delete this orchid?")) {
                            handleDelete(a.id);
                          }
                        }}
                      >
                        <i className="bi bi-trash3 me-1" /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        {/* ================= MODAL ADD ================= */}
        <Modal show={show} onHide={handleClose} backdrop="static" centered>
          <div style={styles.modal}>
            <Modal.Header closeButton style={styles.modalHeader}>
              <Modal.Title style={{ fontSize: '24px' }}>
                <i className="bi bi-plus-circle me-2"></i>
                Add New Orchid
              </Modal.Title>
            </Modal.Header>

            <Modal.Body style={styles.modalBody}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormGroup className="mb-4">
                  <Form.Label style={styles.formLabel}>
                    <i className="bi bi-flower1 me-2"></i>
                    Orchid Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus
                    style={styles.formControl}
                    placeholder="Enter orchid name..."
                    {...register("name", { required: true })}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
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
                  <Form.Control
                    type="text"
                    placeholder="https://example.com/image.jpg"
                    style={styles.formControl}
                    {...register("orchidUrl", {
                      required: true,
                      pattern: /^https?:\/\/.+/i,
                    })}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                  {errors.orchidUrl && (
                    <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                      <i className="bi bi-exclamation-circle me-1"></i>
                      Please enter a valid image URL
                    </p>
                  )}
                </FormGroup>

                <FormGroup className="mb-4">
                  <Form.Label style={styles.formLabel}>
                    <i className="bi bi-tag me-2"></i>
                    Category
                  </Form.Label>
                  <Form.Select
                    style={styles.formControl}
                    {...register("categoryId", { required: true })}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  >
                    <option value="">Select a category...</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.categoryName}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.categoryId && (
                    <p style={{ color: '#dc3545', fontSize: '14px', marginTop: '5px', marginBottom: 0 }}>
                      <i className="bi bi-exclamation-circle me-1"></i>
                      Category is required
                    </p>
                  )}
                </FormGroup>

                <FormGroup className="mb-4">
                  <Form.Label style={styles.formLabel}>
                    <i className="bi bi-text-paragraph me-2"></i>
                    Description
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter orchid description..."
                    style={styles.formControl}
                    {...register("orchidDescription")}
                    onFocus={(e) => e.target.style.borderColor = '#667eea'}
                    onBlur={(e) => e.target.style.borderColor = '#e9ecef'}
                  />
                </FormGroup>

                <FormGroup className="mb-4">
                  <Form.Check
                    type="switch"
                    label="Natural Orchid"
                    style={styles.switchLabel}
                    {...register("isNatural")}
                  />
                </FormGroup>

                <FormGroup className="mb-4">
                  <Form.Check
                    type="switch"
                    label="Attractive Orchid"
                    style={styles.switchLabel}
                    defaultChecked={true}
                    {...register("isAttractive")}
                  />
                </FormGroup>

                <div style={{ display: 'flex', gap: '15px', justifyContent: 'flex-end', marginTop: '30px' }}>
                  <Button
                    type="button"
                    onClick={handleClose}
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
                    <i className="bi bi-x-circle me-2"></i>
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    style={styles.submitButton}
                    onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    <i className="bi bi-check-circle me-2"></i>
                    Add Orchid
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </div>
        </Modal>
      </Container>
    </div>
  );
}
