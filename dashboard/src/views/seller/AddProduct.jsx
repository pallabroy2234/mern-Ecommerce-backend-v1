import {Link} from "react-router-dom";
import {useState} from "react";
import {useForm} from "react-hook-form";


const AddProduct = () => {
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
    
    
    
    return (
        <div className="px-2 md:px-7 py-5">
            <div className="w-full bg-secondary p-4 rounded-md">
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
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddProduct
