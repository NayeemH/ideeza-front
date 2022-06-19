import React, { useState } from 'react';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { FiSettings } from 'react-icons/fi';
import Button from '@atoms/button';
import Input from '@atoms/input';
import IconLabel from '@molecules/icon-label';
import { useRouter } from 'next/router';
import { IoCubeOutline, IoLogoElectron } from 'react-icons/io5';
import { BsCodeSlash } from 'react-icons/bs';
import Label from '@atoms/label';
import { RiPencilFill } from 'react-icons/ri';
import { ImCheckmark } from 'react-icons/im';
import Typography from '@mui/material/Typography';
// import { useFetch } from "../../../app/api";
// import { toast } from "react-toastify";

const ProjectEditHeader: React.FC<any> = ({
	inputClass,
	handleActiveView,
	view,
	name,
	onChangeName,
	nameEditDisabled,
	// projectData,
	// projectId,
	// onReloadProject,
}) => {
	const history = useRouter();
	const [nameEditing, setNameEditing] = useState(false);

	// const updateProjectStatus = async (visible: boolean) => {
	//   try {
	//     await useFetch.patch(`project/${projectId}/`, {
	//       is_visible: visible,
	//     });

	//     if (typeof onReloadProject === "function") {
	//       onReloadProject();
	//     }
	//     toast.dismiss();
	//     toast.success(`Project is ${visible ? "public" : "private"} now`);
	//   } catch (error: any) {
	//     toast.error(error.message);
	//   }
	// };

	return (
		<>
			<div className="flex justify-between">
				<Button
					value="Go back"
					classes={{
						root: 'bg-primary text-[16px] font-semibold text-white transform-none font-medium tracking-tight font-sans px-5 py-2 rounded shadow-none hover:shadow-none',
					}}
					iconStart={<FaArrowCircleLeft className="text-lg" />}
					onClick={() => {
						history.back();
					}}
					color="primary"
				/>

				{/* <Button
          onClick={() => {
            if (projectData !== null) {
              updateProjectStatus(!projectData?.is_visible);
            }
          }}
          value={`Turn it to ${
            projectData !== null && projectData?.is_visible
              ? "private"
              : "public"
          }`}
          variant="outlined"
          classes={{
            root: "font-hel text-[16px] text-gray-600 bg-gray-100 font-normal py-2 px-6 tracking-tight transform-none",
            outlined: "border-gray-600",
          }}
        /> */}
			</div>
			<div className="pt-4">
				<div className="flex items-center justify-between flex-wrap mb-1">
					{/* <input
						value={name}
						onChange={onChangeName}
						placeholder={'Project Name'}
						className="bg-transparent text-primary text-[20px]"
					/> */}
					{!nameEditing ? (
						<>
							<div className="flex items-center">
								<Label
									value={
										<div
											style={{
												overflow: 'hidden',
												textOverflow: 'ellipsis',
												width: 400,
											}}
										>
											<Typography
												style={{ fontSize: 30, fontWeight: 'bold' }}
												noWrap
											>
												{name}
											</Typography>
										</div>
									}
									onChange={onChangeName}
									className="text-primary text-xl 2xl:text-[32px] font-proxima-nova font-semibold"
								/>
								{!nameEditDisabled && (
									<RiPencilFill
										className="text-3xl text-primary ml-2 cursor-pointer"
										onClick={() => setNameEditing(!nameEditing)}
									/>
								)}
							</div>
						</>
					) : (
						<div className="flex items-center">
							<input
								className="focus:outline-none pl-2 rounded-[10px] text-xl 2xl:text-[32px] font-proxima-nova font-semibold w-[70%] border py-2"
								value={name}
								onChange={onChangeName}
							/>

							<ImCheckmark
								className="text-3xl text-primary ml-2 cursor-pointer"
								onClick={() => setNameEditing(!nameEditing)}
							/>
						</div>
					)}

					<div className="grid md:flex grid-cols-3 md:ml-10 -ml-2">
						<Input
							placeholder="Type project name here..."
							name="text"
							className={{
								root: `text-sm tracking-tight font-sans md:w-48 text-gray-700 px-0 rounded border border-solid border-gray-160 ${inputClass}`,
							}}
							position="start"
						/>
						<IconLabel
							mainClass="flex items-center mr-1 md:mr-3 bg-tranparent"
							labelContent="Electronic"
							onClick={handleActiveView.bind(this, 'electronic')}
							labelIconContaniter={`text-[20px] font-proxima-nova tracking-tight gap-1 w-[120px] h-8 items-center justify-center ${
								view === 'electronic'
									? 'text-primary'
									: 'text-gray-700 hover:text-primary'
							}  cursor-pointer`}
							iconContent={
								<IoLogoElectron className="text-[25px]" />
								// <img
								// 	src="/images/icon/logo-electron.svg"
								// 	width="15px"
								// 	alt="icon"
								// />
							}
							isLabelIconContaniner={true}
							tooltipProps={{ open: false }}
							iconContanerClass="bg-transparent flex items-center justify-center text-3xl rounded-full w-8 h-8"
						/>
						<IconLabel
							mainClass="flex items-center mr-1 md:mr-3 bg-tranparent"
							labelContent="Code"
							onClick={handleActiveView.bind(this, 'code')}
							labelIconContaniter={`text-[20px] font-proxima-nova tracking-tight gap-1 w-[120px] h-8 items-center justify-center ${
								view === 'code'
									? 'text-primary'
									: 'text-gray-700 hover:text-primary'
							}  cursor-pointer`}
							iconContent={
								<BsCodeSlash className="text-[25px]" />
								// <img
								//   src="/images/icon/logo-electron.svg"
								//   width="15px"
								//   alt="icon"
								// />
							}
							isLabelIconContaniner={true}
							tooltipProps={{ open: false }}
							iconContanerClass="bg-transparent flex items-center justify-center text-3xl rounded-full w-8 h-8"
						/>
						<IconLabel
							mainClass="flex items-center md:mr-3 bg-tranparent"
							labelContent="Cover"
							onClick={handleActiveView.bind(this, 'cover')}
							labelIconContaniter={`text-[20px] font-proxima-nova tracking-tight gap-1 w-[120px] h-8 items-center justify-center ${
								view === 'cover'
									? 'text-primary w-[140px] h-8'
									: 'text-gray-700 hover:text-primary w-[140px] h-8'
							}  cursor-pointer`}
							iconContent={
								<IoCubeOutline className="text-[25px]" />
								// <img
								//   src="/images/icon/logo-electron.svg"
								//   width="15px"
								//   alt="icon"
								// />
							}
							isLabelIconContaniner={true}
							tooltipProps={{ open: false }}
							iconContanerClass="bg-transparent flex items-center justify-center text-3xl rounded-full w-8 h-8"
						/>
						<IconLabel
							mainClass="flex items-center md:mr-3 bg-tranparent"
							labelContent="General"
							onClick={handleActiveView.bind(this, 'general')}
							labelIconContaniter={`text-[20px] font-proxima-nova tracking-tight gap-1 w-[120px] h-8 items-center justify-center ${
								view === 'general'
									? 'text-primary'
									: 'text-gray-700 hover:text-primary'
							}  cursor-pointer`}
							iconContent={
								<FiSettings className="text-[25px]" />
								// <img
								//   src="/images/icon/logo-electron.svg"
								//   width="15px"
								//   alt="icon"
								// />
							}
							isLabelIconContaniner={true}
							tooltipProps={{ open: false }}
							iconContanerClass="bg-transparent flex items-center justify-center text-3xl rounded-full w-8 h-8"
						/>

						{/* <IconLabel
              labelValue="App"
              onClick={handleActiveView.bind(this, "app")}
              lableClass={{
                root: `text-[16px] tracking-tight ${
                  view === "app"
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }  cursor-pointer`,
              }}
              iconComponent={
                <img
                  src="/images/icon/ionic-ios-apps.svg"
                  alt="icon"
                  width="15px"
                />
              }
              tooltipProps={{ open: false }}
            />
            <IconLabe
			mainClass = 'flex items-center mr-3 bg-tranparent'l
              labelValue="Network"
              onClick={handleActiveView.bind(this, "network")}
              lableClass={{
                root: `text-[16px] tracking-tight ${
                  view === "network"
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }  cursor-pointer`,
              }}
              iconComponent={
                <img
                  src="/images/icon/ionic-ios-cellular.svg"
                  alt="icon"
                  width="15px"
                />
              }
              tooltipProps={{ open: false }}
            /> */}
					</div>
				</div>
				<hr className="md:w-full my-6 mb-8 border-gray-750" />
			</div>
		</>
	);
};
ProjectEditHeader.defaultProps = {
	ProjectName: 'Anonymous Project',
};
export default ProjectEditHeader;
