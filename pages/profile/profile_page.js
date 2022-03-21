document.addEventListener("click", function(e) {
  const menu = document.querySelectorAll('.menu')[0];
  profile = document.querySelectorAll('.profile')[0];

  const withinBoundaries = e.composedPath().includes(profile);
  if ( ! withinBoundaries ) {
    if (menu.style.display == "block" && e.currentTarget != profile) {
      profile.style.display = "flex"
      menu.style.display = "none"
      console.log("menu was hided");
    }
	}
})

document.querySelectorAll('.profile')[0].addEventListener("click", function(e) {
  console.log(e.currentTarget);
  menu = e.currentTarget.nextElementSibling;
  if (!menu.style.display || menu.style.display == "none") {
    e.currentTarget.style.display = "none"
    menu.style.display = "block"
    console.log("menu was opened");
  } else {
    console.log(menu.style.display)
  }
});
