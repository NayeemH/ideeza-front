import Button from '@atoms/button';
import Label from '@atoms/label';
import { previewData } from '@features/technician/blog/reducer';
import AdminLayout from '@layouts/private/template/admin';
// import CustomSelect from "@molecules/custom-select";
// import SelectBasic from "@molecules/select-basic";
import TextEditor from '@organisms/editor/TextEditor';
import { useAppDispatch } from 'app/hooks';
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { apiService } from 'utils/request';
import { FORMINPUT } from 'utils/styles';

const InvestorsAddNews = () => {
	const dispatch = useAppDispatch();
	const [attachment, setAttachment] = useState<any>([]);
	const [preview, setPreview] = useState<any>({});
	const [selectedCategory, setSelectedCategory] = useState<any>('');
	const [img, setImg] = useState<any>('');
	const [category, setCategory] = useState<any>([]);
	const [loading, setLoading] = useState<any>(false);
	const router = useRouter();
	const { register, setValue, handleSubmit } = useForm();

	const editor = useRef<any>(null);
	const addAttachment = (e: any) => {
		setImg(URL.createObjectURL(e.target.files[0]));
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
		// console.log(attachment[0]);

		setLoading(true);
		if (data) {
			const formData = new FormData();
			//   formData.append("user", userId);
			formData.append('title', data?.title);
			// formData.append("cover_file", data?.picture[0]);
			//   formData.append("categories", [data?.categories]);
			formData.append('status', 'pending');
			formData.append('category', selectedCategory);
			formData.append('description', editor?.current?.editor());
			if (typeof attachment[0] !== 'undefined') {
				// formData.append("cover_file", attachment[0]);

				// const snapshotUrl = await base64ToFile(attachment[0]);
				formData.append('cover_file', attachment[0]);
			}

			await apiService(
				{
					method: 'post',
					url: `/investor/news/`,
					token: true,
					data: formData,
				},
				(res: any, error: any) => {
					if (res) {
						setLoading('working is finished');
						toast.dismiss();
						toast.success('posted successfully');
						return;
					}
					if (error) {
						alert('error');
					}
				}
			);
			// return dispatch(createBlogPostAsync(formData));
		}
	};
	const handlePreview = () => {
		dispatch(previewData({ ...preview, img, selectedCategory }));
		router.push('/admin/investors/news-preview');
	};
	// const handleSelectcategory = (val: any) => {
	//   console.log(val);
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

	useEffect(() => {
		if (loading === 'working is finished') {
			router.replace('/admin/investors/news');
		}
	}, [loading]);

	useEffect(() => {
		getCategory();
	}, []);
	return (
		<AdminLayout>
			<>
				<Label
					value="Add News"
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
							<span className="mt-1 font-semibold block">Category</span>
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
							</select>
							{/* <SelectBasic
                value={selectedCategory}
                options={category}
                handleChange={(e?: any) => setSelectedCategory(e.target.value)}
              /> */}
							{/* <CustomSelect
                options={[
                  { name: "code", value: "code" },
                  { name: "cover", value: "cover" },
                ]}
              /> */}

							<input
								type="file"
								// {...register("picture")}
								onChange={(e) => addAttachment(e)}
								// className="bg-gray-600 text-white"
								// name="image"
								id=""
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
								ref={editor}
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
				</form>
			</>
		</AdminLayout>
	);
};

export default InvestorsAddNews;
