import React, { useState } from "react";
import { useMutation } from "react-query";
import axios from "axios";
interface Props {}

const Login = (props: Props) => {
	const [formData, setFormData] = useState({
		email: "test@test.com",
		password: "test123",
	});

	const mutation = useMutation((credentials: any) => {
		return axios.post("http://localhost:5000/api/auth/login", credentials, {
			withCredentials: true,
		});
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
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					name='email'
					onChange={handleChange}
					value={formData.email}
				/>
				<input
					type='text'
					name='password'
					onChange={handleChange}
					value={formData.password}
				/>
				<button type='submit'>Login</button>
			</form>
		</div>
	);
};

export default Login;
