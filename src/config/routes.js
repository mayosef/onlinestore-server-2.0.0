const express = require('express');
const users = require('../controllers/users')
const categories = require('../controllers/categories');
const products = require('../controllers/products')
const subcategories = require('../controllers/subcategories');
const authorization = require('./middlewares/authorization');
const multerProducts = require('./multer/products');
const multerCategories = require('./multer/categories');
const multerSubcategories = require('./multer/subcategories')
const multerUsers = require('./multer/users')
const apiRouter = express.Router();



apiRouter.get('/user', users.getAll);
apiRouter.put('/user', multerUsers.single('image'), users.createUser);
apiRouter.get('/user/me', authorization , users.me)
apiRouter.get('/user/:id', users.me)
apiRouter.post('/user/login', users.login)
apiRouter.post('/user/:id', users.editUser)
apiRouter.post('/user/image/:id', multerUsers.single('image'), users.updateImage)


apiRouter.get('/product', products.getAll);
apiRouter.put('/product', multerProducts.single('image'), products.createProduct);
apiRouter.post('/product/bulk', products.getByIds)
apiRouter.get('/product/:id', products.getById);
apiRouter.get('/category/:id/subcategory/:id/product/:id', products.getById)
apiRouter.post('/product/:id', products.editProduct)
apiRouter.delete('/product/:id', products.deleteProduct)

apiRouter.get('/category', categories.getAll);
apiRouter.get('/category/:id', categories.getById)
apiRouter.get('/category/:id', categories.subcategory)
apiRouter.put('/category', multerCategories.single('image'), categories.createCategory)
apiRouter.get('/category/:id/subcategory', categories.subcategory)
apiRouter.delete('/category/:id', categories.deleteCategory)
apiRouter.post('/category/:id', multerCategories.single('image'), categories.editCategory)

apiRouter.post('/subcategory/:id', subcategories.editSubcategory)
apiRouter.get('/subcategory', subcategories.getAll)
apiRouter.get('/subcategory/:id', subcategories.getById)
apiRouter.put('/subcategory', multerSubcategories.single('image'), subcategories.createSubCategory)
apiRouter.get('/category/:id/subcategory/:id/', subcategories.products)
apiRouter.delete('/subcategory/:id', subcategories.deleteSubCategory)




module.exports = apiRouter;