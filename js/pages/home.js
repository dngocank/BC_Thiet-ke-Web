document.addEventListener('DOMContentLoaded', function() {
    const listContainer = document.getElementById('festival-list');
    const heroBanner = document.getElementById('hero-banner');
    const carouselDotsContainer = document.getElementById('carousel-dots');

    // 1. DANH SÁCH ẢNH
    const bannerImages = [
        './assets/images/banners/home-banner.jpg',
        './assets/images/banners/banner2.jpg',
        './assets/images/banners/banner3.jpg',
        './assets/images/banners/banner4.png' // File png của bạn
    ];

    let currentBannerIndex = 0;
    let autoSlideInterval;
    let carouselImageElements = [];

    // --- LOGIC CAROUSEL ---
    function initializeCarouselImages() {
        if (!heroBanner) return;
        
        // Tạo wrapper chứa ảnh, chèn vào đầu heroBanner
        // Nó sẽ nằm dưới .banner-content nhờ CSS z-index
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('carousel-image-wrapper');
        heroBanner.prepend(imageWrapper);

        bannerImages.forEach((imagePath) => {
            const imgElement = document.createElement('div');
            imgElement.classList.add('carousel-image');
            imgElement.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${imagePath}')`;
            imageWrapper.appendChild(imgElement);
            carouselImageElements.push(imgElement);
        });
    }

    function changeBannerImage(index) {
        carouselImageElements.forEach((imgElement, idx) => {
            if (idx === index) imgElement.classList.add('active');
            else imgElement.classList.remove('active');
        });
        updateCarouselDots(index);
    }

    function createCarouselDots() {
        if (!carouselDotsContainer) return;
        carouselDotsContainer.innerHTML = '';
        
        bannerImages.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dot.addEventListener('click', () => {
                currentBannerIndex = index;
                changeBannerImage(currentBannerIndex);
                resetAutoSlide();
            });
            carouselDotsContainer.appendChild(dot);
        });
        updateCarouselDots(currentBannerIndex);
    }

    function updateCarouselDots(activeIndex) {
        if (!carouselDotsContainer) return;
        const dots = carouselDotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            if (index === activeIndex) dot.classList.add('active');
            else dot.classList.remove('active');
        });
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            currentBannerIndex = (currentBannerIndex + 1) % bannerImages.length;
            changeBannerImage(currentBannerIndex);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    // --- HIỂN THỊ DANH SÁCH LỄ HỘI ---
    if (typeof festivalsList !== 'undefined' && listContainer) {
        let htmlContent = '';
        festivalsList.forEach(festival => {
            const safeImage = festival.image ? festival.image : 'https://via.placeholder.com/300x200';
            htmlContent += `
                <article class="festival-card">
                    <div class="img-container">
                        <img src="${safeImage}" alt="${festival.name}" onerror="this.src='https://via.placeholder.com/300x200'">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${festival.name}</h3>
                        <p class="card-info">📍 ${festival.location}</p>
                        <p class="card-info">📅 ${festival.date}</p>
                        <a href="pages/detail.html?id=${festival.id}" class="btn-detail">Xem chi tiết</a>
                    </div>
                </article>
            `;
        });
        listContainer.innerHTML = htmlContent;
    }

    // --- KHỞI CHẠY ---
    initializeCarouselImages();
    changeBannerImage(currentBannerIndex);
    createCarouselDots();
    startAutoSlide();
});