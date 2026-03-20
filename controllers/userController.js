import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export function registerUser(req, res) {

const data = req.body
   

    data.password = bcrypt.hashSync(data.password, 10);
 
    const newUser = new User(data); //hard 

    newUser.save()
        .then(() => {
            res.json({ message: "User registered successfully ✅ " });
        })
        .catch((error) => {
            res.status(500).json({ error: "Error registering user" })
        });
}
//login
export function loginUser(req, res) {
    const data = req.body;

    User.findOne({ email: data.email 
    }).then(user => {

        if(user== null){
            return res.status(400).json({ error: "user not found" });
        }else{
 

            const ifPasswordCorrect = bcrypt.compareSync(data.password, user.password);
                
            if(ifPasswordCorrect){
                const token = jwt.sign({
                    firstName : user.firstName,
                    lastName : user.lastName,
                     email : user.email,
                     role : user.role
                },"kv-secret-89")

                res.json({ message: "Login successful ✅ ", token: token });
             }else{
                res.status(400).json({ error: "login failed" });
                
            }
            
             }
        });


} 

