import React from "react";
import { useQuery } from "react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import NavigationBar from "./components/layout/NavigationBar";
import User from "./components/user/User";

const App = () => {
	// const query = useQuery(["ping"], () =>
	// 	fetch("http://localhost:5000/ping").then((res) => res.json())
	// );

	// console.log(query);

	return (
		<BrowserRouter>
			<NavigationBar />
			<Routes>
				<Route path='/' element={<div>Home</div>} />
				<Route path='/me' element={<User />} />
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='*' element={<div>Error 404</div>} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
