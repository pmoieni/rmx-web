import axios, { Axios, AxiosError } from 'axios';

interface CreateJamReq {
	name: string;
	bpm: number;
}

interface CreateJamRes {
	id: string;
}

export class JamAPI {
	private instance: Axios;

	constructor() {
		this.instance = axios.create({
			baseURL: 'http://localhost:1234/jam/'
		});
	}

	async createJam(data: CreateJamReq): Promise<Result> {
		try {
			const res = await this.instance.post(JSON.stringify(data));
		} catch (err) {
			const error = err as AxiosError;
			if (axios.isAxiosError(error)) {
				console.log(error);
			} else {
				console.log(err);
			}
		}
	}

	connectWS(data: CreateJamReq) {}
}
