import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const Library = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Failed to fetch books');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('/api/books/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTerm }),
      });
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      } else {
        console.error('Failed to search for books');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddToLibrary = async (book) => {
    const { title, authors, description } = book;

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          author: authors ? authors.join(', ') : 'Unknown',
          description,
        }),
      });

      if (response.ok) {
        // Refresh the books in the library after successful addition
        fetchBooks();
      } else {
        console.error('Failed to add book to library');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <h2>Library</h2>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" value={searchTerm} onChange={handleSearchInputChange} placeholder="Search by book or author" />
        <button type="submit">Search</button>
      </form>
      {searchResults.length > 0 && (
        <div>
          <h3>Search Results</h3>
          {searchResults.map((result) => (
            <div key={result.id}>
              <h4>{result.title}</h4>
              <p>{result.authors ? result.authors.join(', ') : 'Unknown'}</p>
              <p>{result.description}</p>
              <button onClick={() => handleAddToLibrary(result)}>Add to Library</button>
            </div>
          ))}
        </div>
      )}
      <h3>My Library</h3>
      {books.map((book) => (
        <div key={book.id} onClick={() => handleBookClick(book)}>
          <h4>{book.title}</h4>
          <p>{book.author}</p>
        </div>
      ))}
      {selectedBook && (
        <div>
          <h3>Selected Book</h3>
          <h4>{selectedBook.title}</h4>
          <p>{selectedBook.author}</p>
          <p>{selectedBook.description}</p>
        </div>
      )}
    </Container>
  );
};

export default Library;