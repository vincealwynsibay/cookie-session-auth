import React, { useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
interface Props {}

const Register = (props: Props) => {
	const [formData, setFormData] = useState({
		email: "",
		name: "",
		password: "",
	});

	const mutation = useMutation((credentials: any) => {
		return axios.post(
			"http://localhost:5000/api/auth/register",
			credentials,
			{
				withCredentials: true,
			}
		);
	});

	const handleSubmit = (e: any) => {
		e.preventDefault();
		mutation.mutate(formData);
	};
	const handleChange = (e: any) => {
		setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	return (
		<div>
			<h1>Register</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='email'
					onChange={handleChange}
					value={formData.email}
				/>
				<input
					type='text'
					name='name'
					onChange={handleChange}
					value={formData.name}
				/>
				<input
					type='text'
					name='password'
					onChange={handleChange}
					value={formData.password}
				/>
				<button type='submit'>Register</button>
			</form>
		</div>
	);
};

export default Register;
