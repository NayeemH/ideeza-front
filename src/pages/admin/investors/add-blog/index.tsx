import Button from '@atoms/button';
import Label from '@atoms/label';
import AdminLayout from '@layouts/private/template/admin';
import CustomSelect from '@molecules/custom-select';
import TextEditor from '@organisms/editor/TextEditor';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FORMINPUT } from 'utils/styles';

const InvestorsAddBlog = () => {
	const [attachment, setAttachment] = useState<any>([]);
	const [preview, setPreview] = useState<any>({});
	const router = useRouter();
	const { register, setValue, handleSubmit } = useForm();

	// const editor = useRef(null);
	const addAttachment = (e: any) => {
		if (e) {
			const data = attachment;
			data.push(e);
			return setAttachment(data);
		}
		return;
	};
	// const deleteAttachment = (e: any) =>
	//   setAttachment((state: any) => state.filter((v: any, k: any) => k !== e));

	// const handleCategory = (val: any) => {
	//   setCategory(val);
	// };

	const handlerSubmit = async (data: any) => {
		if (data) {
			const formData = new FormData();
			//   formData.append("user", userId);
			formData.append('title', data?.title);
			//   formData.append("categories", [data?.categories]);
			formData.append('status', 'pending');
			//   formData.append("description", editor?.current?.editor());
			if (typeof attachment[0] !== 'undefined') {
				formData.append('image', attachment[0]);
			}
			// return dispatch(createBlogPostAsync(formData));
		}
	};
	const handlePreview = () => {
		//   dispatch(previewData({ ...preview, attachment, category }));
		router.push('/admin/investors/blog-preview');
	};
	return (
		<AdminLayout>
			<>
				<Label
					value="Add Blog"
					classes={{
						root: 'text-primary pt-4 md:text-md 2xl:text-xl tracking-tight font-sans font-bold',
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
									//   defaultValue={perviewData?.title}
									onChange={(e) =>
										setPreview({ ...preview, title: e.target.value })
									}
									className={FORMINPUT}
									placeholder="Name"
								/>
							</label>
							<CustomSelect
								options={[
									{ name: 'code', value: 'code' },
									{ name: 'cover', value: 'cover' },
								]}
							/>

							<input
								type="file"
								onChange={(e) => addAttachment(e)}
								// className="bg-gray-600 text-white"
								name=""
								id=""
							/>

							{/* <UploadField
              inputMainClass="flex justify-between w-full h-12"
              // ref={...register("image", { required: "Image Is Compulsory" })}
              // error={errors}
              name="image"
              defaultValue="Image"
              placeholder="No file choosen"
              btnValue="Choose"
              labelValue="Something.png"
              add={addAttachment}
              deleted={deleteAttachment}
              iconComponent={
                <IoClose className="text-primary cursor-pointer text-3xl mr-2 -ml-2" />
              }
              attachment={attachment}
            /> */}
						</div>
						<div className="lg:col-span-4 col-span-3 bg-white p-5 rounded-lg shadow-md">
							<Label
								value="Description"
								classes={{
									root: 'text-base 2xl:text-xl pb-6 text-black-100 font-sans font-bold tracking-wider',
								}}
							/>
							<TextEditor
								placeholder={'Type your description here...'}
								defaultValue={'Write from here....'}
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
							//   loading={loading}
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
							onClick={handlePreview}
						/>
					</div>
				</form>
			</>
		</AdminLayout>
	);
};

export default InvestorsAddBlog;
