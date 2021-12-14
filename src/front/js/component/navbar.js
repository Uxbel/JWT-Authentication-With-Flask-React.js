import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { Context } from "../store/appContext";

export const Navbar = () => {
	const { store, actions } = useContext(Context);

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					<Link to="/demo">
						<button className="btn btn-primary">Check the Context in action</button>
					</Link>
				</div>
				{store.token == null ? (
					<>
						<div className="ml-auto">
							<Link to="/login">
								<button className="btn btn-primary">Login</button>
							</Link>
						</div>
						<div className="ml-auto">
							<Link to="/sign-up">
								<button className="btn btn-primary">Sign Up</button>
							</Link>
						</div>
					</>
				) : (
					<div
						className="ml-auto"
						onClick={() => {
							actions.logout();
						}}>
						<Link to="/">
							<button className="btn btn-primary">Logout</button>
						</Link>
					</div>
				)}
			</div>
		</nav>
	);
};
