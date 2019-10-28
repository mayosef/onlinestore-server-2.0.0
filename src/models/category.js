const mongoose = require('mongoose');

 const CategorySchema = new mongoose.Schema({
     name: {
         required:true,
         type:String
     },
     image: {
         type:Array,
     }
 },{collection:'categories',
    toJSON: {
        transform: (doc, ret) => {
        ret.id = ret._id
        delete ret._id
        return ret
        }
    }
});


 const Category = mongoose.model('category', CategorySchema)
 module.exports = Category;