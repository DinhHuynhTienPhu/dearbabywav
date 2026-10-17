# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project là gì

**welcomewav**: website 1 trang, do fan làm, hướng dẫn người mới tìm hiểu nhóm K-pop tripleS (thành viên, hệ thống Objekt/COMO, thuật ngữ, video nên xem, link cộng đồng). Dùng Create React App (`react-scripts` 5), React 19, i18next. **Không phải game, không phải Unity.** User tự làm từ đầu nên chỉ áp dụng Phần A trong CLAUDE.md global.

## Lệnh

- `npm start`: dev server tại http://localhost:3000. Lỗi ESLint (config `react-app`) hiện ở console.
- `npm run build`: build tĩnh vào `build/`, chạy ở root `/`. Đây là cách kiểm tra chính: phải ra `Compiled successfully.` Các cảnh báo `babel-plugin-proposal-private-property-in-object` và `Browserslist ... old` có sẵn từ trước, bỏ qua được.
- Không có script lint riêng; lint chạy kèm `start` / `build`.
- **Test đang hỏng:** `src/App.test.js` là file mẫu của CRA (tìm chữ "learn react"), và `@testing-library/*` chưa được cài. Đừng dùng `npm test` để kiểm chứng. Kiểm UI bằng build rồi mở trình duyệt (desktop + mobile ≤600px).
- **Tự chụp màn hình để kiểm UI:** build xong, chạy `python -m http.server 5055 --directory build` (để chạy nền), rồi chạy `node tools/screenshot.mjs http://127.0.0.1:5055/ out.png 390 844 1 ".links-grid-container"`. Tham số lần lượt là url, file ảnh ra, rộng, cao, mobile 0/1, CSS selector để cuộn tới (`""` nếu không cần), thời gian chờ ms, đoạn JS chạy trước khi chụp (vd mở menu). Script dùng Chrome headless và không cần cài thêm package. Ảnh dùng `loading="lazy"`, nên phải chờ vài giây sau khi cuộn thì ảnh mới tải xong.
- **Thêm / đổi ảnh:** chạy `python tools/optimize_image.py <nguồn> <đích> [rộng tối đa]` để thu nhỏ và nén. Định dạng ra theo đuôi file đích. Cỡ đang dùng: ảnh thành viên 600, ảnh bìa card link 900, icon 128. Ảnh card link (`public/linklogos/*.webp`) là ảnh chụp màn hình trang thật; ghi đè đúng tên file cũ thì không phải sửa JS.

## Kiến trúc

**1 trang, không có router.** [src/App.js](src/App.js) render theo thứ tự cố định:
`Header` → `WelcomeWav` (hero) → khối nền đen chứa các section → `Footer` → `BackToTop` (nút tròn ở góc, hiện sau khi cuộn qua hero).

- **Menu nhảy tới section:** `NAV_ITEMS` trong [src/Header.js](src/Header.js) trỏ tới `id` của các `<section>`: `triples`, `system`, `terms`, `know`, `members`, `links`. Chữ của menu nằm trong key `nav.*`. Màn >900px thì link hiện thẳng trên header; ≤900px thì gom vào nút ☰. Thêm section mới vào menu thì gán `id` cho section rồi thêm 1 dòng vào `NAV_ITEMS` và `nav.*` ở cả 3 file dịch.
- **Đếm lượt xem:** dùng GoatCounter. Script nằm trong `public/index.html`; dashboard ở https://pphus1011.goatcounter.com. Lượt bấm gửi qua `trackClick(name)` trong [src/analytics.js](src/analytics.js). Tên sự kiện phải giống nhau ở mọi ngôn ngữ, vì vậy dùng title tiếng Anh của card link, `key` của video trong `stepsBase`, hoặc số thành viên (`member: S8`). GoatCounter tự bỏ qua localhost.
- **Dòng "xx WAV visited this site" ở footer** ([src/Footer.js](src/Footer.js)): lấy số từ `GOATCOUNTER_SITE + '/counter/TOTAL.json'`. GoatCounter cache số này tối đa 4 tiếng. Chỉ chạy khi tuỳ chọn "Allow adding visitor counts on your website" trong cài đặt GoatCounter đang bật, nếu không sẽ bị 403; khi đó (hoặc khi người xem dùng adblock) dòng này tự ẩn. Biến trong bản dịch là `{{n}}`, không đặt tên `count`, vì `count` là từ khoá số nhiều của i18next.

- **Xếp lớp:** ảnh nền hero trong [src/WelcomeWav.js](src/WelcomeWav.js) là `position: fixed; zIndex: 0`, chữ hero mờ dần theo scroll (tính trong `requestAnimationFrame`). Các section nằm trong wrapper `backgroundColor: black; zIndex: 2; position: relative` ở App.js để che ảnh nền khi cuộn. Section mới phải đặt **bên trong** wrapper này.
- **Mỗi section là 1 file component** trong `src/`, dùng class chung `.section`, `.section-header`, `.section-text` trong [src/App.css](src/App.css). Style trộn giữa class CSS global và inline style.
- **Responsive:** breakpoint 600px / 900px trong App.css. Hàng ảnh + chữ (`text-and-image-same-row`, `-reverse`) được media query đổi thành cột trên mobile.
- **Lưới (grid): khoảng cách giữa các hàng phải dùng px, không dùng %.** Với lưới không có chiều cao cố định, trình duyệt tính `row-gap` theo % sau khi đã xếp xong, nên nội dung tràn ra ngoài khung. Lỗi này từng làm thẻ thành viên đè lên mục kế tiếp trên mobile, và từng phải che bằng các khoảng đệm `.mobile-spacer` (đã bỏ). Ngoài ra, media query ghi đè rule gốc phải nằm **sau** rule gốc trong file CSS.
- **Ảnh tĩnh** nằm trong `public/` và được gọi bằng đường dẫn tương đối dạng chuỗi (`'./members/3.webp'`, `'./linklogos/x.webp'`), không `import`. Ảnh thành viên: `public/members/{1..24}.webp`, kích thước 600×927. `<img>` có `width={600} height={927}` để giữ chỗ trước khi ảnh lazy tải xong; nếu không có, menu nhảy tới section sẽ lệch vị trí. Đổi cỡ ảnh thành viên thì sửa luôn 2 số này.
- `src/Members.js` không còn dùng (bản cũ viết cứng tiếng Anh, đã thay bằng `MembersGrid.js`).

