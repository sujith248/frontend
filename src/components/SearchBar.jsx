import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap';


const SearchBar = ({ handleSearch }) => {
    const [searchValue, setSearchValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch(searchValue);
    }

    return (
        <Form onSubmit={handleSubmit} className='d-flex align-items-end justify-content-start'>
            <Form.Group controlId="searchField">
                <Form.Control type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
            </Form.Group>
            <Button type="submit" className='mx-3'>Search</Button>
        </Form>
    );
}

export default SearchBar