import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	let step1Html = (
		<div>
			<h1>Login</h1>
			<form
				onSubmit={async event => {
					let response = await actions.login(event, email, password);

					if (response) {
						history.push("/private");
					}
				}}>
				{" "}
				{/* Utilizamos el onSubmit para evitar que se recarge la página */}
				<input type="email" placeholder="email" required onChange={event => setEmail(event.target.value)} />
				<input
					type="password"
					placeholder="Password"
					required /* Se utiliza para que el campo no pueda quedar libre, campo requerid */
					onChange={event => setPassword(event.target.value)}
				/>
				<input type="submit" value="login" />
			</form>
		</div>
	);

	return <div className="text-center mt-5">{step1Html}</div>;
};
