const SubCategory = require('../models/subcategory');
const Product = require('../models/product');
const ObjectId = require('mongoose').Types.ObjectId;


module.exports = {
    getAll: (req, res) => {
        SubCategory.find()
        .then(subcategories => res.json(subcategories))
        .catch(err => res.status(500).json(err))
    },
    createSubCategory: (req, res) => {
        const subcategory = new SubCategory(req.body);
        subcategory.image = req.file.filename;
        subcategory.save()
            .then(() => res.status(201).json(subcategory))
            .catch(err => res.status(400).json(err))
    },
    products: (req, res) => {
        Product.find({
            subcategoryId: req.params.id
        })
        .then(products => res.json(products))
        .catch(err => res.status(500).json(err))
    }, 
    deleteSubCategory: (req, res) => {
        SubCategory.findById(req.params.id)
            .then(subcategory => {
                if(subcategory) {
                    subcategory.delete()
                    .then(() => res.stauts(204).send())
                    .catch(() => res.status(500).send())
                } else {
                    res.stauts(404).send();
                }
            })
    },
    getById: (req, res) => {
        SubCategory.findById(req.params.id)
            .then(subcategory => {
                if(!subcategory) {
                    res.status(404).send()
                    return
                }
                res.json(subcategory)
            }) 
            .catch(err => res.stauts(500).json(err)) 
    },
    editSubcategory: (req, res) => {
        SubCategory.findOneAndUpdate({_id: new ObjectId(req.params.id)}, req.body, {new:true})
            .then(subcategory => res.status(201).json(subcategory))
            .catch(err => res.status(418).res(err))
            console.log('subcategory updated!')
    }
}