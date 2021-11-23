import UserModel from '../models/user';
import bcrypt from 'bcrypt';
import { UserData, FindData } from '../types/user';


export const createUser = async( name: string, email: string, password: string ):Promise<UserData> =>{

    const hash = await bcrypt.hash( password as string,10 )
    const user = await UserModel.create({ name, email, password: hash }) as unknown as UserData;
    return user;
};

export const getUsers = async():Promise<UserData[]> =>{
    const users = UserModel.find({}) as unknown as UserData[];
    return users;
}   

export const findUserById = async( data:FindData ):Promise<UserData> =>{
    const { id, email } = data;
    const user = await UserModel.find( id ? { _id:id } : { email:email } ) as unknown as UserData[];
    return user[0];
}

export const updateUser = async( id:string,data:UserData ) => {
    const { name, email } = data;
    const user = await UserModel.findByIdAndUpdate({_id:id},{ name, email });
    return user;
}

export const deleteUser = async( id:string ) => {
    const user = await UserModel.findByIdAndDelete({_id:id});
    return user;
}