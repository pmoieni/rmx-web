export class IndexedDB<T> {
	private db?: IDBDatabase;
	private objectStoreName: string;
	private objectStoreKeys: string[];
	private dbVersion: number;

	constructor(name: string, version: number, keys: string[]) {
		this.objectStoreName = name;
		this.objectStoreKeys = keys;
		this.dbVersion = version;
	}

	async connect(): Promise<void> {
		return new Promise((resolve, reject) => {
			const req = indexedDB.open("mutil", this.dbVersion);

			req.onupgradeneeded = () => {
				const db = req.result;

				// object store already exits
				if (db.objectStoreNames.contains(this.objectStoreName)) {
					db.deleteObjectStore(this.objectStoreName);
				}

				const objectStore = db.createObjectStore(this.objectStoreName, {
					keyPath: "id",
					autoIncrement: true,
				});

				for (const key of this.objectStoreKeys) {
					// TODO: check if generic has key
					objectStore.createIndex(`${key}-idx`, key, {
						unique: true,
						multiEntry: false,
					});
				}
			};

			req.onsuccess = () => {
				this.db = req.result;
				resolve();
			};

			req.onerror = () => {
				reject(req.error);
			};
		});
	}

	async getAll(): Promise<T[]> {
		return new Promise((resolve, reject) => {
			if (!this.db) return;

			let results: T[] = [];

			const transaction = this.db.transaction(
				this.objectStoreName,
				"readonly",
			);

			transaction.onerror = () => {
				reject(transaction.error);
			};

			transaction.onabort = () => {
				reject();
			};

			transaction.oncomplete = () => {
				resolve(results);
			};

			const objectStore = transaction.objectStore(this.objectStoreName);

			const req = objectStore.getAll();

			req.onerror = () => {
				reject(req.error);
			};

			req.onsuccess = () => {
				results = req.result;
			};
		});
	}

	/*
	async getByKey(keyName: string, keys: IDBValidKey[]): Promise<T[]> {
		return new Promise((resolve, reject) => {
			if (!this.db) return;

			const transaction = this.db.transaction(
				this.objectStoreName,
				"readonly",
			);

			transaction.onerror = () => {
				reject(transaction.error);
			};

			transaction.onabort = () => {
				reject();
			};

			const objectStore = transaction.objectStore(this.objectStoreName);
			const storeIdx = objectStore.index(`${keyName}-idx`);

			const results: T[] = [];

			for (const key of keys) {
				const req = storeIdx.get(key);

				req.onerror = () => {
					reject(req.error);
				};

				req.onsuccess = () => {
					results.push(req.result);
				};
			}

			transaction.oncomplete = () => {
				console.log("complete");
				resolve(results);
			};
		});
	}
    */

	save(puts: T[], callback: () => void) {
		if (!this.db) return;

		const transaction = this.db.transaction(
			this.objectStoreName,
			"readwrite",
		);
		const objectStore = transaction.objectStore(this.objectStoreName);

		transaction.onerror = (event) => {
			console.log(event);
		};

		transaction.onabort = (event) => {
			console.log(event);
		};

		let pendingRequests = 0;
		function dispatchRequest() {
			while (pendingRequests < 100 && puts.length !== 0) {
				const request = objectStore.put(puts.pop());
				request.onsuccess = () => {
					pendingRequests -= 1;
					dispatchRequest();
					callback();
				};
				pendingRequests += 1;
			}
		}
		dispatchRequest();
	}

	exists(): boolean {
		if (this.db) {
			return this.db.objectStoreNames.contains(this.objectStoreName);
		}

		return false;
	}

	async count(): Promise<number> {
		return new Promise((resolve, reject) => {
			if (this.db) {
				const transaction = this.db.transaction(
					this.objectStoreName,
					"readonly",
				);

				const objectStore = transaction.objectStore(
					this.objectStoreName,
				);

				transaction.onerror = () => {
					reject(transaction.error);
				};

				transaction.onabort = () => {
					reject();
				};

				const req = objectStore.count();

				req.onerror = () => {
					reject(req.error);
				};

				req.onsuccess = () => {
					resolve(req.result);
				};

				return;
			}

			resolve(0);
		});
	}
}
