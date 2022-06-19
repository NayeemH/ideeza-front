import Button from '@atoms/button';
import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';
import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { apiService } from 'utils/request';

const GeneralSkill: React.FC<any> = ({
	refSkills,
	setSkillNew,
	getUserSkillsData,
	changeSelectedSkills,
	userCurrentSkills,
	setOpen,
}) => {
	const [skills, setSkills] = useState<any>([]);
	const [name, setSkill] = useState(null);
	const [loading, setLoading] = useState(false);
	const [experience, setExperience] = useState<number>(1);
	const [clickedBtn, setClickedBtn] = useState<number>();
	// console.log(userCurrentSkills);

	const postSkill = async (skillData: any) => {
		setLoading(true);
		await apiService(
			{
				method: 'post',
				url: `/account/user-skill/`,
				token: true,
				data: skillData,
			},
			() => {
				getUserSkillsData();
				setLoading(false);
			}
		);
	};
	const updateSkill = async (skillData: any) => {
		setLoading(true);
		await apiService(
			{
				method: 'patch',
				url: `/account/user-skill/`,
				token: true,
				data: skillData,
			},
			() => {
				setLoading(false);
			}
		);
	};
	const deleteSkill = async (id: any) => {
		setLoading(true);
		const ID = userCurrentSkills.find((userSkill: any) => userSkill?.skill?.id === id)?.id;
		await apiService(
			{
				method: 'delete',
				url: `/account/user-skill/${ID}/`,
				token: true,
			},
			() => {
				getUserSkillsData();
				setLoading(false);
			}
		);
	};

	useEffect(() => {
		if (refSkills) {
			setSkills(refSkills);
		}
	}, [refSkills]);
	useEffect(() => {
		setSkillNew(skills);
	}, [skills, setSkillNew]);
	const addSkills = () => {
		const Skill = skills;
		Skill.push({
			name,
			experience,
		});
		postSkill({
			skill: 1,
			yearsExperience: 1,
		});
		setSkills(null);
		setExperience(1);
		setSkills(() => [...Skill]);
	};

	const handleExperience = (e: any) => {
		return setExperience(e?.target?.value);
	};
	useEffect(() => {
		('');
	}, [skills]);
	return (
		<div className=" w-auto xl:w-[450px] 2xl:w-[640px] bg-white text-[#999999] border border-[#7A7A7A] border-solid px-5 py-4">
			<IconLabel
				labelValue={
					<>
						<span>Skills</span>
						<span>Experience</span>{' '}
					</>
				}
				mainClass="flex items-start flex-row-reverse justify-between"
				iconContanerClass="text-2xl text-gray-800"
				lableClass={{
					root: 'uppercase tracking-normal text-[#999999] font-semibold text-base flex justify-between w-full border-b border-gray-200 pb-2 mb-3',
				}}
				tooltipProps={{ open: false }}
				iconComponent={
					<>
						<FaChevronDown
							onClick={() => setOpen(false)}
							className="text-primary text-2xl ml-8 cursor-pointer"
						/>
					</>
				}
			/>
			{/* <div className="w-full flex justify-center"> */}
			<div className="">
				<Label
					value="Select Your skill"
					className="text-lg text-primary "
				/>

				<div className="flex flex-col  w-full pb-8">
					{skills?.map((v: any, key: number) => {
						return (
							<div key={key}>
								<div
									className="w-full grid grid-cols-4 lg:pb-2 2xl:pb-4 mb-2 gap-x-4 gap-y-2 items-center cursor-pointer"
									onClick={() => changeSelectedSkills(v)}
								>
									<IconLabel
										labelValue={v?.name}
										mainClass="flex items-center space-x-2"
										iconContanerClass="text-2xl text-gray-800"
										lableClass={{
											root: 'tracking-tight text-gray-700 text-base 2xl:text-xl underline',
										}}
										tooltipProps={{ open: false }}
									/>
									<select
										placeholder={
											experience ? `${experience} Year` : 'Select Years'
										}
										name=""
										id=""
										onChange={(e?: any) => handleExperience(e)}
										className="h-full  col-span-2 text-base 2xl:text-xl px-2 py-2 bg-gray-100 border border-gray-800 focus:outline-none border-opacity-50 rounded"
									>
										{[
											{ name: '1 Year experience', value: 1 },
											{ name: '2 Years experience', value: 2 },
											{ name: '3 Years experience', value: 3 },
											{ name: '4 Years experience', value: 4 },
											{ name: '5 Years experience', value: 5 },
										].map((arr: any, ind: number) => (
											<option
												key={ind}
												value={arr.value}
											>
												{arr.name}
											</option>
										))}
									</select>
									{!userCurrentSkills
										?.map((userSkill: any) => userSkill?.skill?.id)
										.includes(v?.id) ? (
										<Button
											onClick={() => {
												setClickedBtn(v.id);
												postSkill({
													skill: v.id,
													yearsExperience: +experience,
												});
											}}
											loading={clickedBtn === v.id && loading}
											value={'add'}
											className="text-white h-8 bg-primary text-sm"
											variant="outlined"
										/>
									) : (
										<div className="flex">
											<Button
												onClick={() => {
													// setHandleAddSkillLoader(true);
													deleteSkill(v.id);
												}}
												loading={clickedBtn === v.id && loading}
												value={'remove'}
												className="text-white h-8  bg-primary text-sm mr-2"
											/>
											<Button
												onClick={() => {
													updateSkill({
														skill: v.id,
														yearsExperience: +experience,
													});
												}}
												// disabled={previouslySelected(v) ? true : false}
												loading={clickedBtn === v.id && loading}
												value={'update'}
												className="text-white h-8  bg-primary text-sm"
											/>
										</div>
									)}
									{/* <Label
                    value={`- ${v.experience} year experience`}
                    classes={{
                      root: "text-gray-900 text-base 2xl:text-xl font-sans tracking-normal",
                    }}
                  /> */}
								</div>
							</div>
						);
					})}
					{/* </div> */}
				</div>
			</div>

			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center justify-between">
					<input
						defaultValue={''}
						type="text"
						onChange={(e?: any) => setSkill(e?.target?.value)}
						placeholder="Enter Skill"
						className="md:w-36 p-1 py-2 w-14  bg-gray-100 text-base 2xl:text-xl tracking-tight font-sans border border-gray-800 border-opacity-50 focus:outline-none rounded"
					/>
				</div>

				<select
					placeholder={experience ? `${experience} Year` : 'Select Years'}
					name=""
					id=""
					onChange={(e?: any) => handleExperience(e)}
					className="h-full w-[30%] text-base 2xl:text-xl px-2 py-2 bg-gray-100 border border-gray-800 focus:outline-none border-opacity-50 rounded"
				>
					{[
						{ name: '1 Year', value: '1' },
						{ name: '2 Years', value: '2' },
						{ name: '3 Years', value: '3' },
						{ name: '4 Years', value: '4' },
						{ name: '5 Years', value: '5' },
					].map((arr: any, ind: number) => (
						<option
							key={ind}
							value={arr.value}
						>
							{arr.name}
						</option>
					))}
				</select>
			</div>
			<Label
				value="+ Add More"
				classes={{
					root: 'text-primary underline text-base 2xl:text-xl font-sans tracking-tight cursor-pointer pt-2',
				}}
				onClick={addSkills}
			/>
		</div>
	);
};

export default GeneralSkill;
