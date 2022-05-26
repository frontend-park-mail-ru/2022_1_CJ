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
				<div className="wrapper-content mt-8 mb-8 grow" style="gap: 4vw">
					{userStore.status === UserStatus.Authorized && <Menu />}
					<div className="flex grow items-stretch">{props.children}</div>
				</div>
			</div>
		</div>
	);
};
