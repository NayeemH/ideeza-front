import Button from '@atoms/button';
import Label from '@atoms/label';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { apiService } from 'utils/request';
// import TextEditor from '@organisms/editor/TextEditor';
import { toast } from 'react-toastify';
import Loader from '@atoms/loader';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import { BsArrowLeftCircleFill } from 'react-icons/bs';
import Preview from '@features/user/blog/Preview';
import TextEditorNew from '@organisms/editor-new/TextEditor';

const SingleBlog = () => {
	const router = useRouter();
	const { id } = router.query;
	const [loading, setLoading] = useState<any>(false);
	const [singleNews, setSingleNews] = useState<any>();
	const [loader, setLoader] = useState(false);
	const [category, setCategory] = useState<any>([]);
	const [img, setImg] = useState<any>('');
	const { register, setValue, handleSubmit, getValues } = useForm();
	const [selectedCategory, setSelectedCategory] = useState<any>('');
	const [attachment, setAttachment] = useState<any>([]);
	const [preview, setPreview] = useState<any>({});
	const [showPreview, setShowPreview] = useState(false);
	const [selectedFileName, setSelectedFileName] = useState('');

	useEffect(() => {
		if (singleNews?.category?.id) {
			setSelectedCategory(singleNews?.category?.id);
		}
		setValue('title', singleNews?.title);
	}, [singleNews]);

	useEffect(() => {
		getCategory();
	}, []);

	useEffect(() => {
		setLoader(true);
		if (id) getSingleNews();
	}, [id]);

	const addAttachment = (e: any) => {
		if (e.target.files[0]) {
			setImg(URL.createObjectURL(e.target.files[0]));
		}
		setSelectedFileName(e.target.files[0].name);

		if (e) {
			const data = attachment;
			data.push(e);
			return setAttachment(data);
		}
		return;
	};

	const getSingleNews = async () => {
		await apiService(
			{
				method: 'get',
				url: `/blog/${id}/`,
				token: true,
			},
			(res: any, error: any) => {
				if (res) {
					setSingleNews(res?.data);
					setPreview(res?.data);
					setLoader(false);
					// // console.log(res.data);
				}
				if (error) {
					if (error?.response?.status === 404) {
						toast.dismiss();
						toast.warning('No blog found');
						router.push('/user/dashboard/blog');
					}
				}
			}
		);
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
					// console.log(error.response);
				}
			}
		);
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

	const handlerSubmit = async (data: any) => {
		// console.log(data);
		setLoading(true);
		if (data) {
			const formData = new FormData();
			formData.append('title', data?.title);
			// formData.append("status", "pending");
			formData.append('category', selectedCategory);
			formData.append('description', data?.description);
			if (typeof attachment[0] !== 'undefined') {
				formData.append('image', attachment[0]?.target?.files[0]);
			}

			await apiService(
				{
					method: 'patch',
					url: `/blog/${id}/`,
					token: true,
					data: formData,
				},
				(res: any) => {
					if (res) {
						// setLoading("working is finished");
						toast.dismiss();
						toast.success('Updated successfully');
						router.replace('/user/dashboard/blog');
						return setLoading(false);
					}
					// if (error) console.log('error');
				}
			);
		}
	};

	return (
		<div className="">
			{loader ? (
				<Loader />
			) : !showPreview ? (
				<div className="bg-white p-4 xl:pt-[23] xl:p-[30px]   rounded-[10px]">
					<div className="w-full flex pr-6 items-center justify-between">
						<Label
							value="Edit Your Blog"
							classes={{
								root: 'text-[#333333] pt-4 text-base xl:text-[26px] mb-10 tracking-tight font-proxima-nova font-semibold',
							}}
						/>
						<Button
							value={
								<>
									<BsArrowLeftCircleFill className=" mr-2" />
									<Label
										value="Back"
										className="text-white"
									/>
								</>
							}
							className="text-xl text-white bg-primary px-[30px] py-[13px]"
							onClick={() => router.back()}
							variant="outlined"
						/>
					</div>

					<form onSubmit={handleSubmit(handlerSubmit)}>
						<div className="grid lg:grid-cols-6 md:grid-cols-5 md:divide-x-2 grid-cols-1 lg:gap-10 md:gap-6 md:gap-y-8 gap-y-5 mt-4">
							<div className="md:col-span-2 flex flex-col justify-between w-full bg-white space-y-4">
								<div className="">
									<div className="mb-3">
										<label>
											<span className="block text-base text-[#333333]  font-proxima-nova">
												Article Name
											</span>
											<input
												{...register('title', { required: true })}
												onChange={(e) =>
													setPreview({
														...preview,
														title: e.target.value,
													})
												}
												className="w-full block border border-[#E6E6E6] text-base placeholder-[#CBCBCB] pl-5 pt-[13px] pb-[16px] rounded text-[#333333] focus:outline-none mt-2 focus:border-primary bg-[#FBFBFB]"
											/>
										</label>
									</div>

									<div className="mb-3">
										<label>
											<span className="block text-base text-[#333333]  font-proxima-nova">
												Category
											</span>
											<select
												value={selectedCategory}
												onChange={(e) =>
													setSelectedCategory(e.target.value)
												}
												className="w-full block border text-[#333333] border-[#E6E6E6] text-base placeholder-[#CBCBCB] pl-5 pt-[13px] pb-[16px] rounded focus:outline-none mt-2 focus:border-primary bg-[#FBFBFB]"
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
											</select>
										</label>
									</div>

									<div className="mb-3">
										<label className="block text-base text-[#333333]  font-proxima-nova">
											Image
										</label>
										{/* <input
                    type="file"
                    //   {...register("picture")}
                    onChange={(e) => addAttachment(e)}
                    // className="bg-gray-600 text-white"
                  /> */}
										<div className="flex item-center gap-3 mt-2">
											<input
												className="w-full block border border-[#E6E6E6] text-base text-gray-500 px-4 py-3 rounded focus:outline-none focus:border-primary bg-[#FBFBFB]"
												placeholder="Update Image"
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
													onChange={(e) => addAttachment(e)}
													className="hidden"
												/>
											</label>
										</div>
										<div className="mt-6 underline cursor-pointer flex items-center">
											{selectedFileName ? (
												<>
													{selectedFileName}
													<MdOutlineCancelPresentation
														className="text-primary mt-1 ml-2"
														onClick={() => {
															setImg('');
															setSelectedFileName('');
														}}
													/>
												</>
											) : (
												''
											)}
										</div>
									</div>

									<div className="mb-3">
										{singleNews?.image && (
											<div>
												{/* <Label
												value={'Current Image'}
												classes={{
													root: 'block text-base text-[#333333] mb-3 font-proxima-nova',
												}}
											/> */}
												{singleNews?.image && (
													<img
														src={img || singleNews?.image}
														alt="image"
													/>
												)}
											</div>
										)}
									</div>
								</div>
								<div className="bg-white md:mt-7 mt-5 pt-4 hidden md:flex items-end justify-start md:space-x-6 space-x-3">
									<Button
										className="shadow-none h-[50px] w-[120px] text-base 2xl:text-xl py-2 font-proxima-nova font-semibold capitalize px-6 bg-primary"
										loading={loading}
										value="Update"
										// loading={loading}
										type="submit"
										color="primary"
										variant="contained"
									/>
									<Button
										// type="submit"
										variant="outlined"
										// color="secondary"
										className="capitalize  h-[50px] w-[120px] border-[#E6E6E6]  px-6 text-base 2xl:text-xl py-2 font-proxima-nova"
										value="Preview"
										onClick={handlePreview}
									/>
								</div>
							</div>
							<div className="lg:col-span-4 col-span-3 bg-white md:pl-11 md:p-5 md:pb-0 md:pt-0">
								{/* <Label
									value="Description"
									classes={{
										root: 'text-base  mb-2 text-[#333333] font-proxima-nova  tracking-wider',
									}}
								/> */}
								<TextEditorNew
									height={800}
									// placeholder={'Type your description here...'}
									defaultValue={preview?.description || ''}
									action={(text) => {
										setValue(
											'description',
											text === '<p><br></p>' ? '' : text,
											{
												shouldValidate: true,
											}
										);
										setPreview({ ...preview, description: text });
									}}
								/>
							</div>
						</div>
						<div className="bg-white md:mt-7 mt-5 pt-4 md:hidden flex items-end justify-center md:space-x-6 space-x-3">
							<Button
								className="shadow-none h-[50px] w-[120px] text-base 2xl:text-xl py-2 font-proxima-nova font-semibold capitalize px-6 bg-primary"
								loading={loading}
								value="Update"
								// loading={loading}
								type="submit"
								color="primary"
								variant="contained"
							/>
							<Button
								// type="submit"
								variant="outlined"
								// color="secondary"
								className="capitalize  h-[50px] w-[120px] border-[#E6E6E6]  px-6 text-base 2xl:text-xl py-2 font-proxima-nova"
								value="Preview"
								onClick={handlePreview}
							/>
						</div>
					</form>
				</div>
			) : (
				<Preview
					handlePublish={handlerSubmit}
					setShowPreview={setShowPreview}
					preview={{ ...preview, img: img }}
					loading={loading}
				/>
			)}
		</div>
	);
};

export default SingleBlog;
