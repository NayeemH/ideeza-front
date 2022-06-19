import Dropdown from '@atoms/drop-down';
import IconBarCard from '@molecules/icon-bar-card';

function IconsSide6({ handleClick }) {
	return (
		<>
			<IconBarCard
				value="General"
				className="grid grid-cols-3"
				mainClass="flex h-full flex-col justify-between"
				icons={
					<>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/69.png"
								className="w-100 cursor-pointer"
								alt="action"
							/>
						</div>
						<Dropdown
							className="p-0"
							icons={
								<div className="flex flex-col items-end">
									<div className="w-8 p-1.5 mr-2 hover:bg-ideeza-460 rounded-sm cursor-pointer">
										<img
											src="/images/cover/71.png"
											className="w-32 cursor-pointer"
											alt="action"
										/>
									</div>
								</div>
							}
							itemsClasses={{
								root: 'font-sans text-sm px-4 py-2 tracking-tight font-sans hover:text-primary text-gray-880',
							}}
							options={[
								{
									name: `Ctrl+V`,
									value: 'Ctrl+V',
								},
								{
									name: `Paste Special`,
									value: 'Special',
								},
								{
									name: `Paste to Original Position`,
									value: 'Original',
								},
								{
									name: `Paste to Selected Position`,
									value: 'Selected',
								},
							]}
						/>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/74.png"
								className="w-100"
								alt="action"
							/>
						</div>
						<Dropdown
							className="p-0 ml-1"
							icons={
								<div className="flex flex-col items-end">
									<div className="w-8 mr-2 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
										<img
											src="/images/cover/69.png"
											className="w-32 cursor-pointer"
											alt="action"
										/>
									</div>
								</div>
							}
							itemsClasses={{
								root: 'font-sans text-sm tracking-tight font-sans hover:text-primary text-gray-880',
							}}
							options={[
								{
									name: `Ctrl+V`,
									value: 'Ctrl+V',
								},
								{
									name: `Paste Special`,
									value: 'Special',
								},
								{
									name: `Paste to Original Position`,
									value: 'Original',
								},
								{
									name: `Paste to Selected Position`,
									value: 'Selected',
								},
							]}
						/>
						<div
							onClick={handleClick.bind(this, 'toggleView')}
							className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer"
						>
							<img
								src="/images/cover/72.png"
								className="w-100 cursor-pointer"
								alt="action"
							/>
						</div>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/75.png"
								className="w-100 cursor-pointer"
								alt="action"
							/>
						</div>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/70.png"
								className="w-100 cursor-pointer"
								alt="action"
							/>
						</div>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/73.png"
								className="w-100 cursor-pointer"
								alt="action"
							/>
						</div>
						<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
							<img
								src="/images/cover/76.png"
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

export default IconsSide6;
