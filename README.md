# shb-nd-ejs-smde-markdown - Aplikasi Markdown dengan SimpleMDE dan Node.js

## Link-Link Penting

- Website Utama Saya: https://bit.ly/shb-main
- Akun GitHub Saya: https://bit.ly/shb-github
- Channel YouTube Saya: https://bit.ly/shb-channel
- Bayar Sesukanya: https://bit.ly/shb-traktir

## Software Apakah Ini?

shb-nd-ejs-smde-markdown adalah Aplikasi Markdown dengan SimpleMDE dan Node.js.

## Screenshot

![ScreenShot](.readme-assets/shb-nd-ejs-smde-markdown-1.png?raw=true)

![ScreenShot](.readme-assets/shb-nd-ejs-smde-markdown-2.png?raw=true)

## Cara Mencoba Kode Ini

Untuk mencoba kode ini, masuk ke dalam folder ini via terminal.

Selanjutnya, jalankan:

```
npm install
```

Selanjutnya, jalankan:

```
npm run dev
```

## Pendahuluan

Kali ini, saya akan memberi contoh untuk membuat aplikasi CRUD Markdown dengan SimpleMDE dan beberapa modul Node.js.

Aplikasi yang akan kita buat ini nantinya bisa membuat, membaca, mengupdate, dan menghapus artikel dengan format markdown.

Artikel tersebut juga bisa disisipi gambar yang diambil dari image gallery.

Jadi ada dua bagian di aplikasi ini:

- Artikel
- Image Gallery

Nantinya jika kita ingin menyisipi gambar di artikel, kita tinggal mengklik icon tertentu sehingga pop up berisi daftar gambar memunculkan gambar-gambar dari gallery.

Adapun gallery digunakan untuk me-manage gambar yang diupload.

## Cara Kerja

Aplikasi ini bekerja sebagaimana aplikasi CRUD pada umumnya.

Walaupun begitu, ada sedikit penambahan fitur pada aplikasi ini.

Misalnya, format yang digunakan untuk create dan update adalah markdown.

Selain itu, saya juga memberi tambahan fitur pada editor markdownnya untuk menyisipkan gambar dari gallery.

Fitur tersebut bekerja di sisi client maupun server.

Pada saat kita mengklik icon di toolbarnya, kita me-request ke server melalui AJAX untuk mem-fetch gambar yang tersedia di gallery.

## Struktur Project

Untuk melihat struktur project aplikasi ini, silakan buka project ini di text editor.

## Penting untuk Diketahui

Yang perlu Anda perhatikan adalah parameter fungsi render pada beberapa handler:

```
// misal:
res.render('layout.ejs', {
    child: 'edit.ejs',
    clientScript: 'edit.js.ejs',
    data: {
        result: article
    }
});
```

edit.js.ejs sebenarnya dimasukkan via tag ejs ini di bagian layout.ejs:

```
 <%- include(clientScript, {data: data}); %>
```

Tujuannya adalah agar jika ada dependency JavaScript yang diletakkan di bawah, maka client script tadi dijalankan setelahnya.