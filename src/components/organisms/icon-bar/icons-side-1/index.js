import React from 'react';
import { BiCaretDown } from 'react-icons/bi';
import Label from '@atoms/label';
import Dropdown from '@atoms/drop-down';
import IconBarCard from '@molecules/icon-bar-card';

function IconsSide1() {
	return (
		<>
			<IconBarCard
				value="Clipboard"
				className="flex flex-col items-center"
				mainClass="flex h-full flex-col justify-between"
				icons={
					<>
						<img
							src="/images/cover/24.png"
							className="w-11 cursor-pointer"
							alt="image"
						/>
						<Label
							value="Paste"
							classes={{ root: 'text-gray-700 text-md pt-2 pb-1 font-light' }}
						/>
						<Dropdown
							className="p-1"
							icons={<BiCaretDown className={`text-xl text-gray-940`} />}
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
					</>
				}
				icons2={
					<>
						<div className="space-y-0">
							<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
								<img
									src="/images/cover/23.png"
									className="w-100 cursor-pointer"
									alt="image"
								/>
							</div>
							<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
								<img
									src="/images/cover/22.png"
									className="w-100 cursor-pointer"
									alt="image"
								/>
							</div>
							<div className="w-8 p-1.5 hover:bg-ideeza-460 rounded-sm cursor-pointer">
								<img
									src="/images/cover/21.png"
									className="w-100 cursor-pointer"
									alt="image"
								/>
							</div>
						</div>
					</>
				}
			/>
		</>
	);
}

export default IconsSide1;
