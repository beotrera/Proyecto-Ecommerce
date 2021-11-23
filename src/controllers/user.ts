import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import { UserBody } from '../types/user';
import { createUser, findUserById, getUsers, updateUser, deleteUser } from '../service/user';

export const create = async ( req:UserBody, res:Response, next:NextFunction )=>{
    try{
        const { name, email, password } = req.body
        const user = await createUser( name, email, password );
        res.status(200).json(user); 
    }
    catch(err){
        logger.error(err);
        next(err);
    }
    
}

export const find = async( req:Request ,res:Response ,next:NextFunction) => {
    try{
        const users = await getUsers();
        if(users.length <= 0){ 
            return res.status(400).json( {total:0,data:[]} ) 
        }
        res.status(200).json({ total:users.length,data:users} )
    }
    catch(err){
        logger.error(err);
        next(err);
    }
}

export const findById = async( req:Request, res:Response ,next:NextFunction) => {
    try{
        
        const { id } = req.params;
        if(!id){
            return res.status(400).json( 'Missing parameters' );
        }
        
        const user = await findUserById({ id:id });
        res.status(200).json(user);
    }
    catch(err){
        logger.error(err);
        next(err);
    }
}

export const update = async( req:Request, res:Response ,next:NextFunction) => {
    try{
        const { id } = req.params;
        if(!id){
            return res.status(400).json( 'Missing parameters' );
        }
        const data = req.body
        const user = await updateUser(id as string, data);

        res.status(200).json(user)
    }
    catch(err){
        logger.error(err);
        next(err);
    }
}

export const deleteById= async( req:Request, res:Response ,next:NextFunction) => {
    try{
        const { id } = req.params;
        if(!id){
            return res.status(400).json( 'Missing parameters' );
        }
        const user = await deleteUser(id as string);

        res.status(200).json(user)
    }
    catch(err){
        logger.error(err);
        next(err);
    }
}