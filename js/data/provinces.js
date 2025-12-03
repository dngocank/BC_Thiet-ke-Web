const provincesList = [
    {
        id: 'hanoi', 
        name: 'Thủ Đô Hà Nội', 
        filterName: 'Hà Nội', // Dùng để tìm lễ hội có địa điểm chứa từ này
        type: 'major',
        top: 19, left: 37.3,
        image: '../assets/images/festivals/chua-huong.jpg', // Ảnh đại diện vùng
        desc: 'Thủ đô nghìn năm văn hiến, nơi lưu giữ tinh hoa văn hóa của cả dân tộc với 36 phố phường, Hồ Gươm xanh biếc và hàng trăm di tích lịch sử lâu đời.',
        tags: ['Phở', 'Hồ Gươm', 'Văn Miếu']
    },
    {
        id: 'hue', 
        name: 'Cố Đô Huế', 
        filterName: 'Huế',
        type: 'major',
        top: 50, left: 49,
        image: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Hue_Imperial_City.jpg',
        desc: 'Vùng đất di sản với vẻ đẹp trầm mặc, mộng mơ bên dòng sông Hương. Nổi tiếng với Nhã nhạc cung đình, Đại Nội và nét ẩm thực cung đình tinh tế.',
        tags: ['Đại Nội', 'Nhã nhạc', 'Bún Bò']
    },
    {
        id: 'hcm', 
        name: 'TP. Hồ Chí Minh', 
        filterName: 'Hồ Chí Minh',
        type: 'major',
        top: 85.5, left: 42.5,
        image: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Ho_Chi_Minh_City_Skyline_Night.jpg',
        desc: 'Thành phố mang tên Bác, đầu tàu kinh tế năng động và hiện đại bậc nhất cả nước. Nơi giao thoa văn hóa Đông - Tây độc đáo và phóng khoáng.',
        tags: ['Chợ Bến Thành', 'Phố đi bộ', 'Cơm Tấm']
    },
    {
        id: 'hoangsa', 
        name: 'Huyện Đảo Hoàng Sa', 
        filterName: 'Đà Nẵng', // Hoàng Sa thuộc Đà Nẵng
        type: 'island',
        top: 48.5, left: 76.5,
        image: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Hoang_Sa_Viet_Nam.jpg',
        desc: 'Quần đảo san hô nằm giữa Biển Đông, vùng lãnh thổ thiêng liêng với ngư trường rộng lớn và ý nghĩa chiến lược quan trọng về an ninh quốc phòng.',
        tags: ['Chủ quyền', 'Biển Đông', 'Đà Nẵng']
    },
    {
        id: 'truongsa', 
        name: 'Huyện Đảo Trường Sa', 
        filterName: 'Khánh Hòa', // Trường Sa thuộc Khánh Hòa
        type: 'island',
        top: 77.5, left: 85.2,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Truong_Sa_Lon_Island.jpg/800px-Truong_Sa_Lon_Island.jpg',
        desc: 'Quần đảo bão tố với những người lính kiên cường ngày đêm canh giữ bình yên cho Tổ quốc. Nơi hải âu bay rợp trời và những cây bàng vuông sừng sững.',
        tags: ['Hải quân', 'Đảo chìm', 'Đảo nổi']
    }
];