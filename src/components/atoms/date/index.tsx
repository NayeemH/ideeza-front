import React from 'react';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
const Date: React.FC<any> = (props) => {
	const [value, setValue] = React.useState<Date | null>(null);

	// return (
	//   <LocalizationProvider dateAdapter={AdapterDateFns}>
	//     <StaticDatePicker
	//       displayStaticWrapperAs="desktop"
	//       openTo="year"
	//       value={props.value}
	//       onChange={(newValue) => {
	//         props.change(newValue);
	//       }}
	//       renderInput={(params) => <TextField {...params} />}
	//       disableToolbar
	//       // className={props.className}
	//       variant={props.variant}
	//       format="MM/dd/yyyy"
	//       {...props}
	//       margin="normal"
	//       id="date-picker-inline"
	//       label="Date picker inline"
	//       KeyboardButtonProps={{
	//         "aria-label": "change date",
	//       }}
	//     />
	//   </LocalizationProvider>
	// );
	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<DatePicker
				label={props?.noLabel ? '' : 'Enter your birthday'}
				value={value}
				onChange={(newValue) => {
					setValue(newValue);
				}}
				renderInput={(params) => <TextField {...params} />}
			/>
		</LocalizationProvider>
	);
};
Date.defaultProps = {
	variant: 'static',
};
export default Date;
