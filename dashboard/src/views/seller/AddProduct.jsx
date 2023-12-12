import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import category from "../admin/Category.jsx";
import {BsImages} from "react-icons/bs";
import {IoClose, IoCloseSharp} from "react-icons/io5";


const AddProduct = () => {
    const categories = [
        {
            id:1,
            name: "Sports"
        } ,{
            id:2,
            name: "Mobile"
        }, {
            id:3,
            name: "Jarcy"
        }, {
            id:4,
            name: "Pant"
        }, {
            id:5,
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
     const categorySearch = (e)=> {
         const value = e.target.value;
         setSearchValue(value)
         if(value){
            let srcValue = allCategory.filter((item)=> item.name.toLowerCase().indexOf(value.toLowerCase()) >-1)
             setAllCategory(srcValue)
         }else {
                setAllCategory(categories)
         }
     }
    
     
    //  ! image handle change
    const [images, setImages] = useState([])
    const [imageShow, setImageShow] = useState([])
  const imageHandle = (e)=> {
         const files = e.target.files;
         const length = files.length;
         if(length>0){
             setImages([...images,...files])
             let imageUrl =[];
             
                for(let i=0; i<length; i++){
                    imageUrl.push({url: URL.createObjectURL(files[i])})
                    setImageShow([...imageShow,...imageUrl])
                }
         }
  }
   
   
    
    // ! change image
    const changeImage = (image,index)=> {
         if(image){
             let tempUrl = imageShow;
             let tempImage = images;
             tempImage[index]= image;
             tempUrl[index]= {url: URL.createObjectURL(image)}
                setImageShow([...tempUrl])
                setImages([...tempImage])
         }
    }
    
    
    
    // ! remove image
    const removeImage = (index)=> {
         const filterImage = images.filter((item,i)=> index !== i)
        const filterImageShow = imageShow.filter((item,i)=> index !== i)
        setImageShow(filterImageShow)
        setImages(filterImage)
    }
    
  
    
    return (
        <div className="px-2 md:px-7 py-5">
            <div className="w-full bg-secondary p-4 rounded-md pb-4">
               {/* Heading Section */}
               <div className="flex  justify-between items-center pb-4">
                    <h1 className="text-white text-xl font-semibold">Add Product</h1>
                   <Link to={"/seller/dashboard/all-product"} className="bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-7 py-2 text-white text-center">Products</Link>
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
                                imageShow && imageShow.map((item, i) => (
                                    <div key={i} className="h-[180px] relative">
                                        <label htmlFor={i}>
                                            <img src={item.url} alt="" className="w-full h-full rounded-sm"/>
                                        </label>
                                        <input onChange={(e) => changeImage(e.target.files[0], i)} type="file" id={i} className="hidden"/>
                                        <span onClick={() => removeImage(i)} className="p-2 z-10 cursor-pointer bg-slate-700 hover:shadow-lg hover:shadow-slate-400/50 text-white rounded-full absolute top-1 right-1">
                                            <IoCloseSharp/>
                                        </span>
                                    </div>
                                ))
                            }
                            <label htmlFor="image" className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed hover:border-indigo-500 w-full text-white">
                                <span><BsImages/></span>
                                <span>Select Image</span>
                            </label>
                            <input multiple onChange={imageHandle} type="file" id="image" name="image" className="hidden" accept="image"/>
                        
                        </div>
                        <div className="flex text-white">
                            <button type="submit" className="bg-blue-500  hover:shadow-blue-500/50 hover:shadow-lg rounded-md px-7 py-2 my-4  text-center">
                                Add Category
                            </button>
                        </div>
                    </form>
                
                </div>
            </div>
        </div>
    )
}
export default AddProduct
