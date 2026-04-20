# 🛒 NectarApp – AsyncStorage Persistence

> **Sinh viên:** Triệu Bảo Khanh  
> **MSSV:** 23810310013  
> **Môn học:** Phát triển ứng dụng di động  
> **Framework:** React Native (Expo)

---

## 📱 Mô tả chức năng

NectarApp là ứng dụng mua sắm thực phẩm trực tuyến được xây dựng bằng React Native + Expo, tích hợp `@react-native-async-storage/async-storage` để lưu trữ dữ liệu cục bộ bền vững.

### ✅ Chức năng đã triển khai

| Chức năng | Mô tả |
|-----------|-------|
| **Login** | Đăng nhập bằng email/password, lưu session vào AsyncStorage |
| **Auto Login** | Khi mở lại app, tự động phát hiện session và đăng nhập lại |
| **Logout** | Xóa toàn bộ dữ liệu người dùng khỏi storage, về màn Login |
| **Giỏ hàng** | Thêm, tăng/giảm số lượng, xóa sản phẩm; tự động lưu vào AsyncStorage |
| **Giỏ hàng persistent** | Reload app vẫn giữ nguyên giỏ hàng |
| **Checkout** | Đặt hàng, lưu đơn hàng vào AsyncStorage, xóa giỏ |
| **Danh sách đơn hàng** | Xem lại tất cả đơn hàng đã đặt (tên sản phẩm, số lượng, tổng tiền, thời gian) |
| **Orders persistent** | Reload app vẫn còn danh sách đơn hàng |

---

## 🗂️ Cấu trúc code quan trọng

```
Nectar-App/
├── services/
│   └── storageService.js          # ← File tập trung AsyncStorage logic
├── hooks/
│   └── useStorage.js              # ← Custom hook useStorage (điểm cộng)
├── app/
│   ├── _context/
│   │   ├── auth-context.js        # ← Auth Context (login/logout/auto-login)
│   │   └── cart-context.js        # ← Cart Context + Orders (với AsyncStorage)
│   ├── (tabs)/
│   │   ├── _layout.js             # ← Bọc AuthProvider + CartProvider
│   │   ├── homescreen.js          # ← Màn chính + thêm vào giỏ
│   │   ├── cart.js                # ← Giỏ hàng + Checkout
│   │   ├── orders.js              # ← Danh sách đơn hàng
│   │   └── account.js             # ← Tài khoản + Logout
│   ├── index.js                   # ← Auto-login check
│   ├── login.js                   # ← Màn đăng nhập
│   └── productDetail.js           # ← Chi tiết sản phẩm + Add to Basket
```

---

## 🚀 Hướng dẫn chạy app

### Yêu cầu
- Node.js >= 18
- Expo CLI: `npm install -g expo-cli`
- Expo Go app (Android/iOS) hoặc Android Emulator

### Các bước

```bash
# 1. Clone repo
git clone <repo-url>
cd Nectar-App

# 2. Cài dependencies
npm install

# 3. Chạy app
npx expo start

# 4. Quét QR code bằng Expo Go hoặc nhấn 'a' cho Android emulator
```

### Tài khoản demo

| Email | Password | Ghi chú |
|-------|----------|---------|
| `user@nectar.com` | `123456` | Tài khoản sinh viên |
| `admin@nectar.com` | `admin123` | Tài khoản admin |

---

## 📸 Demo Screenshots

### Ảnh 1 – Login thành công
![Login thành công](./screenshots/MSV23810310013_01_login.png)

### Ảnh 2 – Mở lại app vẫn đăng nhập
![Auto login](./screenshots/MSV23810310013_02_autologin.png)

### Ảnh 3 – Logout về màn Login
![Logout](./screenshots/MSV23810310013_03_logout.png)

### Ảnh 4 – Thêm sản phẩm vào giỏ
![Add to cart](./screenshots/MSV23810310013_04_addtocart.png)

### Ảnh 5 – Mở lại giỏ vẫn còn
![Cart reload](./screenshots/MSV23810310013_05_cart_reload.png)

### Ảnh 6 – Thay đổi số lượng
![Change qty](./screenshots/MSV23810310013_06_qty_change.png)

### Ảnh 7 – Đặt hàng thành công
![Checkout success](./screenshots/MSV23810310013_07_checkout.png)

