
  // Get the current URL path
  const currentPath = window.location.pathname.toLowerCase();

  // Select all sidebar links
  const links = document.querySelectorAll("nav ul li a");

  // Add the "active" class to the matching link
  links.forEach(link => {
    const linkPath = link.getAttribute("href").toLowerCase();
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });


