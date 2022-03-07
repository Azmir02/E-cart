const product_info = [
    {   
        _id: 1,
        image: "/images/laptop1.jpg",
        name: "face-cream",
        model: "tfc",
        slug: "face-cream",
        desciprtion: "Vintage Typewriter to post awesome stories about UI design and webdev.",
        price: 80.99,
        rating: "5",
        numberofrating: "150",
        button: "Add Product",
        instock: "900",
        category: "one",
        cuponcode: "face50%",
        discount: 30,
        discountlimit: 50,
        totalsale: 100,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 2,
        image: "/images/laptop2.jpg",
        name: "lotion",
        model: "a6w",
        slug: "lotion",
        desciprtion: "Vintage Typewriter to post awesome stories about UI design and webdev.",
        price: 50.6,
        rating: "5",
        numberofrating: "100",
        button: "Add Product",
        instock: "0",
        category: "one",
        cuponcode: "lotion50%",
        discount: 10,
        discountlimit: 5,
        totalsale: 10,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 3,
        image: "/images/laptop3.jpg",
        name: "mirror",
        model: "T4500",
        slug: "mirror",
        desciprtion: "Vintage Typewriter to post awesome stories about UI design and webdev.",
        price: 100,
        rating: "4",
        numberofrating: "250",
        button: "Add Product",
        instock: "5",
        category: "two",
        cuponcode: "mirror50%",
        discount: 30,
        discountlimit: 22,
        totalsale: 70,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 4,
        image: "/images/laptop4.jpg",
        name: "glower",
        model: "wV50",
        slug: "glower",
        desciprtion: "Vintage Typewriter to post awesome stories about UI design and webdev.",
        price: 58,
        rating: "4.5",
        numberofrating: "50",
        button: "Add Product",
        instock: "0",
        category: "two",
        cuponcode: "glower50%",
        discount: 30,
        discountlimit: 22,
        totalsale: 15,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 5,
        image: "/images/polot-shirt.jpg",
        name: "face-warmer",
        slug: "face-warmer",
        desciprtion: "Vintage Typewriter to post awesome stories about UI design and webdev.",
        price: 120,
        rating: "5",
        numberofrating: "650",
        button: "Add Product",
        instock: "50",
        category: "two",
        cuponcode: "face50%",
        discount: 30,
        discountlimit: 50,
        totalsale: 0,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 6,
        image: "/images/model2.jpg",
        name: "bag",
        slug: "bag",
        desciprtion: "Vintage Typewriter to post awesome stories about UI design and webdev.",
        price: 120.21,
        model: "wV500",
        rating: "3",
        numberofrating: "10",
        button: "Add Product",
        instock: "50",
        category: "three",
        cuponcode: "bag50%",
        discount: 20,
        discountlimit: 5,
        totalsale: 20,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 7,
        image: "/images/laptop4.jpg",
        name: "glower2",
        model: "AV500",
        slug: "glower2",
        desciprtion: "Vintage Typewriter to post awesome stories about UI design and webdev.",
        price: 50.35,
        rating: "5",
        numberofrating: "150",
        button: "Add Product",
        instock: "5",
        category: "three",
        cuponcode: "glower50%",
        discount: 30,
        discountlimit: 22,
        totalsale: 5,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 8,
        image: "/images/polot-shirt.jpg",
        name: "face-warmer2",
        slug: "face-warmer2",
        desciprtion: "Vintage Typewriter to post awesome stories about UI design and webdev.",
        price: 12.4,
        rating: "5",
        numberofrating: "650",
        button: "Add Product",
        instock: "250",
        category: "four",
        cuponcode: "face50%",
        discount: 30,
        discountlimit: 50,
        totalsale: 55,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 9,
        image: "/images/model5.jpg",
        name: "Ladies drier",
        slug: "Ladies drier",
        desciprtion: "Vintage Typewriter to post awesome stories about UI design and webdev.",
        price: 18.48,
        model: "66dw",
        rating: "2",
        numberofrating: "30",
        button: "Add Product",
        instock: "30",
        category: "four",
        cuponcode: "drier50%",
        discount: 10,
        discountlimit: 2,
        totalsale: 1,
        bestsalepng: "images/bestsale.png"
    },
    {   
        _id: 10,
        image: "/images/laptop1.jpg",
        name: "face-cream2",
        model: "b4500",
        slug: "face-cream2",
        desciprtion: "Vintage Typewriter to post awesome stories about UI design and webdev.",
        price: 48.00,
        rating: "5",
        numberofrating: "150",
        button: "Add Product",
        instock: "900",
        category: "four",
        cuponcode: "face50%",
        discount: 30,
        discountlimit: 50,
        totalsale: 52,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 11,
        image: "/images/laptop2.jpg",
        name: "lotion2",
        model: "a71W",
        slug: "lotion2",
        desciprtion: "Vintage Typewriter to post awesome stories about UI design and webdev.",
        price: 50.4,
        rating: "5",
        numberofrating: "100",
        button: "Add Product",
        instock: "0",
        category: "five",
        cuponcode: "lotion50%",
        discount: 30,
        discountlimit: 50,
        totalsale: 60,
        bestsalepng: "images/bestsale.png"
    },
    {
        _id: 12,
        image: "/images/laptop3.jpg",
        name: "mirror2",
        model: "T4500",
        slug: "mirror2",
        desciprtion: "Vintage Typewriter to post awesome stories about UI design and webdev.",
        price: 10.47,
        rating: "4",
        numberofrating: "250",
        button: "Add Product",
        instock: "5",
        category: "five",
        cuponcode: "mirror50%",
        discount: 50,
        discountlimit: 10,
        totalsale: 50,
        bestsalepng: "images/bestsale.png"
    },
]

export default product_info