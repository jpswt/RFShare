const Navbar = () => {
	return (
		<div className="navbar bg-base-100">
			<div className="flex-1">
				<a className="btn btn-ghost text-xl normal-case">daisyUI</a>
			</div>
			<div className="flex-none gap-2">
				<div className="">
					<label tabIndex={0} className="avatar btn btn-circle btn-ghost">
						<div className="w-10 rounded-full">
							<img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
						</div>
					</label>
				</div>
			</div>
		</div>
	);
};
export default Navbar;
