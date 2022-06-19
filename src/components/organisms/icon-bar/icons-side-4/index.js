import IconBarCard from '@molecules/icon-bar-card';

function IconsSide4() {
	return (
		<>
			<IconBarCard
				value="General"
				className="flex items-start space-x-1"
				mainClass="flex h-full flex-col justify-between"
				icons={
					<>
						<div className="space-y-1 flex flex-col items-center justify-between">
							<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
								<img
									src="/images/cover/cub+.png"
									className="w-100 cursor-pointer"
									alt="action"
								/>
							</div>
							<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
								<img
									src="/images/cover/63.png"
									className="w-100 cursor-pointer"
									alt="action"
								/>
							</div>
							<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
								<img
									src="/images/cover/64.png"
									className="w-100 cursor-pointer"
									alt="action"
								/>
							</div>
						</div>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/65.png"
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

export default IconsSide4;
