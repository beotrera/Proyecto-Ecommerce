import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { ProductBody } from '../types/products';
import { createProduct, getProducts, findProductById, deleteProduct, updateProduct } from '../service/product';

export const create = async ( req:ProductBody,res:Response ,next:NextFunction )=>{
    try{
        const { name, description, price, stock, type } = req.body
        const user = await createProduct( name, price, stock, description, type );
        res.status(200).json(user); 
    }
    catch(err){
        logger.error(err);
        next(err);
    }
    
}

export const find = async( req:Request ,res:Response ,next:NextFunction ) => {
    try{
        const products = await getProducts();
        if(products.length <= 0){ 
            return res.status(400).json( {total:0,data:[]} ) 
        }
        res.status(200).json({ total:products.length,data:products} )
    }
    catch(err){
        logger.error(err);
        next(err);
    }
}

export const findById = async( req:Request, res:Response ,next:NextFunction ) => {
    try{
        
        const { id } = req.params;
        if(!id){
            return res.status(400).json( 'Missing parameters' );
        }
        
        const user = await findProductById( id );
        res.status(200).json(user);
    }
    catch(err){
        logger.error(err);
        next(err);
    }
}

export const update = async( req:Request, res:Response ,next:NextFunction ) => {
    try{
        const { id } = req.params;
        if(!id){
            return res.status(400).json( 'Missing parameters' );
        }
        const data = req.body
        const user = await updateProduct(id as string, data);

        res.status(200).json(user)
    }
    catch(err){
        logger.error(err);
        next(err);
    }
}

export const deleteById= async( req:Request, res:Response ,next:NextFunction ) => {
    try{
        const { id } = req.params;
        if(!id){
            return res.status(400).json( 'Missing parameters' );
        }
        const user = await deleteProduct(id as string);

        res.status(200).json(user)
    }
    catch(err){
        logger.error(err);
        next(err);
    }
}