import { useState } from 'react'
import Image from 'next/image'

const Navbar = () => {
	const [navBar, setNavBar] = useState(false);

  return (
    <header className='sm:px-16 px-8 py-8 absolute z-10 w-full bg-slate-300'>
      <nav className='flex justify-between items-center max-w-5xl mx-auto'>
				<a href='/' className='text-2xl'>18CSE416T</a>
				<ul className='flex justify-center items-center gap-12 max-lg:hidden'>
					<li><a href='/' className='text-xl'>Log In</a></li>
					<li><a href='/' className='text-xl'>Register</a></li>
				</ul>
				<button className='hidden max-lg:block' onClick={() => setNavBar(!navBar)}>
					{navBar ? (<Image src='/close.svg' alt='close' width={25} height={25} />) : (<Image src="/hamburger.svg" alt='hamburger' width={25} height={25} />)}
        </button>
				<div
            className={
							navBar 
								? "absolute min-w-max w-screen flex flex-col items-center top-20 left-0 bg-slate-500" 
								: "hidden"
						}
          >
					<ul className='flex justify-end items-start flex-1 flex-col gap-4 py-4'>
						<li onClick={() => {
							setNavBar(!navBar);
						}}><a href='/' className='text-xl'>Log In</a></li>
						<li onClick={() => {
							setNavBar(!navBar);
						}}><a href='/' className='text-xl'>Register</a></li>
					</ul>
        </div>
      </nav>
    </header>
  )
}

export default Navbar