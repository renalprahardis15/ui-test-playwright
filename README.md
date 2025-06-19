# 🎯 Playwright UI Test Portfolio – Renal Prahardis

Repositori ini berisi script UI test automation menggunakan **Playwright**, dibuat untuk kebutuhan portofolio QA.

---

## 🧪 Tujuan Project
- Menunjukkan kemampuan membuat automation test menggunakan Playwright.
- Menerapkan struktur **Page Object Model (POM)**.
- Melakukan validasi UI (form, navigasi, aksi).
- Menjalankan test dengan Playwright Test Runner + GitLab CI.

---

## 📁 Struktur Folder

```
.
├── fixtures/images        # Berisi gambar referensi (jika ada)
├── pages/                 # Page Object Model untuk tiap halaman
├── tests/campaign/        # Kumpulan test case
├── .gitignore             # File/folder yang diabaikan Git
├── .gitlab-ci.yml         # Konfigurasi GitLab CI
├── package.json           # Dependencies project
├── package-lock.json      # Lock file untuk npm
├── playwright.config.js   # Konfigurasi Playwright
```

---

## ⚙️ Cara Menjalankan Test

### 1. Install dependency
```bash
npm install
```

### 2. Jalankan semua test
```bash
npx playwright test
```

### 3. Jalankan test tertentu
```bash
npx playwright test tests/campaign/send-rewards.spec.js
```

### 4. Jalankan test dengan tampilan browser (headed mode)
```bash
npx playwright test --headed
```

---

## 📌 Author

**Renal Prahardis**  
Automation QA | Always Learning  


---

## 📝 Lisensi

Project ini dibuat untuk kebutuhan showcase dan pembelajaran pribadi.
