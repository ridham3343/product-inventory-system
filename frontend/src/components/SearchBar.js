import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { productAPI } from '../services/api';

const SearchBar = ({ setProducts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');

  const handleSearch = async () => {
    try {
      const response = await productAPI.getAll(searchTerm, category);
      setProducts(response.data);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  return (
    <InputGroup className="mb-4">
      <Form.Control
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Form.Select value={category} onChange={(e) => setCategory(e.target.value)} style={{maxWidth: '200px'}}>
        <option value="all">All Categories</option>
        <option>Electronics</option>
        <option>Clothing</option>
        <option>Books</option>
        <option>Home & Garden</option>
        <option>Sports</option>
        <option>Other</option>
      </Form.Select>
      <Button onClick={handleSearch}>🔍 Search</Button>
    </InputGroup>
  );
};

export default SearchBar;