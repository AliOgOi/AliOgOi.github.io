// Xử lý menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu ul');
const sections = document.querySelectorAll('.section');
const music = document.getElementById('background-music');
const toggleButton = document.getElementById('toggle-music');

toggleButton.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        toggleButton.textContent = 'Tắt nhạc';
    } else {
        music.pause();
        toggleButton.textContent = 'Bật nhạc';
    }
});

menuToggle.addEventListener('click', () => {
    menuList.classList.toggle('active');
});

document.querySelectorAll('.menu ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('data-target');

        // Ẩn tất cả các nội dung
        sections.forEach(section => section.style.display = 'none');

        // Hiện nội dung được chọn
        document.getElementById(target).style.display = 'block';
    });
});
