let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("mySlides fade");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) {slideIndex = 1}    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 5000); // Change image every 3 seconds
}

window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 20) { // Change 50 to your desired scroll threshold
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
