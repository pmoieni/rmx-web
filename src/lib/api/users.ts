import axios, { Axios } from "axios";

export class UsersAPI {
	private instance: Axios;

	constructor() {
		this.instance = axios.create({
			baseURL: "http://localhost:1234/users/",
			withCredentials: true,
		});
	}

	authenticate(provider: "github" | "google") {
		window.location.replace(
			`http://localhost:1234/users/auth/login?provider=${provider}`,
		);
		/*
		this.instance
			.get(`/auth/login?provider=${provider}`)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
        */
	}
}