### Ảnh 8 – Danh sách đơn hàng
![Orders list](./screenshots/MSV23810310013_08_orders.png)

### Ảnh 9 – Reload app vẫn còn đơn hàng
![Orders reload](./screenshots/MSV23810310013_09_orders_reload.png)

---

## 🎬 Video Demo

> Video demo 2–5 phút thực hiện đầy đủ:
> - Login → kill app → mở lại (auto-login)
> - Thêm vào giỏ → kill app → mở lại
> - Checkout → xem lại đơn
> - Logout → về màn Login

📹 **Link video:** [Xem tại đây](#) *(thêm link sau khi quay xong)*

---

## ❓ Trả lời 3 câu hỏi

### 1. AsyncStorage hoạt động như thế nào?

AsyncStorage là một hệ thống lưu trữ key-value bất đồng bộ (asynchronous), không mã hóa, bền vững (persistent) dành riêng cho React Native. Dữ liệu được lưu dưới dạng **chuỗi string** trong bộ nhớ cục bộ của thiết bị.

**Cách hoạt động:**
- Dữ liệu lưu dưới dạng `key → value` (value là string)
- Để lưu object phức tạp, cần dùng `JSON.stringify()` khi ghi và `JSON.parse()` khi đọc
- Mọi thao tác (getItem, setItem, removeItem) đều trả về **Promise**, phải dùng `async/await` hoặc `.then()/.catch()`
- Dữ liệu **tồn tại sau khi đóng app**, chỉ mất khi gỡ cài đặt hoặc xóa data app

```js
// Lưu
await AsyncStorage.setItem('key', JSON.stringify({ name: 'Khanh' }));

// Đọc
const json = await AsyncStorage.getItem('key');
const data = JSON.parse(json);
```

---

### 2. Vì sao dùng AsyncStorage thay vì biến state?

| | **State (useState)** | **AsyncStorage** |
|---|---|---|
| **Phạm vi** | Trong memory, mất khi reload/tắt app | Lưu trên thiết bị, bền vững |
| **Dữ liệu tồn tại** | Chỉ trong runtime | Sau khi tắt và mở lại app |
| **Truy cập** | Đồng bộ, tức thì | Bất đồng bộ (async) |
| **Phù hợp** | UI state tạm thời | Dữ liệu người dùng, session, giỏ hàng |

**Ví dụ cụ thể trong bài:**
- Nếu dùng `useState` cho giỏ hàng → mỗi lần reload app giỏ bị mất
- Dùng AsyncStorage → giỏ hàng vẫn còn sau khi tắt app hoàn toàn

---

### 3. So sánh AsyncStorage với Context API

| | **Context API** | **AsyncStorage** |
|---|---|---|
| **Mục đích** | Chia sẻ state giữa các component (không cần prop drilling) | Lưu dữ liệu bền vững xuống thiết bị |
| **Tồn tại sau reload** | ❌ Không | ✅ Có |
| **Truy cập** | Đồng bộ | Bất đồng bộ |
| **Phạm vi** | Trong app đang chạy | Tầng storage của OS |
| **Kết hợp** | ✅ Nên dùng cùng nhau | ✅ Nên dùng cùng nhau |

**Trong bài này, hai thứ được kết hợp:**
- **Context API** → quản lý state trong runtime (cart, user, orders)
- **AsyncStorage** → persist dữ liệu qua các session

```
AsyncStorage (đĩa) ←→ Context (RAM) ←→ Component (UI)
   persistent           shared state      render
```

---

## 🔧 Kỹ thuật sử dụng

- ✅ `@react-native-async-storage/async-storage`
- ✅ `async/await` cho mọi thao tác storage
- ✅ `try/catch` xử lý lỗi
- ✅ `JSON.stringify` / `JSON.parse`
- ✅ File riêng: `services/storageService.js`
- ✅ Custom hook: `hooks/useStorage.js`
- ✅ Loading state khi đọc dữ liệu
- ✅ Context API kết hợp AsyncStorage

---

## 📋 Git Commits

```
feat: initial project setup with expo router
feat: login with asyncstorage - save user session
feat: cart persistence with asyncstorage
feat: checkout and orders with asyncstorage
feat: auto-login and logout functionality
feat: orders screen with persistent data
```
