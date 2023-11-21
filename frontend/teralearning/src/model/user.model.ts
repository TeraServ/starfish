export class user{
    id!:number
    firstName!:string
    lastName!:string
    email!:string
    userType!:number
    userStatus!:number
    phoneNumber!:number
    category!:string
    stream!:any
    modifiedDate!:string
    password!:string
    createdDate!:string
}

//export const UserType:Record<string,number> = {"Admin":103, "Student":102, "Faculty":103};

export enum UserTypeEnum {
    Admin = "101",
    Student = "102",
    Faculty = "103"
}
export enum AccountStatus{
    Active = "101",
    Suspended = "102",
    Inactive = "103"
}