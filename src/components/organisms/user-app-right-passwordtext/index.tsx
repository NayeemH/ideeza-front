import CheckboxFields from '@molecules/checkbox-fields';
import SelectBasic from '@molecules/select-basic';
import React, { useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { BsTypeItalic } from 'react-icons/bs';

const UserAppPasswordText = () => {
	const [bgColor, setBgColor] = useState<string>('');
	const [textColor, setTextColor] = useState<string>('');
	const [font, setFont] = useState<string>('');
	const [fontSize, setFontSize] = useState<string>('');
	const [imageHeight, setImageHeight] = useState<string>('');
	const [imageWidth, setImageWidth] = useState<string>('');
	const [textAlignment, setTextAlignment] = useState<string>('');
	return (
		<>
			<div className="user-app-image">
				<div className="p-[35px] pb-[50px] flex items-center justify-center">
					<AiOutlineArrowLeft className="text-2xl mt-1 mr-[10px]" />
					<h5 className="text-[20px] eina-font-sb03 text-[#666666]">Passwordtextbox</h5>
				</div>
				<div className="px-[30px]">
					<div className="mb-[30px]">
						<label className="text-[16px] mb-[10px] block eina-font-sb03 text-[#666666]">
							Background Color
						</label>
						<SelectBasic
							value={bgColor}
							options={[
								{
									name: '#FF0000',
									value: '#FF0000',
								},
								{
									name: '#FF0000',
									value: '#FF0000',
								},
								{
									name: '#FF0000s',
									value: '#FF0000s',
								},
							]}
							handleChange={(e: any) => setBgColor(e.target.value)}
							placeholder={'Select Background Color'}
							// error={genderError ? true : false}
							// helpText={genderError}
						/>
						<CheckboxFields
							size="small"
							color="secondary"
							mainClass="-ml-2 items-start pr-20 pl-5 mt-5"
							// containerClass={` ${value1Class}`}
							labelClass={`text-base 2xl:text-xl tracking-tight leading-7 text-gray-600 `}
							checked={false}
							name="Enabled"
							value="Enabled"
						/>
					</div>
					<div className="mb-[30px]">
						<label className="text-[16px] mb-[10px] block eina-font-sb03 text-[#666666]">
							Font
						</label>
						<SelectBasic
							value={font}
							options={[
								{
									name: 'Open sans',
									value: 'Open sans',
								},
								{
									name: 'Prozima nova',
									value: 'Prozima nova',
								},
								{
									name: 'Robato',
									value: 'Robato',
								},
							]}
							handleChange={(e: any) => setFont(e.target.value)}
							placeholder={'Select Font'}
							// error={genderError ? true : false}
							// helpText={genderError}
						/>
						<div className="flex items-center justify-between pt-4">
							<div className="w-1/2">
								<SelectBasic
									value={fontSize}
									options={[
										{
											name: '22px',
											value: '22px',
										},
										{
											name: '25px',
											value: '25px',
										},
										{
											name: '30px',
											value: '30px',
										},
									]}
									handleChange={(e: any) => setFontSize(e.target.value)}
									placeholder={'size'}
									// error={genderError ? true : false}
									// helpText={genderError}
								/>
							</div>
							<div className="flex items-center ">
								<div className="pl-2 underline cursor-pointer text-[22px] mr-3 ">
									U
								</div>
								<div className="pl-2 font-bold cursor-pointer text-[22px] mr-3">
									B
								</div>
								<div className="pl-2 italic cursor-pointer text-[22px] mr-3">
									<BsTypeItalic />
								</div>
							</div>
						</div>
					</div>
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
							value={imageWidth}
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
							handleChange={(e: any) => setImageWidth(e.target.value)}
							placeholder={'220px'}
							// error={genderError ? true : false}
							// helpText={genderError}
						/>
					</div>
					<div className="mb-[30px]">
						<label className="text-[16px] mb-[10px] block eina-font-sb03 text-[#666666]">
							Hint
						</label>
						<input
							value={''}
							placeholder={'Hint'}
							className="select-basic-style border border-gray-160 w-full block outline-none"
						/>
					</div>
					<div className="mb-[30px]">
						<label className="text-[16px] mb-[10px] block eina-font-sb03 text-[#666666]">
							Text
						</label>
						<input
							value={''}
							placeholder={'text'}
							className="select-basic-style border border-gray-160 w-full block outline-none"
						/>
					</div>
					<div className="mb-[30px]">
						<label className="text-[16px] mb-[10px] block eina-font-sb03 text-[#666666]">
							Text alignment
						</label>
						<SelectBasic
							value={textAlignment}
							options={[
								{
									name: 'center',
									value: 'center',
								},
								{
									name: 'left',
									value: 'left',
								},
								{
									name: 'right',
									value: 'right',
								},
							]}
							handleChange={(e: any) => setTextAlignment(e.target.value)}
							placeholder={'Text align'}
							// error={genderError ? true : false}
							// helpText={genderError}
						/>
					</div>
					<div className="mb-[30px]">
						<label className="text-[16px] mb-[10px] block eina-font-sb03 text-[#666666]">
							Text Color
						</label>
						<SelectBasic
							value={textColor}
							options={[
								{
									name: '#FF0000',
									value: '#FF0000',
								},
								{
									name: '#FF0000',
									value: '#FF0000',
								},
								{
									name: '#FF0000s',
									value: '#FF0000s',
								},
							]}
							handleChange={(e: any) => setTextColor(e.target.value)}
							placeholder={'text color'}
							// error={genderError ? true : false}
							// helpText={genderError}
						/>
						<CheckboxFields
							size="small"
							color="secondary"
							mainClass="-ml-2 items-start pr-20 pl-5 mt-5"
							// containerClass={` ${value1Class}`}
							labelClass={`text-base 2xl:text-xl tracking-tight leading-7 text-gray-600 `}
							checked={false}
							name="Visible"
							value="Visible"
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default UserAppPasswordText;
