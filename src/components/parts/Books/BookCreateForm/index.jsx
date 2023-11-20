'use client';

import React, { useCallback } from 'react';

import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import TextInput from '@/components/elements/TextInput';
import FormControl from '@/components/elements/FormControl';
import Button from '@/components/elements/Button';
import useMutation from '@/lib/hooks/useMutation';
import { createBook } from '@/repositories/book';

const BookCreateForm = () => {
  const router = useRouter();

  const createBookMutation = useMutation({
    apiFn: createBook,
    onSuccess: () => {
      router.push('/');
      router.refresh();
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    createBookMutation.mutate(formData);
  }, [createBookMutation]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <FormControl label="Book title" id="title">
          <TextInput
            id="title"
            name="title"
            placeholder="Book title"
            isBlock
            required
          />
        </FormControl>

        <FormControl label="Book author" id="author">
          <TextInput
            id="author"
            name="author"
            placeholder="Book author"
            isBlock
            required
          />
        </FormControl>

        <FormControl label="Book publisher" id="publisher">
          <TextInput
            id="publisher"
            name="publisher"
            placeholder="Book publisher"
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
            isBlock
            required
            min="1"
          />
        </FormControl>

        <FormControl label="Book image" id="image">
          <TextInput
            type="file"
            id="image"
            name="image"
            isBlock
            required
            accept="image/png, image/jpeg, image/jpg"
            
          />
        </FormControl>
      </div>

      <Button
        type="submit"
        className="mt-8 btn-block"
        isLoading={createBookMutation.isLoading}
        loadingText="Adding book.."
      >
        Add Book
      </Button>
    </form>
  )
}

export default BookCreateForm;
