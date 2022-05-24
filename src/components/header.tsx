import { treact } from "@treact";
import { Link } from "src/components/link";
import { Routes } from "src/constants/routes";
import { useUserStore } from "src/stores/user";

export const Header = () => {
	const [userStore] = useUserStore();
	const { user } = userStore;

	return (
		<header className="wrapper primary-header bg-white">
			<div className="flex flex-r grow items-center justify-between">
				<a className="fs-lg bold text-shadow text-primary no-decoration" href="/" data-link>
					CJ
				</a>
				{user && (
					<div className="flex flex-r">
						<div className="flex flex-r">
							<div className="profile flex flex-r items-center">
								<img className="avatar" src={user.image} alt="" />
								<p className="text-light">
									{user.name.first} {user.name.last}
								</p>
								<Link to={Routes.ProfileSettings}>Settings</Link>
								<Link to={Routes.Logout}>Sign out</Link>
							</div>
						</div>
					</div>
				)}
				{!user && <Link to={Routes.Login}>Sign in</Link>}
			</div>
		</header>
	);
};
