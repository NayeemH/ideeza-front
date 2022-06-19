import Button from '@atoms/button';
import React from 'react';
import { useRouter } from 'next/router';
import { toggleIdezzaModal } from '@features/user/reducer';
import { useDispatch } from 'react-redux';
// import { MdKeyboardVoice } from "react-icons/md";

const CreateProjectInput = (props: any) => {
	const {
		handleSearchProject,
		onChange,
		defaultValue,
		handleJoyRideApprove,
		buttonCustomUrl,
		buttonCustomText,
	} = props;
	const router = useRouter();

	const dispatch = useDispatch();
	const toggleIdeezaProject = () => dispatch(toggleIdezzaModal());

	// const handleSearchProject = (e) => {
	//   if (e.key === "Enter") {
	//     history.push("/user/dashboard/search-result");
	//   }
	// };

	return (
		<div className="relative">
			<div className="flex justify-end w-full mb-[15px]">
				{/* <MdKeyboardVoice className="text-[30px] text-[#B9B9B9] cursor-pointer" /> */}
			</div>

			<div className=" flex w-full border border-[#E6E6E6] rounded-lg">
				{/* <img
          src="/images/icon/ideeza-main-logo (1).png"
          className="border-r-4 border-[#5b1d82] pl-3 my-1"
          alt="ideeza-logo"
        /> */}

				<textarea
					rows={7}
					style={{ width: '100%' }}
					className="focus:outline-none pt-[20px] pl-[20px] md:placeholder-[#999999] text-[#333333] tracking-widest placeholder-opacity-100 font-proxima-nova text-[16px] bg-[#FBFBFB] resize-none"
					placeholder="Start now – type your idea here..."
					onKeyDown={handleSearchProject}
					onChange={onChange}
					defaultValue={defaultValue}
				/>
				{/* <img alt="upload" src="/images/icon/ideeza-main-logo (2).png" /> */}
			</div>
			<div className="flex space-x-1 w-full 2xl:w-[50%]">
				<Button
					value={
						buttonCustomText
							? buttonCustomText
							: 'Click here to design new project by yourself!'
					}
					onClick={() => {
						router.push(
							buttonCustomUrl ? buttonCustomUrl : '/user/dashboard/project/create'
						);
						!handleJoyRideApprove && toggleIdeezaProject();
						handleJoyRideApprove && handleJoyRideApprove();
					}}
					type="submit"
					className="text-primary text-[15px] bg-white p-2 tracking-tight border-none normal-case w-full font-proxima-nova font-[600] shadow-none"
					buttonText="w-full flex items-center justify-start"
				/>
			</div>
		</div>
	);
};
{
	/* <div className="md:flex space-x-1">
  <Button
	value="Click here to design new project by yourself!"
	onClick={() => dispatch(handleMySelfProject())}
	type="submit"
	classes={{
	  root: `text-purple-500 text-lg bg-white p-2 tracking-tight border-none shadow-none normal-case font-sans md:w-full`,
	}}
  />
</div>; */
}
export default CreateProjectInput;
