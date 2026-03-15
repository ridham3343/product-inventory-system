import React, { useState, useEffect } from 'react';
import { Card, Form, Button, Alert } from 'react-bootstrap';
import { productAPI } from '../services/api';

const ProductForm = ({ onSuccess, editProduct }) => {

  const [formData, setFormData] = useState({
    name: '',
    category: 'Electronics',
    price: '',
    quantity: '',
    description: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (editProduct) {
      setFormData({
        name: editProduct.name || '',
        category: editProduct.category || 'Electronics',
        price: editProduct.price || '',
        quantity: editProduct.quantity || '',
        description: editProduct.description || ''
      });
    }
  }, [editProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.price || !formData.quantity) {
      setError('Name, Price, and Quantity are required!');
      return;
    }

    setLoading(true);

    try {

      if (editProduct) {
        await productAPI.update(editProduct._id, formData);
      } else {
        await productAPI.create(formData);
      }

      if (onSuccess) onSuccess();

      setFormData({
        name: '',
        category: 'Electronics',
        price: '',
        quantity: '',
        description: ''
      });

      setError('✅ Product saved successfully!');
      setTimeout(() => setError(''), 3000);

    } catch (err) {
      setError('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="h-100 shadow-sm">
      <Card.Header className="bg-primary text-white">
        <h5>{editProduct ? '✏️ Edit Product' : '➕ Add New Product'}</h5>
      </Card.Header>

      <Card.Body>
        <Form onSubmit={handleSubmit}>

          <Form.Group className="mb-3">
            <Form.Label>Name *</Form.Label>
            <Form.Control
              type="text"
              value={formData.name}
              onChange={(e)=>setFormData({...formData,name:e.target.value})}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Select
              value={formData.category}
              onChange={(e)=>setFormData({...formData,category:e.target.value})}
            >
              <option>Electronics</option>
              <option>Clothing</option>
              <option>Books</option>
              <option>Home & Garden</option>
              <option>Sports</option>
            </Form.Select>
          </Form.Group>

          <div className="row">
            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Price *</Form.Label>
              <Form.Control
                type="number"
                value={formData.price}
                onChange={(e)=>setFormData({...formData,price:e.target.value})}
              />
            </Form.Group>

            <Form.Group className="col-md-6 mb-3">
              <Form.Label>Quantity *</Form.Label>
              <Form.Control
                type="number"
                value={formData.quantity}
                onChange={(e)=>setFormData({...formData,quantity:e.target.value})}
              />
            </Form.Group>
          </div>

          <Button
            type="submit"
            className="w-100"
            disabled={loading}
          >
            {loading ? 'Saving...' : editProduct ? 'Update Product' : 'Add Product'}
          </Button>

        </Form>

        {error && <Alert className="mt-3">{error}</Alert>}
      </Card.Body>
    </Card>
  );
};

export default ProductForm;