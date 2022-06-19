import classes from './steppers.module.css';

interface SteppersProps {
	currentStep: number;

	className: string;
	stepStyle?: string;
	trueStyle?: string;
	options: string[];
	icons: { [key: string]: JSX.Element };
}

const Steppers: React.FC<SteppersProps> = ({
	className,
	options,
	icons,
	currentStep,
	stepStyle,
	trueStyle,
}) => {
	return (
		<div className={className}>
			<ul
				className={`grid grid-cols-${
					options.length === 6 ? 8 + ' ml-8 md:ml-40' : options.length
				}`}
			>
				{/* TODO */}
				{/* <ul className={`grid grid-cols-${8}`}> */}
				{options.map((item: string, i: number) => (
					// className={`${currentStep <= i && "dddd"}`}
					<li
						key={i}
						// className={classes.connector}
						className={currentStep >= i ? classes.connector : classes.connector2}
					>
						<div className="flex justify-center mb-3">
							<span
								className={
									(currentStep >= i
										? 'bg-primary z-[500] text-white custom-svg-color ' +
										  trueStyle
										: // : "bg-white text-gray-600") +
										  'bg-white text-[#999999]') + stepStyle
								}
							>
								{icons[i + 1]}
							</span>
						</div>
						<div className="text-center">
							<h4
								className={
									(currentStep >= i ? ' text-primary ' : 'text-[#999999] ') +
									' font-medium texl-lg 2xl:text-2xl eina-font-sb03 tracking-tight'
								}
							>
								{item}
							</h4>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
};
Steppers.defaultProps = {
	// ProjectName: "Anonymous Project",
	stepStyle:
		' w-16 h-16 text-center font-sans rounded-full border border-primary text-2xl flex items-center justify-center overflow-hidden',
};
export default Steppers;
