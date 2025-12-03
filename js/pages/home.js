document.addEventListener('DOMContentLoaded', function() {
    const listContainer = document.getElementById('festival-list');
    const heroBanner = document.getElementById('hero-banner');
    const carouselDotsContainer = document.getElementById('carousel-dots');

    // ============================================================
    // 1. SLIDER ẢNH (Giữ nguyên)
    // ============================================================
    const bannerImages = [
        './assets/images/banners/home-banner.jpg',
        './assets/images/banners/banner2.jpg',
        './assets/images/banners/banner3.jpg',
        './assets/images/banners/banner4.png'
    ];
    let currentBannerIndex = 0;
    let autoSlideInterval;
    let carouselImageElements = [];

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

    // ============================================================
    // 2. LOGIC TÌM KIẾM THÔNG MINH (HEADER SEARCH)
    // ============================================================
    
    // Hàm xóa dấu tiếng Việt
    function removeVietnameseTones(str) {
        if (!str) return '';
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        return str;
    }

    // Hàm Lọc (Gán vào window để HTML gọi được)
    window.filterFestivals = function() {
        const rawInput = document.getElementById('search-input').value;
        const keyword = removeVietnameseTones(rawInput); // Xóa dấu

        // Lọc dữ liệu
        const filteredData = festivalsList.filter(item => {
            const name = removeVietnameseTones(item.name);
            const location = removeVietnameseTones(item.location);
            const foods = removeVietnameseTones(item.foods || "");
            const ethnicity = removeVietnameseTones(item.ethnicity || "");
            const date = removeVietnameseTones(item.date); // Tìm luôn trong ngày tháng

            // Kiểm tra từ khóa có nằm trong bất kỳ thông tin nào không
            return name.includes(keyword) || 
                   location.includes(keyword) || 
                   foods.includes(keyword) || 
                   ethnicity.includes(keyword) ||
                   date.includes(keyword);
        });

        renderFestivals(filteredData);
        
        // Cuộn xuống danh sách kết quả cho người dùng thấy
        if(filteredData.length > 0 || keyword !== "") {
            document.getElementById('festival-list').scrollIntoView({behavior: "smooth", block: "start"});
        }
    }

    // ============================================================
    // 3. RENDER VÀ WISHLIST
    // ============================================================
    window.toggleWishlist = function(id, btn) {
        let wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
        if (wishlist.includes(id)) {
            wishlist = wishlist.filter(item => item !== id);
            btn.classList.remove('active');
            btn.innerHTML = '<i class="far fa-heart"></i>';
        } else {
            wishlist.push(id);
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        }
        localStorage.setItem('myWishlist', JSON.stringify(wishlist));
    }

    window.renderFestivals = function(data) {
        if (!listContainer) return;

        if (data.length === 0) {
            listContainer.innerHTML = '<p style="grid-column: 1/-1; text-align: center; font-size: 1.2rem; color: #666; margin-top: 20px;">Không tìm thấy lễ hội nào phù hợp!</p>';
            return;
        }

        const wishlist = JSON.parse(localStorage.getItem('myWishlist')) || [];
        let htmlContent = '';
        data.forEach(festival => {
            const safeImage = festival.image ? festival.image : 'https://via.placeholder.com/300x200';
            const ethnicityTag = festival.ethnicity ? `<span style="background:#f0f0f0; padding:2px 8px; border-radius:4px; font-size:0.8rem; color:#555;">👤 ${festival.ethnicity}</span>` : '';
            const isLiked = wishlist.includes(festival.id);
            const activeClass = isLiked ? 'active' : '';
            const iconClass = isLiked ? 'fas' : 'far';

            htmlContent += `
                <article class="festival-card">
                    <div class="img-container">
                        <img src="${safeImage}" alt="${festival.name}" onerror="this.src='https://via.placeholder.com/300x200'">
                        <button class="btn-wishlist ${activeClass}" onclick="event.preventDefault(); toggleWishlist('${festival.id}', this)">
                            <i class="${iconClass} fa-heart"></i>
                        </button>
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${festival.name}</h3>
                        <p class="card-info">📍 ${festival.location}</p>
                        <p class="card-info">📅 ${festival.date}</p>
                        <div style="margin:8px 0;">${ethnicityTag}</div>
                        <p class="card-info" style="font-size:0.85rem; color:#d32f2f;">🍜 <strong>Món ngon:</strong> ${festival.foods || 'Đang cập nhật'}</p>
                        <a href="pages/detail.html?id=${festival.id}" class="btn-detail" style="margin-top:10px;">Xem chi tiết</a>
                    </div>
                </article>
            `;
        });
        listContainer.innerHTML = htmlContent;
    }

    // ============================================================
    // 4. ĐỒNG HỒ ĐẾM NGƯỢC
    // ============================================================
    function startCountdown() {
        const countDownDate = new Date("Feb 17, 2026 00:00:00").getTime();
        const x = setInterval(function() {
            const now = new Date().getTime();
            const distance = countDownDate - now;
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            const dayElem = document.getElementById("days");
            if (dayElem) {
                dayElem.innerText = days < 10 ? "0" + days : days;
                document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
                document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
                document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
            }
            if (distance < 0) {
                clearInterval(x);
                if (dayElem) document.getElementById("countdown-timer").innerHTML = "CHÚC MỪNG NĂM MỚI!";
            }
        }, 1000);
    }

    // KHỞI CHẠY
    initializeCarouselImages();
    changeBannerImage(currentBannerIndex);
    createCarouselDots();
    startAutoSlide();
    startCountdown();

    if (typeof festivalsList !== 'undefined') {
        renderFestivals(festivalsList);
    }
});