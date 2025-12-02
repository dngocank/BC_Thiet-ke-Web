document.addEventListener('DOMContentLoaded', function() {
    const listContainer = document.getElementById('festival-list');
    const heroBanner = document.getElementById('hero-banner');
    const carouselDotsContainer = document.getElementById('carousel-dots');

    // 1. SLIDER ẢNH BANNER
    const bannerImages = [
        './assets/images/banners/home-banner.jpg',
        './assets/images/banners/banner2.jpg',
        './assets/images/banners/banner3.jpg',
        './assets/images/banners/banner4.png'
    ];

    let currentBannerIndex = 0;
    let autoSlideInterval;
    let carouselImageElements = [];

    // --- LOGIC CAROUSEL (Giữ nguyên) ---
    function initializeCarouselImages() {
        if (!heroBanner) return;
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

    // --- 2. LOGIC DANH SÁCH & TÌM KIẾM (MỚI) ---
    
    // Hàm hiển thị danh sách (Nhận vào 1 mảng dữ liệu)
    window.renderFestivals = function(data) {
        if (!listContainer) return;

        if (data.length === 0) {
            listContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; color: #666; margin-top: 20px;">Không tìm thấy lễ hội nào phù hợp!</p>';
            return;
        }

        let htmlContent = '';
        data.forEach(festival => {
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

    // Hàm Lọc (Được gọi khi bấm nút Tìm kiếm)
    window.filterFestivals = function() {
        const searchText = document.getElementById('search-input').value.toLowerCase();
        const selectedMonth = document.getElementById('month-filter').value;

        // Lọc dữ liệu
        const filteredData = festivalsList.filter(item => {
            const nameMatch = item.name.toLowerCase().includes(searchText);
            const monthMatch = (selectedMonth === 'all') || (item.month === selectedMonth);
            return nameMatch && monthMatch;
        });

        renderFestivals(filteredData);
    }

    // --- KHỞI CHẠY ---
    initializeCarouselImages();
    changeBannerImage(currentBannerIndex);
    createCarouselDots();
    startAutoSlide();

    // Hiển thị toàn bộ danh sách khi mới vào
    if (typeof festivalsList !== 'undefined') {
        renderFestivals(festivalsList);
    }
});