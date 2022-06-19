import IconBarCard from '@molecules/icon-bar-card';

function IconsSide7() {
	return (
		<>
			<IconBarCard
				value="General"
				mainClass="flex h-full flex-col justify-between"
				className="grid grid-cols-2 gap-0 items-center"
				icons={
					<>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/77.png"
								className="w-100 cursor-pointer"
								alt="action"
							/>
						</div>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/80.png"
								className="w-100 cursor-pointer"
								alt="action"
							/>
						</div>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/78.png"
								className="w-100 cursor-pointer"
								alt="action"
							/>
						</div>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/81.png"
								className="w-100 cursor-pointer"
								alt="action"
							/>
						</div>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/79.png"
								className="w-100 cursor-pointer"
								alt="action"
							/>
						</div>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/82.png"
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

export default IconsSide7;
