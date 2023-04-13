export const DOMAIN = {
	localhost: "localhost:4001",
};

export const ENDPOINTS = {
	addBackup: "cronjob",
	stopBackup: "stop",
};

export const FREQ = {
	daily: { title: "daily", frequency: 86400 },
	weekly: { title: "weekly", frequency: 604800 },
	monthly: { title: "monthly", frequency: 2592000 },
};

export const LSKeys = {
	ongoingBackups: "ongoingBackups",
};
