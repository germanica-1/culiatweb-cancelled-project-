document.getElementById("create-post").addEventListener("click", function () {
  const postFormContainer = document.getElementById("post-form-container");
  postFormContainer.style.display = postFormContainer.style.display === "none" ? "block" : "none";
});

document.getElementById("post-form").addEventListener("submit", function (e) {
  e.preventDefault();

  const headline = document.getElementById("headline").value;
  const date = document.getElementById("date").value;
  const content = document.getElementById("news-content").value;
  const photo = document.getElementById("photo").files[0];

  if (headline && date && content && photo) {
      alert("News post submitted successfully!");
      
      // Hide the post form container after submission
      const postFormContainer = document.getElementById("post-form-container");
      postFormContainer.style.display = "none";

      // Optional: Reset form fields after hiding
      document.getElementById("post-form").reset();
  } else {
      alert("Please fill out all fields.");
  }
});
