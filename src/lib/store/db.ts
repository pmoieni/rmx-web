export class IndexedDB {
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

	getByKey(keyName: string, keys: string[]): IDBRequest[] {
		if (!this.db) return [];

		const transaction = this.db.transaction(
			this.objectStoreName,
			"readonly",
		);
		const objectStore = transaction.objectStore(this.objectStoreName);

		const storeIdx = objectStore.index(`${keyName}-idx`);

		const items: IDBRequest[] = [];

		for (const key of keys) {
			const req = storeIdx.get(key);

			req.onerror = (event) => {
				console.log(event);
			};

			req.onsuccess = () => {
				items.push(req.result);
			};
		}

		return items;
	}

	save<T>(puts: T[], callback: () => void) {
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
}
