import Label from '@atoms/label';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FORMINPUT } from 'utils/styles';
import TextEditor from '@organisms/editor/TextEditor';
import Button from '@atoms/button';
import { apiService } from 'utils/request';

const SingleNews = () => {
	const router = useRouter();
	const { slug }: any = router.query;
	const [loading, setLoading] = useState<any>(false);
	const [singleNews, setSingleNews] = useState<any>();
	const [category, setCategory] = useState<any>([]);
	const [img, setImg] = useState<any>('');
	const { register, setValue, handleSubmit } = useForm();
	const [selectedCategory, setSelectedCategory] = useState<any>('');
	const [attachment, setAttachment] = useState<any>([]);
	const [preview, setPreview] = useState<any>({});
	const [name, row] = slug;
	const previouslySelectedCategory = singleNews?.category?.id;

	const addAttachment = (e: any) => {
		setImg(URL.createObjectURL(e.target.files[0]));
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
				url: `/investor/news/${+row}/`,
				token: true,
			},
			(res: any, error: any) => {
				if (res) {
					setSingleNews(res.data);
					// console.log(res.data);
				}
				if (error) {
					alert('error');
				}
			}
		);
	};
	const getCategory = async () => {
		await apiService(
			{
				method: 'get',
				url: `investor/category/`,
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
		getSingleNews();
		getCategory();
	}, []);
	// console.log(singleNews);

	const handlerSubmit = async (data: any) => {
		// console.log(data);

		// setLoading(true);
		if (data) {
			const formData = new FormData();
			//   formData.append("user", userId);
			formData.append('title', data?.title);
			//   formData.append("categories", [data?.categories]);
			formData.append('status', 'pending');
			formData.append('category', selectedCategory);
			//   formData.append("description", editor?.current?.editor());
			if (typeof attachment[0] !== 'undefined') {
				formData.append('image', attachment[0]);
			}

			await apiService(
				{
					method: 'patch',
					url: `/investor/news/${Number(row)}/`,
					token: true,
					data: formData,
				},
				(res: any, error: any) => {
					// if (res) {
					//   setLoading("working is finished");
					//   toast.dismiss();
					//   toast.success("posted successfully");
					//   return;
					// }
					if (error) {
						alert('error');
					}
				}
			);
		}
	};

	return (
		<>
			<Label
				value="Edit Your News"
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
								onChange={(e) => setPreview({ ...preview, title: e.target.value })}
								defaultValue={singleNews?.title}
								className={FORMINPUT}
								placeholder="Name"
							/>
						</label>
						<span className="mt-1 font-semibold block">Category</span>
						<select
							onChange={(e) => setSelectedCategory(e.target.value)}
							name=""
							id=""
							className={FORMINPUT}
						>
							<option
								value=""
								disabled
							>
								Select a category please
							</option>
							{category?.map((cat: any) => (
								<option
									selected={cat?.id === previouslySelectedCategory}
									value={cat.id}
									key={cat.id}
								>
									{cat.name}
								</option>
							))}
						</select>

						<input
							type="file"
							{...register('picture')}
							onChange={(e) => addAttachment(e)}
							// className="bg-gray-600 text-white"
							name=""
							id=""
						/>
						<Label
							value="Added files"
							classes={{
								root: 'text-base 2xl:text-xl pt-6 text-black-100 font-sans font-bold tracking-wider',
							}}
						/>
						{singleNews?.file_attachments.length > 1 ? (
							singleNews?.file_attachments.map((file: any, key: number) => (
								<h6 key={key}>{file?.name}</h6>
							))
						) : (
							<h2>No File attachned yet</h2>
						)}
						<img
							src={singleNews?.cover_file}
							alt="image"
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
						color="secondary"
						className="capitalize px-6 text-base 2xl:text-xl1 py-2 font-sans"
						value="Preview"
						// onClick={handlePreview}
					/>
				</div>
			</form>
		</>
	);
};

export default SingleNews;
