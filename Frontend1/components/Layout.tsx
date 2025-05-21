import { Button } from '@mantine/core';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-8">
            <span className="text-xl font-bold text-purple-600">JobBoard</span>
            <div className="hidden md:flex space-x-6">
              {['Home', 'Find Jobs', 'Find Talents', 'About Us', 'Testimonials'].map((item) => (
                <Link key={item} href="#" className="text-gray-600 hover:text-purple-600">
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <Link href="/jobs/create">
            <Button
              className="bg-sky-300 p-2 rounded-md"
              color="white"
              style={{ color: 'white' }}
            >
              Create Jobs
            </Button>
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto p-4">{children}</main>
    </div>
  );
}