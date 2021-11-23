import { model,Schema } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';


const ProductSchema = new Schema({
    name: { type:String, lowercase:true, require:'name is require'},
    description: String,
    stock: { type:Number, default:0 },
    price: { type:Number, default:0 },
    type: String
})

ProductSchema.set('toJSON',{
    transform:(returnObject)=>{
        returnObject.id = returnObject._id
        delete returnObject.__v
        delete returnObject._id
    }
})

ProductSchema.plugin(mongooseUniqueValidator)

export default model('products',ProductSchema)



