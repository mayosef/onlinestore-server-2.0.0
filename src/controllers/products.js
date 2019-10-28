const Product = require('../models/product');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    getAll: (req, res) => {
        Product.find()
            .then(products => res.json(products))
            .catch(err => res.status(500).json(err))
    },
    createProduct: (req, res) => {
        const product = new Product(req.body);
        product.image = req.file.filename;
        product.save()
            .then(() => res.status(201).json(product))
            .catch(err => res.status(400).json(err))
    },
    getById: (req, res) => {
        Product.findById(req.params.id)
        .then(product => {
            if(!product) {
                res.status(404).send();
                return;
            }
            res.json(product)
        })
        .catch(err => res.status(500).json(err))
    }, 
    deleteProduct: (req, res) => {
        Product.findById(req.params.id)
            .then(product => {
                if (product) {
                    product.delete()
                    .then(() => res.status(204).send())
                    .catch(() => res.status(500).send())
                } else {
                    res.status(404).send()
                }
            })
    },
    getByIds:(req, res) => {
        Product.find({
            _id:{$in:req.body.ids}
        })
        .then(products => res.json(products))
        .catch(err => res.status(500).json(err))
    },
    editProduct: (req, res) => {
        Product.findOneAndUpdate({_id: new ObjectId(req.params.id)}, req.body, {new:true})
        .then(product => res.status(201).json(product))
        .catch(err => res.status(418).json(err))
    }
}