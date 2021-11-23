import { Request } from 'express';
import { ProductData } from './products';

export interface UserBody extends Request {
    body:UserData
}

export interface UserData{
    name: string,
    email: string,
    password: string,
    role: string,
    cart: CartData[]
    _id?: string
}

export interface FindData {
    id?:string,
    email?:string
}

interface CartData{
    totalCount: number,
    _id: string,
    name: string,
    description: string,
    stock: number,
    price: number,
    type: string
}