import React, { useState } from 'react';
import Modal from '@atoms/modal';
import CreateProjectInput from '@molecules/create-project-input';
import { useRouter } from 'next/router';

function CreateNewIdeezaProject(props: any) {
	const router = useRouter();
	const { open, close, buttonCustomUrl, buttonCustomText } = props;
	const [search, setSearch] = useState('');

	const handleSubmition = (e: any) => {
		if (e.key === 'Enter') {
			//   dispatch(searchProject(search));
			router.push(`/user/dashboard/search-result?query=${search}`);
			close();
		}
	};

	const onChangeSearch = (e: any) => {
		e.preventDefault();
		setSearch(e.target.value);
	};

	return (
		<div className="">
			<Modal
				width="md"
				close={close}
				className={{
					paper: 'rounded-lg md:px-[30px] p-4 py-0 md:pt-[20px] custom-create-modal 2xl:w-[785px] relative overflow-visible',
				}}
				content={
					<>
						<CreateProjectInput
							defaultValue={search}
							onChange={onChangeSearch}
							handleSearchProject={handleSubmition}
							buttonCustomUrl={buttonCustomUrl}
							buttonCustomText={buttonCustomText}
						/>
						<div className=" absolute custom-top-icon-creat bottom-[-25%] left-[75%] xl:left-[48%] 2xl:left-[40%] ">
							<img
								src="/images/logo/my-ideeza-create-logo.svg"
								alt=""
							/>
						</div>
						<div className="absolute custom-btm-icon-create top-[-10%] left-[-5%]">
							<img
								src="/images/logo/create-project-top-icon.svg"
								alt=""
							/>
						</div>
					</>

					// <form
					//   onSubmit={(e) => handleSubmition(e)}
					//   className="w-full flex flex-col p-4"
					// >
					// {/* <> */}
					//   <TextField
					//     mainClass="flex-col "
					//     placeholder="Start Now - Type your idea here..."
					//     labelClasses="font-sans text-base mb-1 tracking-tight"
					//     sendButtonHandler={()=> {}}
					//     onChange={(e) => setSearch(e.target.value)}
					//     inputClasses=" border-2 px-2 border-purple-500 shadow-md py-1"
					//   />
					//   <div className="md:flex space-x-1">
					//     <Button
					//       value="Click here to design new project by yourself!"
					//       onClick={() => dispatch(handleMySelfProject())}
					//       type="submit"
					//       classes={{
					//         root: `text-purple-500 text-lg bg-white p-2 tracking-tight border-none shadow-none normal-case font-sans md:w-full`,
					//       }}
					//     />
					//   </div>
					//  </form>
				}
				actions={<></>}
				open={open}
			/>
		</div>
	);
}

export default React.memo(CreateNewIdeezaProject);
