import * as React from 'react';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import Box from '@mui/material/Box';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import { DateRange } from '@mui/lab/DateRangePicker';

export default function ResponsiveDateRangePicker() {
	const [value, setValue] = React.useState<DateRange<Date>>([null, null]);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<MobileDateRangePicker
				startText="start"
				value={value}
				onChange={(newValue) => {
					setValue(newValue);
				}}
				renderInput={(startProps, endProps) => (
					<>
						<input
							ref={startProps.inputRef as React.Ref<HTMLInputElement>}
							{...startProps.inputProps}
							className="max-w-[130px] text-primary focus:outline-none pl-2 text-base w-[100px] md:w-full xl:text-xl pr-0 bg-transparent"
						/>
						<Box sx={{ fontSize: '20px', marginLeft: '7px' }}> to </Box>
						<input
							ref={endProps.inputRef as React.Ref<HTMLInputElement>}
							{...endProps.inputProps}
							className="max-w-[150px] text-primary focus:outline-none pl-2 text-base xl:text-xl pr-0 bg-transparent w-[100px] md:w-full"
						/>
					</>
				)}
			/>
		</LocalizationProvider>
	);
}
