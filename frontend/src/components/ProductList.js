import React, { useState, useEffect } from 'react';
import { Card, Table, Spinner, Button, Modal, Badge, Alert } from 'react-bootstrap';
import { productAPI } from '../services/api';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ show: false, id: null });
  const [error] = useState('');
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await productAPI.getAll();
      setProducts(response.data || []);
      setError('');
    } catch (err) {
      setError('Failed to load products. Is backend running on port 5000?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async () => {
    try {
      await productAPI.delete(deleteModal.id);
      setProducts(products.filter(p => p._id !== deleteModal.id));
      setDeleteModal({ show: false, id: null });
    } catch (err) {
      setError('Delete failed');
    }
  };

  if (loading) {
    return (
      <Card className="text-center p-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading products...</p>
      </Card>
    );
  }

  return (
    <>
      <Card className="h-100 shadow-sm">
        <Card.Header className="bg-success text-white d-flex justify-content-between align-items-center">
          <h5>📋 Products ({products.length})</h5>
          <Button variant="outline-light" size="sm" onClick={fetchProducts}>
            🔄 Refresh
          </Button>
        </Card.Header>
        <Card.Body className="p-0">
          {error && <Alert variant="warning" className="m-3">{error}</Alert>}
          
          {products.length === 0 ? (
            <div className="text-center py-5">
              <h5>📭 No products found</h5>
              <p className="text-muted">Add your first product!</p>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Created</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id || product.id}>
                      <td>{product.name}</td>
                      <td><Badge bg="info">{product.category}</Badge></td>
                      <td>${parseFloat(product.price || 0).toFixed(2)}</td>
                      <td>
                        <Badge bg={product.quantity > 5 ? 'success' : 'warning'}>
                          {product.quantity || 0}
                        </Badge>
                      </td>
                      <td>{new Date(product.createdAt || Date.now()).toLocaleDateString()}</td>
                      <td>
                        <Button size="sm" variant="outline-primary" className="me-1">✏️ Edit</Button>
                        <Button 
                          size="sm" 
                          variant="outline-danger" 
                          onClick={() => setDeleteModal({ show: true, id: product._id })}
                        >
                          🗑️ Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
      </Card>

      <Modal show={deleteModal.show} onHide={() => setDeleteModal({ show: false, id: null })}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this product permanently?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModal({ show: false, id: null })}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductList;