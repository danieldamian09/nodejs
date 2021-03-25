// base para construir la ruta
const express = require('express');
const Mascota = require('../models/mascota');
const router = express.Router();
// base para construir la ruta

// exportar el modelo de Mascotas
const Mascotas = require('../models/mascota')

router.get('/', async(req, res) => {

    try {
        
        // con esta constante mongoose nos va a traer toda nuestra coleccion
        const arrayMascotasDB = await Mascotas.find()
        console.log(arrayMascotasDB)

        res.render("mascotas", {
            arrayMascotas: arrayMascotasDB
        })

    } catch (error) {
        console.log(error)
    }

})


router.get('/crear', (req, res) => {
    res.render('crear')
})

// Para recibir informacion de nuestro sitio Web
router.post('/', async(req, res) => {
    const body = req.body
    // console.log(body)
    try {
        const mascotaDB = new Mascota(body)
        // con esto guardamos en mongo db
        await mascotaDB.save()
        // console.log('Mascota Creada: ', mascotaDB)

        // ------------------------------------------------------------------
        // otra forma de crear nuestra mascota y guardarla en la base de datos
        // await Mascotas.create(body)
        // --------------------------------------------------------------------

        // utilizamos redirect para empujar al usuario a la ruta que necesitemos
        res.redirect('/mascotas')


    } catch (error) {
        console.log(error)
    }
})


module.exports = router;
