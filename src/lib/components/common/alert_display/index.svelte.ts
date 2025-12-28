import { SvelteMap } from "svelte/reactivity";

type NotifLevel = "info" | "warning" | "error";

export const notifications = new SvelteMap<string, Notif>();

export class Notif {
	id: string;
	level: NotifLevel;
	title: string;
	msg?: string;

	constructor(level: NotifLevel, title: string, msg?: string) {
		this.id = crypto.randomUUID();
		this.level = level;
		this.title = title;
		this.msg = msg;
	}

	discard() {
		console.log(this.title);
		notifications.delete(this.id);
	}
}

export function notify(level: NotifLevel, title: string, msg?: string) {
	const newNotif = new Notif(level, title, msg);
	notifications.set(newNotif.id, newNotif);
}
