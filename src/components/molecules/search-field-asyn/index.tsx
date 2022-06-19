import React from 'react';
import { TextField } from '@mui/material';
import { Autocomplete } from '@mui/lab';
const SearchInputAsync: React.FC<any> = ({ id, option, placeholder, setValue }) => {
	return (
		<>
			<Autocomplete
				id={id}
				options={option}
				// variant="standard"
				className="capitalize"
				onChange={(e, v) => setValue(v)}
				// getOptionLabel={(option) => `${option.first_name} ${option.last_name}`}
				renderInput={(params) => (
					<TextField
						{...params}
						color="primary"
						variant="outlined"
						label={placeholder}
						className="capitalize"
						// variant="outlined"
					/>
				)}
			/>
		</>
	);
};
SearchInputAsync.defaultProps = {
	option: [],
};
export default SearchInputAsync;
