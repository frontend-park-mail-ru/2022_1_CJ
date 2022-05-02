import { treact } from "@treact";
import { AuthMiddleware } from "src/components/@middlewares/auth";
import { Component } from "src/components/@types/component";

export const Base: Component = () => {
	return <AuthMiddleware />;
};
