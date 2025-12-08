import axios, { Axios } from 'axios';

interface CreateJam {
	name: string;
	bpm: number;
}

export class JamAPI {
	private instance: Axios;

	constructor() {
		this.instance = axios.create({
			baseURL: 'http://localhost:1234/jam/'
		});
	}

	createJam(data: CreateJam) {
		this.instance.post(JSON.stringify(data));
	}
}
