import { ENDPOINTS, DOMAIN } from "./models";

export const addCronJob = async (
	githubRepo,
	backupFrequency,
	backupLocation
) => {
	const _body = {
		repositaryLink: githubRepo,
		backupFrequency: backupFrequency,
		backupLocation: backupLocation,
	};

	const response = await fetch(
		`http://${DOMAIN.aryan}/${ENDPOINTS.addBackup}`,
		{
			method: "POST",
			body: JSON.stringify(_body),
		}
	);
	console.log("response= ", response);

	if (response.status !== 200) {
		throw new Error("UnhandledError");
	}

	const raw = await response.json();
	return raw.success;
};

export const removeCronJob = async (
	githubRepo,
	backupFrequency,
	backupLocation
) => {
	const _body = {
		repositaryLink: githubRepo,
		backupFrequency: backupFrequency,
		backupLocation: backupLocation,
	};
	console.log("body", _body);
	const response = await fetch(
		`http://${DOMAIN.aryan}/${ENDPOINTS.stopBackup}`,
		{
			method: "POST",
			body: JSON.stringify(_body),
		}
	);

	console.log("response= ", response);

	if (response.status !== 200) {
		throw new Error("UnhandledError");
	}

	const raw = await response.json();
	return raw.success;
};
