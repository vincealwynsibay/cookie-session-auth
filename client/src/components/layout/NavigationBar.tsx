import axios from "axios";
import React from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
interface Props {}

const NavigationBar = (props: Props) => {
	const mutation = useMutation(() => {
		return axios.post("http://localhost:5000/api/auth/logout");
	});

	return (
		<nav>
			<Link to='/'>Home</Link>
			<Link to='/login'>Login</Link>
			<Link to='/register'>Register</Link>
			<Link to='/me'>me</Link>

			{/* <button onClick={() => mutation.mutate()}>logout</button> */}
			<button
				onClick={() =>
					fetch("http://localhost:5000/api/auth/logout", {
						method: "get",
						headers: {
							"Content-Type": "application/json",
						},
						credentials: "include",
					})
				}
			>
				logout
			</button>
		</nav>
	);
};

export default NavigationBar;
