const product_info = [
    {   
        _id: 1,
        image: "/images/laptop.png",
        name: "Macbook Pro",
        model: "tfc",
        slug: "Macbook Pro",
        desciprtion: "Apple MacBook Pro13.3″ Laptop with new Touch bar ID",
        price: 80.99,
        rating: "5",
        numberofrating: "150",
        button: "Add Product",
        instock: "900",
        category: "Macbook",
        cuponcode: "Macbook50%",
        discount: 30,
        discountlimit: 50,
        totalsale: 100,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 2,
        image: "/images/watch.png",
        name: "Apple Watch",
        model: "a6w",
        slug: "Apple Watch",
        desciprtion: "Apple Watch Series 7 case Pair any band with cool design",
        price: 50.6,
        rating: "5",
        numberofrating: "100",
        button: "Add Product",
        instock: "0",
        category: "Watch",
        cuponcode: "AppleWatch50%",
        discount: 10,
        discountlimit: 5,
        totalsale: 10,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 3,
        image: "/images/mini-mac.png",
        name: "mini-mac",
        model: "T4500",
        slug: "mini-mac",
        desciprtion: "Apple MacBook Pro13.3″ Laptop with new Touch bar ID",
        price: 100,
        rating: "4",
        numberofrating: "250",
        button: "Add Product",
        instock: "5",
        category: "Macbook",
        cuponcode: "mini-mac50%",
        discount: 30,
        discountlimit: 22,
        totalsale: 70,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 4,
        image: "/images/ipad.png",
        name: "iPad mini",
        model: "wV50",
        slug: "iPad mini",
        desciprtion: "The ultimate iPad experience all over the world with coll model",
        price: 58,
        rating: "4.5",
        numberofrating: "50",
        button: "Add Product",
        instock: "0",
        category: "iPad",
        cuponcode: "iPadmini50%",
        discount: 30,
        discountlimit: 22,
        totalsale: 15,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 5,
        image: "/images/product-img-24.png",
        name: "Imac 29",
        slug: "Imac 29",
        desciprtion: "Apple iMac 29″ Laptop with new Touch bar ID for you",
        price: 120,
        rating: "5",
        numberofrating: "650",
        button: "Add Product",
        instock: "50",
        category: "Macbook",
        cuponcode: "Imac50%",
        discount: 30,
        discountlimit: 50,
        totalsale: 0,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 6,
        image: "/images/product-img-25.png",
        name: "iPhone 13",
        slug: "iPhone 13",
        desciprtion: "A dramatically more powerful camera system a display",
        price: 120.21,
        model: "wV500",
        rating: "3",
        numberofrating: "10",
        button: "Add Product",
        instock: "50",
        category: "iPhone",
        cuponcode: "iPhone50%",
        discount: 20,
        discountlimit: 5,
        totalsale: 20,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 7,
        image: "/images/product-img-24.png",
        name: "Imac 30",
        slug: "Imac 30",
        desciprtion: "Apple iMac 29″ Laptop with new Touch bar ID for you",
        price: 120.21,
        model: "wV500",
        rating: "3",
        numberofrating: "10",
        button: "Add Product",
        instock: "50",
        category: "Macbook",
        cuponcode: "Imac80%",
        discount: 20,
        discountlimit: 5,
        totalsale: 20,
        bestsalepng: "images/bestsale.png"
    },
    {   
        _id: 8,
        image: "/images/laptop.png",
        name: "Macbook Pro Max",
        model: "tfc",
        slug: "Macbook Pro Max",
        desciprtion: "Apple MacBook Pro13.3″ Laptop with new Touch bar ID",
        price: 80.99,
        rating: "5",
        numberofrating: "150",
        button: "Add Product",
        instock: "900",
        category: "Macbook",
        cuponcode: "Macbookmax50%",
        discount: 30,
        discountlimit: 50,
        totalsale: 100,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 9,
        image: "/images/watch.png",
        name: "Apple Smart Watch",
        model: "a6w",
        slug: "Apple Smart Watch",
        desciprtion: "Apple Watch Series 7 case Pair any band with cool design",
        price: 50.6,
        rating: "5",
        numberofrating: "100",
        button: "Add Product",
        instock: "0",
        category: "Watch",
        cuponcode: "SmartWatch50%",
        discount: 10,
        discountlimit: 5,
        totalsale: 10,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 10,
        image: "/images/mini-mac.png",
        name: "Mini Mac 2",
        model: "a6w",
        slug: "MiniMac2",
        desciprtion: "Apple MacBook Pro13.3″ Laptop with new Touch bar ID",
        price: 50.6,
        rating: "5",
        numberofrating: "100",
        button: "Add Product",
        instock: "0",
        category: "Macbook",
        cuponcode: "Mini50%",
        discount: 10,
        discountlimit: 5,
        totalsale: 10,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 11,
        image: "/images/product-img-25.png",
        name: "I Phone 12",
        model: "a6w",
        slug: "I Phone 12",
        desciprtion: "Apple MacBook Pro13.3″ Laptop with new Touch bar ID",
        price: 50.6,
        rating: "5",
        numberofrating: "100",
        button: "Add Product",
        instock: "0",
        category: "iPhone",
        cuponcode: "12phone50%",
        discount: 10,
        discountlimit: 5,
        totalsale: 10,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 12,
        image: "/images/watch.png",
        name: "Smart Watch",
        model: "a6w",
        slug: "Smart Watch",
        desciprtion: "Apple MacBook Pro13.3″ Laptop with new Touch bar ID",
        price: 50.6,
        rating: "5",
        numberofrating: "100",
        button: "Add Product",
        instock: "0",
        category: "Watch",
        cuponcode: "Watch50%",
        discount: 10,
        discountlimit: 5,
        totalsale: 10,
        bestsalepng: "images/bestsale.png"
    },
]

export default product_info