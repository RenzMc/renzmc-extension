# RenzmcLang Language Support for Visual Studio Code

![RenzmcLang Logo](icon.png)

Dukungan bahasa lengkap untuk **RenzmcLang** - bahasa pemrograman berbasis Bahasa Indonesia yang modern dan powerful!

## ✨ Fitur

### 🎨 Syntax Highlighting Lengkap
- **Keywords**: Semua keyword RenzmcLang (jika, untuk, fungsi, kelas, dll)
- **Operators**: Aritmatika, perbandingan, logika, bitwise, assignment
- **Strings**: Single quotes, double quotes, triple quotes, f-strings
- **Comments**: Line comments (//, #, --) dan block comments (/* */)
- **Numbers**: Integer, float, hex, binary, octal
- **Built-in Functions**: 150+ fungsi bawaan RenzmcLang
- **Classes & Functions**: Highlighting untuk deklarasi dan pemanggilan
- **Constants**: Boolean (benar/salah), null (kosong/nihil), self (diri/ini)

### 📝 Smart Indentation
- Auto-indent setelah keyword blok (fungsi, jika, untuk, kelas, dll)
- Auto-outdent untuk keyword penutup (selesai, akhir)
- Indentation rules yang mengikuti konvensi RenzmcLang

### 🔧 Auto-Completion
- Auto-closing brackets: `{}`, `[]`, `()`
- Auto-closing quotes: `""`, `''`
- Auto-closing triple quotes: `"""`, `'''`
- Smart pairing untuk semua delimiter

### 📁 File Association
- Ekstensi file: `.rmc`, `.renzmc`
- Icon khusus untuk file RenzmcLang

## 🚀 Instalasi (Manual)

1. Download file **`renzmc-language-support-1.0.0.vsix`** dari halaman [Releases](https://github.com/RenzMc/renzmc-extension/releases).
2. Buka **Visual Studio Code**.
3. Tekan **Ctrl+Shift+P** (Windows/Linux) atau **Cmd+Shift+P** (Mac).
4. Ketik **Install from VSIX...** dan pilih file `renzmc-language-support-1.0.0.vsix`.
5. Reload VSCode jika diminta.

Selesai ✅ ekstensi siap digunakan.

## 📖 Penggunaan

Setelah instalasi, extension akan otomatis aktif untuk file dengan ekstensi `.rmc` atau `.renzmc`.

### Contoh Kode

```renzmc
// Hello World
tampilkan "Hello, World!"

// Variabel dan Tipe Data
nama itu "Budi"
umur itu 25
tinggi itu 175.5
is_student itu benar

// Function
fungsi tambah(a, b):
    hasil a + b
selesai

hasil_tambah itu tambah(5, 3)
tampilkan f"Hasil: {hasil_tambah}"

// Class
kelas Mahasiswa:
    konstruktor(nama, nim):
        diri.nama itu nama
        diri.nim itu nim
    selesai
    
    metode perkenalan():
        tampilkan f"Nama: {diri.nama}, NIM: {diri.nim}"
    selesai
selesai

// Control Flow
jika umur >= 18
    tampilkan "Dewasa"
kalau_tidak
    tampilkan "Anak-anak"
selesai

// Loop
untuk x dari 1 sampai 10
    tampilkan x
selesai

// Async/Await
async fungsi ambil_data(url):
    response itu await http_get(url)
    hasil response.json()
selesai
```

## 🎯 Fitur yang Didukung

### Keywords
- **Control Flow**: jika, kalau, maka, kalau_tidak, lainnya, selain
- **Loops**: selama, ulangi, untuk, setiap, dari, sampai
- **Flow Control**: lanjut, berhenti, lewati, kembali, hasil
- **Functions**: fungsi, buat, lambda, async, await
- **Classes**: kelas, metode, konstruktor, warisi
- **Exception**: coba, tangkap, akhirnya
- **Switch**: cocok, kasus, bawaan
- **Import**: impor, impor_python, dari_python, gunakan
- **Context**: dengan, sebagai
- **End**: selesai, akhir, tutup

### Operators
- **Arithmetic**: +, -, *, /, %, **, //
- **Comparison**: ==, !=, >, <, >=, <=
- **Logical**: dan, atau, tidak, bukan
- **Bitwise**: &, |, ^, ~, <<, >>
- **Assignment**: =, +=, -=, *=, /=, %=, **=, //=
- **Walrus**: :=
- **Membership**: dalam, tidak_dalam, adalah
- **Arrow**: ->, =>

### Built-in Functions
- **I/O**: tampilkan, tulis, cetak, tunjukkan, tanya, input, baca
- **String**: panjang, huruf_besar, huruf_kecil, potong, ganti, pisah, gabung, dll
- **Math**: bulat, absolut, pangkat, akar, sinus, cosinus, rata_rata, dll
- **List**: tambah, hapus, masukkan, urutkan, balik, jumlah, min, max
- **Dict**: kunci, nilai, items, perbarui
- **File**: baca_file, tulis_file, tambah_file, hapus_file, ada_file
- **JSON**: json_parse, json_stringify, json_baca, json_tulis
- **HTTP**: http_get, http_post, http_put, http_delete, ambil_http, kirim_http
- **System**: waktu, tanggal, acak, direktori_sekarang, buat_direktori
- **Conversion**: ke_teks, ke_angka, ke_bulat, ke_boolean, ke_list
- **Iteration**: zip, enumerate, range, map, filter, reduce

## 🔗 Links

- [RenzmcLang GitHub](https://github.com/RenzMc/RenzmcLang)
- [RenzmcLang PyPI](https://pypi.org/project/renzmc/)
- [Documentation](https://github.com/RenzMc/RenzmcLang/tree/main/docs)
- [Examples](https://github.com/RenzMc/RenzmcLang/tree/main/examples)

## 🐛 Bug Reports & Feature Requests

Jika menemukan bug atau ingin request fitur baru, silakan buat issue di:
[GitHub Issues](https://github.com/RenzMc/renzmc-extension/issues)

## 📝 License

MIT License - Copyright (c) 2025 RenzMc

## 👨‍💻 Author

**RenzMc**
- Email: renzaja11@gmail.com
- GitHub: [@RenzMc](https://github.com/RenzMc)

---

**Made with ❤️ for Indonesian developers**

*"Coding in your native language, thinking in your native way"*
