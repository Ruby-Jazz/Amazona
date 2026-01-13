import bcrypt from 'bcryptjs'

const data = {
    users : [
        {
            name : 'ruby Jazz',
            email : '123@ruby.com',
            password : bcrypt.hashSync('1234',8) ,
            isAdmin : true,

        },
        {
            name : 'ruby',
            email : '123@mima.com',
            password : bcrypt.hashSync('1234',8) ,
            isAdmin : false,

        },
    ],
    products : [
        {
        
            name : 'slim shirt',
            brand : 'Nike',
            price : 120,
            description : 'High quality product',
            image : '/Images/slim shirt.jpeg',
            rating : 4.5,
            numReviews : 23,
            countInStock : 22,
            category : 'shirt',
        },
        {
       
            name : 'short pant',
            brand : 'Adidas',
            price : 80,
            description : 'High quality product',
            image : '/Images/short pant.jpeg',
            rating : 3.5,
            numReviews : 23,
            countInStock : 22,
            category : 'pants',
        },
        {
       
            name : 'long pant',
            brand : 'Nike',
            price : 233,
            description : 'High quality product',
            image : '/Images/long pant.jpeg',
            rating : 4.5,
            numReviews : 23,
            countInStock : 22,
            category : 'pants',
        },
        {
       
            name : 'fit shirt',
            brand : 'Puma',
            price : 120,
            description : 'High quality product',
            image : '/Images/images (17).jpeg',
            rating : 4.0,
            numReviews : 23,
            countInStock : 22,
            category : 'shirts',
        },
        {
        
            name : 'big shirt',
            brand : 'Nike',
            price : 120,
            description : 'High quality product',
            image : '/Images/big shirt.jpeg',
            rating : 1.5,
            numReviews : 7,
            countInStock : 7,
            category : 'shirts',
        },
        {
       
            name : 'fit shirt',
            brand : 'Fendi',
            price : 321,
            description : 'High quality product',
            image : '/Images/fit shirt.jpeg',
            rating : 3.5,
            numReviews : 13,
            countInStock : 0,
            category : 'shirts',
        },
        {
        
            name : 'long pant',
            brand : 'Gucci',
            price : 120,
            description : 'High quality product',
            image : '/Images/long pant.jpeg',
            rating : 3,
            numReviews : 23,
            countInStock : 3,
            category : 'pants',
        },
    ]
}

export default data;