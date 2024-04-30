import {useState} from "react";
import toast from "react-hot-toast";

const ChangePassword = () => {
	const [state, setState] = useState({
		oldPassword: "",
		newPassword: "",
	});

	const handleChange = (e) => {
		const {name, value} = e.target;
		setState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (state.oldPassword === "" || state.newPassword === "") {
			toast.error("Please fill all the fields");
		} else if (state.oldPassword === state.newPassword) {
			toast.error("Old password and new password should not be same");
		}
	};

	return (
		<div className='p-4 bg-white rounded-md'>
			<h2 className='text-xl text-slate-600 pb-5'>Change Password</h2>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className='flex flex-col gap-1 mb-2'>
					<label htmlFor='oldPassword'>Old Password</label>
					<input onChange={(e) => handleChange(e)} value={state.oldPassword} type='password' id='oldPassword' name='oldPassword' placeholder='Old Password' className='outline-0 px-3  py-2 border rounded-md text-slate-600' />
				</div>

				<div className='flex flex-col gap-1 mb-2'>
					<label htmlFor='newPassword'>New Password</label>
					<input onChange={(e) => handleChange(e)} value={state.newPassword} type='password' id='newPassword' name='newPassword' placeholder='New Password' className='outline-0 px-3  py-2 border rounded-md text-slate-600' />
				</div>
				<div className='my-3'>
					<button type='submit' className='px-8 py-2 bg-purple-500 shadow-lg hover:shadow-purple-500/30 text-white rounded-md'>
						Update Password
					</button>
				</div>
			</form>
		</div>
	);
};
export default ChangePassword;
