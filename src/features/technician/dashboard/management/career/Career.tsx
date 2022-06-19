import React, { useEffect, useState } from 'react';
import Label from '@atoms/label';
import BlogsTableHeader from '@organisms/blogs-table-header';
import AboutUsJobPopup from '@organisms/about-us-job-popup';
import { apiService } from 'utils/request';
import Button from '@atoms/button';
import Modal from '@atoms/modal';
import { Controller, useForm } from 'react-hook-form';
import TextEditor from '@organisms/editor/TextEditor';
import Loader from '@atoms/loader';
import { getTextExcerpt } from 'utils/utils';
import DataTable from '@organisms/data-table';
import { applied_freelancers } from '../../../../../static/data/technician/about_career';
import CustomPagination from '@molecules/custom-pagination';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { FaSortDown, FaSortUp } from 'react-icons/fa';

function Career(props: any) {
	const { classessort } = props;
	const [pager, setPager] = useState({});
	const [page, setPage] = useState(1);
	const [popup, SetPopup] = useState(false);
	const [jobs, setJobs] = useState<any>([]);
	const [loader, setLoader] = useState(false);
	const toggleOpen = () => SetPopup(!popup);
	const [jobPopup, setJobPopup] = useState(false);
	const [selectedJobData, setSelectedJobData] = useState(false);
	const toggleJobOpen = () => setJobPopup(!jobPopup);
	const [search, setSearch] = useState('');
	let mappedData;

	const {
		register,
		handleSubmit,
		watch,
		control,
		setValue,
		formState: { errors },
	} = useForm();

	const [appliedFreelancers, setAppliedFreelancers] = useState<any[]>(applied_freelancers);

	const getAppliedFreelancers = () => {
		apiService(
			{
				method: 'get',
				url: `/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					setAppliedFreelancers(applied_freelancers);
					return;
				}
			}
		);
	};

	const handleSearch = (e: any) => setSearch(e.target.value);
	const getJobsData = async (search: any = '', sortBy: any = '') => {
		setLoader(true);

		await apiService(
			{
				method: 'get',
				url: `job/`,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					setJobs(data.results);
					setLoader(false);
					return;
				}

				setLoader(false);
			}
		);
	};
	const onSubmit = async (data: any) => {
		setLoader(true);
		await apiService(
			{
				method: 'get',
				url: `job/`,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					mappedData = data.map((job: any) => {
						return {
							title: job.title,
							description: getTextExcerpt(job.description, 100, true),
							available_Position: job.available_Position,
						};
					});
					// setJobs(data.results);
					setJobs(mappedData);
					setLoader(false);
					return;
				}

				setLoader(false);
			}
		);
	};

	const handlePage = (e: any) => {
		setPage(e);
	};

	useEffect(() => {
		getJobsData();
		setPager({
			...pager,
			page,
		});
	}, [page]);

	useEffect(() => {
		getAppliedFreelancers();
	}, []);

	return (
		<div className="pt-4 bg-white font-proxima-nova rounded-lg  px-[30px]">
			<Modal
				width="md"
				close={toggleOpen}
				header={
					<div className="pb-1 p-6 pl-0">
						<Label
							value="Add Career"
							className="text-primary texl-lg md:text-xl 2xl:text-2xl font-semibold font-sans tracking-tight"
						/>
					</div>
				}
				content={
					<form onSubmit={handleSubmit(onSubmit)}>
						<input
							placeholder="Career Name"
							className="w-full text-gray-700 text-base 2xl:text-xl font-lato py-1 rounded border border-solid border-gray-160 mb-2 pl-2"
							{...register('title', { required: true })}
						/>
						{errors?.name && (
							<span className="text-xs text-primary">This field is required</span>
						)}
						<input
							type="number"
							placeholder="Vacancy"
							className="w-full text-gray-700 text-base 2xl:text-xl font-lato py-1 rounded border border-solid border-gray-160 mb-2 pl-2"
							min={1}
							{...register('position', { required: true })}
						/>
						{errors?.name && (
							<span className="text-xs text-primary">This field is required</span>
						)}

						<div className="grid grid-cols-2 gap-2 mb-3 mr-2">
							<Label
								value="Select Job Type"
								className="text-lg text-gray-700"
							/>
							<select
								className="focus:outline-none border border-gray-700 rounded"
								{...register('job_type', { required: true })}
							>
								<option value="PART_TIME">PART TIME</option>
								<option value="FULL_TIME">FULL TIME</option>
							</select>
							{/* <Controller
                name="job_type"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <SelectBasic
                    {...field}
                    options={[
                      {
                        name: "PART TIME",
                        value: "PART_TIME",
                      },
                      { value: "FULL_TIME", name: "FULL TIME" },
                    ]}
                    placeholder="Select Type"
                    label="Type"
                    wrapperClasses="h-[36px] mb-12"
                  />
                )}
              /> */}
							{/* <Controller
                name="is_open"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <SelectBasic
                    {...field}
                    options={[
                      {
                        name: "Open",
                        value: true,
                      },
                      { value: false, name: "Close" },
                    ]}
                    label="State"
                    wrapperClasses="h-[24px] mb-12"
                    labelClasses="pt-2"
                  />
                )}
              /> */}
						</div>

						<Controller
							name="description"
							control={control}
							rules={{
								required: true,
							}}
							render={({ field }) => (
								<TextEditor
									{...field}
									defaultValue={'type your description here'}
									//   perviewData?.description ||
									action={(text) => {
										setValue('description', text);
									}}
								/>
							)}
						/>

						<div className="flex justify-start w-full p-4 space-x-3 pl-0">
							<Button
								// onClick={toggleOpen}
								value="Add Career"
								type="submit"
								loading={loader}
								disabled={loader}
								classes={{
									root: `text-white bg-primary py-4 px-8 leading-5 text-base 2xl:text-xl tracking-tight shadow-none font-sans capitalize rounded`,
								}}
							/>
							<Button
								onClick={toggleOpen}
								value="Cancel"
								classes={{
									root: `text-gray-700 border border-gray-600 border-solid bg-white py-4 shadow-none px-6 leading-5 text-base 2xl:text-xl tracking-tight font-sans capitalize rounded`,
								}}
							/>
						</div>
					</form>
				}
				actions={<></>}
				open={popup}
			/>
			<Label
				value="Career"
				classes={{
					root: 'text-primary tracking-tight  font-bold pb-3 texl-lg 2xl:text-[32px]',
				}}
			/>
			<div className="w-full ">
				<BlogsTableHeader
					handleSearch={handleSearch}
					onClick={toggleOpen}
					btnValue="Add new Career"
					labelClass="hidden"
					containerClass="flex items-center justify-between px-4"
					showGear={false}
				/>
				{loader ? (
					<Loader />
				) : (
					<>
						<DataTable.Container>
							<DataTable.Header className="h-[90px] border-b border-[#E6E6E6] ">
								<DataTable.Row>
									<DataTable.Head className="w-[25%] text-left pl-[30px]">
										<div className="flex gap-[10px]">
											<div className="flex flex-col ">
												<FaSortUp />
												<FaSortDown className="-mt-2.5" />
											</div>

											<span>Name</span>
										</div>
									</DataTable.Head>
									<DataTable.Head className="text-left w-[50%]">
										<div className="flex gap-[10px]">
											<div className="flex flex-col ">
												<FaSortUp />
												<FaSortDown className="-mt-2.5" />
											</div>

											<span>Description</span>
										</div>
									</DataTable.Head>
									<DataTable.Head className="w-[25%] text-center pr-[30px]">
										<div className="flex gap-[10px]">
											<div className="flex flex-col ">
												<FaSortUp />
												<FaSortDown className="-mt-2.5" />
											</div>

											<span>Available Positions</span>
										</div>
									</DataTable.Head>
									<DataTable.Head />
								</DataTable.Row>
							</DataTable.Header>
							<DataTable.Body>
								{jobs &&
									jobs.length > 0 &&
									jobs.map((item: any, index: number) => (
										<DataTable.Row
											key={index}
											onClick={() => {
												setJobPopup(true);
												setSelectedJobData(item);
											}}
											style={{ cursor: 'pointer' }}
											className={`${
												index % 2 === 0 ? 'bg-[#FBFBFB]' : 'bg-white'
											} h-[78px] text-[#787878] text-lg border-b border-[#E6E6E6]`}
										>
											<DataTable.Data className="pl-[30px]">
												{item?.title}
											</DataTable.Data>
											<DataTable.Data className="text-left">
												<div
													dangerouslySetInnerHTML={{
														__html:
															item?.description.length > 200
																? item?.description.slice(0, 200) +
																  '...'
																: item?.description,
													}}
												/>
											</DataTable.Data>
											<DataTable.Data></DataTable.Data>
											<DataTable.Data className="pr-[28px]">
												<BsThreeDotsVertical className="text-2xl" />
											</DataTable.Data>
										</DataTable.Row>
									))}
							</DataTable.Body>
						</DataTable.Container>
					</>
				)}
				<Label
					value="Applied Freelancers"
					onClick={toggleJobOpen}
					classes={{
						root: 'text-[#333333] tracking-tight  font-bold  py-6  texl-lg 2xl:text-[24px]',
					}}
				/>
				{/* <FreelancerTable /> */}

				<DataTable.Container>
					<DataTable.Header className="h-[90px] border-b border-[#E6E6E6] ">
						<DataTable.Row>
							<DataTable.Head className="w-[25%]  text-left pl-[30px]">
								<div className="flex gap-[10px]">
									<div className="flex flex-col ">
										<FaSortUp />
										<FaSortDown className="-mt-2.5" />
									</div>

									<span>Name</span>
								</div>
							</DataTable.Head>
							<DataTable.Head className="w-[25%] text-left">
								<div className="flex gap-[10px]">
									<div className="flex flex-col ">
										<FaSortUp />
										<FaSortDown className="-mt-2.5" />
									</div>

									<span>Status</span>
								</div>
							</DataTable.Head>
							<DataTable.Head className="w-[30%] text-left">
								<div className="flex gap-[10px]">
									<div className="flex flex-col ">
										<FaSortUp />
										<FaSortDown className="-mt-2.5" />
									</div>

									<span>Date Registered</span>
								</div>
							</DataTable.Head>
							<DataTable.Head className="w-[20%] text-left">
								<div className="flex gap-[10px]">
									<div className="flex flex-col ">
										<FaSortUp />
										<FaSortDown className="-mt-2.5" />
									</div>

									<span>Date Applied</span>
								</div>
							</DataTable.Head>
							<DataTable.Head />
						</DataTable.Row>
					</DataTable.Header>
					<DataTable.Body>
						{appliedFreelancers &&
							appliedFreelancers.length > 0 &&
							appliedFreelancers.map((item: any, index: number) => (
								<DataTable.Row
									key={index}
									className={`${
										index % 2 === 0 ? 'bg-[#FBFBFB]' : 'bg-white'
									} h-[78px] text-[#787878] text-lg border-b border-[#E6E6E6]`}
								>
									<DataTable.Data className="pl-[30px]">
										{item?.name}
									</DataTable.Data>
									<DataTable.Data>{item?.status}</DataTable.Data>
									<DataTable.Data>{item?.date_registered}</DataTable.Data>
									<DataTable.Data>{item?.date_applied}</DataTable.Data>
									<DataTable.Data className="pr-[28px]">
										<BsThreeDotsVertical className="text-2xl" />
									</DataTable.Data>
								</DataTable.Row>
							))}
					</DataTable.Body>
				</DataTable.Container>

				<div className={'p-5'}>
					<CustomPagination
						count={100}
						handleChange={handlePage}
						showFirstButton
						showLastButton
					/>
				</div>
			</div>

			<AboutUsJobPopup
				open={jobPopup}
				toggleOpen={toggleJobOpen}
				jobData={selectedJobData}
			/>
		</div>
	);
}
Career.defaultProps = {
	extraBtn: false,
	classessort: { root: 'font-bold' },
};

export default Career;
