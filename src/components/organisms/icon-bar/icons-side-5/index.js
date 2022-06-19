import IconBarCard from '@molecules/icon-bar-card';

function IconsSide5({ active, handleClick }) {
	return (
		<>
			<IconBarCard
				value="General"
				mainClass="flex h-full flex-col justify-between"
				className="flex items-start space-x-1"
				icons={
					<>
						<div className="flex flex-col space-y-2 items-center justify-between">
							<div
								onClick={handleClick.bind(this, 'route')}
								className={`w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer ${
									active === 'route' ? 'bg-ideeza-460' : ''
								}`}
							>
								<img
									src="/images/cover/66.png"
									className="w-100 cursor-pointer"
									alt="action"
								/>
							</div>
							<div
								onClick={handleClick.bind(this, 'connection')}
								className={`w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer ${
									active === 'connection' ? 'bg-ideeza-460' : ''
								}`}
							>
								<img
									src="/images/cover/67.png"
									className="w-100 cursor-pointer"
									alt="action"
								/>
							</div>
							<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
								<img
									src="/images/cover/drag.png"
									className="w-100 cursor-pointer"
									alt="action"
								/>
							</div>
						</div>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/68.png"
								className="w-100 cursor-pointer"
								alt="action"
							/>
						</div>
					</>
				}
			/>
		</>
	);
}

export default IconsSide5;