## i18n (phần cần đọc kỹ trước khi sửa nội dung)

- Cấu hình ở [src/i18n.js](src/i18n.js), gồm 3 ngôn ngữ `en` / `vi` / `ko`, fallback `en`. Ngôn ngữ được dò theo thứ tự `?lng=xx` trên URL → localStorage → trình duyệt. Danh sách `LANGS` trong [src/Header.js](src/Header.js) phải khớp `supportedLngs`.
- **File dịch dùng key phẳng có dấu chấm** (`"welcome.title": "..."`), trộn với value lồng (`"members.cards": { "1": [...] }`). i18next vẫn tra được nhờ cơ chế mặc định `ignoreJSONStructure`. Giữ đúng kiểu này, không chuyển sang JSON lồng.
- **Chữ nằm trong JSON, còn URL / ảnh nằm trong mảng JS. Hai bên ghép với nhau theo vị trí (index):**
  - `members.cards."N"` ↔ phần tử `id: N` trong [src/MembersGrid.js](src/MembersGrid.js) (ảnh `./members/N.webp` + link fandom wiki).
  - `know.steps[i]` ↔ `stepsBase[i]` trong [src/GetToKnowThem.js](src/GetToKnowThem.js).
  - `links.officialLinks[i]` / `links.fanmadeLinks[i]` ↔ mảng `officialLinks` / `fanmadeLinks` trong [src/OtherLinks.js](src/OtherLinks.js). Mảng JS ở đây còn chứa mô tả tiếng Anh dự phòng, và `title` của card không được dịch.
  - Thêm / xoá / đổi thứ tự 1 mục thì phải sửa mảng JS **và cả 3 file locale** ở đúng vị trí đó.
- **Biệt danh / meme của thành viên không dịch**, giữ nguyên ở cả 3 ngôn ngữ (vd S22 "Nun", S24 "She is a ballerina", "SoXinz4life", "Yeonjimon"). Chưa chắc 1 từ có phải biệt danh không thì hỏi user trước khi dịch.
- Tiếng Hàn: `html:lang(ko)` dùng `word-break: keep-all` (trong `index.css`) để không ngắt dòng giữa từ. `<html lang>` được cập nhật trong `i18n.js`; listener phải đăng ký trước `init()`, nếu không sẽ bỏ lỡ lần nhận diện ngôn ngữ đầu tiên.
- **Dòng thông tin thành viên** (`members.cards`) hỗ trợ 2 ký hiệu, xử lý trong `renderInfo` ở [src/MemberCard.js](src/MemberCard.js):
  - `<s>chữ</s>`: gạch ngang. Không dùng `~~`, vì bản ko có dùng `~~~~` để kéo dài chữ.
  - `[chữ](url)`: link. Link này render thành `<span>` chứ không phải `<a>`, vì cả thẻ đã là `<a>` trỏ sang fandom wiki. Đoạn code này chặn click để thẻ không mở wiki.
- **Mục thuật ngữ** ([src/OtherNamesTerms.js](src/OtherNamesTerms.js)): với `terms.triples` / `terms.wav` / `terms.signal`, JS đã render link tên thuật ngữ + `": "`, nên bản dịch **chỉ chứa phần mô tả**. Các `terms.*` còn lại thì bản dịch chứa **cả tên lẫn mô tả** (`"HAUS: ..."`), vì tên thuật ngữ cũng được dịch (vd ko `언니:`).
- Hiện 3 file locale có bộ key giống hệt nhau và độ dài mảng bằng nhau. Sửa xong thì kiểm lại bằng lệnh:
  ```
  node -e "const d={};for(const l of ['en','vi','ko'])d[l]=require('./src/locales/'+l+'/translation.json');for(const l of ['vi','ko'])console.log(l,Object.keys(d.en).filter(k=>!(k in d[l])),Object.keys(d[l]).filter(k=>!(k in d.en)),d[l]['know.steps'].length,d[l]['links.officialLinks'].length,d[l]['links.fanmadeLinks'].length,Object.keys(d[l]['members.cards']).length)"
  ```

## SEO / deploy

- Tên miền chính là `https://welcomewav.website/`. `welcomewav.netlify.app` vẫn trả về cùng nội dung (không redirect), nên [public/index.html](public/index.html) có `<link rel="canonical">` trỏ về tên miền chính. Meta / Open Graph / Twitter card, `public/robots.txt` và `public/sitemap.xml` đều dùng tên miền chính. Đổi tên miền thì sửa cả 3 chỗ.
- Favicon dùng `public/favico.ico` / `favico.png` (tên file **không có chữ "n"**). Cả `index.html` và `manifest.json` đều trỏ tới 2 file này.
- `public/google5426b025a3d42514.html` là file xác minh Google Search Console. Không được xoá hay đổi tên.
- Repo không có file cấu hình deploy. Output là site tĩnh từ `npm run build`.
