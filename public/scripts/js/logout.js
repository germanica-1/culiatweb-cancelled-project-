
// Attach a click event listener to the logout button
document.getElementById("logout").addEventListener("click", async () => {
  // Send a request to the server to log out
  const response = await fetch("/api/admin/logout");
  if (response.ok) {
    window.location.href = "/admin/login";
  }
});
