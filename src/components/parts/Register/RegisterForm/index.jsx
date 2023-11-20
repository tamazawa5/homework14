'use client';

import React, { useCallback, useState } from 'react';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import TextInput from '@/components/elements/TextInput';
import FormControl from '@/components/elements/FormControl';
import Button from '@/components/elements/Button';
import useMutation from '@/lib/hooks/useMutation';
import { register } from '@/repositories/auth';

const RegisterForm = () => {
  const router = useRouter();
  const [error, setError] = useState({
    confirmPassword: undefined,
  });

  const checkConfirmPassword = useCallback((password, confirmPassword) => {
    let isValid = true;

    if (password !== confirmPassword) {
      setError((prev) => ({
        ...prev,
        confirmPassword: 'Password and confirm password must be same',
      }));

      isValid = false;
    } else {
      setError((prev) => ({
        ...prev,
        confirmPassword: undefined,
      }))
    }

    return isValid;
  }, []);

  const registerMutation = useMutation({
    apiFn: register,
    onSuccess: () => {
      toast.success('Account created successfully');

      router.push('/login');
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleSubmit = useCallback((e) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const isValidConfirmPassword = checkConfirmPassword(formData.get('password'), formData.get('confirmPassword'));

    if (!isValidConfirmPassword) return;

    registerMutation.mutate({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    });
  }, [checkConfirmPassword, registerMutation]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col gap-1">
        <FormControl label="Your name" id="name">
          <TextInput
            id="name"
            name="name"
            placeholder="Your name"
            isBlock
            required
          />
        </FormControl>

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
            minLength={8}
          />
        </FormControl>

        <FormControl label="Confirm password" id="confirmPassword" error={error.confirmPassword}>
          <TextInput
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            isBlock
            required
            minLength={8}
          />
        </FormControl>
      </div>

      <Button
        type="submit"
        className="mt-8 btn-block"
        isLoading={registerMutation.isLoading}
        loadingText="Creating account..."
      >
        Create Account
      </Button>

      <p className="text-center mt-3">
        Have a account? <Link href="/login" className="link link-primary">Login</Link>
      </p>
    </form>
  )
}

export default RegisterForm;
