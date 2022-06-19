import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

const Calendar = () => {
	const [value, setValue] = useState<Date | null>(new Date());

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<StaticDatePicker<Date>
				displayStaticWrapperAs="desktop"
				// components={{ LeftArrowButton?: elementType, LeftArrowIcon?: elementType, OpenPickerIcon?: elementType, RightArrowButton?: elementType, RightArrowIcon?: elementType, SwitchViewButton?: elementType, SwitchViewIcon?: elementType }}
				value={value}
				onChange={(newValue) => {
					setValue(newValue);
				}}
				renderInput={(params) => <TextField {...params} />}
			/>
		</LocalizationProvider>
	);
};

export default Calendar;
