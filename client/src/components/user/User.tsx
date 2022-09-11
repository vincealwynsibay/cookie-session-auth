import React from "react";
import { useQuery } from "react-query";

interface Props {}

const User = (props: Props) => {
	const { data, isLoading } = useQuery(["user"], () =>
		fetch("http://localhost:5000/api/auth/me", {
			headers: {
				"Content-Type": "application/json",
			},
			credentials: "include",
		}).then((res) => res.json())
	);

	if (isLoading) {
		return null;
	}

	console.log(data);
	const { _id, email, name } = data.user;

	return (
		<div>
			<p>_id: {_id}</p>
			<p>name: {name}</p>
			<p>email: {email}</p>
		</div>
	);
};

export default User;
