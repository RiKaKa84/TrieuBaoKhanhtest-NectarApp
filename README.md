

> Sinh viên:Triệu Bảo Khanh  
> MSSV:23810310013  
> Môn học:Phát triển ứng dụng di động  
> Framework:React Native (Expo)



## 🗂️ Cấu trúc code quan trọng

```
Nectar-App/
├── services/
│   └── storageService.js          ← File tập trung AsyncStorage logic
├── hooks/
│   └── useStorage.js              ← Custom hook useStorage (điểm cộng)
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

Hướng dẫn chạy app

Yêu cầu
- Node.js >= 18
- Expo CLI: `npm install -g expo-cli`
- Expo Go app (Android/iOS) hoặc Android Emulator

Các bước

```bash
1. Clone repo
git clone <repo-url>
cd Nectar-App

2. Cài dependencies
npm install

3. Chạy app
npx expo start

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

🎬 Video Demo

> Video demo 2–5 phút thực hiện đầy đủ:
> - Login → kill app → mở lại (auto-login)
> - Thêm vào giỏ → kill app → mở lại
> - Checkout → xem lại đơn
> - Logout → về màn Login

📹 **Link video:** [Xem tại đây](#) *(thêm link sau khi quay xong)*


1. AsyncStorage hoạt động như thế nào?

AsyncStorage là một hệ thống lưu trữ key-value bất đồng bộ (asynchronous), không mã hóa, bền vững (persistent) dành riêng cho React Native. Dữ liệu được lưu dưới dạng chuỗi string trong bộ nhớ cục bộ của thiết bị.

**Cách hoạt động:**
- Dữ liệu lưu dưới dạng `key → value` (value là string)
- Để lưu object phức tạp, cần dùng `JSON.stringify()` khi ghi và `JSON.parse()` khi đọc
- Mọi thao tác (getItem, setItem, removeItem) đều trả về Promise, phải dùng `async/await` hoặc `.then()/.catch()`
- Dữ liệu **tồn tại sau khi đóng app**, chỉ mất khi gỡ cài đặt hoặc xóa data app

```js
// Lưu
await AsyncStorage.setItem('key', JSON.stringify({ name: 'Khanh' }));

// Đọc
const json = await AsyncStorage.getItem('key');
const data = JSON.parse(json);
```

---

2. Vì sao dùng AsyncStorage thay vì biến state?

State (ví dụ như useState) và AsyncStorage đều có thể dùng để lưu dữ liệu trong ứng dụng, nhưng chúng phục vụ những mục đích khác nhau.
useState lưu dữ liệu trong bộ nhớ tạm của ứng dụng, vì vậy dữ liệu chỉ tồn tại trong lúc app đang chạy. Khi người dùng reload, tắt app hoặc mở lại ứng dụng, dữ liệu trong state sẽ bị mất. Việc truy cập state diễn ra đồng bộ và gần như tức thì, nên rất phù hợp để quản lý những trạng thái tạm thời của giao diện, chẳng hạn như trạng thái mở/đóng modal, nội dung ô nhập liệu hoặc trạng thái loading.
Ngược lại, AsyncStorage cho phép lưu dữ liệu trực tiếp trên thiết bị, nên có tính bền vững hơn. Dữ liệu được lưu trong AsyncStorage vẫn còn ngay cả khi người dùng tắt hoàn toàn ứng dụng rồi mở lại. Tuy nhiên, vì làm việc với bộ nhớ lưu trữ của thiết bị nên việc truy cập dữ liệu trong AsyncStorage là bất đồng bộ (async), không tức thì như state. AsyncStorage đặc biệt phù hợp để lưu những dữ liệu cần được giữ lại lâu dài như thông tin người dùng, phiên đăng nhập, giỏ hàng hoặc cài đặt cá nhân.
Trong ví dụ cụ thể của bài, nếu sử dụng useState để lưu giỏ hàng, thì mỗi lần ứng dụng bị reload hoặc bị tắt, toàn bộ dữ liệu giỏ hàng sẽ biến mất. Ngược lại, nếu dùng AsyncStorage, dữ liệu giỏ hàng sẽ vẫn được giữ nguyên, kể cả sau khi người dùng tắt app hoàn toàn và mở lại sau đó.
Tóm lại, state thích hợp cho dữ liệu tạm thời trong quá trình chạy ứng dụng, còn AsyncStorage phù hợp với dữ liệu cần được lưu lâu dài. Vì vậy, trong những trường hợp như lưu giỏ hàng, session hoặc thông tin người dùng, AsyncStorage là lựa chọn hợp lý hơn so với chỉ dùng state.


3. So sánh AsyncStorage với Context API

Context API và AsyncStorage là hai công cụ phục vụ những mục đích khác nhau trong ứng dụng, nhưng thường được sử dụng kết hợp với nhau để đạt hiệu quả tốt hơn.
Context API được dùng để chia sẻ state giữa nhiều component mà không cần truyền dữ liệu thủ công qua nhiều tầng props (hay còn gọi là prop drilling). Tuy nhiên, dữ liệu được lưu bằng Context API chỉ tồn tại trong thời gian ứng dụng đang chạy, nên sẽ không còn sau khi reload hoặc khởi động lại app. Ngoài ra, việc truy cập dữ liệu qua Context API là đồng bộ, phù hợp cho việc quản lý trạng thái trong phạm vi của ứng dụng đang hoạt động.
Trong khi đó, AsyncStorage được sử dụng để lưu trữ dữ liệu bền vững trên thiết bị. Khác với Context API, dữ liệu trong AsyncStorage vẫn còn sau khi reload hoặc mở lại ứng dụng. Vì làm việc trực tiếp với tầng lưu trữ của hệ điều hành nên AsyncStorage hoạt động theo cơ chế bất đồng bộ. Đây là lựa chọn phù hợp khi cần lưu những thông tin như token đăng nhập, cài đặt người dùng hoặc dữ liệu cần giữ lại lâu dài.
Tóm lại, Context API thích hợp để quản lý và chia sẻ trạng thái trong lúc ứng dụng đang chạy, còn AsyncStorage phù hợp để lưu dữ liệu lâu dài trên thiết bị. Trong thực tế, hai công cụ này nên được dùng cùng nhau: AsyncStorage để lưu dữ liệu bền vững, và Context API để đưa dữ liệu đó vào state của ứng dụng nhằm sử dụng thuận tiện trong giao diện.
Trong bài này, hai thứ được kết hợp:
- Context API** → quản lý state trong runtime (cart, user, orders)
- AsyncStorage** → persist dữ liệu qua các session

```
AsyncStorage (đĩa) ←→ Context (RAM) ←→ Component (UI)
   persistent           shared state      render
```

---

Kỹ thuật sử dụng

- `@react-native-async-storage/async-storage`
- `async/await` cho mọi thao tác storage
- `try/catch` xử lý lỗi
- `JSON.stringify` / `JSON.parse`
- File riêng: `services/storageService.js`
- Custom hook: `hooks/useStorage.js`
- Loading state khi đọc dữ liệu
- Context API kết hợp AsyncStorage

---

Git Commits

```
feat: initial project setup with expo router
feat: login with asyncstorage - save user session
feat: cart persistence with asyncstorage
feat: checkout and orders with asyncstorage
feat: auto-login and logout functionality
feat: orders screen with persistent data
```
