import { treact } from "@treact";
import "./header.module.scss";

export function Header() {
	return (
		<header class="primary-header bg-white grid">
			<div class="left">
				<img id="logo" src="/static/svg/Logo CJ.svg" alt="" />
			</div>
			<div class="middle flex-c">
				<div class="search __disabled">
					<img class="icon search-part" src="/static/icons/search.svg" alt="" />
					<input class="search-part search-input" type="search" placeholder="search" />
				</div>
				<div class="flex-c btn-like __disabled">
					<img class="icon" src="/static/icons/notifications.svg" alt="" />
				</div>
			</div>
			<div class="right">
				<div class="profile flex-c btn-like">
					<img class="icon-a profile-avatar" src="/" alt="" />
					<img class="icon profile-btn" src="/static/icons/arrow_right.svg" alt="" />
					<p class="profile-name text-light">John Doe</p>
				</div>
				<div class="profile-menu">
					<a class="element flex-c btn-like txt-decor-none" href="/settings" data-link>
						<img src="/static/icons/settings.svg" alt="" />
						<p class="text-light element-text">Settings</p>
					</a>
					<a class="element flex-c btn-like txt-decor-none" href="/logout" data-link>
						<img src="/static/icons/exit_grey.svg" alt="" />
						<p class="text-light element-text">Sign out</p>
					</a>
				</div>
			</div>
		</header>
	);
}
