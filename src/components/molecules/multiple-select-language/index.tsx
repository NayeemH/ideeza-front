import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

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

const names = ['Bangla', 'English', 'Hindi', 'Korean', 'China', 'Spanish', 'German'];

function getStyles(name: string, personName: readonly string[], theme: Theme) {
	return {
		fontWeight:
			personName.indexOf(name) === -1
				? theme.typography.fontWeightRegular
				: theme.typography.fontWeightMedium,
	};
}

export default function MultipleSelect() {
	const theme = useTheme();
	const [personName, setPersonName] = React.useState<string[]>([]);

	const handleChange = (event: SelectChangeEvent<typeof personName>) => {
		const {
			target: { value },
		} = event;
		setPersonName(
			// On autofill we get a stringified value.
			typeof value === 'string' ? value.split(',') : value
		);
	};

	return (
		<div className="">
			<FormControl sx={{ width: 300, height: 48 }}>
				<Select
					multiple
					displayEmpty
					value={personName}
					onChange={handleChange}
					input={<OutlinedInput />}
					renderValue={(selected) => {
						if (selected.length === 0) {
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

						return selected.join(', ');
					}}
					MenuProps={MenuProps}
					inputProps={{ 'aria-label': 'Without label' }}
				>
					{names.map((name) => (
						<MenuItem
							key={name}
							value={name}
							style={getStyles(name, personName, theme)}
						>
							{name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
		</div>
	);
}
