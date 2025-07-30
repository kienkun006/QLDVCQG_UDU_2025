CREATE TABLE `congdan` (
  `id_cccd` varchar(255) UNIQUE PRIMARY KEY,
  `id_hoKhau` varchar(255),
  `nname` varchar(255),
  `dob` date,
  `gioiTinh` ENUM ('Nam', 'Nữ', 'Khác'),
  `tonGiao` varchar(255),
  `danToc` varchar(255),
  `queQuan` varchar(255),
  `quocTich` varchar(255),
  `noiThuongTru` varchar(255),
  `sinhTracHoc` text,
  `avatar` text
);

CREATE TABLE `hoKhau` (
  `id_hoKhau` varchar(255) UNIQUE PRIMARY KEY,
  `chuHo` varchar(255),
  `mqhChuHo` varchar(255),
  `soNhanKhau` int,
  `diaChi` varchar(255),
  `ngayCap` date
);

CREATE TABLE `cuTru` (
  `id_tttv` varchar(255) PRIMARY KEY,
  `id_cccd` varchar(255),
  `diaChi` varchar(255),
  `loai` ENUM ('Thường trú', 'Tạm trú', 'Tạm vắng'),
  `thoiHan` date,
  `lichSu` varchar(255),
  `start_date` date,
  `end_date` date
);

CREATE TABLE `lichsucutru` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_cccd` varchar(255),
  `diaChi` varchar(255),
  `loai` ENUM ('Thường trú', 'Tạm trú', 'Tạm vắng'),
  `start_date` date,
  `end_date` date,
  `note` text
);

CREATE TABLE `sukien` (
  `id_suKienPL` varchar(255) PRIMARY KEY,
  `tenSK` varchar(255),
  `Loai` varchar(255),
  `content` text
);

CREATE TABLE `skql` (
  `id_hanhChinh` varchar(255) PRIMARY KEY,
  `id_cccd` varchar(255),
  `id_suKienPL` varchar(255),
  `thoiGian` date
);

CREATE TABLE `dvql` (
  `id_dv` varchar(255) PRIMARY KEY,
  `id_hanhChinh` varchar(255),
  `tenDV` varchar(255),
  `diaChi` varchar(255),
  `capQuanLy` varchar(255)
);

CREATE TABLE `admin_accounts` (
  `id_admin` varchar(255) PRIMARY KEY,
  `id_dv` varchar(255),
  `username` varchar(255),
  `quyenHan` varchar(255),
  `avatar` text,
  `password` varchar(255),
  `last_login` datetime
);

CREATE TABLE `news` (
  `id_new` int PRIMARY KEY AUTO_INCREMENT,
  `id_admin` varchar(255),
  `name` varchar(255),
  `image` text,
  `content` text,
  `created_at` datetime,
  `updated_at` datetime
);

CREATE TABLE `users` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `id_cccd` varchar(255),
  `username` varchar(255),
  `password` varchar(255),
  `role` ENUM ('citizen', 'admin'),
  `avatar` varchar(255),
  `created_at` datetime,
  `update_at` datetime
);

CREATE TABLE `bhyt` (
  `id_bhyt` varchar(255) UNIQUE PRIMARY KEY,
  `id_cccd` varchar(255),
  `start_date` date,
  `end_date` date,
  `address_dk` varchar(255),
  `lichsu` text
);

CREATE TABLE `login_history` (
  `id` int PRIMARY KEY AUTO_INCREMENT,
  `user_id` int,
  `login_time` datetime,
  `ip_address` varchar(255)
);

CREATE TABLE `phieu_dangky` (
  `id_phieu` int PRIMARY KEY AUTO_INCREMENT,
  `id_cccd` varchar(255),
  `id_suKienPL` varchar(255) COMMENT 'Sự kiện pháp lý liên quan nếu được phê duyệt',
  `loai_thu_tuc` ENUM ('Tạm trú', 'Tạm vắng', 'Khai sinh', 'Khai tử', 'Gia hạn BHYT', 'Cấp lại giấy tờ'),
  `ngay_dang_ky` date,
  `trang_thai` ENUM ('Đang xử lý', 'Đã duyệt', 'Từ chối'),
  `noi_dung` text
);

ALTER TABLE `congdan` COMMENT = 'Thông tin cơ bản của công dân';

ALTER TABLE `hoKhau` COMMENT = 'Thông tin hộ khẩu';

ALTER TABLE `cuTru` COMMENT = 'Thông tin tạm trú/tạm vắng';

ALTER TABLE `lichsucutru` COMMENT = 'Lưu trữ toàn bộ lịch sử cư trú của công dân tại các địa điểm khác nhau';

ALTER TABLE `phieu_dangky` COMMENT = 'Phiếu đăng ký tạo sự kiện pháp lý cần phê duyệt';

ALTER TABLE `congdan` ADD FOREIGN KEY (`id_hoKhau`) REFERENCES `hoKhau` (`id_hoKhau`);

ALTER TABLE `cuTru` ADD FOREIGN KEY (`id_cccd`) REFERENCES `congdan` (`id_cccd`);

ALTER TABLE `lichsucutru` ADD FOREIGN KEY (`id_cccd`) REFERENCES `congdan` (`id_cccd`);

ALTER TABLE `skql` ADD FOREIGN KEY (`id_cccd`) REFERENCES `congdan` (`id_cccd`);

ALTER TABLE `skql` ADD FOREIGN KEY (`id_suKienPL`) REFERENCES `sukien` (`id_suKienPL`);

ALTER TABLE `dvql` ADD FOREIGN KEY (`id_hanhChinh`) REFERENCES `skql` (`id_hanhChinh`);

ALTER TABLE `admin_accounts` ADD FOREIGN KEY (`id_dv`) REFERENCES `dvql` (`id_dv`);

ALTER TABLE `news` ADD FOREIGN KEY (`id_admin`) REFERENCES `admin_accounts` (`id_admin`);

ALTER TABLE `congdan` ADD FOREIGN KEY (`id_cccd`) REFERENCES `users` (`id_cccd`);

ALTER TABLE `congdan` ADD FOREIGN KEY (`id_cccd`) REFERENCES `bhyt` (`id_cccd`);

ALTER TABLE `login_history` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `phieu_dangky` ADD FOREIGN KEY (`id_cccd`) REFERENCES `congdan` (`id_cccd`);

ALTER TABLE `phieu_dangky` ADD FOREIGN KEY (`id_suKienPL`) REFERENCES `sukien` (`id_suKienPL`);
