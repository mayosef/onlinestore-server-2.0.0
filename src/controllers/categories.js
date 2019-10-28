const Category = require('../models/category');
const SubCategory = require ('../models/subcategory');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = {
    getAll: (req, res) => {
        Category.find()
            .then(categories => res.json(categories))
            .catch(err => res.status(500).json(err))
    },
    getById: (req, res) => {
        Category.findById(req.params.id)
        .then(category => {
            if(!category) {
                res.status(404).send()
                return
            }
            res.json(category)
        })
        .catch(err => res.status(500).json(err))
    },
    createCategory: (req, res) => {
        const category = new Category(req.body);
        category.image = req.file.filename;
        category.save()
            .then(() => res.status(201).json(category))
            .catch(err => res.status(400).json(err))
    },
    subcategory: (req, res) => {
        SubCategory.find({
            categoryId: req.params.id
        })
        .then(subcategories => res.json(subcategories))
        .catch(err => res.status(500).json(err))
    },
    deleteCategory: (req, res) => {
        Category.findById(req.params.id)
            .then(category => {
                if(category) {
                    category.delete()
                    .then(() => res.status(204).send())
                    .catch(() => res.status(500).send());
                } else {
                    res.status(404).send();
                }
            })
    },
    editCategory: (req, res) => {

        Category.findOneAndUpdate({_id: new ObjectId(req.params.id)},
         req.body,
         {new:true})
        .then(category => {
            res.status(201).json(category)
            
        })
        .catch(err => res.status(418).json(err));
        console.log('updated');
    }
}


// //
// },
// getById: (req, res) => {
//     Category.findById(req.params.id)
//     .then(category => {
//         if(!category) {
//             res.status(404).send()
//             return
//         }
//         res.json(category)
//     })
//     .catch(err => res.status(500).json(err))
// }, 
// //