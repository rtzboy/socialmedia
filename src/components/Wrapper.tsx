const Wrapper = (Component: React.FC) =>
	function HOC() {
		return (
			<div className='rounded-lg bg-slate-100 p-4'>
				<Component />
			</div>
		);
	};

export default Wrapper;
