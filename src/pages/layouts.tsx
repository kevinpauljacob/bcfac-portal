import Navbar from '@/components/layouts/Navbar';
import Footer from '@/components/layouts/Footer';
import { ReactNode } from 'react';
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

interface LayoutProps {
  children: ReactNode; 
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className={`flex flex-col max-w-[1300px] mx-auto sm:py-5 sm:px-10 py-10 px-5 min-h-screen ${montserrat.className}`}>
      <Navbar />
      <section className='my-5'>{children}</section>
      <Footer className=""/>
    </main>
  );
}
