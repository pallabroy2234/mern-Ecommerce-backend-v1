const ChangePassword = () => {
	return (
		<div className='p-4 bg-white rounded-md'>
			<h2 className='text-xl text-slate-600 pb-5'>Change Password</h2>
			<form>
				<div className='flex flex-col gap-1 mb-2'>
					<label htmlFor='oldPassword'>Old Password</label>
					<input type='password' id='oldPassword' name='oldPassword' placeholder='Old Password' className='outline-0 px-3  py-2 border rounded-md text-slate-600' />
				</div>

				<div className='flex flex-col gap-1 mb-2'>
					<label htmlFor='newPassword'>New Password</label>
					<input type='password' id='newPassword' name='newPassword' placeholder='New Password' className='outline-0 px-3  py-2 border rounded-md text-slate-600' />
				</div>
				<div className='my-3'>
					<button className='px-8 py-2 bg-purple-500 shadow-lg hover:shadow-purple-500/30 text-white rounded-md'>Update Password</button>
				</div>
			</form>
		</div>
	);
};
export default ChangePassword;
