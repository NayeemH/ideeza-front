import React from 'react';
import AvatarAtom from '@atoms/avatar';
import CheckboxAtom from '@atoms/checkbox';
import Label from '@atoms/label';
import { useRouter } from 'next/router';
import { HiOutlineDotsVertical } from 'react-icons/hi';
import Button from '@atoms/button';
import CustomDropDownMenu from '@molecules/custom-dropdown';

const Table: React.FC<any> = ({
	theader = [' ', 'Username', 'Role', 'Status', 'Join Date', 'Score', ' '],
	tbody = [
		'checkbox',
		'PCBix LLC',
		'Service Provider',
		'Active',
		new Date().toLocaleDateString(),
		'4.6',
		'dotIcon',
	],
	tableHeader,
	classessort,
}) => {
	// const date = new Date();
	const route = useRouter();
	return (
		<div className="overflow-x-auto">
			<table className="w-full ml-6 ">
				<thead className={tableHeader}>
					<tr className="font-bold border-b-2">
						{theader.map((head: string, index: number) => {
							return (
								<td
									key={index}
									className="text-lg"
								>
									<p>
										{head === 'checkbox' ? <CheckboxAtom></CheckboxAtom> : head}
									</p>
								</td>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<tr
						onClick={() => route.push(`/technician/dashboard/project/${1}`)}
						className="border-b-2 cursor-pointer"
					>
						{tbody.map((body: string, index: number) => {
							return (
								<td key={index}>
									{body === 'dotIcon' ? (
										<HiOutlineDotsVertical
											className={`text-3xl text-gray-500  cursor-pointer relative`}
										/>
									) : body === 'checkbox' ? (
										<CheckboxAtom></CheckboxAtom>
									) : body === 'domain' ? (
										<div className="flex">
											<img
												src="/images/icon/domain-type-first.svg"
												className="w-4 mr-2"
												alt="icon"
											/>
											<img
												src="/images/icon/domain-type-slash-outline.svg"
												className="w-4 mr-2"
												alt="icon"
											/>
											<img
												src="/images/icon/domain-type-cube.svg"
												className="w-4"
												alt="icon"
											/>
										</div>
									) : body === 'avater' ? (
										<div className="flex items-center">
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
										</div>
									) : body === 'Completed' ? (
										<Label
											value={'Completed'}
											className="text-emerald-400 font-normal text-base 2xl:text-xl uppercase font-sans"
										/>
									) : body === 'timeline' ? (
										<div
											className={`rounded-full h-8 xl:h-9 2xl:h-11  relative bg-white border w-full`}
										>
											<Label
												value="10.10.2021"
												className="absolute w-full tracking-wide top-[2px] xl:top-[4px] 2xl:top-[5px] left-0 bottom-0 text-center font-sans text-gray-800 text-base 2xl:text-xl"
											/>
											<div className="bg-primary rounded-full h-full px-3 w-9/12 xl:w-8/12"></div>
										</div>
									) : body === 'notification' ? (
										<img
											src="/images/icon/notification-complete.svg"
											className="w-4"
											alt="icon"
										/>
									) : body === 'Selectbtn' ? (
										<Button
											value="Select"
											classes={{
												root: `bg-white text-[#666666] shadow-none border border-solid rounded-full px-10 py-2 my-2 leading-4 whitespace-nowrap tracking-tight transform-none text-lg font-sans`,
											}}
											color="inherit"
										/>
									) : body === 'Microchip' ? (
										<div className="text-primary">Microchip</div>
									) : body === 'input' ? (
										<input
											type="text"
											placeholder="Name"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'inputMin' ? (
										<input
											type="text"
											placeholder="Min"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'inputMax' ? (
										<input
											type="text"
											placeholder="Max"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'select' ? (
										<CustomDropDownMenu
											className={classessort}
											selectOptions={[
												{
													name: 'Property',
													value: 'Property',
												},
												{
													name: 'Cover',
													value: 'Cover',
												},
												{
													name: 'Electronics',
													value: 'Electronics',
												},
												{
													name: 'Parts',
													value: 'Parts',
												},
											]}
											inputClasses="h-12 rounded-sm w-32 pl-0 font-sans tracking-wider text-lg cursor-pointer bg-white"
											labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
											labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
											labelWrapperClass="flex cursor-pointer md:relative"
											dropDownClasses="origin-top-right z-20 mt-0 w-32 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
											// placeholder="Search..."
										/>
									) : (
										body
									)}
								</td>
							);
						})}
					</tr>
					<tr
						onClick={() => route.push(`/technician/dashboard/project/${1}`)}
						className="border-b-2 cursor-pointer"
					>
						{tbody.map((body: string, index: number) => {
							return (
								<td key={index}>
									{body === 'dotIcon' ? (
										<HiOutlineDotsVertical
											className={`text-3xl text-gray-500  cursor-pointer relative`}
										/>
									) : body === 'checkbox' ? (
										<CheckboxAtom></CheckboxAtom>
									) : body === 'domain' ? (
										<div className="flex">
											<img
												src="/images/icon/domain-type-first.svg"
												className="w-4 mr-2"
												alt="icon"
											/>
											<img
												src="/images/icon/domain-type-slash-outline.svg"
												className="w-4 mr-2"
												alt="icon"
											/>
											<img
												src="/images/icon/domain-type-cube.svg"
												className="w-4"
												alt="icon"
											/>
										</div>
									) : body === 'avater' ? (
										<div className="flex items-center">
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
										</div>
									) : body === 'Completed' ? (
										<Label
											value={'Completed'}
											className="text-emerald-400 font-normal text-base 2xl:text-xl uppercase font-sans"
										/>
									) : body === 'timeline' ? (
										<div
											className={`rounded-full h-8 xl:h-9 2xl:h-11  relative bg-white border w-full`}
										>
											<Label
												value="10.10.2021"
												className="absolute w-full tracking-wide top-[2px] xl:top-[4px] 2xl:top-[5px] left-0 bottom-0 text-center font-sans text-gray-800 text-base 2xl:text-xl"
											/>
											<div className="bg-primary rounded-full h-full px-3 w-9/12 xl:w-8/12"></div>
										</div>
									) : body === 'notification' ? (
										<img
											src="/images/icon/notification-complete.svg"
											className="w-4"
											alt="icon"
										/>
									) : body === 'Selectbtn' ? (
										<Button
											value="Select"
											classes={{
												root: `bg-white text-[#666666] shadow-none border border-solid rounded-full px-10 py-2 my-2 leading-4 whitespace-nowrap tracking-tight transform-none text-lg font-sans`,
											}}
											color="inherit"
										/>
									) : body === 'Microchip' ? (
										<div className="text-primary">Microchip</div>
									) : body === 'input' ? (
										<input
											type="text"
											placeholder="Name"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'inputMin' ? (
										<input
											type="text"
											placeholder="Min"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'inputMax' ? (
										<input
											type="text"
											placeholder="Max"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'select' ? (
										<CustomDropDownMenu
											className={classessort}
											selectOptions={[
												{
													name: 'Property',
													value: 'Property',
												},
												{
													name: 'Cover',
													value: 'Cover',
												},
												{
													name: 'Electronics',
													value: 'Electronics',
												},
												{
													name: 'Parts',
													value: 'Parts',
												},
											]}
											inputClasses="h-12 rounded-sm w-32 pl-0 font-sans tracking-wider text-lg cursor-pointer bg-white"
											labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
											labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
											labelWrapperClass="flex cursor-pointer md:relative"
											dropDownClasses="origin-top-right z-20 mt-0 w-32 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
											// placeholder="Search..."
										/>
									) : (
										body
									)}
								</td>
							);
						})}
						{/* <td>
            <CheckboxAtom></CheckboxAtom>
          </td>
          <td>PCBix LLC</td>
          <td>Service Provider</td>
          <td>Active</td>
          <td>{date.toLocaleDateString()}</td>
          <td>4.6</td>
          <td>
            <HiOutlineDotsVertical
              className={`text-3xl text-gray-500  cursor-pointer relative`}
            />
          </td> */}
					</tr>
					<tr
						onClick={() => route.push(`/technician/dashboard/project/${1}`)}
						className="border-b-2 cursor-pointer"
					>
						{tbody.map((body: string, index: number) => {
							return (
								<td key={index}>
									{body === 'dotIcon' ? (
										<HiOutlineDotsVertical
											className={`text-3xl text-gray-500  cursor-pointer relative`}
										/>
									) : body === 'checkbox' ? (
										<CheckboxAtom></CheckboxAtom>
									) : body === 'domain' ? (
										<div className="flex">
											<img
												src="/images/icon/domain-type-first.svg"
												className="w-4 mr-2"
												alt="icon"
											/>
											<img
												src="/images/icon/domain-type-slash-outline.svg"
												className="w-4 mr-2"
												alt="icon"
											/>
											<img
												src="/images/icon/domain-type-cube.svg"
												className="w-4"
												alt="icon"
											/>
										</div>
									) : body === 'avater' ? (
										<div className="flex items-center">
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
										</div>
									) : body === 'Completed' ? (
										<Label
											value={'Completed'}
											className="text-emerald-400 font-normal text-base 2xl:text-xl uppercase font-sans"
										/>
									) : body === 'timeline' ? (
										<div
											className={`rounded-full h-8 xl:h-9 2xl:h-11  relative bg-white border w-full`}
										>
											<Label
												value="10.10.2021"
												className="absolute w-full tracking-wide top-[2px] xl:top-[4px] 2xl:top-[5px] left-0 bottom-0 text-center font-sans text-gray-800 text-base 2xl:text-xl"
											/>
											<div className="bg-primary rounded-full h-full px-3 w-9/12 xl:w-8/12"></div>
										</div>
									) : body === 'notification' ? (
										<img
											src="/images/icon/notification-complete.svg"
											className="w-4"
											alt="icon"
										/>
									) : body === 'Selectbtn' ? (
										<Button
											value="Select"
											classes={{
												root: `bg-white text-[#666666] shadow-none border border-solid rounded-full px-10 py-2 my-2 leading-4 whitespace-nowrap tracking-tight transform-none text-lg font-sans`,
											}}
											color="inherit"
										/>
									) : body === 'Microchip' ? (
										<div className="text-primary">Microchip</div>
									) : body === 'input' ? (
										<input
											type="text"
											placeholder="Name"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'inputMin' ? (
										<input
											type="text"
											placeholder="Min"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'inputMax' ? (
										<input
											type="text"
											placeholder="Max"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'select' ? (
										<CustomDropDownMenu
											className={classessort}
											selectOptions={[
												{
													name: 'Property',
													value: 'Property',
												},
												{
													name: 'Cover',
													value: 'Cover',
												},
												{
													name: 'Electronics',
													value: 'Electronics',
												},
												{
													name: 'Parts',
													value: 'Parts',
												},
											]}
											inputClasses="h-12 rounded-sm w-32 pl-0 font-sans tracking-wider text-lg cursor-pointer bg-white"
											labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
											labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
											labelWrapperClass="flex cursor-pointer md:relative"
											dropDownClasses="origin-top-right z-20 mt-0 w-32 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
											// placeholder="Search..."
										/>
									) : (
										body
									)}
								</td>
							);
						})}
						{/* <td>
            <CheckboxAtom></CheckboxAtom>
          </td>
          <td>PCBix LLC</td>
          <td>Service Provider</td>
          <td>Active</td>
          <td>{date.toLocaleDateString()}</td>
          <td>4.6</td>
          <td>
            <HiOutlineDotsVertical
              className={`text-3xl text-gray-500  cursor-pointer relative`}
            />
          </td> */}
					</tr>
					<tr
						onClick={() => route.push(`/technician/dashboard/project/${1}`)}
						className="border-b-2 cursor-pointer"
					>
						{tbody.map((body: string, index: number) => {
							return (
								<td key={index}>
									{body === 'dotIcon' ? (
										<HiOutlineDotsVertical
											className={`text-3xl text-gray-500  cursor-pointer relative`}
										/>
									) : body === 'checkbox' ? (
										<CheckboxAtom></CheckboxAtom>
									) : body === 'domain' ? (
										<div className="flex">
											<img
												src="/images/icon/domain-type-first.svg"
												className="w-4 mr-2"
												alt="icon"
											/>
											<img
												src="/images/icon/domain-type-slash-outline.svg"
												className="w-4 mr-2"
												alt="icon"
											/>
											<img
												src="/images/icon/domain-type-cube.svg"
												className="w-4"
												alt="icon"
											/>
										</div>
									) : body === 'avater' ? (
										<div className="flex items-center">
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
										</div>
									) : body === 'Completed' ? (
										<Label
											value={'Completed'}
											className="text-emerald-400 font-normal text-base 2xl:text-xl uppercase font-sans"
										/>
									) : body === 'timeline' ? (
										<div
											className={`rounded-full h-8 xl:h-9 2xl:h-11  relative bg-white border w-full`}
										>
											<Label
												value="10.10.2021"
												className="absolute w-full tracking-wide top-[2px] xl:top-[4px] 2xl:top-[5px] left-0 bottom-0 text-center font-sans text-gray-800 text-base 2xl:text-xl"
											/>
											<div className="bg-primary rounded-full h-full px-3 w-9/12 xl:w-8/12"></div>
										</div>
									) : body === 'notification' ? (
										<img
											src="/images/icon/notification-complete.svg"
											className="w-4"
											alt="icon"
										/>
									) : body === 'Selectbtn' ? (
										<Button
											value="Select"
											classes={{
												root: `bg-white text-[#666666] shadow-none border border-solid rounded-full px-10 py-2 my-2 leading-4 whitespace-nowrap tracking-tight transform-none text-lg font-sans`,
											}}
											color="inherit"
										/>
									) : body === 'Microchip' ? (
										<div className="text-primary">Microchip</div>
									) : body === 'input' ? (
										<input
											type="text"
											placeholder="Name"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'inputMin' ? (
										<input
											type="text"
											placeholder="Min"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'inputMax' ? (
										<input
											type="text"
											placeholder="Max"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'select' ? (
										<CustomDropDownMenu
											className={classessort}
											selectOptions={[
												{
													name: 'Property',
													value: 'Property',
												},
												{
													name: 'Cover',
													value: 'Cover',
												},
												{
													name: 'Electronics',
													value: 'Electronics',
												},
												{
													name: 'Parts',
													value: 'Parts',
												},
											]}
											inputClasses="h-12 rounded-sm w-32 pl-0 font-sans tracking-wider text-lg cursor-pointer bg-white"
											labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
											labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
											labelWrapperClass="flex cursor-pointer md:relative"
											dropDownClasses="origin-top-right z-20 mt-0 w-32 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
											// placeholder="Search..."
										/>
									) : (
										body
									)}
								</td>
							);
						})}
						{/* <td>
            <CheckboxAtom></CheckboxAtom>
          </td>
          <td>PCBix LLC</td>
          <td>Service Provider</td>
          <td>Active</td>
          <td>{date.toLocaleDateString()}</td>
          <td>4.6</td>
          <td>
            <HiOutlineDotsVertical
              className={`text-3xl text-gray-500  cursor-pointer relative`}
            />
          </td> */}
					</tr>
					<tr
						onClick={() => route.push(`/technician/dashboard/project/${1}`)}
						className="border-b-2 cursor-pointer"
					>
						{tbody.map((body: string, index: number) => {
							return (
								<td key={index}>
									{body === 'dotIcon' ? (
										<HiOutlineDotsVertical
											className={`text-3xl text-gray-500  cursor-pointer relative`}
										/>
									) : body === 'checkbox' ? (
										<CheckboxAtom></CheckboxAtom>
									) : body === 'domain' ? (
										<div className="flex">
											<img
												src="/images/icon/domain-type-first.svg"
												className="w-4 mr-2"
												alt="icon"
											/>
											<img
												src="/images/icon/domain-type-slash-outline.svg"
												className="w-4 mr-2"
												alt="icon"
											/>
											<img
												src="/images/icon/domain-type-cube.svg"
												className="w-4"
												alt="icon"
											/>
										</div>
									) : body === 'avater' ? (
										<div className="flex items-center">
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
										</div>
									) : body === 'Completed' ? (
										<Label
											value={'Completed'}
											className="text-emerald-400 font-normal text-base 2xl:text-xl uppercase font-sans"
										/>
									) : body === 'timeline' ? (
										<div
											className={`rounded-full h-8 xl:h-9 2xl:h-11  relative bg-white border w-full`}
										>
											<Label
												value="10.10.2021"
												className="absolute w-full tracking-wide top-[2px] xl:top-[4px] 2xl:top-[5px] left-0 bottom-0 text-center font-sans text-gray-800 text-base 2xl:text-xl"
											/>
											<div className="bg-primary rounded-full h-full px-3 w-9/12 xl:w-8/12"></div>
										</div>
									) : body === 'notification' ? (
										<img
											src="/images/icon/notification-complete.svg"
											className="w-4"
											alt="icon"
										/>
									) : body === 'Selectbtn' ? (
										<Button
											value="Select"
											classes={{
												root: `bg-white text-[#666666] shadow-none border border-solid rounded-full px-10 py-2 my-2 leading-4 whitespace-nowrap tracking-tight transform-none text-lg font-sans`,
											}}
											color="inherit"
										/>
									) : body === 'Microchip' ? (
										<div className="text-primary">Microchip</div>
									) : body === 'input' ? (
										<input
											type="text"
											placeholder="Name"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'inputMin' ? (
										<input
											type="text"
											placeholder="Min"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'inputMax' ? (
										<input
											type="text"
											placeholder="Max"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'select' ? (
										<CustomDropDownMenu
											className={classessort}
											selectOptions={[
												{
													name: 'Property',
													value: 'Property',
												},
												{
													name: 'Cover',
													value: 'Cover',
												},
												{
													name: 'Electronics',
													value: 'Electronics',
												},
												{
													name: 'Parts',
													value: 'Parts',
												},
											]}
											inputClasses="h-12 rounded-sm w-32 pl-0 font-sans tracking-wider text-lg cursor-pointer bg-white"
											labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
											labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
											labelWrapperClass="flex cursor-pointer md:relative"
											dropDownClasses="origin-top-right z-20 mt-0 w-32 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
											// placeholder="Search..."
										/>
									) : (
										body
									)}
								</td>
							);
						})}
						{/* <td>
            <CheckboxAtom></CheckboxAtom>
          </td>
          <td>PCBix LLC</td>
          <td>Service Provider</td>
          <td>Active</td>
          <td>{date.toLocaleDateString()}</td>
          <td>4.6</td>
          <td>
            <HiOutlineDotsVertical
              className={`text-3xl text-gray-500  cursor-pointer relative`}
            />
          </td> */}
					</tr>
					<tr
						onClick={() => route.push(`/technician/dashboard/project/${1}`)}
						className="border-b-2 cursor-pointer"
					>
						{tbody.map((body: string, index: number) => {
							return (
								<td key={index}>
									{body === 'dotIcon' ? (
										<HiOutlineDotsVertical
											className={`text-3xl text-gray-500  cursor-pointer relative`}
										/>
									) : body === 'checkbox' ? (
										<CheckboxAtom></CheckboxAtom>
									) : body === 'domain' ? (
										<div className="flex">
											<img
												src="/images/icon/domain-type-first.svg"
												className="w-4 mr-2"
												alt="icon"
											/>
											<img
												src="/images/icon/domain-type-slash-outline.svg"
												className="w-4 mr-2"
												alt="icon"
											/>
											<img
												src="/images/icon/domain-type-cube.svg"
												className="w-4"
												alt="icon"
											/>
										</div>
									) : body === 'avater' ? (
										<div className="flex items-center">
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
											<AvatarAtom
												classes={{ root: 'w-10 h-10 -ml-2 border' }}
												variant="circular"
												src="/images/cart-h-add1.png"
											/>
										</div>
									) : body === 'Completed' ? (
										<Label
											value={'Completed'}
											className="text-emerald-400 font-normal text-base 2xl:text-xl uppercase font-sans"
										/>
									) : body === 'timeline' ? (
										<div
											className={`rounded-full h-8 xl:h-9 2xl:h-11  relative bg-white border w-full`}
										>
											<Label
												value="10.10.2021"
												className="absolute w-full tracking-wide top-[2px] xl:top-[4px] 2xl:top-[5px] left-0 bottom-0 text-center font-sans text-gray-800 text-base 2xl:text-xl"
											/>
											<div className="bg-primary rounded-full h-full px-3 w-9/12 xl:w-8/12"></div>
										</div>
									) : body === 'notification' ? (
										<img
											src="/images/icon/notification-complete.svg"
											className="w-4"
											alt="icon"
										/>
									) : body === 'Selectbtn' ? (
										<Button
											value="Select"
											classes={{
												root: `bg-white text-[#666666] shadow-none border border-solid rounded-full px-10 py-2 my-2 leading-4 whitespace-nowrap tracking-tight transform-none text-lg font-sans`,
											}}
											color="inherit"
										/>
									) : body === 'Microchip' ? (
										<div className="text-primary">Microchip</div>
									) : body === 'input' ? (
										<input
											type="text"
											placeholder="Name"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'inputMin' ? (
										<input
											type="text"
											placeholder="Min"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'inputMax' ? (
										<input
											type="text"
											placeholder="Max"
											className="border rounded-none border-gray-725 my-2 w-28 text-gray-700 px-2 py-1 text-base 2xl:text-xl font-sans bg-white"
										/>
									) : body === 'select' ? (
										<CustomDropDownMenu
											className={classessort}
											selectOptions={[
												{
													name: 'Property',
													value: 'Property',
												},
												{
													name: 'Cover',
													value: 'Cover',
												},
												{
													name: 'Electronics',
													value: 'Electronics',
												},
												{
													name: 'Parts',
													value: 'Parts',
												},
											]}
											inputClasses="h-12 rounded-sm w-32 pl-0 font-sans tracking-wider text-lg cursor-pointer bg-white"
											labelBtnClasses="inline-flex justify-start w-full rounded-md shadow-none px-4 pl-0 py-2 text-sm font-medium focus:outline-none text-gray-700"
											labelClasses="capitalize font-normal text-black text-base 2xl:text-xl tracking-tight whitespace-nowrap w-auto truncate font-sans"
											labelWrapperClass="flex cursor-pointer md:relative"
											dropDownClasses="origin-top-right z-20 mt-0 w-32 absolute rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-1"
											// placeholder="Search..."
										/>
									) : (
										body
									)}
								</td>
							);
						})}
						{/* <td>
            <CheckboxAtom></CheckboxAtom>
          </td>
          <td>PCBix LLC</td>
          <td>Service Provider</td>
          <td>Active</td>
          <td>{date.toLocaleDateString()}</td>
          <td>4.6</td>
          <td>
            <HiOutlineDotsVertical
              className={`text-3xl text-gray-500  cursor-pointer relative`}
            />
          </td> */}
					</tr>

					{/* <tr className="border-b-2">
          <td>
            <CheckboxAtom></CheckboxAtom>
          </td>
          <td>PCBix LLC</td>
          <td>Service Provider</td>
          <td>Active</td>
          <td>{date.toLocaleDateString()}</td>
          <td>4.6</td>
          <td>
            <HiOutlineDotsVertical
              className={`text-3xl text-gray-500  cursor-pointer relative`}
            />
          </td>
        </tr>

        <tr className="border-b-2">
          <td>
            <CheckboxAtom></CheckboxAtom>
          </td>
          <td>PCBix LLC</td>
          <td>Service Provider</td>
          <td>Active</td>
          <td>{date.toLocaleDateString()}</td>
          <td>4.6</td>
          <td>
            <HiOutlineDotsVertical
              className={`text-3xl text-gray-500  cursor-pointer relative`}
            />
          </td>
        </tr>

        <tr className="border-b-2">
          <td>
            <CheckboxAtom></CheckboxAtom>
          </td>
          <td>PCBix LLC</td>
          <td>Service Provider</td>
          <td>Active</td>
          <td>{date.toLocaleDateString()}</td>
          <td>4.6</td>
          <td>
            <HiOutlineDotsVertical
              className={`text-3xl text-gray-500  cursor-pointer relative`}
            />
          </td>
        </tr>

        <tr className="border-b-2">
          <td>
            <CheckboxAtom></CheckboxAtom>
          </td>
          <td>PCBix LLC</td>
          <td>Service Provider</td>
          <td>Active</td>
          <td>{date.toLocaleDateString()}</td>
          <td>4.6</td>
          <td>
            <HiOutlineDotsVertical
              className={`text-3xl text-gray-500  cursor-pointer relative`}
            />
          </td>
        </tr> */}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
