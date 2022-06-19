// import Button from "@atoms/button";
// import CustomBlockly from "@organisms/blockly/index";
// import CreateProjectPopup from "@organisms/create-project-popup";
// import GeneralView from "@organisms/product-detail/general-view";
import Button from '@atoms/button';
import Label from '@atoms/label';
import SelectBasic from '@molecules/select-basic';
import TabsMoleculeApp from '@molecules/tabs-project-app';
// import ProductHeader from "@organisms/product-header";
// import { useAppSelector } from "app/hooks";
import React, { useState } from 'react';
import { BsSquareFill } from 'react-icons/bs';
import { IoGridSharp, IoInformationOutline } from 'react-icons/io5';
import { MdDelete } from 'react-icons/md';
// import { toast } from "react-toastify";

const AppMiddleBar = (props: any) => {
	const [index, setIndex] = useState(0);
	const [isDesign, setIsDesign] = useState(true);
	const [isCode, setIsCode] = useState(false);
	const { isAppSettings, isAppMain } = props;
	const [androidVersion, setAndroidVersion] = useState<string>('');
	const [iosVersion, setIosVersion] = useState<string>('');
	// const [activeView, setActiveView] = useState("code");

	// const [openPopup, setOpenPopup] = useState(false);
	// const states = useAppSelector(
	//   (ProjectDetail: any) => ProjectDetail?.projectDetail
	// );

	// const [blocklyCodeString, setBlocklyCodeString] = useState("");

	// const handleActiveView = (e: any) => setActiveView(e);
	// const togglePublicPrivate = (e: any) => {};
	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setIndex(newValue);
	};

	// const handler = (e: any) => {
	//   toast.success("Project Created Successfully!");
	// };
	return (
		<>
			<div>
				<div className="pl-8 pb-5">
					<div className="pt-[40px] pb-[40px]">
						<Label
							value="App inventor"
							className="text-[#666666] texl-lg 2xl:text-[24px] font-semibold font-sans tracking-tight"
						/>
					</div>
					<hr />
				</div>

				<div className={isAppMain ? 'block custom-project-app-tabs relative' : 'hidden'}>
					<div className={isDesign ? 'block' : 'hidden'}>
						<TabsMoleculeApp
							tabsClasses="2xl:w-1/5 xl:w-2/5 lg:w-2/6 md:w-1/2"
							tabClasses=" text-base 2xl:text-xl eina-font-sb03 tracking-tight transform-none text-gray-600 focus:text-primary"
							indicatorColor="primary"
							handleChange={handleChange}
							index={index}
							tabsData={[
								{
									name: (
										<div className="flex items-center">
											<BsSquareFill />
											<h5 className="ml-2">Single screen view</h5>
										</div>
									),
									component: (
										<>
											<div className="p-5">Single Screen</div>
										</>
									),
								},
								{
									name: (
										<div className="flex items-center">
											<IoGridSharp />
											<h5 className="ml-2">Multiple screens view</h5>
										</div>
									),
									component: <div className="p-5">Multiple Screen</div>,
								},
							]}
						/>
					</div>
					<div className={isCode ? 'block' : 'hidden'}>
						<div className="pt-14 pl-8">Code</div>
					</div>
					<div className="right-app-tabs absolute right-5 top-0">
						<div className="flex gap-3">
							<Button
								onClick={() => {
									setIsDesign(true);
									setIsCode(false);
								}}
								value="Design"
								className="text-gray-500 shadow-none border border-solid text-base 2xl:text-xl rounded-none focus:bg-primary hover:bg-primary hover:text-white focus:text-white hover:border-primary focus:border-primary hover:shadow-none focus:shadow-none capitalize px-16 py-4"
								color="inherit"
							/>
							<Button
								onClick={() => {
									setIsCode(true);
									setIsDesign(false);
								}}
								value="Code"
								className="text-gray-500 shadow-none border border-solid text-base 2xl:text-xl rounded-none focus:bg-primary hover:bg-primary hover:text-white focus:text-white hover:border-primary focus:border-primary hover:shadow-none focus:shadow-none capitalize px-16 py-4"
								color="inherit"
							/>
						</div>
						{/* <TabsMoleculeApp
              tabsClasses="2xl:w-1/5 xl:w-2/5 lg:w-2/6 md:w-1/2"
              tabClasses=" text-base 2xl:text-xl eina-font-sb03 tracking-tight transform-none text-gray-600 focus:bg-primary focus:text-white border border-solid mr-2 border-gray-700 bg-white p-0"
              indicatorColor="primary"
              handleChange={rightHandleChange}
              index={rightIndex}
              tabsData={[
                {
                  name: <h5 className="py-[12px] px-[16px] w-full h-full" onClick={() => setIsVisible(prev=> !prev)}>Design</h5>,
                  component: (
                    <>
                     
                    </>
                  ),
                },
                {
                  name: <h5 className="py-[12px] px-[16px] w-full h-full" onClick={() => setIsVisible(false)}>Code</h5>,
                  component: (
                    // <div className="mt-5 md:pr-16 pr-4 h-100vh pb-3 overflow-y-auto overflow-x-auto">
                    <div className="w-full">sssss</div>
                    // </div>
                  ),
                },
              ]}
            /> */}
					</div>
				</div>
				<div className={isAppSettings ? 'block' : 'hidden'}>
					<div className="w-4/5 m-auto">
						<div className="flex items-center mb-[25px]">
							<IoInformationOutline className="text-5xl bg-white text-primary p-2 shadow-md rounded-full" />
							<h5 className="text-[20px] text-[#666666] font-semibold ml-2">
								Application settings
							</h5>
						</div>
						<div className="bg-white p-5 shadow-lg flex gap-12">
							<div className="w-1/2">
								<div className="mb-[30px]">
									<label className="text-[16px] mb-[10px] block eina-font-sb03 text-[#666666]">
										App Name
									</label>
									<input
										value={''}
										placeholder={'App name'}
										className="select-basic-style border border-[#D2D2D2] w-full block outline-none"
									/>
								</div>
								<div className="mb-[30px]">
									<label className="text-[16px] block eina-font-sb03 text-[#666666]">
										App Icon
										<span className="select-basic-style border border-[#D2D2D2] w-full block mt-[10px] cursor-pointer">
											<span className="bg-primary text-white py-2 px-3">
												Choose
											</span>
										</span>
										<input
											type="file"
											className="hidden"
										/>
									</label>
								</div>
								<div className="mb-[30px] border border-[#D2D2D2] h-[345px] flex items-center justify-center relative">
									<div>
										<img
											src="/images/appIcon.png"
											className="w-full"
											alt=""
										/>
									</div>
									<div className="absolute top-3 right-0">
										<div className="flex items-center cursor-pointer mr-3">
											<p className="text-[#666666] text-base">Remove</p>
											<MdDelete className="ml-2 text-[#666666] text-xl" />
										</div>
									</div>
								</div>
								<div className="flex gap-6">
									<Button
										// onClick={onClickApply}
										value="Save"
										className="text-white text-base 2xl:text-xl rounded-none border border-solid border-primary bg-primary capitalize px-10 py-3"
										color="primary"
									/>
									<Button
										// onClick={onClickApply}
										value="Discord"
										className="text-[#666666] text-base 2xl:text-xl border border-solid border-gray-500 shadow-none rounded-none bg-white capitalize px-8 py-3"
										color="inherit"
									/>
								</div>
							</div>
							<div className="w-1/2">
								<div className="mb-[30px]">
									<label className="text-[16px] mb-[10px] block eina-font-sb03 text-[#666666]">
										Author name
									</label>
									<input
										value={''}
										placeholder={'Author name'}
										className="select-basic-style border border-[#D2D2D2] w-full block outline-none"
									/>
								</div>
								<div className="mb-[30px]">
									<label className="text-[16px] mb-[10px] block eina-font-sb03 text-[#666666]">
										Date of creation
									</label>
									<input
										value={''}
										placeholder={'Date of creation'}
										className="select-basic-style border border-[#D2D2D2] w-full block outline-none"
									/>
								</div>
								<div className="mb-[30px]">
									<label className="text-[16px] mb-[10px] block eina-font-sb03 text-[#666666]">
										Android version
									</label>
									<SelectBasic
										value={androidVersion}
										options={[
											{
												name: 'Lolipop 2.0.0',
												value: 'Lolipop 2.0.0',
											},
											{
												name: 'Oxyzen 11.0.2',
												value: 'Oxyzen 11.0.2',
											},
											{
												name: 'Others',
												value: 'Others',
											},
										]}
										handleChange={(e: any) => setAndroidVersion(e.target.value)}
										placeholder={'Select Version'}
										// error={genderError ? true : false}
										// helpText={genderError}
										selectClasses="border border-[#D2D2D2] w-full text-lg 2xl:text-xl text-[#A6A7A9]"
									/>
								</div>
								<div className="mb-[30px]">
									<label className="text-[16px] mb-[10px] block eina-font-sb03 text-[#666666]">
										IOS version
									</label>
									<SelectBasic
										value={iosVersion}
										options={[
											{
												name: 'Lolipop 2.0.0',
												value: 'Lolipop 2.0.0',
											},
											{
												name: 'Oxyzen 11.0.2',
												value: 'Oxyzen 11.0.2',
											},
											{
												name: 'Others',
												value: 'Others',
											},
										]}
										handleChange={(e: any) => setIosVersion(e.target.value)}
										placeholder={'Select Version'}
										selectClasses="border border-[#D2D2D2] w-full text-lg 2xl:text-xl text-[#A6A7A9]"
										// error={genderError ? true : false}
										// helpText={genderError}
									/>
								</div>

								<label className="text-[16px] block eina-font-sb03 text-[#666666]">
									<span className="select-basic-style bg-[#666666] text-base font-semibold text-center border border-[#D2D2D2] w-full block mt-[10px] cursor-pointer text-white">
										Choose your smartphone
									</span>
									<input
										type="file"
										className="hidden"
									/>
								</label>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default AppMiddleBar;
