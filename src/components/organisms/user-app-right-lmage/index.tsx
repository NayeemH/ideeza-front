import CheckboxFields from '@molecules/checkbox-fields';
import SelectBasic from '@molecules/select-basic';
import React, { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const UserAppImage = () => {
	const [imageHeight, setImageHeight] = useState<string>('');
	return (
		<>
			<div className="user-app-image">
				<div className="p-[35px] pb-[50px] flex items-center justify-center">
					<AiOutlineArrowLeft className="text-2xl mt-1 mr-[25px]" />
					<h5 className="text-[20px] eina-font-sb03 text-[#666666]">Image</h5>
				</div>
				<div className="px-[30px]">
					<div className="mb-[30px]">
						<label className="text-[16px] mb-[10px] block eina-font-sb03 text-[#666666]">
							Height
						</label>
						<SelectBasic
							value={imageHeight}
							options={[
								{
									name: '500px',
									value: '500px',
								},
								{
									name: '600px',
									value: '600px',
								},
								{
									name: 'Others',
									value: 'Others',
								},
							]}
							handleChange={(e: any) => setImageHeight(e.target.value)}
							placeholder={'220px'}
							// error={genderError ? true : false}
							// helpText={genderError}
						/>
					</div>
					<div className="mb-[30px]">
						<label className="text-[16px] mb-[10px] block eina-font-sb03 text-[#666666]">
							Width
						</label>
						<SelectBasic
							value={imageHeight}
							options={[
								{
									name: '500px',
									value: '500px',
								},
								{
									name: '600px',
									value: '600px',
								},
								{
									name: 'Others',
									value: 'Others',
								},
							]}
							handleChange={(e: any) => setImageHeight(e.target.value)}
							placeholder={'220px'}
							// error={genderError ? true : false}
							// helpText={genderError}
						/>
					</div>
					<div className="mb-[30px]">
						<label className="text-[16px] block eina-font-sb03 text-[#666666]">
							Picture
							<span className="select-basic-style border border-gray-160 w-full block mt-[10px] cursor-pointer">
								No file choosen
							</span>
							<input
								type="file"
								className="hidden"
							/>
						</label>
					</div>
					<div className="mb-[30px]">
						<label className="text-[16px] mb-[10px] block eina-font-sb03 text-[#666666]">
							Rotation angle
						</label>
						<input
							value={'0.0'}
							placeholder={'0.0'}
							className="select-basic-style border border-gray-160 w-full block outline-none"
						/>
					</div>
					<div className="mb-[30px]">
						<CheckboxFields
							size="small"
							color="secondary"
							mainClass="-ml-2 items-start pr-20"
							// containerClass={` ${value1Class}`}
							labelClass={`text-base 2xl:text-xl tracking-tight leading-7 text-gray-600 pl-1`}
							checked={false}
							name="Visible"
							value="Visible"
						/>
						<CheckboxFields
							size="small"
							color="secondary"
							mainClass="-ml-2 items-start pr-20"
							// containerClass={` ${value1Class}`}
							labelClass={`text-base 2xl:text-xl tracking-tight leading-7 text-gray-600 pl-1`}
							checked={false}
							name="Scalepicturetofit"
							value="Scalepicturetofit"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserAppImage;
