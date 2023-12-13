import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import category from "../admin/Category.jsx";
import {BsImages} from "react-icons/bs";
import {IoClose, IoCloseSharp} from "react-icons/io5";


const EditProduct = () => {
    const categories = [
        {
            id: 1,
            name: "Sports"
        }, {
            id: 2,
            name: "Mobile"
        }, {
            id: 3,
            name: "Jarcy"
        }, {
            id: 4,
            name: "Pant"
        }, {
            id: 5,
            name: "Watch"
        }
    ];
    
    
    const form = useForm({
        defaultValues: {
            name: "",
            description: "",
            discount: "",
            price: "",
            brand: "",
            stock: "",
        }
    })
    const {register, handleSubmit} = form;
    
    const submit = (data) => {
        console.log(data)
    }
    
    
    //  ! category
    
    const [catShow, setCatShow] = useState(false)
    const [category, setCategory] = useState("");
    const [allCategory, setAllCategory] = useState(categories);
    const [searchValue, setSearchValue] = useState("");
    const categorySearch = (e) => {
        const value = e.target.value;
        setSearchValue(value)
        if (value) {
            let srcValue = allCategory.filter((item) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
            setAllCategory(srcValue)
        } else {
            setAllCategory(categories)
        }
    }
    
    
    //  ! image handle change
    const [images, setImages] = useState([])
    const [imageShow, setImageShow] = useState([])
    
    
    // ! change image
    const changeImage = (image, files) => {
        if (files.length > 0) {
            console.log(image);
            console.log(files);
            console.log(files[0])
        }
    }
    
    
    // ! useEffect
    useEffect(() => {
        form.setValue("name", "Men's Premium soft and comfortable");
        form.setValue("brand", "Easy");
        form.setValue("category", "Sports");
        form.setValue("stock", "10");
        form.setValue("price", "5454");
        form.setValue("discount", "5");
        form.setValue("description", "Men's Premium soft and comfortable");
        setCategory("Sports")
        setImageShow([
            "http://localhost:5173/public/images/admin.jpg",
            "http://localhost:5173/public/images/admin.jpg",
            "http://localhost:5173/public/images/admin.jpg"
        ])
    }, [])
    
    
    return (
        <div className="px-2 md:px-7 py-5">
            <div className="w-full bg-secondary p-4 rounded-md pb-4">
                {/* Heading Section */}
                <div className="flex  justify-between items-center pb-4">
                    <h1 className="text-white text-xl font-semibold">Add Product</h1>
                    <Link to={"/seller/dashboard/products"} className="bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-7 py-2 text-white text-center">Products</Link>
                </div>
                
                {/*  Input section   */}
                <div>
                    <form onSubmit={handleSubmit(submit)}>
                        <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-white">
                            
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="name">Product Name</label>
                                <input type="text" {...register("name")} className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Product Name" id="name"/>
                            </div>
                            
                            
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="brand">Brand</label>
                                <input type="text" {...register("brand")} className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Brand" id="brand"/>
                            </div>
                        </div>
                        
                        <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-white">
                            <div className="flex flex-col w-full gap-1 relative">
                                <label htmlFor="category">Category</label>
                                <input readOnly value={category} onClick={() => setCatShow(!catShow)} className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="---Select Category---" id="name"/>
                                
                                <div className={`absolute top-[101%] bg-slate-800 w-full transition-all ${catShow ? "scale-100" : "scale-0"}`}>
                                    <div className="w-full px-4 py-2 fixed">
                                        <input onChange={categorySearch} type="search" placeholder="search" className="w-full px-3 py-2 focus:border-indigo-500 border outline-none  bg-transparent overflow-hidden border-slate-700 rounded-md text-white my-3"/>
                                    </div>
                                    <div className="pt-16"></div>
                                    <div className="flex justify-start items-start  flex-col h-[200px]  overflow-y-scroll">
                                        {
                                            allCategory.map((item) => (
                                                <span key={item.id} onClick={() => {
                                                    setCategory(item.name);
                                                    setCatShow(false);
                                                    setSearchValue("");
                                                    setAllCategory(categories)
                                                }} className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg cursor-pointer w-full ${category === item.name && "bg-indigo-500"}`}>
                                                   {item.name}
                                               </span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="stock">Stock</label>
                                <input type="number" min="0" {...register("stock")} className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="stock" id="stock"/>
                            </div>
                        </div>
                        
                        
                        <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-white">
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="price">Price</label>
                                <input type="number" min={0} {...register("price")} className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Price" id="price"/>
                            </div>
                            
                            
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="discount">Discount</label>
                                <input type="number" min={0} {...register("discount")} className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="% discount %" id="discount"/>
                            </div>
                        </div>
                        
                        
                        <div className="flex flex-col w-full gap-1 text-white mb-4">
                            <label htmlFor="description">Description</label>
                            <textarea {...register("description")} rows={5} className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Description" id="price"/>
                        </div>
                        
                        
                        {/*  image   */}
                        
                        <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-3 sm:gap-4  md:gap-4 xs:gap-4 w-full text-white mb-4">
                            {
                                imageShow.map((item, i) => (
                                    <div key={i}>
                                        <label htmlFor="img" className="cursor-pointer">
                                            <img src={item} alt=""/>
                                        </label>
                                        <input onChange={(e) => changeImage(item, e.target.files)} type="file" className="hidden" id="img"/>
                                    </div>
                                ))
                            }
                        
                        </div>
                        <div className="flex text-white">
                            <button type="submit" className="bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-7 py-2 my-4  text-center">
                                Update Product
                            </button>
                        </div>
                    </form>
                
                </div>
            </div>
        </div>
    )
}
export default EditProduct;
