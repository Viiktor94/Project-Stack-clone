const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render("index", {titulo: "Mi título dinámico"})
})

router.get('/services', (req, res) => {
    res.render("services", {tituloServicios: "Mensaje dinámico"})
})

module.exports = router;