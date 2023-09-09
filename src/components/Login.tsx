import React from 'react'
import GoogleButton from 'react-google-button'

const Login = () => {
  return (
    <div className='w-96 h-min py-6 bg-slate-300'>
			<div className='mx-6 py-6 bg-slate-500'>
				<h1 className='text-xl text-center'>Welcome Back,</h1>
				<h1 className='text-xl text-center'>Ready to learn something...</h1>
				<div className='pt-28'>
					<label htmlFor='login' className='flex justify-start items-start pl-4 text-lg'>Sign in using your Google Id:</label>
					{/* ⚠️⚠️ Not able to style the Google Login Button ⚠️⚠️ */}
					<div className='flex justify-center items-center pt-6'>
						<GoogleButton />
					</div>
				</div>
			</div>
    </div>
  )
}

export default Login