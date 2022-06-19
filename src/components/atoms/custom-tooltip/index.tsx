import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip
		{...props}
		arrow
		classes={{ popper: className }}
	/>
))(({ theme }: any) => ({
	[`& .${tooltipClasses.arrow}`]: {
		color: '#E5E5E5',
		fontSize: '50px',
	},
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#E5E5E5',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 800,
		boxShadow: theme.shadows[4],
		padding: 30,
	},
}));

export default CustomTooltip;
