import React from 'react';

import Container from '@/components/elements/Container';
import { BookCreateForm } from '@/components/parts/Books';

const BookCreate = () => {
  return (
    <Container>
      <div className="glass-card max-w-[400px] mx-auto px-5 py-7">
        <h1 className="text-xl font-medium text-center mb-4">Add Your Data Book</h1>

        <BookCreateForm />
      </div>
    </Container>
  )
}

export default BookCreate;
