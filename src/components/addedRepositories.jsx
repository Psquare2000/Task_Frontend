import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button } from "@mui/material";
import { FREQ, LSKeys } from "../models";
import { addCronJob, removeCronJob } from "../requests";

export default function AddedRepositories({ backups, setBackups }) {
	const columns = [
		{ field: "repoLink", headerName: "Repository", width: 300 },
		{ field: "location", headerName: "Backup Location", width: 140 },
		{ field: "displayFrequency", headerName: "Frequency", width: 100 },
		// {
		// 	field: "fullName",
		// 	headerName: "Full name",
		// 	description: "This column has a value getter and is not sortable.",
		// 	valueGetter: (params) =>
		// 		`${params.row.firstName || ""} ${params.row.lastName || ""}`,
		// },
		{
			field: "action",
			headerName: "Action",
			sortable: false,
			renderCell: (params) => {
				const onClick = async (e) => {
					const toMatch = params.row;
					console.log(toMatch);
					const response = await removeCronJob(
						toMatch.repoLink,
						Number(toMatch.frequency),
						toMatch.location
					);
					if (!response) {
						alert(
							"Unable to process your request at the moment, please try again!"
						);
						return;
					}
					setBackups((prev) => {
						let ripe = backups;
						ripe = ripe.filter((data) => {
							return (
								toMatch.repoLink !== data.repoLink ||
								toMatch.displayFrequency !==
									data.frequency.title ||
								toMatch.location !== data.location
							);
						});
						return ripe;
					});
					console.log("this");
				};
				return (
					<Button variant="contained" color="error" onClick={onClick}>
						Remove
					</Button>
				);
			},
		},
	];
	const rows = backups.map((backup, index) => {
		return {
			...backup,
			id: index,
			displayFrequency: backup.frequency.title,
		};
	});
	return (
		<div className="flex flex-col gap-y-5 p-10 pr-20 bg-slate-700 rounded-lg">
			<p className="text-2xl font-bold">Ongoing Backups</p>
			<div style={{ height: 500, width: "105%" }}>
				<DataGrid
					rows={rows}
					columns={columns}
					pageSize={5}
					rowsPerPageOptions={[5]}
				/>
			</div>
		</div>
	);
}
