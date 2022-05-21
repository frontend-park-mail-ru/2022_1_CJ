export const isMobile = () => {
	const mobileContaner = document.getElementById("mobile");
	return getComputedStyle(mobileContaner).display === "none" ? true : false;
};
