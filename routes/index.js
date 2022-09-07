// script ini untuk menangani routes index.

// begin: import modules
const express = require('express');
const showdown = require('showdown');
const excerptHtml = require('excerpt-html');
const Article = require('../models/article');
// end: import modules

// membuat objek router
const router = express.Router();

// untuk meng-konversi markdown ke html
const converter = new showdown.Converter();

router.get('/', async (req, res, next) => {
    const articles = await Article.find({});

    let finalArticles = articles.map((item) => {
        // gunakan modul excerptHtml untuk menggenerate excerpt
        item.excerpt = excerptHtml(converter.makeHtml(item.content));
        return item;
    });

    // tampilkan
    res.render('layout.ejs', {
        child: 'index.ejs',
        clientScript: 'index.js.ejs',
        data: {
            results: finalArticles
        }
    });
});

router.get('/add', async (req, res, next) => {
    // tampilkan
    res.render('layout.ejs', {
        child: 'add.ejs',
        clientScript: 'add.js.ejs',
        data: null
    });
});

router.post('/add', async (req, res, next) => {
    // bongkar request body
    const { title, content } = req.body;

    // buat artikel baru
    let articles = new Article({
        title: title,
        content: content
    });

    // simpan
    await articles.save();

    // redirect
    res.redirect('/');
});

router.get('/edit/:id', async (req, res, next) => {
    // dapatkan artikel berdasarkan id
    const article = await Article.findOne({
        _id: req.params.id
    });

    // tampilkan
    res.render('layout.ejs', {
        child: 'edit.ejs',
        clientScript: 'edit.js.ejs',
        data: {
            result: article
        }
    });
});

router.post('/edit', async (req, res, next) => {
    // bongkar request body
    const { id, title, content } = req.body;

    // update artikel berdasarkan id
    await Article.updateOne({
        _id: id
    }, {
        $set: {
            title: title,
            content: content
        }
    })

    // redirect
    res.redirect('/');
});

router.get('/show/:id', async (req, res, next) => {
    // dapatkan artikel berdasarkan id
    const article = await Article.findOne({
        _id: req.params.id
    });

    // tampilkan
    res.render('layout.ejs', {
        child: 'show.ejs',
        clientScript: 'show.js.ejs',
        data: {
            resultTitle: article.title,
            resultContent: converter.makeHtml(article.content)
        }
    });
});

router.get('/delete/:id', async (req, res, next) => {
    // delete artikel berdasarkan id
    await Article.deleteOne({
        _id: req.params.id
    });

    // redirect
    res.redirect('/');
});

module.exports = router;