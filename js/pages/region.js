document.addEventListener('DOMContentLoaded', function() {
    const mapWrapper = document.getElementById('map-wrapper');
    const infoPanel = document.getElementById('region-info');

    // Kiểm tra lỗi kết nối HTML
    if (!mapWrapper) {
        console.error("Lỗi: Không tìm thấy id='map-wrapper' trong HTML");
        return;
    }

    // ============================================================
    // 1. KHO DỮ LIỆU (Tọa độ chuẩn bạn đã cung cấp)
    // ============================================================
    const provinces = [
        {
            id: 'hanoi', name: 'Hà Nội', type: 'major',
            top: 19, left: 37.3, 
            image: '../assets/images/festivals/chua-huong.jpg',
            desc: 'Thủ đô nghìn năm văn hiến, trái tim của cả nước.',
            tags: ['Phở', 'Hồ Gươm']
        },
        {
            id: 'hue', name: 'Huế', type: 'major',
            top: 50, left: 49,
            image: 'https://via.placeholder.com/400x200?text=Hue',
            desc: 'Kinh đô xưa với vẻ đẹp trầm mặc bên dòng sông Hương.',
            tags: ['Đại Nội', 'Nhã nhạc']
        },
        {
            id: 'hcm', name: 'TP.HCM', type: 'major',
            top: 85.5, left: 42.5,
            image: 'https://via.placeholder.com/400x200?text=HCM',
            desc: 'Thành phố năng động, đầu tàu kinh tế.',
            tags: ['Chợ Bến Thành']
        },
        {
            id: 'hoangsa', name: 'H.Đ Hoàng Sa', type: 'island',
            top: 48.5, left: 76.5,
            image: 'https://via.placeholder.com/400x200?text=HoangSa',
            desc: 'Vùng lãnh thổ thiêng liêng trực thuộc Đà Nẵng.',
            tags: ['Chủ quyền']
        },
        {
            id: 'truongsa', name: 'H.Đ Trường Sa', type: 'island',
            top: 77.5, left: 85.2,
            image: 'https://via.placeholder.com/400x200?text=TruongSa',
            desc: 'Quần đảo kiên cường giữa biển khơi.',
            tags: ['Hải quân']
        },
        // Ví dụ tỉnh nhỏ (bạn tự thêm các tỉnh khác vào đây)
        {
            id: 'quangninh', name: 'Quảng Ninh', type: 'minor',
            top: 18, left: 46,
            image: 'https://via.placeholder.com/400x200?text=QuangNinh',
            desc: 'Vùng đất di sản thiên nhiên thế giới.',
            tags: ['Vịnh Hạ Long']
        }
    ];

    // ============================================================
    // 2. HÀM VẼ PIN LÊN BẢN ĐỒ
    // ============================================================
    function renderMap() {
        // Xóa pin cũ
        const oldPins = mapWrapper.querySelectorAll('.map-pin');
        oldPins.forEach(p => p.remove());

        provinces.forEach(prov => {
            const pin = document.createElement('div');
            
            // Chọn class CSS theo loại
            if (prov.type === 'major') {
                pin.className = 'map-pin major-pin';
                pin.innerHTML = `<div class="pin-pulse"></div><i class="fas fa-map-marker-alt"></i><span class="pin-label">${prov.name}</span>`;
            } else if (prov.type === 'island') {
                pin.className = 'map-pin special-pin';
                pin.innerHTML = `<div class="pin-pulse"></div><i class="fas fa-anchor"></i><span class="pin-label">${prov.name}</span>`;
            } else {
                pin.className = 'map-pin minor-pin';
                pin.innerHTML = `<div class="small-dot"></div><span class="pin-label">${prov.name}</span>`;
            }

            // Gán tọa độ
            pin.style.top = prov.top + '%';
            pin.style.left = prov.left + '%';

            // Sự kiện Click hiển thị thông tin
            pin.addEventListener('click', (e) => {
                e.stopPropagation();
                showInfo(prov);
                
                // Highlight màu vàng
                document.querySelectorAll('.map-pin').forEach(p => p.style.color = '');
                if (prov.type !== 'minor') pin.style.color = '#FFD700';
            });

            mapWrapper.appendChild(pin);
        });
    }

    // ============================================================
    // 3. HÀM HIỆN THÔNG TIN
    // ============================================================
    function showInfo(data) {
        if(!infoPanel) return;

        const tagsHtml = data.tags ? data.tags.map(tag => `<span class="culture-tag">#${tag}</span>`).join('') : '';
        
        infoPanel.innerHTML = `
            <div style="animation: fadeIn 0.5s;">
                <h2 style="color: #d32f2f; margin-bottom:10px;">${data.name}</h2>
                <img src="${data.image}" style="width: 100%; border-radius: 8px; margin: 15px 0; height: 200px; object-fit: cover;" onerror="this.src='https://via.placeholder.com/400x200'">
                <div style="margin-bottom: 15px;">${tagsHtml}</div>
                <p style="line-height: 1.6; color: #444; text-align: justify;">${data.desc}</p>
            </div>
        `;
    }

    // ============================================================
    // 4. CÔNG CỤ LẤY TỌA ĐỘ (Click vào khoảng trống để lấy số)
    // ============================================================
    mapWrapper.addEventListener('click', function(e) {
        const rect = mapWrapper.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const percentLeft = ((x / rect.width) * 100).toFixed(1);
        const percentTop = ((y / rect.height) * 100).toFixed(1);
        
        alert(`Tọa độ: Top ${percentTop}, Left ${percentLeft}\n(Copy số này vào file JS để thêm tỉnh mới)`);
    });

    renderMap();
});