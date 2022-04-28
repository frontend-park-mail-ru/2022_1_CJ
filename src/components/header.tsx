import { treact } from "@treact";
import { URL } from "src/constants/constants";
import { useUserStore } from "src/stores/user";
import "/src/assets/styles/header.scss";
import { Link } from "./link";

export const Header = () => {
	const [userStore] = useUserStore();
	const { user } = userStore;

	return (
		<header className="primary-header wrapper bg-white">
			<div className="content flex flex-r items-center justify-between">
				<a className="text-xxl fw-700 text-shadow text-primary text-no-decoration" href="/" data-link>
					CJ
				</a>
				{user && (
					<div className="flex flex-r">
						<div className="flex flex-r">
							<div className="profile flex flex-r items-center">
								<img className="icon profile-avatar" src={user.image} alt="" />
								<p className="text-light">
									{user.name.first} {user.name.last}
								</p>
								<Link to={URL.ProfileSettings}>Settings</Link>
								<Link to={URL.Logout}>Sign out</Link>
							</div>
						</div>
					</div>
				)}
				{!user && <Link to={URL.Login}>Sign in</Link>}
			</div>
		</header>
	);
};
