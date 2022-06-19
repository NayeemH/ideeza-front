import Button from '@atoms/button';
import Label from '@atoms/label';
import CustomDropDownMenu from '@molecules/custom-dropdown';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiService } from 'utils/request';
import { RiDeleteBinLine } from 'react-icons/ri';
// import Preview from '@features/user/blog/Preview';
import Preview from './Preview';
// import TextEditorNew from '@organisms/editor-new/TextEditor';
import TextEditor from '@organisms/editor/TextEditor';

function AddArticle() {
	const [attachment, setAttachment] = useState<any>();
	const [loading, setLoading] = useState<boolean | string>(false);
	const [category, setCategory] = useState<any>([]);
	const [selectedCategory, setSelectedCategory] = useState<any>();
	const [previousSelectedCategory, setPreviousSelectedCategory] = useState<any>();
	const [description, setDescription] = useState<string>('');
	const [showPreview, setShowPreview] = useState(false);
	const [categoryError, setCategoryError] = useState<string>('');
	const [preview, setPreview] = useState<any>({});
	const [selectedFileName, setSelectedFileName] = useState('');
	const router = useRouter();
	const {
		register,
		setValue,
		getValues,
		handleSubmit,
		formState: { errors },
	} = useForm();

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
		if (e) {
			return setAttachment(e.target.files[0]);
		}
		return;
	};
	const handleCategory = (val: any) => {
		setSelectedCategory(val);
		const cat = category.filter((cat: any) => cat?.id === val);

		setPreviousSelectedCategory(cat[0]?.name);
	};

	const getCategory = async () => {
		await apiService(
			{
				method: 'get',
				url: `/core/category/`,
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
	const handlerSubmit = async (data: any) => {
		if (!selectedCategory) {
			setCategoryError("Don't forget to select a category!");
			return;
		} else {
			setCategoryError('');
		}
		if (data?.title.length > 250) {
			toast.warn('This much long title is not valid please use a small one');
			return;
		}
		if (!data?.description) {
			toast.warn('You may want to add description of your blog.');
			return;
		}
		setLoading(true);
		if (data) {
			const formData = new FormData();

			formData.append('title', data?.title);

			formData.append('status', 'pending');
			formData.append('description', data?.description);

			formData.append('category', selectedCategory);

			if (typeof attachment !== 'undefined') {
				formData.append('image', attachment);
			}

			await apiService(
				{
					method: 'post',
					url: `/blog/`,
					token: true,
					data: formData,
				},
				(res: any) => {
					if (res) {
						setLoading(false);
						toast.dismiss();
						toast.success('posted successfully');
						router.replace('/admin/blog');
						return;
					}
				}
			);
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
	};

	return (
		<form
			id="blog-form"
			onSubmit={handleSubmit(handlerSubmit)}
		>
			{!showPreview ? (
				<div className="p-4 xl:pt-[23] bg-white  xl:p-[30px] rounded-[10px]">
					<Label
						value="Add Article"
						classes={{
							root: 'text-[#333333] pt-4 text-base xl:text-[26px] mb-10 tracking-tight font-proxima-nova font-semibold',
						}}
					/>

					<div className="grid lg:grid-cols-6 md:grid-cols-5 md:divide-x-2 pb-6 grid-cols-1 lg:gap-10 md:gap-6 md:gap-y-8 gap-y-5 mt-4">
						<div className="md:col-span-2 flex flex-col justify-between w-full space-y-4">
							<div className="">
								<div className="mb-3">
									<label>
										<span className="text-base text-[#333333]  font-proxima-nova">
											Article Name
										</span>
										<input
											{...register('title', {
												required: 'Title Is Required',
											})}
											// value={perviewData?.title}
											// defaultValue={perviewData?.title}
											onChange={(e) =>
												setPreview({
													...preview,
													title: e.target.value,
												})
											}
											className="w-full block border border-[#E6E6E6] rounded text-base placeholder-[#CBCBCB] text-[#333333]  pl-5 pt-[13px] pb-[16px] focus:outline-none mt-2 focus:border-primary bg-[#FBFBFB]"
											placeholder="Name"
										/>
										{errors?.title && (
											<span className="text-red-400 text-sm">
												{errors?.title?.message}
											</span>
										)}
									</label>
								</div>
								<div className="mb-3">
									<span className="text-base font-proxima-nova">Category</span>
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
										placeholder="Tags"
										// extraBtn={extraBtn}
									/>
								</div>
								{categoryError && (
									<span className="text-red-400 text-sm">{categoryError}</span>
								)}

								<div className="mb-3">
									<label className="text-base mb-2 text-black-100 font-proxima-nova">
										Image
									</label>

									<div className="flex item-center gap-3 mt-2">
										<input
											className="w-full block border border-[#E6E6E6] text-base text-gray-500 px-4 py-3 rounded focus:outline-none focus:border-primary bg-[#FBFBFB]"
											placeholder="No file Choosen"
										/>
										<label>
											<span>
												<>
													<div className="text-white w-[120px] text-center rounded-[5px] px-4 py-3 bg-[#999999] text-lg font-proxima-nova tracking-tight">
														Choose
													</div>
												</>
											</span>
											<input
												type="file"
												onChange={(e) => {
													addAttachment(e);
													e.target.value = '';
												}}
												className="hidden"
												accept=".png, .jpg, .jpeg"
											/>
										</label>
									</div>
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
							</div>

							<div className="bg-white hidden md:mt-7 mt-5 pt-4 md:flex items-end justify-start md:space-x-6 space-x-3">
								<Button
									className="shadow-none text-base h-[50px] w-[120px] 2xl:text-xl py-2.5 font-proxima-nova font-semibold capitalize px-6 bg-primary"
									loading={loading}
									value="Publish"
									type="submit"
									color="primary"
									variant="contained"
								/>
								<Button
									variant="outlined"
									color="inherit"
									className="capitalize border-[#E6E6E6] h-[50px] w-[120px] px-6 text-base 2xl:text-xl py-4 font-proxima-nova"
									value="Preview"
									onClick={handlePreview}
								/>
							</div>
						</div>

						<div className="lg:col-span-4 col-span-3 bg-white md:pl-11 md:p-5 md:pt-0 md:pb-0">
							<Label
								value="Description"
								classes={{
									root: 'text-base 2xl:text-xl pb-6 text-black-100 font-sans font-bold tracking-wider',
								}}
							/>
							<TextEditor
								// height={800}
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
					<div className="bg-white  md:hidden md:mt-7 mt-5 py-4 flex items-end justify-center md:space-x-6 space-x-3">
						<Button
							className="shadow-none text-base h-[50px] w-[120px] 2xl:text-xl py-2.5 font-proxima-nova font-semibold capitalize px-6 bg-primary"
							loading={loading}
							value="Publish"
							type="submit"
							color="primary"
							variant="contained"
						/>
						<Button
							variant="outlined"
							color="inherit"
							className="capitalize border-[#E6E6E6] h-[50px] w-[120px] px-6 text-base 2xl:text-xl py-4 font-proxima-nova"
							value="Preview"
							onClick={handlePreview}
						/>
					</div>
				</div>
			) : (
				<Preview
					handlePublish={handlerSubmit}
					setShowPreview={setShowPreview}
					preview={preview}
					loading={loading}
				/>
			)}
		</form>
	);
}

export default AddArticle;
