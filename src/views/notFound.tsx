import { Component, treact } from "@treact";
import { Navigate } from "src/components/link";
import { Routes } from "src/constants/routes";
import "/src/assets/styles/modules/not_found.scss";

export const NotFound: Component = () => {
	return (
		<div className="flex flex-c grow items-center justify-center">
			<p className="hero-title">404</p>
			<p className="hero-title">
				<Navigate to={Routes.Base}>Go back</Navigate>
			</p>
		</div>
	);
};
