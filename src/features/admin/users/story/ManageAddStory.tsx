import Button from '@atoms/button';
import Label from '@atoms/label';
import AdminCustomSelect from '@molecules/custom-select-admin';
import TextEditor from '@organisms/editor/TextEditor';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FORMINPUT } from 'utils/styles';
import PreviewStory from '@features/admin/users/story/PreviewStory';
import { Avatar } from '@mui/material';
import { apiService } from 'utils/request';
import { toast } from 'react-toastify';

const ManageAddStory = () => {
	// const inputFileRef = useRef(null);
	// const [attachment, setAttachment] = useState<any>([]);
	const [loading, setLoading] = useState(false);
	const [preview, setPreview] = useState<any>({});
	const [category, setCategory] = useState<string | null>(null);
	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');
	const [status, setStatus] = useState('Pending');
	const [ImageFile, setImageFile] = useState('');
	const [showImage, setShowImage] = useState('');
	const [customName, setCustomName] = useState<string | null>(null);
	// const [customStatus, setCustomStatus] = useState<string | null>(null);
	const router = useRouter();
	const [previewOpen, setPreviewOpen] = useState(false);
	const { register, setValue, handleSubmit } = useForm();

	useEffect(() => {
		setPreview({ ...preview, title: title });
	}, [title]);

	const handleReset = () => {
		setCategory(null);
		setStatus('Pending');
		setTitle('');
		setDescription('');
		setImageFile('');
		setCustomName(null);
	};

	const handlerSubmit = async (data: any) => {
		if (data) {
			// console.log(data);
			if (!category) {
				toast.warn("Don't forget to select a category!");
				return;
			}
			if (!data?.description) {
				toast.warn('You may want to add description of your blog.');
				return;
			}
			const formData = new FormData();
			formData.append('updated_at', new Date().toString());
			formData.append('created_at', new Date().toString());
			if (category) formData.append('category', category);
			formData.append('status', status);
			formData.append('title', data?.title);
			formData.append('description', data?.description);
			formData.append('coverFile', ImageFile);

			// handleSubmitStory();
			setLoading(true);
			await apiService(
				{
					method: 'post',
					url: `/core/success-story/`,
					token: true,
					data: formData,
				},
				(res: any, error: any) => {
					if (res) {
						setLoading(false);
						toast.dismiss();
						toast.success('posted successfully');
						router.replace('/admin/users/marketing/success-story');
						return;
					}
					if (error) {
						toast.error('Creating Story Failed');
						setLoading(false);
					}
				}
			);
			//   formData.append("description", editor?.current?.editor());
			// if (typeof attachment[0] !== 'undefined') {
			// 	formData.append('image', attachment[0]);
			// }
			// console.log(ImageFile);
			// return dispatch(createBlogPostAsync(formData));
		}
	};
	const handlePreview = () => {
		setPreviewOpen((prev) => !prev);
	};

	const handleImageFile = (e: any) => {
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = () => {
			// console.log("readerResult: ", typeof reader.result);
			if (typeof reader.result === 'string') {
				setShowImage(reader.result);
			}
		};
		setImageFile(e.target.files[0]);
	};

	// const urltoFile = (url: any, filename: any, mimeType: any) => {
	//     return (fetch(url)
	//         .then(function (res) { return res.arrayBuffer(); })
	//         .then(function (buf) { return new File([buf], filename, { type: mimeType }); })
	//     );
	// }

	return (
		<div>
			<div className={previewOpen ? 'opacity-0 h-0 w-0' : 'opacity-100 z-10'}>
				<Label
					value="Add Story"
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
									value={title}
									onChange={
										(e: any) => setTitle(e.target.value)
										// setPreview({...preview, name: e.target.value })
									}
									className={FORMINPUT}
									placeholder="Name"
								/>
							</label>
							<label>
								<span className="mb-1 font-semibold block">Category</span>
								<AdminCustomSelect
									placeholder="Choose Category"
									options={[
										{ name: 'Code', value: 'Code' },
										{ name: 'Cover', value: 'Cover' },
										{ name: 'Electronics', value: 'Electronics' },
										{ name: 'Parts', value: 'Parts' },
									]}
									onchangeSelect={(value: any) => setCategory(value)}
									customValue={customName}
								/>
							</label>
							<label>
								<span className="mb-1 font-semibold block">Image</span>
								<div className="flex">
									<input
										id="customUpload"
										type="file"
										// value={uploadedFile}
										// ref={inputFileRef}
										onChange={handleImageFile}
										className={FORMINPUT + ' mb-2'}
										placeholder="Select File"
									/>

									<Avatar
										alt=""
										src={showImage}
										className="mx-5"
									/>
								</div>
								{/* <input
									type="file"
									onChange={(e) => addAttachment(e)}
									// className="bg-gray-600 text-white"
									name=""
									id=""
								/> */}
							</label>
							{/* this is for edit page */}
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
								defaultValue={description}
								action={(text) => {
									setValue('description', text === '<p><br></p>' ? '' : text, {
										shouldValidate: true,
									});

									setDescription(text);
									// setPreview({ ...preview, description: text });
								}}
							/>
						</div>
					</div>
					<div className="bg-white p-5 rounded-lg shadow-md md:mt-7 mt-5 py-7 flex justify-end md:space-x-6 space-x-3">
						<Button
							className="shadow-none text-base 2xl:text-xl1 py-2 font-sans font-semibold capitalize px-6 bg-primary"
							loading={loading}
							value="Publish"
							type="submit"
							color="primary"
							variant="contained"
						/>
						<Button
							variant="outlined"
							color="secondary"
							className="capitalize px-6 text-base 2xl:text-xl1 py-2 font-sans"
							value="Preview"
							onClick={handlePreview}
						/>
					</div>
				</form>
			</div>
			<div className={!previewOpen ? 'opacity-0 h-0 w-0' : 'opacity-100 z-10'}>
				<Button
					variant="outlined"
					color="secondary"
					className="capitalize px-6 text-base 2xl:text-xl1 py-2 font-sans"
					value="Go Back"
					onClick={handlePreview}
				/>
				<Label
					value="Story Preview"
					classes={{
						root: 'text-primary pt-4 md:text-md 2xl:text-xl tracking-tight font-sans font-bold',
					}}
				/>
				<PreviewStory preview={{ title: title, description: description }} />
				{/* <div dangerouslySetInnerHTML={{ __html: preview.description }}></div> */}
			</div>
		</div>
	);
};

export default ManageAddStory;
