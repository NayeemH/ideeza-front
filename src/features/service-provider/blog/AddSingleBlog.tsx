import React, { useState } from 'react';
import Label from '@atoms/label';
import { useForm } from 'react-hook-form';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import { IoClose } from 'react-icons/io5';
import UploadField from '@molecules/upload-field';
import Button from '@atoms/button';
import TextEditor from '@organisms/editor/TextEditor';
import { FORMINPUT } from 'utils/styles';
import { useAppDispatch } from 'app/hooks';
import { previewData } from '@features/technician/blog/reducer';
import { useRouter } from 'next/router';

const CATEGORY = [
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
];

const AddSingleBlog = () => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const [preview, setPreview] = useState<any>({});
	const { register, setValue, handleSubmit } = useForm();
	const handlerSubmit = () => {
		('');
	};
	const handlePreview = () => {
		dispatch(previewData({ ...preview }));
		// router.push("/technician/dashboard/blog/preview");
	};
	return (
		<>
			<Label
				value="Add Article"
				classes={{
					root: 'text-primary pt-4 text-2xl font-sans tracking-tight font-bold',
				}}
			/>
			<form onSubmit={handleSubmit(handlerSubmit)}>
				<div className="grid lg:grid-cols-6 md:grid-cols-5 grid-cols-1 lg:gap-10 md:gap-6 md:gap-y-8 gap-y-5 mt-4">
					<div className="md:col-span-2 w-full bg-white p-5 space-y-4 rounded-lg shadow-md">
						<label>
							<span className="mb-1 font-semibold block">Name</span>
							<input
								{...register('title', { required: 'Title Is Required' })}
								// value={perviewData?.title}
								// defaultValue={perviewData?.title}
								// onChange={(e) =>
								//   setPreview({ ...preview, title: e.target.value })
								// }
								className={FORMINPUT}
								placeholder="Name"
							/>
						</label>
						<CustomDropDownMenu
							labelValue="Category"
							selectOptions={CATEGORY}
							labelWrapperClass="text-left w-full"
							inputClasses="h-10 rounded-sm ml-5 w-full text-gray-200 font-bold font-sans  text-xl cursor-pointer"
							labelBtnClasses="inline-flex w-full rounded-md shadow-sm py-2 text-sm font-medium focus:outline-none text-gray-700"
							labelClasses="w-full font-sans text-gray-700 pb-2"
							dropDownClasses="origin-top-right w-96  mt-2 rounded-md border bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm	-mt-2 article-categories"
							//   change={handleCategory}
							//   selectedValue={perviewData?.category}
							// extraBtn={extraBtn}
						/>

						<UploadField
							inputMainClass="flex justify-between w-full h-12"
							// ref={...register("image", { required: "Image Is Compulsory" })}
							// error={errors}
							name="image"
							defaultValue="Image"
							placeholder="No file choosen"
							btnValue="Choose"
							labelValue="Something.png"
							// add={addAttachment}
							//   deleted={deleteAttachment}
							iconComponent={
								<IoClose className="text-primary cursor-pointer text-3xl mr-2 -ml-2" />
							}
							//   attachment={attachment}
						/>
					</div>
					<div className="lg:col-span-4 col-span-3 bg-white p-5 rounded-lg shadow-md">
						<Label
							value="Description"
							classes={{
								root: 'text-base 2xl:text-xl pb-6 text-black-100 font-sans font-bold tracking-wider',
							}}
						/>
						<TextEditor
							defaultValue={'type your description here'}
							//   perviewData?.description ||
							action={(text) => {
								setValue('description', text === '<p><br></p>' ? '' : text, {
									shouldValidate: true,
								});
								setPreview({ ...preview, description: text });
							}}
						/>
					</div>
				</div>
				<div className="bg-white p-5 rounded-lg shadow-md md:mt-7 mt-5 py-7 flex justify-end md:space-x-6 space-x-3">
					<Button
						className="shadow-none text-base 2xl:text-xl1 py-2 font-sans font-semibold capitalize px-6 bg-primary"
						// loading={loading}
						value="Publish"
						type="submit"
						color="primary"
						variant="contained"
					/>
					<Button
						// type="submit"
						variant="outlined"
						color="secondary"
						className="capitalize px-6 text-base 2xl:text-xl1 py-2 font-sans"
						value="Preview"
						// onClick={handlePreview}
						onClick={() => router.push(`/service-provider/blog/${1}`)}
					/>
				</div>
			</form>
		</>
	);
};

export default AddSingleBlog;
