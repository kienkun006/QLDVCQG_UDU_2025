/*USE db_blackduck;
-- 1 Bảng hoKhau
CREATE TABLE `hokhau` (
  `id_hoKhau` char(9) NOT NULL,
  `chuHo_cccd` char(12) NOT NULL,
  `soNhanKhau` int NOT NULL DEFAULT '1',
  `diaChi` varchar(225) NOT NULL,
  `ngayCap` date NOT NULL,
  PRIMARY KEY (`id_hoKhau`),
  KEY `fk_hokhau_chuhoccd` (`chuHo_cccd`),
  CONSTRAINT `fk_hokhau_chuhoccd` FOREIGN KEY (`chuHo_cccd`) REFERENCES `congdan` (`id_cccd`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `chk_id_hoKhau` CHECK (regexp_like(`id_hoKhau`,_utf8mb4'^[0-9]{9}$'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- 2 Bảng congdan
CREATE TABLE `congdan` (
  `id_cccd` char(12) NOT NULL,
  `hoVaTen` varchar(225) NOT NULL,
  `dob` date NOT NULL,
  `gioiTinh` enum('Nam','Nữ') NOT NULL,
  `danToc` varchar(225) NOT NULL,
  `quocTich` varchar(225) NOT NULL DEFAULT 'Việt Nam',
  `noiThuongTru` varchar(225) NOT NULL,
  `sinhTracHoc` text NOT NULL,
  `avatar` text,
  `tonGiao` varchar(225) DEFAULT NULL,
  `queQuan` varchar(225) NOT NULL,
  PRIMARY KEY (`id_cccd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- 3 Bảng bhyt
CREATE TABLE `admin_acc` (
  `id_admin` char(5) NOT NULL,
  `id_dvql` char(5) NOT NULL,
  `name` varchar(225) NOT NULL,
  `password` varchar(20) NOT NULL,
  `quyenHan` varchar(225) DEFAULT NULL,
  `avatar` text,
  `last_login` datetime NOT NULL,
  PRIMARY KEY (`id_admin`),
  KEY `admin_acc_ibfk_1` (`id_dvql`),
  CONSTRAINT `admin_acc_ibfk_1` FOREIGN KEY (`id_dvql`) REFERENCES `dvql` (`id_dvql`) ON DELETE CASCADE,
  CONSTRAINT `admin_acc_chk_1` CHECK (regexp_like(`id_admin`,_utf8mb4'^[0-9]{5}$'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- 4 Bảng cuTru
CREATE TABLE `cutru` (
  `id_cutru` int unsigned NOT NULL AUTO_INCREMENT,
  `id_cccd` char(12) NOT NULL,
  `diaChi` varchar(225) NOT NULL,
  `loai` enum('Thường trú','Tạm trú','Tạm vắng') NOT NULL,
  `thoiHan` int unsigned DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  PRIMARY KEY (`id_cutru`),
  KEY `id_cccd` (`id_cccd`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- 5 Bảng lichsucutru
CREATE TABLE `lichsucutru` (
  `id_lichsu` int unsigned NOT NULL AUTO_INCREMENT,
  `id_cccd` char(12) NOT NULL,
  `diaChi` varchar(225) NOT NULL,
  `loai` enum('Thường trú','Tạm trú','Tạm vắng') NOT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `note` text,
  PRIMARY KEY (`id_lichsu`),
  KEY `lichsucutru_ibfk` (`id_cccd`),
  CONSTRAINT `lichsucutru_ibfk` FOREIGN KEY (`id_cccd`) REFERENCES `congdan` (`id_cccd`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `chk_lichsucutru_dates` CHECK ((`end_date` > `start_date`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- 6. Bảng sự kiện
CREATE TABLE `sukien` (
  `id_suKienPL` char(5) NOT NULL,
  `tensk` varchar(225) DEFAULT NULL,
  `loai` enum('Tạm trú','Tạm vắng','Khai sinh','Khai tử','Gia hạn BHYT','Cấp lại giấy tờ') DEFAULT NULL,
  `noiDung` text,
  PRIMARY KEY (`id_suKienPL`),
  CONSTRAINT `sukien_chk_1` CHECK (regexp_like(`id_suKienPL`,_utf8mb4'^[0-9]{5}$'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- 7. Bảng người dùng
CREATE TABLE `users` (
  `id_user` char(5) NOT NULL,
  `id_cccd` char(12) NOT NULL,
  `userName` varchar(225) NOT NULL,
  `passWord` varchar(20) NOT NULL,
  `vaiTro` enum('Công dân','Quản lý') NOT NULL,
  `avata` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_user`),
  KEY `fk_users_congdan` (`id_cccd`),
  CONSTRAINT `fk_users_congdan` FOREIGN KEY (`id_cccd`) REFERENCES `congdan` (`id_cccd`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_chk_1` CHECK (regexp_like(`id_user`,_utf8mb4'^[0-9]{5}$'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- 8. Nhân khẩu (Mới cập nhật thêm)
CREATE TABLE `nhankhau` (
  `id_hoKhau` char(9) NOT NULL,
  `id_cccd` char(12) NOT NULL,
  `mqhChuHo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_hoKhau`,`id_cccd`),
  KEY `id_cccd` (`id_cccd`),
  CONSTRAINT `nhankhau_ibfk_1` FOREIGN KEY (`id_hoKhau`) REFERENCES `hokhau` (`id_hoKhau`),
  CONSTRAINT `nhankhau_ibfk_2` FOREIGN KEY (`id_cccd`) REFERENCES `congdan` (`id_cccd`),
  CONSTRAINT `chk_nk_id_cccd` CHECK (regexp_like(`id_cccd`,_utf8mb4'^[0-9]{12}$')),
  CONSTRAINT `chk_nk_id_hoKhau` CHECK (regexp_like(`id_hoKhau`,_utf8mb4'^[0-9]{9}$'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- 9. Phiếu đăng ký sự kiện
CREATE TABLE `phieu_dangky` (
  `id_phieu` char(5) NOT NULL,
  `id_cccd` char(12) NOT NULL,
  `id_suKienPL` char(5) NOT NULL,
  `loai` enum('Tạm trú','Tạm vắng','Khai sinh','Khai tử','Gia hạn BHYT','Cấp lại giấy tờ') NOT NULL,
  `ngayDK` date NOT NULL,
  `trangThai` enum('Chưa Xử Lý','Đã Xử Lý') NOT NULL DEFAULT 'Chưa Xử Lý',
  `noiDung` text,
  PRIMARY KEY (`id_phieu`),
  KEY `phieu_dangky_ibfk_1` (`id_cccd`),
  KEY `phieu_dangky_ibfk_2` (`id_suKienPL`),
  CONSTRAINT `phieu_dangky_ibfk_1` FOREIGN KEY (`id_cccd`) REFERENCES `congdan` (`id_cccd`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `phieu_dangky_ibfk_2` FOREIGN KEY (`id_suKienPL`) REFERENCES `sukien` (`id_suKienPL`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `phieu_dangky_chk_1` CHECK (regexp_like(`id_phieu`,_utf8mb4'^[0-9]{5}$'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- 10. Xử lý hành chính
CREATE TABLE `hanhchinh` (
  `id_hanhchinh` char(5) NOT NULL,
  `id_cccd` char(12) NOT NULL,
  `id_suKienPL` char(5) NOT NULL,
  `thoiGian` datetime NOT NULL,
  `id_dv` char(5) NOT NULL,
  PRIMARY KEY (`id_hanhchinh`),
  KEY `hanhchinh_ibfk_3_idx` (`id_dv`),
  KEY `hanhchinh_ibfk_1` (`id_cccd`),
  KEY `hanhchinh_ibfk_2` (`id_suKienPL`),
  CONSTRAINT `hanhchinh_ibfk_1` FOREIGN KEY (`id_cccd`) REFERENCES `congdan` (`id_cccd`) ON UPDATE CASCADE,
  CONSTRAINT `hanhchinh_ibfk_2` FOREIGN KEY (`id_suKienPL`) REFERENCES `sukien` (`id_suKienPL`) ON UPDATE CASCADE,
  CONSTRAINT `hanhchinh_ibfk_3` FOREIGN KEY (`id_dv`) REFERENCES `dvql` (`id_dvql`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `hanhchinh_chk_1` CHECK (regexp_like(`id_hanhchinh`,_utf8mb4'^[0-9]{5}$'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- 11. Đơn vị quản lý
CREATE TABLE `dvql` (
  `id_dvql` char(5) NOT NULL,
  `tendv` varchar(225) NOT NULL,
  `diaChi` varchar(225) NOT NULL,
  `capQL` varchar(45) NOT NULL,
  PRIMARY KEY (`id_dvql`),
  CONSTRAINT `dvql_chk_1` CHECK (regexp_like(`id_dvql`,_utf8mb4'^[0-9]{5}$'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- 12. Tài khoản quản trị viên
CREATE TABLE `admin_acc` (
  `id_admin` char(5) NOT NULL,
  `id_dvql` char(5) NOT NULL,
  `name` varchar(225) NOT NULL,
  `password` varchar(20) NOT NULL,
  `quyenHan` varchar(225) DEFAULT NULL,
  `avatar` text,
  `last_login` datetime NOT NULL,
  PRIMARY KEY (`id_admin`),
  KEY `admin_acc_ibfk_1` (`id_dvql`),
  CONSTRAINT `admin_acc_ibfk_1` FOREIGN KEY (`id_dvql`) REFERENCES `dvql` (`id_dvql`) ON DELETE CASCADE,
  CONSTRAINT `admin_acc_chk_1` CHECK (regexp_like(`id_admin`,_utf8mb4'^[0-9]{5}$'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci);

-- 13. Tin tức
CREATE TABLE `news` (
  `id_new` char(5) NOT NULL,
  `id_admin` char(5) DEFAULT NULL,
  `name` varchar(225) DEFAULT NULL,
  `image` text,
  `noiDung` text,
  `created_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id_new`),
  KEY `id_admin` (`id_admin`),
  CONSTRAINT `news_ibfk_1` FOREIGN KEY (`id_admin`) REFERENCES `admin_acc` (`id_admin`),
  CONSTRAINT `news_chk_1` CHECK (regexp_like(`id_new`,_utf8mb4'^[0-9]{5}$'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci


*/
