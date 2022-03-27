import bcrypt from 'bcryptjs'

const Userdata = [
    {   
        // _id: 1,
       name: "azmir",
       email: "azmir@gmail.com",
       password: bcrypt.hashSync("123456789"),
       isAdmin: true
    },
    {
        name: "shawon",
       email: "shawon@gmail.com",
       password: bcrypt.hashSync("123456789"),
       isAdmin: false
    }
]

export default Userdata