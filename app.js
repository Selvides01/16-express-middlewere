const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const app = express();
const port = 3000;

// Gunakan ejs
app.set('view engine', 'ejs');

// Third-party Middlew
app.use(expressLayouts);
app.use(morgan('dev'));

// Built-in middle
app.use(express.static('public'));

// Application level middleware
app.use((req, res, next) => {
    console.log('Time:', Date.now());
    next();
});

app.get('/', (req, res) => {
    const mahasiswa = [
        {
            nama: 'Selvi Desti Riyani',
            email: 'selvi@gmail.com',
        },
        {
            nama: 'Tegar Febrian',
            email: 'tegar@gmail.com',
        },
        {
            nama: 'Winda',
            email: 'winda@gmail.com',
        },
    ];
    res.render('index', {
        nama: 'Selvi Desti Riyani',
        title: 'Halaman Home',
        mahasiswa,
        layout: 'layouts/main-layout', // Perbaikan: layout tanpa ekstensi dan path relatif
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        layout: 'layouts/main-layout', // Perbaikan: layout tanpa ekstensi dan path relatif
        title: 'Halaman About',
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layouts/main-layout', // Perbaikan: layout tanpa ekstensi dan path relatif
        title: 'Halaman Contact',
    });
});

app.get('/product/:id/category', (req, res) => {
    res.send(`Product ID: ${req.params.id} <br> Category: ${req.query.category}`);
});

app.use((req, res) => {
    res.status(404).send('<h1>404 - Not Found</h1>');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
