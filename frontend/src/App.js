import React, { useState} from 'react';
import { Container, Row, Col, Alert } from 'react-bootstrap';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';

function App() {
  const [error] = useState('');

  return (
    <Container fluid className="py-5 bg-light min-vh-100">
      <Row className="justify-content-center mb-5">
        <Col md={10}>
          <h1 className="text-center text-primary mb-4">📦 Product Inventory System</h1>
          <p className="text-center text-muted mb-0">Full Stack CRUD Application</p>
          
        </Col>
      </Row>
      
      {error && (
        <Alert variant="danger" className="mx-4">
          {error}
        </Alert>
      )}

      <Row className="mx-4">
        <Col md={4}>
          <ProductForm />
        </Col>
        <Col md={8}>
          <ProductList />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
