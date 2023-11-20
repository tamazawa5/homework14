'use client';

import React, { useCallback, useState } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import TextInput from '@/components/elements/TextInput';
import FormControl from '@/components/elements/FormControl';
import Button from '@/components/elements/Button';
import useMutation from '@/lib/hooks/useMutation';
import { updateBook } from '@/repositories/book';

const BookEditForm = ({ initialValue }) => {
  const [book, setBook] = useState(initialValue);
  const router = useRouter();

  const editBookMutation = useMutation({
    apiFn: (data) => updateBook(book.id, data),
    onSuccess: () => {
      router.replace('/');
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;

    setBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    editBookMutation.mutate(book);
  }, [editBookMutation, book]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <FormControl label="Book title" id="title">
          <TextInput
            id="title"
            name="title"
            placeholder="Book title"
            value={book.title}
            onChange={handleChange}
            isBlock
            required
          />
        </FormControl>

        <FormControl label="Book author" id="author">
          <TextInput
            id="author"
            name="author"
            placeholder="Book author"
            value={book.author}
            onChange={handleChange}
            isBlock
            required
          />
        </FormControl>

        <FormControl label="Book publisher" id="publisher">
          <TextInput
            id="publisher"
            name="publisher"
            placeholder="Book publisher"
            value={book.publisher}
            onChange={handleChange}
            isBlock
            required
          />
        </FormControl>

        <FormControl label="Book year" id="year">
          <TextInput
            type="number"
            id="year"
            name="year"
            placeholder="Book year"
            value={book.year}
            onChange={handleChange}
            isBlock
            required
            min="1900"
            max="2099"
            step="1"
          />
        </FormControl>

        <FormControl label="Book pages" id="pages">
          <TextInput
            type="number"
            id="pages"
            name="pages"
            placeholder="Book pages"
            value={book.pages}
            onChange={handleChange}
            isBlock
            required
            min="1"
          />
        </FormControl>
      </div>

      <Button
        type="submit"
        className="mt-8 btn-block"
        isLoading={editBookMutation.isLoading}
        loadingText="Updating book.."
      >
        Update Book
      </Button>
    </form>
  )
}

export default BookEditForm;
