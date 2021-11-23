import UserModel from '../models/user';
import { UserData } from '../types/user';
import { ProductData } from '../types/products';


export const findCart = async( id:string ) =>{

    const user = await UserModel.find({ _id:id }) as unknown as UserData[];
    return user[0].cart;
};


export const updateCart = async( id:string, data:ProductData ) =>{

    const { _id, name, type, price, stock, description } = data;
    const idData = _id as string
    const cart = await findCart( id );
    let isIn = false;
    const newCart = cart.map((x)=>{
        if( x._id === id){
            x.totalCount = x.totalCount + 1;
            isIn = true;
            return x;
        }

        return x;
    });

    if( !isIn ){
        cart.push({totalCount:1, _id:idData, name, type, price, stock, description});
    }else{
        await UserModel.findByIdAndUpdate({ _id:id },{ cart:newCart });
        return newCart;
    }


    return cart
};


export const deleteItem = async( id:string, idProduct:string ) =>{

    const cart = await findCart( id );
    const newCart = cart.filter((x)=>{
        if( idProduct != x._id ){
            return x 
        }
    });

    await UserModel.findByIdAndUpdate({ _id:id },{ cart:newCart });
    return newCart;

};

export const deleteCart = async( id:string ) =>{

    const user = await UserModel.findByIdAndUpdate({ _id:id },{ cart:[] })
    return user
};