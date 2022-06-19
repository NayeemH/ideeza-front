import Button from '@atoms/button';
import Label from '@atoms/label';
import React, { useEffect, useState, useRef } from 'react';
import { useFormContext } from 'react-hook-form';
// import { MdClose } from 'react-icons/md';
import { IoCloseSharp } from 'react-icons/io5';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useOutsideClickHandler } from 'utils/utils';

import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	Line,
	LineChart,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
	PieChart,
	Pie,
} from 'recharts';
import { Box, IconButton } from '@mui/material';

export default function AddChart() {
	const chartTypePopupRef = useRef(null);
	const {
		// register,
		// control,
		setValue,
		getValues,
		formState: { errors },
		setError,
		clearErrors,
	} = useFormContext();

	const formValues = getValues();
	/*const { fields, append, remove } = useFieldArray({
    control,
    name: "chart.values",
  });*/

	//const [activeChartTab, setActiveChartTab] = useState<"line" | "bar">("line");
	const [defaultExpanded, setDefaultExpanded] = React.useState<boolean>(false);
	const [expanded, setExpanded] = useState<string | false>('panel1');
	const [selectedChartIndex, setSelectedChartIndex] = useState<number>(-1);
	//const [selectedChartType, setSelectedChartType] = useState<'line' | 'bar' | 'pie'>('line');

	const [chartTypePopupOpen, setChartTypePopupOpen] = useState(false);

	const handleAccordionChange =
		(panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
			const expanded = newExpanded ? panel : false;
			if (expanded === false) {
				setSelectedChartIndex(-1);
			}
			setExpanded(expanded);
			if (defaultExpanded) {
				setDefaultExpanded(false);
			}
		};

	// const handleChangeChartType = (type: 'line' | 'bar' | 'pie') => {
	// 	setSelectedChartType(type);

	// 	if (chartData && chartData.length > 0) {
	// 		for (let i = 0; i < chartData.length; i++) {
	// 			if (chartData[i]?.chart_type === type) {
	// 				setExpanded(`panel${i + 1}`);
	// 				return;
	// 			} else {
	// 				setExpanded('panel1');
	// 			}
	// 		}
	// 	}
	// };

	const deleteChart = (chartIndex: number) => {
		if (chartData && chartData.length > 0) {
			const __chartData = [...chartData];
			__chartData.splice(chartIndex, 1);
			setChartData(() => __chartData);
		}
	};

	interface IChartValue {
		x?: string;
		y?: string;
	}

	interface IChartData {
		chart_type: 'line' | 'pie' | 'bar';
		title?: string;
		label_x?: string;
		label_x_input?: string;
		label_y?: string;
		label_y_input?: string;
		unit_x_one?: string;
		unit_x_two?: string;
		unit_y_one?: string;
		unit_y_two?: string;
		values?: IChartValue[];
	}

	const initialChartValue = {
		x: '',
		y: '',
	};

	const initialChartData = (chartType: IChartData['chart_type']) => [
		{
			chart_type: chartType,
			title: 'New Chart',
			label_x: '',
			label_x_input: '',
			label_y: '',
			label_y_input: '',
			unit_x_one: '',
			unit_x_two: '',
			unit_y_one: '',
			unit_y_two: '',
			values: [{ ...initialChartValue }],
		},
	];

	// const initialChartArray = initialChartData('bar');

	const [chartData, setChartData] = useState<IChartData[]>(
		formValues?.chart && formValues?.chart?.length > 0 ? formValues?.chart : []
	);

	const updateChartDataByKey = (index: number, key: keyof IChartData, value: any) => {
		const tempChartData = [...chartData];

		if (index > -1 && tempChartData.length > 0) {
			tempChartData[index][key] = value;
		}

		setChartData(() => tempChartData);
	};

	const addNewChartValue = () => {
		const tempChartData = [...chartData];

		if (selectedChartIndex > -1 && tempChartData.length > 0) {
			const values = tempChartData[selectedChartIndex].values;

			if (values && values.length > 0 && tempChartData && tempChartData[selectedChartIndex]) {
				if (tempChartData && tempChartData[selectedChartIndex]?.values) {
					(tempChartData[selectedChartIndex].values as any).push(initialChartValue);
				}
			}
		}

		setChartData(() => tempChartData);
	};

	const deleteChartValue = (chartIndex: number, valueIndex: number) => {
		const tempChartData = [...chartData];

		if (chartIndex > -1 && tempChartData.length > 0) {
			if (tempChartData[chartIndex] && tempChartData[chartIndex].values) {
				const values = tempChartData[chartIndex].values as any;
				values.splice(valueIndex, 1);

				tempChartData[chartIndex].values = values;
			}
		}

		setChartData(() => tempChartData);
	};

	const updateChartValueFields = (
		chartIndex: number,
		valueIndex: number,
		key: keyof IChartValue,
		value: any
	) => {
		const tempChartData = [...chartData];

		if (chartIndex > -1 && tempChartData.length > 0 && valueIndex > -1) {
			if (tempChartData[chartIndex] && tempChartData[chartIndex].values) {
				(tempChartData[chartIndex].values as any)[valueIndex][key] = value;
			}
		}

		setChartData(() => tempChartData);
	};

	/* const getSelectedChartType = () => {
        if (selectedChartIndex > -1 && chartData.length > 0) {
            return chartData[selectedChartIndex]?.chart_type;
        }

        return null;
    }; */

	const addNewChart = (chartType: IChartData['chart_type']) => {
		setChartData((prev) => [...prev, ...initialChartData(chartType)]);
		setChartTypePopupOpen(false);
	};

	// const getCurrentSelectedChartData = () => {
	// 	if (selectedChartIndex > -1 && chartData.length > 0) {
	// 		return chartData[selectedChartIndex];
	// 	}

	// 	return null;
	// };

	// const currentChartData = getCurrentSelectedChartData();

	useOutsideClickHandler(chartTypePopupRef, () => setChartTypePopupOpen(false));

	useEffect(() => {
		setValue('chart', chartData);
		if (chartData.length > 0) {
			clearErrors('chart');
		} else {
			setError('chart', {
				message: 'Please check chart tab',
			});
		}
	}, [chartData]);

	return (
		<div className="">
			{chartData && chartData?.length > 0 ? (
				<>
					<div className="text-center pb-4 relative">
						<Button
							value="Add new chart"
							className="text-white bg-primary relative  pb-[8px] pt-[12px] px-[30px]"
							onClick={() => setChartTypePopupOpen(true)}
						/>

						{chartTypePopupOpen && (
							<>
								<Box
									ref={chartTypePopupRef}
									sx={{
										position: 'absolute',
										top: '45px',
										left: 0,
										right: 0,
										zIndex: 1000,
										display: 'flex',
										justifyContent: 'center',

										'& .popup-body': {
											background: '#ffffff',
											borderRadius: '5px',
											height: '60px',
											width: '200px',
											display: 'flex',
											justifyContent: 'space-between',
											alignItems: 'center',
											padding: '7px 10px',
											boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
										},
									}}
									className=""
								>
									<div className="popup-body">
										<Box
											sx={{
												display: 'inline-block',
												padding: '5px 5px',
												borderRadius: 1,
												textAlign: 'center',
												'&:hover': {
													backgroundColor: '#eeeeee',
												},
											}}
											onClick={() => {
												addNewChart('bar');
											}}
										>
											<img
												src="/images/technician-profile/Path-16782.svg"
												className="mr-2"
												alt="hy"
											/>
										</Box>
										<Box
											sx={{
												display: 'inline-block',
												padding: '5px 5px',
												borderRadius: 1,
												textAlign: 'center',
												'&:hover': {
													backgroundColor: '#eeeeee',
												},
											}}
											onClick={() => {
												//updateChartDataByKey(selectedChartIndex, "chart_type", "pie")
												addNewChart('pie');
											}}
										>
											<img
												src="/images/technician-profile/Group-5067.svg"
												className="mr-2"
												alt="ui"
											/>
										</Box>
										<Box
											sx={{
												display: 'inline-block',
												padding: '5px 5px',
												borderRadius: 1,
												textAlign: 'center',
												'&:hover': {
													backgroundColor: '#eeeeee',
												},
											}}
											onClick={() => {
												//updateChartDataByKey(selectedChartIndex, "chart_type", "line")
												addNewChart('line');
											}}
										>
											<img
												src="/images/technician-profile/Path-16781.svg"
												alt="hu"
											/>
										</Box>
									</div>
								</Box>
							</>
						)}
					</div>
					<div className="w-full bg-white grid grid-cols-12 items-start md:gap-x-2 gap-y-2 md:gap-y-0">
						<div className="h-[100%] overflow-y-scroll col-span-7 2xl:col-span-6">
							{chartData.map((chart, index) => (
								<Accordion
									key={index}
									onClick={() => setSelectedChartIndex(index)}
									expanded={
										defaultExpanded ? true : expanded === `panel${index + 1}`
									}
									onChange={handleAccordionChange(`panel${index + 1}`)}
								>
									<AccordionSummary
										expandIcon={<ExpandMoreIcon />}
										aria-controls="panel1a-content"
										id="panel1a-header"
									>
										<div style={{ width: '100%' }}>
											<span>{chart?.title}</span>
											<div style={{ float: 'right' }}>
												<IconButton
													size={'small'}
													onClick={(e: any) => {
														e.stopPropagation();
														deleteChart(index);
													}}
												>
													<DeleteIcon />
												</IconButton>
											</div>
										</div>
									</AccordionSummary>
									<AccordionDetails className="p-0">
										<div className="bg-white w-full pt-4 px-4 overflow-hidden border">
											<div className="grid grid-cols-5 items-center w-full p-2 md:pl-4 border-b border-gray-750">
												<Label value="Chart Title" />
												<div className="col-span-4 flex items-center pl-2">
													<div className="w-[93%] md:ml-1">
														<input
															type="text"
															placeholder={'Chart Title'}
															className=" pl-[15px] py-[12px] border border-solid rounded-[6px] border-[#E6E6E6] bg-[#FBFBFB] w-full outline-none placeholder-[#B9B9B9] text-[16px] font-proxima-nova"
															value={chart?.title}
															onChange={(
																e: React.ChangeEvent<HTMLInputElement>
															) => {
																updateChartDataByKey(
																	index,
																	'title',
																	e.target.value
																);
															}}
															onBlur={(e) => {
																if (e.target.value.trim() === '') {
																	updateChartDataByKey(
																		index,
																		'title',
																		'New Chart'
																	);
																}
															}}
														/>
													</div>
													{/* <div className="lg:w-10 md:w-8 w-5"></div> */}
												</div>
											</div>

											<div className="grid grid-cols-5 w-full py-2 md:pl-4 border-b border-gray-750">
												{chart?.chart_type !== 'pie' && (
													<Label value="Label" />
												)}

												{/* new from Design */}
												<div className="col-span-4 ">
													{chart?.chart_type !== 'pie' && (
														<div className="flex items-center md:space-x-4 space-x-2">
															<div className="flex items-center gap-2 w-[46%]">
																<span>X</span>
																<input
																	type="number"
																	className="form-input block xl:mb-2 2xl:mb-0 border border-solid rounded-[6px] border-[#E6E6E6]"
																	placeholder={'Label X'}
																	value={chart?.label_x_input}
																	onChange={(
																		e: React.ChangeEvent<HTMLInputElement>
																	) => {
																		updateChartDataByKey(
																			index,
																			'label_x_input',
																			e.target.value
																		);
																		updateChartDataByKey(
																			index,
																			'label_x',
																			`${e.target.value}${chart?.unit_x_one}${chart?.unit_x_two}`
																		);
																	}}
																/>
																<select
																	className="form-select  block border border-solid rounded-[6px] border-[#E6E6E6] "
																	value={chart?.unit_x_one}
																	onChange={(
																		e: React.ChangeEvent<HTMLSelectElement>
																	) => {
																		updateChartDataByKey(
																			index,
																			'unit_x_one',
																			e.target.value
																		);
																		updateChartDataByKey(
																			index,
																			'label_x',
																			`${chart?.label_x_input}${e.target.value}${chart?.unit_x_two}`
																		);
																	}}
																>
																	<option value="">m</option>
																	{[
																		'p',
																		'n',
																		'u',
																		'm',
																		'r',
																		'k',
																		'M',
																		'G',
																	].map((item, i) => (
																		<option
																			value={item}
																			key={i}
																		>
																			{item}
																		</option>
																	))}
																</select>
																<select
																	className="form-select  block border border-solid rounded-[6px] border-[#E6E6E6]"
																	value={chart?.unit_x_two}
																	onChange={(
																		e: React.ChangeEvent<HTMLSelectElement>
																	) => {
																		updateChartDataByKey(
																			index,
																			'unit_x_two',
																			e.target.value
																		);
																		updateChartDataByKey(
																			index,
																			'label_x',
																			`${chart?.label_x_input}${chart?.unit_x_one}${e.target.value}`
																		);
																	}}
																>
																	<option value="">v</option>
																	{[
																		'p',
																		'n',
																		'u',
																		'm',
																		'r',
																		'k',
																		'M',
																		'G',
																	].map((item, i) => (
																		<option
																			value={item}
																			key={i}
																		>
																			{item}
																		</option>
																	))}
																</select>
															</div>

															<div className="flex items-center gap-2 w-[45%]">
																<span>Y</span>
																<input
																	type="number"
																	className="form-input block xl:mb-2 2xl:mb-0 border border-solid rounded-[6px] border-[#E6E6E6]"
																	placeholder={'Label Y'}
																	value={chart?.label_y_input}
																	onChange={(
																		e: React.ChangeEvent<HTMLInputElement>
																	) => {
																		updateChartDataByKey(
																			index,
																			'label_y_input',
																			e.target.value
																		);
																		updateChartDataByKey(
																			index,
																			'label_y',
																			`${e.target.value}${chart?.unit_y_one}${chart?.unit_y_two}`
																		);
																	}}
																/>
																<select
																	className="form-select  block border border-solid rounded-[6px] border-[#E6E6E6] "
																	value={chart?.unit_y_one}
																	onChange={(
																		e: React.ChangeEvent<HTMLSelectElement>
																	) => {
																		updateChartDataByKey(
																			index,
																			'unit_y_one',
																			e.target.value
																		);
																		updateChartDataByKey(
																			index,
																			'label_y',
																			`${chart?.label_y_input}${e.target.value}${chart?.unit_y_two}`
																		);
																	}}
																>
																	<option value="">m</option>
																	{[
																		'p',
																		'n',
																		'u',
																		'm',
																		'r',
																		'k',
																		'M',
																		'G',
																	].map((item, i) => (
																		<option
																			value={item}
																			key={i}
																		>
																			{item}
																		</option>
																	))}
																</select>
																<select
																	className="form-select block border border-solid rounded-[6px] border-[#E6E6E6]"
																	value={chart?.unit_y_two}
																	onChange={(
																		e: React.ChangeEvent<HTMLSelectElement>
																	) => {
																		updateChartDataByKey(
																			index,
																			'unit_y_two',
																			e.target.value
																		);
																		updateChartDataByKey(
																			index,
																			'label_y',
																			`${chart?.label_y_input}${chart?.unit_y_one}${e.target.value}`
																		);
																	}}
																>
																	<option value="">v</option>
																	{[
																		'p',
																		'n',
																		'u',
																		'm',
																		'r',
																		'k',
																		'M',
																		'G',
																	].map((item, i) => (
																		<option
																			value={item}
																			key={i}
																		>
																			{item}
																		</option>
																	))}
																</select>
															</div>
														</div>
													)}

													{chart?.chart_type === 'line' && (
														<>
															{chart?.values &&
																chart?.values.length > 0 &&
																chart?.values?.map(
																	(value, valueIndex) => (
																		<div
																			className="flex items-center md:space-x-4 mt-4 space-x-2"
																			key={index}
																		>
																			<div className="flex items-center gap-2 ">
																				<span>X</span>
																				<input
																					type="number"
																					className="form-input block xl:mb-2 2xl:mb-0 border border-solid rounded-[6px] border-[#E6E6E6]"
																					placeholder={
																						'Value for X'
																					}
																					value={value?.x}
																					onChange={(
																						e: React.ChangeEvent<HTMLInputElement>
																					) => {
																						updateChartValueFields(
																							index,
																							valueIndex,
																							'x',
																							e.target
																								.value
																						);
																					}}
																				/>
																			</div>
																			<div className="flex items-center gap-2 ">
																				<span>Y</span>
																				<input
																					type="number"
																					className="form-input block xl:mb-2 2xl:mb-0 border border-solid rounded-[6px] border-[#E6E6E6]"
																					placeholder={
																						'Value for Y'
																					}
																					value={value?.y}
																					onChange={(
																						e: React.ChangeEvent<HTMLInputElement>
																					) => {
																						updateChartValueFields(
																							index,
																							valueIndex,
																							'y',
																							e.target
																								.value
																						);
																					}}
																				/>
																			</div>

																			{valueIndex !== 0 && (
																				<IoCloseSharp
																					className="cursor-pointer"
																					onClick={() =>
																						deleteChartValue(
																							index,
																							valueIndex
																						)
																					}
																				/>
																			)}
																		</div>
																	)
																)}
														</>
													)}

													{(chart?.chart_type === 'bar' ||
														chart?.chart_type === 'pie') && (
														<>
															{chart?.values &&
																chart?.values.length > 0 &&
																chart?.values?.map(
																	(value, valueIndex) => (
																		<div
																			className="flex items-center md:space-x-4 mt-4 space-x-2"
																			key={index}
																		>
																			<div className="flex items-center gap-2 ">
																				<span>
																					Category
																				</span>
																				<input
																					type="text"
																					className="form-input block xl:mb-2 2xl:mb-0 border border-solid rounded-[6px] border-[#E6E6E6]"
																					placeholder={
																						'Category'
																					}
																					value={value?.x}
																					onChange={(
																						e: React.ChangeEvent<HTMLInputElement>
																					) => {
																						updateChartValueFields(
																							index,
																							valueIndex,
																							'x',
																							e.target
																								.value
																						);
																					}}
																				/>
																			</div>
																			<div className="flex items-center gap-2 ">
																				<span>
																					Percentage
																				</span>
																				<input
																					type="number"
																					className="form-input block xl:mb-2 2xl:mb-0 border border-solid rounded-[6px] border-[#E6E6E6]"
																					placeholder={
																						'Percentage'
																					}
																					value={value?.y}
																					onChange={(
																						e: React.ChangeEvent<HTMLInputElement>
																					) => {
																						updateChartValueFields(
																							index,
																							valueIndex,
																							'y',
																							e.target
																								.value
																						);
																					}}
																				/>
																			</div>

																			{valueIndex !== 0 && (
																				<IoCloseSharp
																					className="cursor-pointer"
																					onClick={() =>
																						deleteChartValue(
																							index,
																							valueIndex
																						)
																					}
																				/>
																			)}
																		</div>
																	)
																)}
														</>
													)}
												</div>
											</div>

											<Button
												onClick={addNewChartValue}
												value="+ Add new value"
												className="bg-gray-375 w-full transform-none py-3 rounded-none text-md text-primary tracking-tight font-sans"
											/>
										</div>
									</AccordionDetails>
								</Accordion>
							))}
						</div>

						<div className="bg-white p-5 col-span-5 2xl:col-span-6">
							<div className={'mt-5'}>
								{expanded && chartData && chartData?.length > 0 ? (
									chartData.map((chart, index) => (
										<>
											{index === selectedChartIndex && (
												<Accordion
													onClick={() => setSelectedChartIndex(index)}
													expanded={
														defaultExpanded
															? true
															: expanded === `panel${index + 1}`
													}
													onChange={handleAccordionChange(
														`panel${index + 1}`
													)}
												>
													<AccordionSummary
														aria-controls="panel1a-content"
														id="panel1a-header"
														sx={{
															'& .MuiAccordionSummary-content': {
																display: 'flex',
																justifyContent: 'center !important',
															},
														}}
													>
														<div>{chart?.title}</div>
													</AccordionSummary>
													<AccordionDetails
														style={{
															padding: 5,
															border: '1px solid #eeeeee',
														}}
													>
														<div>
															{chart &&
																chart?.chart_type === 'line' &&
																chart?.values && (
																	<>
																		{chart?.values?.length >
																			0 && (
																			<ResponsiveContainer
																				width="100%"
																				height={300}
																			>
																				<LineChart
																					width={500}
																					data={chart?.values.map(
																						(
																							field: any
																						) => ({
																							X: field?.x,
																							Y: field?.y,
																						})
																					)}
																					className="w-full"
																					margin={{
																						top: 5,
																						right: 30,
																						left: 20,
																						bottom: 5,
																					}}
																				>
																					<CartesianGrid strokeDasharray="3 3" />
																					<XAxis dataKey="name" />
																					<YAxis />
																					<Tooltip />
																					<Legend />
																					<Line
																						type="monotone"
																						dataKey="X"
																						stroke="#8884d8"
																					/>
																					<Line
																						type="monotone"
																						dataKey="Y"
																						stroke="#82ca9d"
																					/>
																				</LineChart>
																			</ResponsiveContainer>
																		)}
																	</>
																)}

															{chart &&
																chart?.chart_type === 'bar' &&
																chart?.values && (
																	<>
																		{chart?.values?.length >
																			0 && (
																			<ResponsiveContainer
																				width="100%"
																				height={300}
																			>
																				<BarChart
																					width={500}
																					height={300}
																					data={chart?.values.map(
																						(
																							field: any
																						) => ({
																							X: field?.x,
																							Y: field?.y,
																						})
																					)}
																					margin={{
																						top: 5,
																						right: 30,
																						left: 20,
																						bottom: 5,
																					}}
																				>
																					<CartesianGrid strokeDasharray="3 3" />
																					<XAxis dataKey="name" />
																					<YAxis />
																					<Tooltip />
																					<Legend />
																					<Bar
																						dataKey="X"
																						fill="#8884d8"
																					/>
																					<Bar
																						dataKey="Y"
																						fill="#82ca9d"
																					/>
																				</BarChart>
																			</ResponsiveContainer>
																		)}
																	</>
																)}

															{chart &&
																chart?.chart_type === 'pie' &&
																chart?.values && (
																	<>
																		{chart?.values?.length >
																			0 && (
																			<ResponsiveContainer
																				width="100%"
																				height={300}
																			>
																				<PieChart
																					width={300}
																					height={250}
																				>
																					<Pie
																						data={chart?.values.map(
																							(
																								field: any
																							) => ({
																								name: 'X',
																								value: Number(
																									field?.x
																								),
																							})
																						)}
																						dataKey="value"
																						nameKey="name"
																						cx="50%"
																						cy="50%"
																						outerRadius={
																							50
																						}
																						fill="#8884d8"
																					/>
																					<Pie
																						data={chart?.values.map(
																							(
																								field: any
																							) => ({
																								name: 'Y',
																								value: Number(
																									field?.y
																								),
																							})
																						)}
																						dataKey="value"
																						nameKey="name"
																						cx="50%"
																						cy="50%"
																						innerRadius={
																							60
																						}
																						outerRadius={
																							80
																						}
																						fill="#82ca9d"
																						label
																					/>
																				</PieChart>
																			</ResponsiveContainer>
																		)}
																	</>
																)}
														</div>
													</AccordionDetails>
												</Accordion>
											)}
										</>
									))
								) : (
									<>
										<div className={'flex justify-center items-center w-full'}>
											<img
												src={'/images/electronics/chart-img.svg'}
												alt={'Chart Image'}
											/>
										</div>
									</>
								)}
							</div>
						</div>
					</div>
				</>
			) : (
				<div className={'flex flex-col justify-center items-center h-[530px] w-full'}>
					<div className={'mb-[10px]'}>
						<Box
							sx={{
								display: 'inline-block',
								padding: '5px 5px',
								borderRadius: 1,
								textAlign: 'center',
								cursor: 'pointer',
								'&:hover': {
									backgroundColor: '#eeeeee',
								},
							}}
							onClick={() => {
								addNewChart('bar');
							}}
						>
							<img
								src="/images/technician-profile/Path-16782.svg"
								className="mr-2"
								alt="hy"
							/>
						</Box>
						<Box
							sx={{
								display: 'inline-block',
								padding: '5px 5px',
								borderRadius: 1,
								textAlign: 'center',
								cursor: 'pointer',
								'&:hover': {
									backgroundColor: '#eeeeee',
								},
							}}
							onClick={() => {
								//updateChartDataByKey(selectedChartIndex, "chart_type", "pie")
								addNewChart('pie');
							}}
						>
							<img
								src="/images/technician-profile/Group-5067.svg"
								className="mr-2"
								alt="ui"
							/>
						</Box>
						<Box
							sx={{
								display: 'inline-block',
								padding: '5px 5px',
								borderRadius: 1,
								textAlign: 'center',
								cursor: 'pointer',
								'&:hover': {
									backgroundColor: '#eeeeee',
								},
							}}
							onClick={() => {
								//updateChartDataByKey(selectedChartIndex, "chart_type", "line")
								addNewChart('line');
							}}
						>
							<img
								src="/images/technician-profile/Path-16781.svg"
								alt="hu"
							/>
						</Box>
					</div>
					<div className={'text-[30px] font-proxima-nova'}>
						Choose your first graph type
					</div>
				</div>
			)}
		</div>
	);
}
