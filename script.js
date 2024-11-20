// Menu toggle xử lý hiển thị
const menuToggle = document.querySelector('.menu-toggle');
const menuList = document.querySelector('.menu ul');
const sections = document.querySelectorAll('.section');
const titles = document.querySelectorAll('.section-title');

menuToggle.addEventListener('click', () => {
    menuList.classList.toggle('active');
});

document.querySelectorAll('.menu ul li a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = e.target.getAttribute('data-target');

        // Ẩn tất cả các nội dung và tiêu đề
        sections.forEach(section => section.style.display = 'none');
        titles.forEach(title => title.style.display = 'none');

        // Hiện mục được chọn
        document.getElementById(target).style.display = 'block';
        document.getElementById(`${target}-title`).style.display = 'block';

        // Đóng menu
        menuList.classList.remove('active');
    });
});

// Hiệu ứng cuộn mềm mượt (Smooth Scrolling)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
