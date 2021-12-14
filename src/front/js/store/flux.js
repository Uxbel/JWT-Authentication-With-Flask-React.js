const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null, // Recibe el token desde el back
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: () => {
				// fetching data from the backend
				fetch(process.env.BACKEND_URL + "/api/hello")
					.then(resp => resp.json())
					.then(data => setStore({ message: data.message }))
					.catch(error => console.log("Error loading message from backend", error));
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},

			signUp: async (event, email, password, confirmationPassword) => {
				// Función async porque no queremos avanzar a la siguiente página hasta que no conteste el fetch
				event.preventDefault(); // Evita el comportamiento estándard del evento del submit que lanza por defecto un post o un get cuando se inicia la carga de la página
				if (password !== confirmationPassword) {
					alert("Las contraseñas no coinciden");
					return;
				}
				const url = "https://3001-gold-roundworm-ijq2ext3.ws-eu23.gitpod.io/api/sign-up";
				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				});
				const responseJson = await response.json(); //Función asíncrona que al recibir el json lo guarda en la variable responseJson para poder realizar posteriormente verificaciones sobre los datos devueltos en el body, por ejemplo en token de seguridad devuelto.

				if (responseJson.access_token) {
					//Si el POST devuelve un accessToken el formulario accede a la siguiente página.
					localStorage.setItem("access_token", responseJson.access_token); // Para guardar el accessToken en el localStorage por el tiempo especificado.
					setStore({ token: responseJson.access_token });
					return true;
				} else return false;

				//Para pasar al segundo componente que muestra info de registro
			},

			logout: () => {
				localStorage.clear(); //borra todo lo que hay en el localStorage con el ".clear"
				console.log("Login out");
				setStore({ token: null }); //y establezco el token del store vacío
			},

			login: async (event, email, password) => {
				// Función async porque no queremos avanzar a la siguiente página hasta que no conteste el fetch
				event.preventDefault(); // Evita el comportamiento estándard del evento del submit que lanza por defecto un post o un get cuando se inicia la carga de la página

				const url = "https://3001-gold-roundworm-ijq2ext3.ws-eu23.gitpod.io/api/login";
				const response = await fetch(url, {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: JSON.stringify({
						email: email,
						password: password
					})
				});
				const responseJson = await response.json(); //Función asíncrona que al recibir el json lo guarda en la variable responseJson para poder realizar posteriormente verificaciones sobre los datos devueltos en el body, por ejemplo en token de seguridad devuelto.

				if (responseJson.access_token) {
					//Si el POST devuelve un accessToken el formulario accede a la siguiente página.
					localStorage.setItem("access_token", responseJson.access_token); // Para guardar el accessToken en el localStorage por el tiempo especificado.
					setStore({ token: responseJson.access_token });
					return true;
				} else return false;

				//Para pasar al segundo componente que muestra info de registro
			}
		}
	};
};

export default getState;
