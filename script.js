const menuLinks = document.querySelectorAll('.menu ul li a');
const sections = document.querySelectorAll('.section');
menuLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault(); 
        const targetId = this.getAttribute('data-target');
        sections.forEach(section => {
            section.style.display = 'none';
        });
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.style.display = 'block';
        }
    });
});
