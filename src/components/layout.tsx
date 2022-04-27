import { treact } from "@treact";
import { UserStatus, useUserStore } from "src/stores/user";
import { Component } from "./@types/component";
import { Header } from "./header";
import { Menu } from "./menu";

export const Layout: Component = (props) => {
	const [userStore] = useUserStore();
	const children = props.children || [];
	return (
		<div className="wrapper">
			<Header />
			<div className="content flex flex-r">
				{userStore.status === UserStatus.Authorized && <Menu />}
				{children}
			</div>
		</div>
	);
};
