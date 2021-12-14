import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";
import { Link, useHistory } from "react-router-dom";

export const Private = () => {
	const { store, actions } = useContext(Context);
	const history = useHistory();

	let privateZone = (
		<div>
			<h1>Zona privada</h1>
		</div>
	);

	return <div className="text-center mt-5">{privateZone}</div>;
};
