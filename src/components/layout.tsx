import { Component, treact } from "@treact";
import { Header } from "src/components/header";
import { Menu } from "src/components/menu";
import { UserStatus, useUserStore } from "src/stores/user";

export const Layout: Component = (props) => {
	const [userStore] = useUserStore();
	return (
		<div className="content">
			<Header />
			<div className="wrapper">
				<div className="flex flex-r mt-8 mb-8 grow" style="gap: 2rem">
					{userStore.status === UserStatus.Authorized && <Menu />}
					{props.children}
				</div>
			</div>
		</div>
	);
};
