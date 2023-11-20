'use client';

import React, { useCallback } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import TextInput from '@/components/elements/TextInput';
import FormControl from '@/components/elements/FormControl';
import Button from '@/components/elements/Button';
import useMutation from '@/lib/hooks/useMutation';
import { login } from '@/repositories/auth';

const LoginForm = () => {
  const router = useRouter();

  const loginMutation = useMutation({
    apiFn: login,
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

    loginMutation.mutate({
      email: formData.get('email'),
      password: formData.get('password'),
    });
  }, [loginMutation]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <FormControl label="Your email" id="email">
          <TextInput
            type="email"
            id="email"
            name="email"
            placeholder="Your email"
            isBlock
            required
          />
        </FormControl>

        <FormControl label="Password" id="password">
          <TextInput
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            isBlock
            required
          />
        </FormControl>
      </div>

      <Button
        type="submit"
        className="mt-8 btn-block"
        isLoading={loginMutation.isLoading}
        loadingText="Loading..."
      >
        Login
      </Button>

      <p className="text-center mt-3">
        Don&apos;t have a account? <Link href="/register" className="link link-primary">Register</Link>
      </p>
    </form>
  )
}

export default LoginForm;
