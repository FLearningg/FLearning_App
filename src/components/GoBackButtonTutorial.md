# Hướng dẫn sử dụng GoBackButton

## 1. Import component

```tsx
import GoBackButton from "../components/GoBackButton";

## 2. Sử dụng cơ bản
```tsx
<GoBackButton
    title="Quay lại"
    onPress={() => {
        // Xử lý khi nhấn nút quay lại
    }}
/>

## 3. Tuỳ chỉnh màu nền
```tsx
<GoBackButton
    title="Trang chủ"
    onPress={() => navigation.goBack()}
    backgroundColor="#E0E0E0" // Màu nền tuỳ chọn
/>

Nếu không truyền backgroundColor, màu mặc định là #F5F9FF.

## 4. Props
Tên prop	           Kiểu dữ liệu	      Bắt buộc	             Mô tả
title	               string	          Có	                 Tiêu đề hiển thị trên nút
onPress	               () => void	      Không	                 Hàm xử lý khi nhấn nút
backgroundColor	       string	          Không	                 Màu nền của nút (mặc định: #F5F9FF)