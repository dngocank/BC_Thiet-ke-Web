document.addEventListener('DOMContentLoaded', function() {
    // 1. Lấy ID từ URL (Ví dụ: region-detail.html?id=hue)
    // Hàm getUrlParameter nằm trong file js/utils/url-helper.js
    const regionId = getUrlParameter('id');
    
    // 2. Tìm thông tin tỉnh trong danh sách provincesList
    const regionData = provincesList.find(p => p.id === regionId);

    if (!regionData) {
        document.body.innerHTML = "<div class='container' style='margin-top:50px; text-align:center;'><h1>❌ Không tìm thấy địa điểm này!</h1><a href='region.html'>Quay lại</a></div>";
        return;
    }

    // 3. Hiển thị thông tin chung (Banner, Tên, Mô tả)
    document.title = `Khám phá ${regionData.name}`;
    document.getElementById('region-name').textContent = regionData.name;
    document.getElementById('region-desc').textContent = regionData.desc;
    
    // Xử lý ảnh nền banner (Xử lý đường dẫn ../ nếu cần)
    const bannerDiv = document.getElementById('region-banner');
    // Vì đang ở trang con, đảm bảo đường dẫn ảnh đúng
    const bgImage = regionData.image.startsWith('.') ? regionData.image : `../${regionData.image}`;
    bannerDiv.style.backgroundImage = `url('${bgImage}')`;
    bannerDiv.style.backgroundSize = 'cover';
    bannerDiv.style.backgroundPosition = 'center';

    // 4. Lọc và Hiển thị các lễ hội thuộc tỉnh này
    const listContainer = document.getElementById('local-festival-list');
    
    // Lọc: Lễ hội nào có địa điểm (location) chứa tên bộ lọc của tỉnh (filterName)
    // Ví dụ: Lễ hội Pháo hoa (location: Đà Nẵng) sẽ khớp với filterName: Đà Nẵng
    // Chuyển hết về chữ thường để so sánh cho chính xác
    const filterKey = regionData.filterName.toLowerCase();
    
    const localFestivals = festivalsList.filter(f => 
        f.location.toLowerCase().includes(filterKey)
    );

    if (localFestivals.length === 0) {
        listContainer.innerHTML = `<p style="color: #666; font-style: italic;">Hiện chưa có dữ liệu lễ hội nào được cập nhật cho khu vực ${regionData.name}.</p>`;
    } else {
        let htmlContent = '';
        localFestivals.forEach(festival => {
            // Xử lý ảnh lễ hội (Thêm dấu . để lùi thư mục nếu cần)
            const safeImage = festival.image.startsWith('.') ? festival.image : `.${festival.image}`;

            htmlContent += `
                <article class="festival-card">
                    <div class="img-container">
                        <img src="${safeImage}" alt="${festival.name}" onerror="this.src='https://via.placeholder.com/300x200'">
                    </div>
                    <div class="card-content">
                        <h3 class="card-title">${festival.name}</h3>
                        <p class="card-info">📍 ${festival.location}</p>
                        <p class="card-info">📅 ${festival.date}</p>
                        <a href="detail.html?id=${festival.id}" class="btn-detail">Xem chi tiết</a>
                    </div>
                </article>
            `;
        });
        listContainer.innerHTML = htmlContent;
    }
});