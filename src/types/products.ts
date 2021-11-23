import { Request } from 'express';

export interface ProductData {
    _id?: string,
    name: string,
    description: string,
    stock: number,
    price: number,
    type: string
}


export interface ProductBody extends Request {
    body:ProductData
}

