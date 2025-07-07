# Custom Toast Component Usage Guide

## Giới thiệu

Đây là component Toast tùy chỉnh, cho phép bạn hiển thị thông báo dạng popup ở bất kỳ đâu trong ứng dụng. Bạn có thể custom giao diện, icon, màu sắc, thời gian hiển thị, v.v.

---

## Cách sử dụng

Bạn nên gọi Toast trong các event handler (ví dụ: sau khi đăng nhập thành công, đăng ký, báo lỗi, ...).

### Ví dụ sử dụng trong hàm xử lý sự kiện

```tsx
const handleSignIn = () => {
    // Thực hiện logic đăng nhập ở đây

    Toast.show({
        type: 'custom_with_image', // Loại toast custom
        text1: 'Login Successful', // Tiêu đề
        text2: 'Welcome back!',    // Nội dung phụ
        props: {
            imageUrl: require('../../../assets/images/LOGO.png'), // Ảnh hiển thị (local)
            status: 'success', // Trạng thái (có thể dùng để đổi màu viền, icon, ...)
        },
        position: 'top',        // Vị trí hiển thị (top/bottom)
        visibilityTime: 3000,   // Thời gian hiển thị (ms)
        autoHide: false,        // Đặt false để test, nên để true khi production
    });

    navigation.navigate('Home'); // Chuyển màn hình nếu cần
};