const express = require("express");
const app = express();
const port = 3000;

// Set EJS sebagai template engine
app.set("view engine", "ejs");

// Middleware untuk menyediakan file statis
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Menyimpan angka acak yang harus ditebak
let targetNumber = Math.floor(Math.random() * 100) + 1;

// Route utama
app.get("/", (req, res) => {
    res.render("index", { message: "", guessedNumber: null });
});

// Route untuk menangani tebakan
app.post("/guess", (req, res) => {
    const guessedNumber = parseInt(req.body.number);
    let message = "";

    if (guessedNumber > targetNumber) {
        message = "Terlalu tinggi! Coba lagi.";
    } else if (guessedNumber < targetNumber) {
        message = "Terlalu rendah! Coba lagi.";
    } else {
        message = "Selamat! Anda menebak dengan benar.";
        targetNumber = Math.floor(Math.random() * 100) + 1; // Reset angka acak
    }

    res.render("index", { message, guessedNumber });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});