const mongoose = require('mongoose');


const SubCategorySchema = new mongoose.Schema({
    name: {
        required:true,
        type:String,
    },
    image: {
        type:String
    },
    categoryId: {
        type:mongoose.Schema.Types.ObjectId,
        required:true
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id
            delete ret._id
            return ret
        }
    }
})

const SubCategory = mongoose.model('subcategory', SubCategorySchema);
module.exports = SubCategory;