import IconBarCard from '@molecules/icon-bar-card';

function IconsSide9() {
	return (
		<>
			<IconBarCard
				value="General"
				className="flex items-start justify-between space-x-1"
				mainClass="flex h-full flex-col justify-between"
				icons={
					<>
						<div className="space-y-1 flex flex-col items-center justify-between">
							<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
								<img
									src="/images/cover/90.png"
									className="w-100 cursor-pointer"
									alt="action"
								/>
							</div>
							<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
								<img
									src="/images/cover/91.png"
									className="w-100 cursor-pointer"
									alt="action"
								/>
							</div>
							<div className="w-8 mt-1 py-2 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
								<img
									src="/images/cover/92.png"
									className="w-100 cursor-pointer"
									alt="action"
								/>
							</div>
						</div>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/info.png"
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

export default IconsSide9;
