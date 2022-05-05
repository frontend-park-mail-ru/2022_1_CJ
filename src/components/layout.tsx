import { treact } from "@treact";
import { Menu } from "src/components/menu";
import { UserStatus, useUserStore } from "src/stores/user";
import { Component } from "./@types/component";
import { Header } from "./header";

export const Layout: Component = (props) => {
	const [userStore] = useUserStore();
	return (
		<div className="wrapper">
			<Header />
			<div className="content flex flex-r mt-8" style="gap: 2rem">
				{userStore.status === UserStatus.Authorized && <Menu />}
				{props.children}
			</div>
		</div>
	);
};
