import GoogleButton from 'react-google-button';
import { useState } from 'react';

const Register = () => {
	// storing name and regnumber in formData, can be used to just display on site
	const [formData, setFormData] = useState({
		name: "",
		regNumber: ""
	});

	const { name, regNumber } = formData;

	// handling the onChange function allowing users to enter data
	const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  };

	const handleRegister = () => {};

  return (
    <div className='w-96 h-min py-6 bg-slate-300'>
      <div className='mx-6 py-6 bg-slate-500'>
				<h1 className='text-xl text-center'>Hey, Welcome!,</h1>
				<h1 className='text-xl text-center'>Please Register before you proceed</h1>
				<div>
					<form onSubmit={handleRegister}>
						{/* Label for name */}
						<div className='flex flex-col justify-start items-start m-3'>
							<label htmlFor='name'>Name:</label>
							<input 
								className='w-full py-3 px-4 rounded-md outline-none'
								id="name"
								name="name" 
								type="text" 
								required
								value={name}
								placeholder='Aryan'
								onChange={onChange}
							/>
						</div>
						{/* Label for RegNumber */}
						<div className='flex flex-col justify-start items-start m-3'>
						<label htmlFor='regNumber'>Registration Number:</label>
							<input 
								className='w-full py-3 px-4 rounded-md outline-none'
								id="regNumber"
								name="regNumber" 
								type="text" 
								required
								value={regNumber}
								placeholder='RA2111050010006'
								onChange={onChange}
							/>
						</div>
						{/* ⚠️⚠️ Not able to style the Google Login Button ⚠️⚠️ */}
						<div className='flex justify-center items-center pt-3'>
							<GoogleButton />
						</div>
					</form>
				</div>
			</div>
    </div>
  )
}

export default Register