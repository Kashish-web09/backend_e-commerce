export default class userModel{
    constructor(id,fullname,email,password,) {
        this.fullname=fullname;
        this.email=email;
        this.password=password
    }
    static add(fullname,email,password){
        const id=users.length+1
const newUser=new userModel(id,fullname,email,password);
users.push(newUser);
    }
static isValidUser(email,password){
    
    return users.find((u)=>u.email===email && u.password===password);
}
static findByEmail(email){
    return users.find(u=>u.email===email);
}
static findByToken(token){
    return users.find(u=>u.resetToken===token)
}



}
let users=[];