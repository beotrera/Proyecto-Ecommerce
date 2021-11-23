import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger';
import { getJWT, verifyJWT } from '../service/auth';

export const getToken = async ( req:Request, res:Response, next:NextFunction )=>{
    try{
        const { email, password } = req.body;

        const jwt = await getJWT(email, password);

        if(jwt.token === '' ){
            return res.status(400).send( 'email or password is not correct' );
        }

        res.status(200).json( jwt );

    }
    catch(err){
        logger.error(err);
        next(err);
    }
    
}

export const auth = async ( req:Request, res:Response, next:NextFunction )=>{
    try{
        const authorization = req.get('authorization')
        
        if( !authorization ){
            return  res.status(403).send( 'access denided' )
        }

        const { id } = await verifyJWT(authorization as string)

        if(!id){
            return  res.status(403).send( 'access denided' )
        }

        next();
    }
    catch(err){
        logger.error(err);
        next(err);
    }
    
}

export const isAdmin = async ( req:Request, res:Response, next:NextFunction )=>{
    try{
        const authorization = req.get('authorization')
    
        const { role, id } = await verifyJWT(authorization as string)

        if( role != 'admin' || !id ){
            return  res.status(403).send( 'access denided' )
        }

        next();
    }
    catch(err){
        logger.error(err);
        next(err);
    }
    
}