import {Link, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {get_categories} from "../../store/Reducers/categoryReducer.js";
import {get_product, messageClear, update_product} from "../../store/Reducers/productReducer.js";
import toast from "react-hot-toast";
import {PropagateLoader} from "react-spinners";
import {overrideStyle} from "../../utils/utils.js";
import {IoCloseSharp} from "react-icons/io5";
import {BsImages} from "react-icons/bs";


const EditProduct = () => {
    const dispatch = useDispatch();
    const {productId} = useParams();
    const {categories} = useSelector(state => state.category)
    const {product, errorMessage, loader, successMessage} = useSelector(state => state.product)
    
    const [state, setState] = useState({
        name: "",
        description: "",
        discount: "",
        price: "",
        brand: "",
        stock: "",
    })
    console.log(state)
    // ! get product by id
    useEffect(() => {
        dispatch(get_product(productId));
    }, [productId]);
    
    
    // ! set product data
    useEffect(() => {
        setState({
            name: product?.name || "",
            description: product?.description || "",
            discount: product?.discount || +"",
            price: product?.price || "",
            brand: product?.brand || "",
            stock: product?.stock || "",
        });
        setCategory(product?.category || "");
        setImageShow(product?.images || []);
    }, [product, errorMessage]);
    
    
    // ! after submit form success or error message and clear state
    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
            
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    }, [successMessage, errorMessage]);
    //  ! category
    
    const [catShow, setCatShow] = useState(false)
    const [category, setCategory] = useState("");
    const [allCategories, setAllCategories] = useState(categories);
    const [searchValue, setSearchValue] = useState("");
    
    const categorySearch = (e) => {
        const value = e.target.value;
        setSearchValue(value)
        if (value) {
            let srcValue = allCategories.filter((item) => item.name.toLowerCase().indexOf(value.toLowerCase()) > -1)
            setAllCategories(srcValue)
        } else {
            setAllCategories(categories)
        }
    }
    
    useEffect(() => {
        dispatch(get_categories({
            searchValue: "",
            page: "",
            parPage: ""
        }))
    }, [])
    
    useEffect(() => {
        setAllCategories(categories)
    }, [categories]);
    
    
    //  ! image handle change
    const [images, setImages] = useState([])
    const [imageShow, setImageShow] = useState(product?.images || [])
    
    
    // ! change image handle
    const changeImage = (image, index) => {
        if (image) {
            let tempImage = [...images];
            let tempImageShow = [...imageShow];
            tempImage[index] = image;
            tempImageShow[index] = {url: URL.createObjectURL(image)}
            setImageShow(tempImageShow)
            setImages(tempImage)
        }
    }
    // ! remove image handle
    const [imagesId, setImagesId] = useState('')
    console.log(imagesId)
    const removeImage = (imageId, index) => {
        const filterImage = images.filter((item, i) => i !== index);
        const filterImageShow = imageShow.filter((item, i) => i !== index);
        setImageShow(filterImageShow)
        setImages(filterImage)
        setImagesId((prev) => [...prev, imageId])
    }
    // ! ADD IMAGE HANDLER
    const imageHandle = (e) => {
        const files = e.target.files;
        const length = files.length;
        if (length > 0) {
            if (length <= 3) {
                setImages([...images, ...files]);
                let imageUrl = [];
                for (let i = 0; i < length; i++) {
                    imageUrl.push({url: URL.createObjectURL(files[i])});
                    setImageShow([...imageShow, ...imageUrl])
                }
            } else {
                toast.error("You can select maximum 3 images at a time")
            }
        }
    }
    
    
    // ! input handler
    const inputHandler = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setState({...state, [name]: value})
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", state.name);
        formData.append("description", state.description);
        formData.append("discount", state.discount);
        formData.append("price", state.price);
        formData.append("brand", state.brand);
        formData.append("stock", state.stock);
        formData.append("category", category);
        formData.append("productId", productId);
        
        if (imagesId) {
            imagesId.forEach((item, index) => {
                formData.append("imagesId", item)
            })
        }
        
        images.forEach((item, index) => {
            formData.append("images", item)
        })
        
        dispatch(update_product(formData))
    }
    
    
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
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-white">
                            
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="name">Product Name</label>
                                <input type="text" onChange={inputHandler} value={state?.name} name="name" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Product Name" id="name"/>
                            </div>
                            
                            
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="brand">Brand</label>
                                <input type="text" onChange={inputHandler} value={state.brand} name="brand" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Brand" id="brand"/>
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
                                            allCategories?.map((item, index) => (
                                                <span key={index} onClick={() => {
                                                    setCategory(item?.name);
                                                    setCatShow(false);
                                                    setSearchValue("");
                                                    setAllCategories(allCategories)
                                                }} className={`px-4 py-2 hover:bg-indigo-500 hover:text-white hover:shadow-lg cursor-pointer w-full ${category === item.name && "bg-indigo-500"}`}>
                                                   {item?.name}
                                               </span>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="stock">Stock</label>
                                <input type="number" min="0" onChange={inputHandler} value={state.stock} name="stock" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="stock" id="stock"/>
                            </div>
                        </div>
                        
                        
                        <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text-white">
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="price">Price</label>
                                <input type="number" min={0} onChange={inputHandler} value={state.price} name="price" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Price" id="price"/>
                            </div>
                            
                            
                            <div className="flex flex-col w-full gap-1">
                                <label htmlFor="discount">Discount</label>
                                <input type="number" min={0} max={100} defaultValue={0} onChange={inputHandler} value={state.discount} name="discount" className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="% discount %" id="discount"/>
                            </div>
                        </div>
                        
                        
                        <div className="flex flex-col w-full gap-1 text-white mb-4">
                            <label htmlFor="description">Description</label>
                            <textarea onChange={inputHandler} value={state.description} name="description" rows={5} className="px-4 py-2 focus:border-indigo-500 border outline-none  bg-[#283046] border-slate-700 rounded-md text-white my-3" placeholder="Description" id="price"/>
                        </div>
                        
                        {/* ImageShow  */}
                        <div className="grid lg:grid-cols-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-3 sm:gap-4  md:gap-4 xs:gap-4 w-full text-white mb-4">
                            {
                                imageShow && imageShow?.map((item, index) => {
                                    return (
                                        <div key={index} className="h-[180px] relative">
                                            <label htmlFor={index}>
                                                <img src={item?.url} className="w-full h-full object-cover" alt=""/>
                                                <input type="file" id="" onChange={(e) => changeImage(e.target.files[0], index)} className="hidden"/>
                                            </label>
                                            <span onClick={() => removeImage(item.imageId, index)} className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white rounded-full absolute top-1 right-1">
                                            <IoCloseSharp/>
                                        </span>
                                        </div>
                                    )
                                })
                            }
                            
                            {/* Add Image */}
                            <label htmlFor="image" className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-white">
                                <span><BsImages/></span>
                                <span>Select Image</span>
                            </label>
                            <input onChange={imageHandle} type="file" id="image" name="image" className="hidden" multiple accept="image"/>
                        </div>
                        
                        
                        <div className="flex text-white">
                            <button disabled={loader ? true : false} type="submit" className="bg-blue-500 w-[200px] hover:shadow-blue-500/20 hover:shadow-lg text-white rounded-md px-7 py-2 mb-3">
                                {loader ?
                                    <PropagateLoader color="#fff" cssOverride={overrideStyle}/> : "Update Product"}
                            </button>
                        </div>
                    </form>
                
                </div>
            </div>
        </div>
    )
}
export default EditProduct;
