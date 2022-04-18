import { treact } from "@treact";
import { useUserStore } from "src/stores/user";
import "../styles/header.scss";

export const Header = () => {
	const [userStore] = useUserStore();
	const { user } = userStore;

	return (
		<header className="primary-header bg-white grid">
			<div className="left">
				<img id="logo" src="/static/svg/Logo CJ.svg" alt="" />
			</div>
			{user && (
				<>
					<div className="middle flex-c">
						<div className="search __disabled">
							<img className="icon search-part" src="/static/icons/search.svg" alt="" />
							<input className="search-part search-input" type="search" placeholder="search" />
						</div>
						<div className="flex-c btn-like __disabled">
							<img className="icon" src="/static/icons/notifications.svg" alt="" />
						</div>
					</div>
					<div className="right">
						<div className="profile flex-c btn-like">
							<img className="icon-a profile-avatar" src="/" alt="" />
							<img className="icon profile-btn" src="/static/icons/arrow_right.svg" alt="" />
							<p className="profile-name text-light">
								{user.name.first} {user.name.last}
							</p>
						</div>
						<div className="profile-menu">
							<a className="element flex-c btn-like txt-decor-none" href="/settings" data-link>
								<img src="/static/icons/settings.svg" alt="" />
								<p className="text-light element-text">Settings</p>
							</a>
							<a className="element flex-c btn-like txt-decor-none" href="/logout" data-link>
								<img src="/static/icons/exit_grey.svg" alt="" />
								<p className="text-light element-text">Sign out</p>
							</a>
						</div>
					</div>
				</>
			)}
		</header>
	);
};
