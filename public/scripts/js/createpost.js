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
      // Add your logic here to send data to the server or display it on the main website
    } else {
      alert("Please fill out all fields.");
    }
  });
  