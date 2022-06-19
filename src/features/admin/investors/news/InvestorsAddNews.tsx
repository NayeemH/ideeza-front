import Button from '@atoms/button';
import Label from '@atoms/label';
// import { previewData } from '@features/technician/blog/reducer';
import CustomDropDownMenu from '@molecules/custom-dropdown';
// import CustomSelect from "@molecules/custom-select";
// import SelectBasic from "@molecules/select-basic";
import TextEditor from '@organisms/editor/TextEditor';
// import { useAppDispatch } from 'app/hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { RiDeleteBinLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import { apiService } from 'utils/request';
import { FORMINPUT } from 'utils/styles';
import Preview from './Preview';

const InvestorsAddNews = () => {
	// const dispatch = useAppDispatch();
	const [attachment, setAttachment] = useState<any>([]);
	const [preview, setPreview] = useState<any>({});
	const [showPreview, setShowPreview] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState<any>('');
	const [previousSelectedCategory, setPreviousSelectedCategory] = useState<any>();
	// const [img, setImg] = useState<any>('');
	const [selectedFileName, setSelectedFileName] = useState('');
	const [description, setDescription] = useState<string>('');
	const [category, setCategory] = useState<any>([]);
	const [loading, setLoading] = useState<any>(false);
	const router = useRouter();
	const { register, setValue, getValues, handleSubmit } = useForm();
	const editor = useRef<any>(null);

	useEffect(() => {
		const val = getValues('description');
		setDescription(val);
	}, [getValues, showPreview]);

	useEffect(() => {
		getCategory();
	}, []);

	const addAttachment = (e: any) => {
		if (e.target.files[0]) {
			setPreview({
				...preview,
				img: URL.createObjectURL(e.target.files[0]),
			});
		}
		setSelectedFileName(e?.target?.files[0]?.name);
		// setImg(URL.createObjectURL(e.target.files[0]));
		if (e) {
			// const data = attachment;
			// data.push(e);
			return setAttachment(e.target.files[0]);
		}
		return;
	};
	// const deleteAttachment = (e: any) =>
	//   setAttachment((state: any) => state.filter((v: any, k: any) => k !== e));

	// const handleCategory = (val: any) => {
	//   setCategory(val);
	// };

	const handleCategory = (val: any) => {
		setSelectedCategory(val);
		const cat = category.filter((cat: any) => cat?.id === val);

		setPreviousSelectedCategory(cat[0]?.name);
	};

	const handlerSubmit = async (data: any) => {
		// console.log(attachment[0]);

		setLoading(true);
		if (data) {
			if (!selectedCategory) {
				toast.warn("Don't forget to select a category!");
				return;
			}
			if (data?.title.length > 250) {
				toast.warn('This much long title is not valid please use a small one');
				return;
			}
			if (!data?.description) {
				toast.warn('You may want to add description of your blog.');
				return;
			}
			const formData = new FormData();
			//   formData.append("user", userId);
			formData.append('title', data?.title);
			// formData.append("cover_file", data?.picture[0]);
			//   formData.append("categories", [data?.categories]);
			formData.append('updated_at', new Date().toString());
			formData.append('created_at', new Date().toString());
			formData.append('status', 'pending');
			formData.append('category', selectedCategory);
			formData.append('description', data?.description);
			if (typeof attachment !== 'undefined') {
				// formData.append("cover_file", attachment[0]);

				// const snapshotUrl = await base64ToFile(attachment[0]);
				formData.append('cover_file', attachment);
			}

			setLoading(true);

			await apiService(
				{
					method: 'post',
					url: `/investor/news/`,
					token: true,
					data: formData,
				},
				(res: any, error: any) => {
					if (res) {
						// setLoading('working is finished');
						setLoading(false);
						toast.dismiss();
						toast.success('posted successfully');
						router.replace('/admin/investors/news');
						return;
					}
					if (error) {
						toast.error('Creating News Failed');
						setLoading(false);
					}
				}
			);
			// return dispatch(createBlogPostAsync(formData));
		}
	};
	const handlePreview = () => {
		if (!getValues('title')) {
			toast.dismiss();
			toast.warn('Write a title please');
			return;
		}
		if (!selectedCategory) {
			toast.dismiss();
			toast.warn('Select a category');
			return;
		}
		setShowPreview(true);
		// dispatch(previewData({ ...preview, img, selectedCategory }));
		// router.push('/admin/investors/news-preview');
	};

	// const handleCategory = (val: any) => {
	//     setSelectedCategory(val);
	//     const cat = category.filter((cat: any) => cat?.id === val);

	//     setPreviousSelectedCategory(cat[0]?.name);
	// };

	const getCategory = async () => {
		await apiService(
			{
				method: 'get',
				url: `/investor/category/`,
				token: true,
			},
			(res: any, error: any) => {
				if (res) {
					setCategory(res.data.results);
					return;
				}
				if (error) {
					alert(error.response);
				}
			}
		);
	};

	// useEffect(() => {
	//     if (loading === 'working is finished') {
	//         router.replace('/admin/investors/news');
	//     }
	// }, [loading]);
	return (
		// <AdminLayout>
		//     <>

		<form
			id="blog-form"
			onSubmit={handleSubmit(handlerSubmit)}
		>
			{!showPreview ? (
				<>
					<Label
						value="Add News"
						classes={{
							root: 'text-primary pt-4 md:text-md 2xl:text-xl tracking-tight font-sans font-bold',
						}}
					/>
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
							<div className="mb-3">
								<span className="text-base font-semibold block">Category</span>
								<CustomDropDownMenu
									labelValue=""
									selectOptions={category}
									labelWrapperClass="text-left w-full"
									inputClasses="w-full block border border-[#E6E6E6] text-base placeholder-[#CBCBCB] text-[#333333] px-4 py-3 rounded focus:outline-none focus:border-primary bg-[#FBFBFB]"
									labelBtnClasses="inline-flex w-full rounded-md shadow-none text-sm font-medium focus:outline-none text-gray-700"
									labelClasses="w-full font-proxima-nova text-gray-700 pb-2"
									dropDownClasses="origin-top-right w-[220px] xl:w-[314px] 2xl:w-[455px] max-h-[300px]  overflow-y-scroll mt-2 rounded-md border bg-white ring-1 ring-black ring-opacity-5 focus:outline-none rounded-sm -mt-[3px] article-categories"
									change={handleCategory}
									selectedValue={previousSelectedCategory}
									placeholder="Choose Category"
									// extraBtn={extraBtn}
								/>
							</div>
							{/* <span className="mt-1 font-semibold block">Category</span>
                            <select
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className={FORMINPUT}
                                name=""
                                id=""
                            >
                                <option
                                    value=""
                                    disabled
                                >
                                    Select a category please
                                </option>
                                {category?.map((cat: any) => (
                                    <option
                                        value={cat.id}
                                        key={cat.id}
                                    >
                                        {cat.name}
                                    </option>
                                ))}
                            </select> */}
							{/* <SelectBasic
                value={selectedCategory}
                options={category}
                handleChange={(e?: any) => setSelectedCategory(e.target.value)}
              /> */}
							<input
								type="file"
								// {...register("picture")}
								onChange={(e) => {
									addAttachment(e);
									e.target.value = '';
								}}
								// className="bg-gray-600 text-white"
								// name="image"
								accept=".png, .jpg, .jpeg"
								id=""
							/>
							<div className="mt-6 underline cursor-pointer flex items-center">
								{selectedFileName ? (
									<>
										{selectedFileName.length > 30
											? selectedFileName?.slice(0, 30) + '...'
											: selectedFileName}

										<RiDeleteBinLine
											className="text-red-500 cursor-pointer text-md ml-2"
											onClick={() => {
												setSelectedFileName('');
												setPreview({ ...preview, img: '' });
												setAttachment([]);
											}}
										/>
									</>
								) : (
									''
								)}
							</div>
							{preview?.img && (
								<img
									src={preview?.img}
									alt="image"
									className="mt-2 max-h-60"
								/>
							)}
						</div>

						<div className="lg:col-span-4 col-span-3 bg-white p-5 rounded-lg shadow-md">
							<Label
								value="Description"
								classes={{
									root: 'text-base 2xl:text-xl pb-6 text-black-100 font-sans font-bold tracking-wider',
								}}
							/>
							<TextEditor
								ref={editor}
								placeholder={'Type your description here...'}
								defaultValue={description || ''}
								action={(text) => {
									setDescription(text);
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
							loading={loading}
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
				</>
			) : (
				<Preview
					handlePublish={handlerSubmit}
					setShowPreview={setShowPreview}
					preview={preview}
					loading={loading}
				/>
			)}
		</form>
		//     </>
		// </AdminLayout>
	);
};

export default InvestorsAddNews;
