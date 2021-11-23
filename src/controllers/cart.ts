import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { deleteCart, findCart, updateCart, deleteItem } from '../service/cart';
import { decodeToken } from '../service/auth';
import { ProductBody } from '../types/products';


export const findOne = async ( req:Request ,res:Response ,next:NextFunction )=>{
    try{

        const authorization = req.get('authorization') as string
        const token = authorization.substring(7)
        const { id } = await decodeToken( token );
        const cart = await findCart( id );

        res.status(200).json(cart);
    }
    catch(err){
        logger.error(err);
        next(err);
    }
    
}

export const update = async( req:ProductBody ,res:Response ,next:NextFunction ) => {
    try{
        const data = req.body
        const authorization = req.get('authorization') as string
        const token = authorization.substring(7)
        const { id } = await decodeToken( token );
        const cart = await updateCart( id, data );

        res.status(200).json(cart);
    }
    catch(err){
        logger.error(err);
        next(err);
    }
}

export const deleteOneItem = async( req:Request ,res:Response ,next:NextFunction ) => {
    try{
        const idProduct = req.params.id;

        const authorization = req.get('authorization') as string
        const token = authorization.substring(7)
        const { id } = await decodeToken( token );
        const cart = await deleteItem( id, idProduct );

        res.status(200).json(cart);
    }
    catch(err){
        logger.error(err);
        next(err);
    }
}

export const deleteAllCart = async( req:Request ,res:Response ,next:NextFunction ) => {
    try{
        const authorization = req.get('authorization') as string
        const token = authorization.substring(7)
        const { id } = await decodeToken( token );
        const cart = await deleteCart( id );

        res.status(200).json(cart);
    }
    catch(err){
        logger.error(err);
        next(err);
    }
}