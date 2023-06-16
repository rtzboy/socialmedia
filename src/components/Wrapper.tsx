const Wrapper = <P extends object>(Component: React.FC<P>) =>
	function HOC(props: P) {
		return (
			<div className='rounded-lg bg-slate-100 p-4'>
				<Component {...props} />
			</div>
		);
	};

export default Wrapper;
