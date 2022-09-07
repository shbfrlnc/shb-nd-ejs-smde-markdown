// script ini untuk mengangani route gallery.

// begin: import modules
const express = require('express');
const fs = require('fs');
const File = require('../models/file');
// end: import modules

// buat objek router
const router = express.Router();

router.get('/', async (req, res, next) => {
    // listing semua files
    const allFiles = await File.find({});

    let resultTags = [];
    allFiles.forEach((item, index) => {
        item.tags.forEach((item1, index1) => {
            resultTags.push(item1)
        });
    });

    let uniqueTags = [...new Set(resultTags)];

    // listing berdasarkan tag
    const resultFiles = await File.find({
        tags: req.query.tag
    });

    // tampilkan
    res.render('layout.ejs', {
        child: 'gallery.ejs',
        clientScript: 'gallery.js.ejs',
        data: {
            // kalau tag diberikan maka ambil berdasarkan tag
            // jika tidak tampilkan semuanya
            results: req.query.tag ? resultFiles : allFiles,
            resultTags: uniqueTags
        }
    });
});

router.get('/ajax-list-image', async (req, res, next) => {
    // untuk memberikan output di modal select image nantinya
    const allFiles = await File.find({});
    res.json(allFiles)
});

router.post('/upload', async (req, res, next) => {
    // prosedur upload
    if (req.file) {
        const { title, tags } = req.body;
        const newFile = new File({
            title: title,
            tags: tags[1].split(","),
            path: req.file.path.replace("\\", "/")
        });

        await newFile.save();
    }
    res.redirect('/gallery');
});

router.get('/delete/:id', async (req, res, next) => {
    // delete berdasarkan id
    const deleted = await File.findOneAndDelete({
        _id: req.params.id
    });

    // delete file nya
    fs.unlinkSync('./' + deleted.path);

    res.redirect('/gallery')
});

router.get('/download/:id', async (req, res, next) => {
    // download berdasarkan id
    const found = await File.findOne({
        _id: req.params.id
    });

    res.download(found.path);
});

module.exports = router;