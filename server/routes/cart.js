const express = require('express');
const ProductModel = require('../models/Carts');

const router = express.Router();

router.get('/cart', (req, res) => {
    ProductModel.find({})
        .then(carts => res.json(carts))
        .catch(err => res.json(err));
});

router.put('/updateCart/:id', (req, res) => {
    const id = req.params.id;
    ProductModel.findByIdAndUpdate(id, req.body, { new: true })
        .then(user => res.json(user))
        .catch(err => res.json(err));
});


router.get('/getCart/:id', (req, res) => {
    const CartId = req.params.id;
    ProductModel.findById(CartId)
        .then(cart => res.json(cart))
        .catch(err => res.json(err));
});

router.delete('/deleteCart/:id', (req, res) => {
    const id = req.params.id;
    ProductModel.findByIdAndDelete({ _id: id })
        .then(cart => res.json(cart))
        .catch(err => res.json(err));
});





module.exports = router;