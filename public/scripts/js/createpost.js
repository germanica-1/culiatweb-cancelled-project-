document.getElementById("post-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const headline = document.getElementById("headline").value;
  const date = document.getElementById("date").value;
  const content = document.getElementById("news-content").value;
  const photo = document.getElementById("photo").files[0];

  if (headline && date && content && photo) {
    const formData = new FormData();
    formData.append("headline", headline);
    formData.append("date", date);
    formData.append("content", content);
    formData.append("photo", photo);

    try {
      const response = await fetch('/api/news', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert("News post submitted successfully!");
        document.getElementById("post-form").reset();
        document.getElementById("post-form-container").style.display = "none";
      } else {
        alert("Failed to submit news post.");
      }
    } catch (error) {
      console.error("Error submitting news post:", error);
      alert("An error occurred while submitting the news post.");
    }
  } else {
    alert("Please fill out all fields.");
  }
});
