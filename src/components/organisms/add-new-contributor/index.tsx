import Button from '@atoms/button';
import Label from '@atoms/label';
import ReactSelect from '@atoms/select';
import React, { useState } from 'react';

function AddNewContributor() {
	//   const { open, toggleOpen, project, handler, users } = props;
	const [user, setUser] = useState(false);
	const toggleUser = () => setUser(!user);
	//   const addAsign = (e: any) => {
	//     let find = assign.find((v) => v.id === e.id);
	//     if (!find) {
	//       let data = assign;
	//       data.push(e);
	//       setAssign(data);
	//     }
	//     return toggleUser();
	//   };
	//   const [assign, setAssign] = useState([]);
	return (
		<>
			{/* <SearchPopup
        add={addAsign}
        open={user}
        user={users}
        toggle={toggleUser}
        value="Add New Contributor"
        placeholder="Contributor"
      /> */}
			<Label
				onClick={toggleUser}
				value="Assign a new contributor"
				classes={{
					root: 'text-[#333333] text-base 2xl:text-xl tracking-tight font-semibold  pb-4',
				}}
			/>
			<div className="md:space-x-3 items-center mb-3 mt-7">
				<div className="flex items-center gap-4 w-full">
					<input
						placeholder="Type email"
						className="text-gray-900 text-base 2xl:text-xl tracking-tight  flex items-center pl-3  focus:outline-none  -mr-5 placeholder-gray-300::placeholder	 w-full rounded-l-md rounded-r-none border border-gray-160 h-[2.25rem]"
					/>
					{/* <Label
            onClick={toggleUser}
            value="Type email"
            classes={{
              root: "text-gray-900 text-base 2xl:text-xl eina-font-r03 tracking-tight  flex items-center pl-3 cursor-pointer h-9 w-full rounded-l-md rounded-r-none border border-gray-160",
            }}
          /> */}
					<div className="ml-2">
						<ReactSelect
							placeholder="Editor"
							containerclass=" h-[2.28rem] py-0 w-26 text-gray-600 border border-gray-160 overflow-hidden"
							inputclass=" 2xl:text-xl eina-font-r03 tracking-tight p-1 py-0 px-2"
							options={[{ value: 'Editor', name: 'Owner' }]}
						/>
					</div>

					<ReactSelect
						placeholder="Car"
						containerclass="h-[2.28rem] w-26 text-gray-600 border border-gray-160 overflow-hidden"
						inputclass=" 2xl:text-xl eina-font-r03 tracking-tight p-1 px-2"
						options={[{ value: 'Some', name: 'Some' }]}
					/>
					<Button
						value="Add"
						className={
							'bg-primary capitalize eina-font-sb03 text-base 2xl:text-xl text-white md:px-9 px-6'
						}
						color="primary"
						// classes={{
						//   root: "",
						// }}
					/>
				</div>
				<Label
					value="Can send messages and publish as the Page, respond to and delete comments on the Page, see which admin created a post or comment, view insights, respond to and delete comments from the Page and edit details of page."
					classes={{
						root: `pb-3 `,
					}}
					className="text-[#333333] text-base  mt-[30px] leading-5"
					style={{ marginLeft: '0px !important' }}
				/>
			</div>
		</>
	);
}

export default AddNewContributor;
