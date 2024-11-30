window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 20) { // Change 50 to your desired scroll threshold
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});
