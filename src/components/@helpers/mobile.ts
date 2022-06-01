export const isMobile = () => {
	const mobileContaner = document.getElementById("mobile");
	return mobileContaner && getComputedStyle(mobileContaner).display === "none" ? true : false;
};
