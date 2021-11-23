import ProductModel from '../models/product';
import { ProductData } from '../types/products';


export const createProduct = async( name:string, price:number, stock:number, description:string, type:string ):Promise<ProductData> =>{

    const Product = await ProductModel.create({ name, price, stock, description, type }) as unknown as ProductData;
    return Product;
};

export const getProducts = async():Promise<ProductData[]> =>{
    const Products = ProductModel.find({}) as unknown as ProductData[];
    return Products;
}   

export const findProductById = async( id:string ):Promise<ProductData> =>{

    const Product = await ProductModel.find({ _id:id }) as unknown as ProductData[];
    return Product[0];
}

export const updateProduct = async( id:string,data:ProductData ) => {
    const { name, price, stock, description, type } = data;
    const Product = await ProductModel.findByIdAndUpdate({_id:id},{ name, price, stock, description, type });
    return Product;
}

export const deleteProduct = async( id:string ) => {
    const Product = await ProductModel.findByIdAndDelete({_id:id});
    return Product;
}