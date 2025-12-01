document.addEventListener('DOMContentLoaded', function() {
    const contentDiv = document.getElementById('detail-content');
    const warningDiv = document.getElementById('login-required');

    // --- BƯỚC 1: KIỂM TRA ĐĂNG NHẬP (QUAN TRỌNG) ---
    // Lấy thông tin user từ bộ nhớ trình duyệt
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        // == TRƯỜNG HỢP CHƯA ĐĂNG NHẬP ==
        console.log("Chưa đăng nhập -> Chặn xem");

        // 1. Ẩn khung nội dung
        if(contentDiv) contentDiv.style.display = 'none';
        
        // 2. Hiện khung cảnh báo ổ khóa
        if(warningDiv) warningDiv.style.display = 'block';
        
        // 3. Dừng code tại đây, không tải dữ liệu lễ hội nữa
        return; 
    }

    // == TRƯỜNG HỢP ĐÃ ĐĂNG NHẬP -> XỬ LÝ TIẾP ==
    
    // Đảm bảo ẩn bảng cảnh báo đi (đề phòng)
    if(warningDiv) warningDiv.style.display = 'none';

    // Lấy ID từ URL (ví dụ: detail.html?id=lh01)
    // Hàm getUrlParameter này nằm trong file js/utils/url-helper.js
    const festivalId = getUrlParameter('id');

    // Tìm lễ hội tương ứng trong file data/festivals.js
    const festival = festivalsList.find(item => item.id === festivalId);

    if (festival) {
        // Xử lý đường dẫn ảnh: Thêm dấu chấm (.) để thành ../assets/... vì đang ở trong thư mục pages
        // Nếu đường dẫn gốc là "./assets...", thêm dấu chấm sẽ thành "..//assets..." (trình duyệt vẫn hiểu là lùi 1 cấp)
        const imgSrc = `.${festival.image}`;

        // Vẽ giao diện chi tiết
        contentDiv.innerHTML = `
            <div style="display: flex; gap: 40px; flex-wrap: wrap; margin-top: 20px;">
                <div style="flex: 1; min-width: 300px;">
                    <img src="${imgSrc}" alt="${festival.name}" class="detail-img" onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'">
                </div>
                
                <div style="flex: 1.5;">
                    <h1 style="color: #d32f2f; margin-bottom: 15px; font-size: 2.5rem;">${festival.name}</h1>
                    
                    <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                        <p class="detail-info"><i class="fas fa-map-marker-alt" style="width: 20px; color: #d32f2f;"></i> <strong>Địa điểm:</strong> ${festival.location}</p>
                        <p class="detail-info"><i class="fas fa-calendar-alt" style="width: 20px; color: #d32f2f;"></i> <strong>Thời gian:</strong> ${festival.date}</p>
                        <p class="detail-info"><i class="fas fa-globe-asia" style="width: 20px; color: #d32f2f;"></i> <strong>Vùng miền:</strong> ${festival.region === 'bac' ? 'Miền Bắc' : (festival.region === 'trung' ? 'Miền Trung' : 'Miền Nam')}</p>
                    </div>

                    <h3 style="margin-bottom: 10px; border-left: 4px solid #d32f2f; padding-left: 10px;">Giới thiệu</h3>
                    <p class="detail-desc">${festival.description}</p>
                    
                    <button style="margin-top: 30px; padding: 12px 25px; background: #333; color: white; border: none; border-radius: 5px; cursor: pointer; font-weight: bold;">
                        <i class="fas fa-ticket-alt"></i> Đặt vé tham gia
                    </button>
                </div>
            </div>
        `;
    } else {
        contentDiv.innerHTML = `
            <div style="text-align: center; margin-top: 50px;">
                <h2 style="color: #d32f2f;">❌ Không tìm thấy dữ liệu!</h2>
                <p>Có thể đường dẫn bị sai hoặc lễ hội này không tồn tại.</p>
                <a href="../index.html">Quay về trang chủ</a>
            </div>
        `;
    }
});