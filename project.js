const navSlider = () => {
  const burger = document.querySelector(".hamburger");
  const nav = document.querySelector(".navItems");
  const navLinks = document.querySelectorAll(".navItems li");

  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
  });
  //this is for all the information in the hamburger menu. When the three lines are clicked, this is listening for that action

  //This is populating the code with the nav bar with a delay so all the tabs slide onto the screen for the user
  navLinks.forEach((link, index) => {
    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.8}s`;
  });
};
//Calling the function to run everything
navSlider();
