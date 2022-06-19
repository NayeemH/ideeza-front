import Tooltip from '@mui/material/Tooltip';

export default function SimpleToolTip(props: any) {
	return (
		<Tooltip
			title={props.title}
			arrow={props?.arrow}
			{...props}
		>
			{props?.children}
		</Tooltip>
	);
}
