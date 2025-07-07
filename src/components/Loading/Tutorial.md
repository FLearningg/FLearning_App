# Custom Loading Component Usage Guide

## Giới thiệu

Đây là component Loading tùy chỉnh.

Chú ý đây là component loading toàn màn hình không thay thế cho loading nhỏ

---

## Cách sử dụng

Bạn nên gọi LoadingComponent ở các screen có fetch api

### Ví dụ sử dụng trong hàm xử lý sự kiện

```tsx
const [loading, setLoading] = useState(false);
Call component:
            <LoadingComponent visible={loading} />
```
