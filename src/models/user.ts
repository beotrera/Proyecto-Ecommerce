import { model,Schema } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';


const UserSchema = new Schema({
    email:{ type:String, unique:true, lowercase:true, require:'email is require' },
    name:{ type:String,lowercase:true, require:'name is require' },
    password:{type:String, require:'password is require' },
    role: { type:String, default:'user' },
    cart: { type:Array, default:[] }

})

UserSchema.set('toJSON',{
    transform:(returnObject)=>{
        returnObject.id = returnObject._id
        delete returnObject.__v
        delete returnObject._id
    }
})

UserSchema.plugin(mongooseUniqueValidator)

export default model('users',UserSchema)



