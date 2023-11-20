import React from 'react'

import Link from 'next/link';

import Container from '@/components/elements/Container';
import Button from '@/components/elements/Button';
import { getCookie } from '@/lib/cookie';

import LogoutButton from './LogoutButton';

const Navbar = () => {
  const token = getCookie('token');

  return (
    <Container className="sticky top-2 z-[999] mb-8">
      <nav className="glass-card py-4 px-6 flex justify-between items-center gap-4">
        <Link href="/" className="text-primary">Books</Link>

        <div className="flex gap-4">
          {token ? (
            <>
              <Button href="/books/create" className="btn-sm btn-outline">
                Add Book
              </Button>
              <LogoutButton />
            </>
          ) : (
            <>
              <Button href="/register" className="btn-sm btn-outline">
                Register
              </Button>
              <Button href="/login" className="btn-sm">
                Login
              </Button>
            </>
          )}
        </div>
      </nav>
    </Container>
  )
}

export default Navbar;
