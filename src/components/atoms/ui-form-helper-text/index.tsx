import { Fade, FormHelperText } from '@mui/material';

const UiFormHelperText = (props: any) => {
	const { message, children, helpTextClasses, defaultColor } = props;
	return (
		<>
			{message || children ? (
				<Fade in={message || children ? true : false}>
					<FormHelperText
						className={`${helpTextClasses}${
							message || children ? ` ${defaultColor}` : ''
						}`}
					>
						{children ? children : message}
					</FormHelperText>
				</Fade>
			) : (
				<></>
			)}
		</>
	);
};

UiFormHelperText.defaultProps = {
	helpTextClasses: 'text-base italic eina-font-r03 mt-1',
	defaultColor: 'text-red-500',
};

export default UiFormHelperText;
