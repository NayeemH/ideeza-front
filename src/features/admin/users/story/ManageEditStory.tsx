import Button from '@atoms/button';
import Label from '@atoms/label';
// import CustomSelect from '@molecules/custom-select';
import AdminCustomSelect from '@molecules/custom-select-admin';
import TextEditor from '@organisms/editor/TextEditor';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FORMINPUT } from 'utils/styles';
import PreviewStory from '@features/admin/users/story/PreviewStory';
// import { Box } from '@mui/material';
// import { v1 as uuidv1 } from 'uuid';
// import StoryJsonData from './StoryJsonData.json';
import { Avatar } from '@mui/material';
import { apiService } from 'utils/request';
import { toast } from 'react-toastify';
import Loader from '@atoms/loader';

const ManageEditStory = () => {
	// const inputFileRef = useRef(null);
	// const [attachment, setAttachment] = useState<any>([]);
	const [loading, setLoading] = useState(true);
	const [preview, setPreview] = useState<any>({});
	const [id, setId] = useState('');
	const [updated_at, setUpdated_at] = useState(new Date().toString());
	const [created_at, setCreated_at] = useState(new Date().toString());
	const [category, setCategory] = useState<string | null>(null);
	const [description, setDescription] = useState('');
	const [title, setTitle] = useState('');
	const [status, setStatus] = useState('Pending');
	const [ImageFile, setImageFile] = useState('');
	const [showImage, setShowImage] = useState('');
	const [customName, setCustomName] = useState<string | null>(null);
	const [customStatus, setCustomStatus] = useState<string | null>(null);
	const router = useRouter();
	const [previewOpen, setPreviewOpen] = useState(false);
	const { register, setValue, handleSubmit } = useForm();
	// const [uploadedFile, setUploadedFile] = useState("");

	const story_id = router.query.id;

	useEffect(() => {
		if (story_id !== undefined) fetchStoryDetail();
	}, [story_id]);

	const fetchStoryDetail = async () => {
		setLoading(true);
		await apiService(
			{
				method: 'get',
				url: `/core/success-story/${story_id}`,
				token: true,
			},
			(res: any, error: any) => {
				if (res) {
					const { data } = res;
					setId(data?.id);
					setUpdated_at(data?.updated_at);
					setCreated_at(data?.created_at);
					setCategory(data?.category);
					setCustomName(data?.category);
					setStatus(data?.status);
					setCustomStatus(data?.status);
					setTitle(data?.title);
					setDescription(data?.description);
					setImageFile(data?.cover_file);
					if (data?.cover_file !== undefined) {
						setShowImage(URL.createObjectURL(data?.cover_file));
					}
				}
				if (error) {
					if (error?.response?.status === 404) {
						toast.dismiss();
						toast.warning('No blog found');
						router.push('/admin/users/marketing/success-story');
					}
				}
				setLoading(false);
			}
		);
	};

	// const fetchStoryDetail = () => {
	// 	setLoading(true);
	// 	if (story_id !== undefined) {
	// 		const storyDetail = StoryJsonData.find((data) => data.id === story_id);
	// 		if (storyDetail !== undefined) {
	// 			setId(storyDetail?.id);
	// 			setUpdated_at(storyDetail?.updated_at);
	// 			setCreated_at(storyDetail?.created_at);
	// 			setCategory(storyDetail?.category);
	// 			setCustomName(storyDetail?.category);
	// 			setStatus(storyDetail?.status);
	// 			setCustomStatus(storyDetail?.status);
	// 			setTitle(storyDetail?.title);
	// 			setDescription(storyDetail?.description);
	// 			setImageFile(storyDetail?.cover_file);
	//Usage example:
	// urltoFile(storyDetail.cover_file, 'uploadImage.jpeg', 'image/jpeg')
	//     .then(function (file) {
	//         // setUploadedFile(file);
	//         console.log(file);
	//         // inputFileRef.current.value = file;
	//         // document.getElementById('customUpload').files[0] = file;
	//     });
	// 		}
	// 	}
	// };

	useEffect(() => {
		setPreview({ ...preview, title: title });
	}, [title]);

	const ConfirmCreate = () => {
		// setStoryData(data);
		alert('Story is successfully added');
		handleReset();
		router.push('/admin/users/marketing/success-story');
		// setOpen(false);
	};

	const handleReset = () => {
		// setId(uuidv1().toString());
		setCategory(null);
		setStatus('Pending');
		setTitle('');
		setDescription('');
		setImageFile('');
		setCustomName(null);
	};

	// const editor = useRef(null);
	// const addAttachment = (e: any) => {
	// 	if (e) {
	// 		const data = attachment;
	// 		data.push(e);
	// 		return setAttachment(data);
	// 	}
	// 	return;
	// };
	// const deleteAttachment = (e: any) =>
	//   setAttachment((state: any) => state.filter((v: any, k: any) => k !== e));

	// const handleCategory = (val: any) => {
	//   setCategory(val);
	// };

	// const handleSubmitStory = () => {
	// const data = {
	// 	id: id,
	// 	updated_at: new Date().toString(),
	// 	created_at: new Date().toString(),
	// 	category: category,
	// 	status: status,
	// 	name: name,
	// 	description: description,
	// 	cover_file: ImageFile,
	// };
	// id && category && status && title && description && ImageFile
	// 	? ConfirmCreate()
	// 	: alert('Fill All the fields');
	// setAvatarData(data);
	// console.log("avatarData", data);
	// handleReset();
	// };

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
			//   formData.append("user", userId);
			formData.append('id', id);
			formData.append('updated_at', updated_at);
			formData.append('created_at', created_at);
			if (category) formData.append('category', category);
			formData.append('status', status);
			formData.append('title', data?.title);
			formData.append('description', data?.description);
			formData.append('coverFile', ImageFile);

			// handleSubmitStory();
			setLoading(true);
			await apiService(
				{
					method: 'put',
					url: `/core/success-story/`,
					token: true,
					data: formData,
				},
				(res: any) => {
					if (res) {
						setLoading(false);
						toast.dismiss();
						toast.success('Updated successfully');
						router.replace('/admin/users/marketing/success-story');
						return;
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
		//   dispatch(previewData({ ...preview, attachment, category }));
		// router.push('/admin/users/marketing/success-story/preview');
	};

	const handleImageFile = (e: any) => {
		// setUploadedFile(e.target.files[0]);
		const reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		// console.log(e.target.files[0]);
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
			{loading ? (
				<Loader />
			) : (
				<>
					<div className={previewOpen ? 'opacity-0 h-0 w-0' : 'opacity-100 z-10'}>
						<Label
							value="Edit Story"
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
											{...register('title', {
												required: 'Title Is Required',
											})}
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

									<label>
										<span className="mb-1 font-semibold block">
											Approve Status?
										</span>
										<AdminCustomSelect
											placeholder="Approve Status?"
											options={[
												{ name: 'Approved', value: 'Approved' },
												{ name: 'Pending', value: 'Pending' },
											]}
											onchangeSelect={(value: any) => setStatus(value)}
											customValue={customStatus}
										/>
									</label>

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
										defaultValue={description}
										action={(text) => {
											setValue(
												'description',
												text === '<p><br></p>' ? '' : text,
												{
													shouldValidate: true,
												}
											);

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
									// type="submit"
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
							// type="submit"
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
				</>
			)}
		</div>
	);
};

export default ManageEditStory;
