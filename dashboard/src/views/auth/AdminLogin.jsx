import {useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {admin_login} from "../../store/Reducers/authReducer.js";

const AdminLogin = () => {
    const dispatch = useDispatch()
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });
    const {register, handleSubmit} = form;
    
    const submit = (data) => {
        dispatch(admin_login(data))
    };
    
    return (
        <div className="w-full min-h-screen bg-[#161d31] flex justify-center items-center">
            <div className="w-[400px] text-[#d0d2d6] p-2">
                <div className="bg-[#283046] p-4 rounded-md">
                    <div className="h-[70px] flex justify-center items-center">
                        <div className="w-[180px] h-[50px]">
                            <img src="/public/images/logo.png" className="w-full h-full" alt=""/>
                        </div>
                    </div>
                    <form action="" onSubmit={handleSubmit(submit)}>
                        <div className="flex flex-col w-full gap-3 mb-3">
                            <label htmlFor="email">Email</label>
                            <input {...register("email")} type="email" id="email" placeholder="Email" className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"/>
                        </div>
                        
                        <div className="flex flex-col w-full gap-3 mb-8">
                            <label htmlFor="password">Password</label>
                            <input {...register("password")} type="text" id="password" placeholder="Password" className="px-3 py-2 outline-none border border-slate-700 bg-transparent rounded-md text-[#d0d2d6] focus:border-indigo-500 overflow-hidden"/>
                        </div>
                        
                        <div>
                            <button type="submit" className="w-full py-2 mb-3 text-lg bg-blue-500 rounded-md hover:shadow-blue-500/50 hover:shadow-lg px-7 py7">
                                Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default AdminLogin;
