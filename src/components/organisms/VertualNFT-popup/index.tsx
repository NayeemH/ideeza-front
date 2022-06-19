import Button from '@atoms/button';
import CheckboxAtom from '@atoms/checkbox';
import Input from '@atoms/input';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import SelectBasic from '@molecules/select-basic';
import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
function VertualNFTPopup(props: any) {
	const [vertualType, setVertualType] = useState<string>('');
	const [numberOfItems, setNumberOfItems] = useState<string>('');
	const { open, toggleOpen } = props;
	return (
		<div>
			<Modal
				width="sm"
				close={toggleOpen}
				header={
					<div className="flex justify-between">
						<Label
							value="Virtual NFT creator"
							classes={{
								root: `text-primary text-center font-extrabold font-sans pt-4 p-7 text-lg xl:text-[40px]`,
							}}
						/>
						<IoClose
							className="text-red-500 text-[4xl]"
							onClick={toggleOpen}
						/>
					</div>
				}
				content={
					<div className="pl-1">
						{/* <CheckboxLabel
              value="Free shipping"
              id="shipping"
              labelClass="text-gray-300 text-md font-sans pl-2"
              checkboxClass="w-6 h-6 rounded-sm"
            /> */}
						<div className="mb-[20px]">
							<Label
								value="Virtual type"
								classes={{
									root: `text-gray-600 text-base font-sans tracking-tight pb-1 pt-3`,
								}}
							/>
							<SelectBasic
								value={vertualType}
								options={[
									{
										name: '#00004',
										value: '#00004',
									},
									{
										name: '#eeee',
										value: '#eeee',
									},
									{
										name: 'Others',
										value: 'Others',
									},
								]}
								handleChange={(e: any) => setVertualType(e.target.value)}
								placeholder={'Choose your prefer type '}
								// error={genderError ? true : false}
								// helpText={genderError}
								selectClasses="border border-[#CCCCCC] bg-[#FBFBFB] rounded-[5px] w-full text-lg 2xl:text-xl text-[#333333]"
							/>
						</div>
						<div className="mb-[20px]">
							<Label
								value="Number of items"
								classes={{
									root: `text-gray-600 text-base font-sans tracking-tight pb-1 pt-3`,
								}}
							/>
							<SelectBasic
								value={numberOfItems}
								options={[
									{
										name: '1',
										value: '1',
									},
									{
										name: '1',
										value: '1',
									},
									{
										name: 'Others',
										value: 'Others',
									},
								]}
								handleChange={(e: any) => setNumberOfItems(e.target.value)}
								placeholder={'Choose Number of Items '}
								// error={genderError ? true : false}
								// helpText={genderError}
								selectClasses="border border-[#CCCCCC] bg-[#FBFBFB] rounded-[5px] w-full text-lg 2xl:text-xl text-[#333333]"
							/>
						</div>
						<div className="mb-[20px]">
							<Label
								value="Price"
								classes={{
									root: `text-gray-600 text-base font-sans tracking-tight pb-1 pt-3`,
								}}
							/>
							<Input
								isIcon
								position="end"
								placeholder="0.01 ETH for example"
								className={{
									root: ` pl-0 py-1 pr-2 w-full border border-[#CCCCCC] text-[#333333]`,
								}}
							></Input>
						</div>
						<div className="mb-[20px]">
							<Label
								value="Royalties"
								classes={{
									root: `text-gray-600 text-base font-sans tracking-tight pb-1 pt-3 `,
								}}
							/>
							<Input
								isIcon
								position="end"
								placeholder="Suggested: 10%, 20%, 30%, Maximum is 70%"
								className={{
									root: ` pl-0 py-1 pr-2 w-full border border-[#CCCCCC] text-[#333333]`,
								}}
							></Input>
						</div>
						<div className="flex items-center">
							<CheckboxAtom color="primary" />
							<p className="ml-2">
								I confirm that additional gas fee's will be added{' '}
							</p>
						</div>
					</div>
				}
				actions={
					<div className="pl-0 pb-3 pt-5 w-full">
						<Button
							className="bg-primary text-white px-7 w-full transform-none text-base py-3"
							value="Mint"
							color="primary"
						/>
					</div>
				}
				open={open}
			/>
		</div>
	);
}
export default VertualNFTPopup;
