import CheckboxAtom from '@atoms/checkbox';
// import Dropdown from '@atoms/drop-down';
// import Dropdown from '@atoms/drop-down';
//  this component maybe removed for optimization purpose
import { IBlogPostList } from '@models/blog';
import TableRowCheckbox from '@molecules/table-row-checkbox';
import { Box, Popper } from '@mui/material';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { BiDotsVerticalRounded } from 'react-icons/bi';

export default function BlogList({
	data,
	dropDownOptions = [
		{
			name: 'View',
			value: 'View',
		},
		{
			name: 'Pause',
			value: 'Pause',
		},
		{
			name: 'Approve',
			value: 'Approve',
		},
		{
			name: 'Delete',
			value: 'Delete',
		},
	],
	setRow,
	setUserBlogsSettings,
}: {
	data: IBlogPostList[] | undefined;
	dropDownOptions?: any;
	setRow?: (e?: any) => void;
	setUserBlogsSettings?: (e?: any) => void;
}) {
	const router = useRouter();
	const [headerCheckboxChecked, setHeaderCheckboxChecked] = useState(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popper' : undefined;

	const handleClick = (event: any) => {
		setAnchorEl(anchorEl ? null : event.currentTarget);
	};

	return (
		<>
			{data?.length !== 0 && (
				<table className="sm:w-full w-[500px] overflow-x-auto border text-base border-[#E6E6E6]">
					<thead>
						<tr className="text-left  border-b font-semibold text-sm md:text-md xl:text-lg">
							<th className="pl-[15px] py-[11px] w-20 xl:pl-[30px]  xl:py-[23px] text-left">
								<CheckboxAtom
									onChange={() => {
										setHeaderCheckboxChecked((prev) => !prev);
										setUserBlogsSettings &&
											setUserBlogsSettings((prev: boolean) => !prev);
									}}
								/>
							</th>
							<th className=" py-[11px] lg:w-[450px] xl:py-[23px] mr-10">
								Article Name
							</th>
							<th className="px-[15px] py-[11px] xl:px-[30px] xl:py-[23px] text-center">
								Date
							</th>
							<th className="px-[15px] py-[11px] xl:px-[30px] xl:py-[23px] text-center mr-4">
								Status
							</th>
							<th className="px-[15px] py-[11px] xl:px-[30px] xl:py-[23px] text-right"></th>
						</tr>
					</thead>
					<tbody className="">
						{data &&
							data.map((item: any, key: any) => (
								<tr
									className={`${
										key % 2 === 0 ? 'bg-slate-50 ' : 'bg-white'
									}  text-[#787878] text-sm md:text-base xl:text-xl border-b border-[#E6E6E6]  py-[23px] cursor-pointer`}
									key={item.id}
								>
									<th className="px-[15px] py-[11px]  xl:px-[30px] xl:py-[23px] text-left">
										<TableRowCheckbox isParentChecked={headerCheckboxChecked} />
									</th>
									<td
										className=" py-[11px]   xl:py-[23px] cursor-pointer"
										onClick={() =>
											router.push(
												`/technician/dashboard/blog/details/${item.id}`
											)
										}
										// colSpan={2}
									>
										{item?.title?.length > 45
											? item?.title.slice(0, 45) + '...'
											: item.title}
									</td>
									<td
										className="px-[15px] py-[11px] xl:px-[30px] xl:py-[23px] cursor-pointer text-center"
										onClick={() =>
											router.push(
												`/technician/dashboard/blog/details/${item.id}`
											)
										}
									>
										{format(
											new Date(item?.created_at ?? 'Oct 08, 2021'),
											'MMM dd, yyyy'
										)}
									</td>
									<td
										className="px-[15px] py-[11px]  xl:px-[30px] xl:py-[23px] cursor-pointer text-center"
										onClick={() =>
											router.push(
												`/technician/dashboard/blog/details/${item.id}`
											)
										}
									>
										{item.status}
									</td>
									<td
										className="cursor-pointer  z-50  px-[15px] py-[11px]  xl:px-[30px] xl:py-[23px]"
										onClick={() => (setRow ? setRow(item.id) : '')}
									>
										<div className="flex justify-end">
											<div className="max-w-fit p-2 hover:bg-zinc-100 rounded-full">
												<BiDotsVerticalRounded
													aria-describedby={id}
													type="button"
													onClick={handleClick}
													className="text-2xl text-[#787878] relative  "
												/>
											</div>
											{open && (
												<div
													className="absolute  w-screen h-screen top-0 left-0"
													onClick={() => setAnchorEl(null)}
												></div>
											)}

											<Popper
												id={id}
												open={open}
												anchorEl={anchorEl}
											>
												<div className="w-full z-50 flex justify-center">
													<div className="arrow-up"></div>
												</div>

												<Box
													sx={{
														// border: 1,
														p: 1,
														bgcolor: 'background.paper',
													}}
													className="rounded-md border border-gray-300"
												>
													{dropDownOptions.map(
														(option: any, key: number) => (
															<div
																key={key}
																className=""
															>
																{/* <ClickAwayListener
																	onClickAway={() =>
																		setAnchorEl(null)
																	}
																> */}
																<div
																	onClick={option.func}
																	className="font-proxima-nova w-[150px] px-3 md:py-1  text-[#787878] cursor-pointer hover:text-primary "
																>
																	{option?.name}
																</div>
																{/* </ClickAwayListener> */}
															</div>
														)
													)}
												</Box>
											</Popper>
										</div>

										{/* <Dropdown
											mainClass="p-0 md:p-auto w-[176px] text-center"
											icons={
												<BiDotsVerticalRounded className="text-2xl text-gray-800 relative" />
											}
											itemsClasses={{
												root: 'font-proxima-nova w-[168px] px-3 md:py-1 hover:text-primary  text-[#787878]',
											}}
											options={dropDownOptions}
											id={item.id}
										/> */}
									</td>
								</tr>
							))}
					</tbody>
				</table>
			)}
			{data?.length === 0 && (
				<div className="text-red-400 py-2 2xl:mt-20 h-96 text-xl flex justify-center items-center">
					<div className="flex flex-col ">
						<img
							src="/images/no-blog.svg"
							alt=""
							className="w-full h-28"
							srcSet=""
						/>
						<span className="w-full text-center mt-2">No Blog Found</span>
					</div>
				</div>
			)}
		</>
	);
}
