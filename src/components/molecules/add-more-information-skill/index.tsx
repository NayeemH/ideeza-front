import Label from '@atoms/label';
import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

interface AddMoreInformationProps {
	value: any;
	labelClasses: string;
	mainClass: string;
	skillList?: any;
	change: (e?: any) => void;
	personName?: any;
	names?: any;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
	PaperProps: {
		style: {
			maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
			width: 250,
		},
	},
};

const AddMoreInformationSkill: React.FC<AddMoreInformationProps> = (props: any) => {
	const { value, labelClasses, mainClass, skillList, change } = props;
	return (
		<>
			<div className={`items-center ${mainClass}`}>
				<Label
					value={'Skills'}
					classes={{ root: `font-sans tracking-tighter ${labelClasses}` }}
				/>
				<div className="flex items-center space-x-2 col-span-2">
					<div className="custom-form-input bg-[#FBFBFB]  w-full relative">
						<FormControl
							sx={{
								minWidth: 200,
								MaxWidth: 500,
								height: 48,
								'@media screen and (max-width: 480px)': {
									height: 75,
								},
							}}
							className="w-full"
						>
							<Select
								className="w-full h-11 rounded-md p-0 py-2 pl-2 md:text-base text-sm tracking-tight placeholder-[#999999] text-[#333333]  border border-[#E6E6E6] border-opacity-40"
								// multiple={true}
								displayEmpty
								input={<OutlinedInput />}
								value={value}
								onChange={change}
								variant="outlined"
								renderValue={(selected) => {
									if (selected === '') {
										return (
											<MenuItem
												disabled
												value=""
											>
												<em className="text-primary  text-base 2xl:text-xl underline  ">
													+ Add More
												</em>
											</MenuItem>
										);
									}
									return selected?.name;
								}}
								MenuProps={MenuProps}
								inputProps={{ 'aria-label': 'Without label' }}
							>
								{skillList?.length > 0 &&
									skillList.map((skill: any) => (
										<MenuItem
											key={skill?.id}
											value={skill}
											// style={getStyles(name, theme)}
										>
											{skill.name}
										</MenuItem>
									))}
							</Select>
						</FormControl>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddMoreInformationSkill;
