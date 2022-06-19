import { InvestorIconType } from '@models/common';
import { FC } from 'react';

const InvestorIconFour: FC<InvestorIconType> = (props) => {
	const { id, width, height, dataName, viewBox } = props;

	return (
		<svg
			id={id}
			data-name={dataName}
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox={viewBox}
		>
			<path
				id="Path_135"
				data-name="Path 135"
				d="M88.667,257.822a6.628,6.628,0,0,0-1.691,4.084v17.2h9.986V251.92c0-1.321-.756-1.636-1.691-.7Z"
				transform="translate(-61.378 -181.786)"
			/>
			<path
				id="Path_136"
				data-name="Path 136"
				d="M237.7,202.431A6.642,6.642,0,0,0,236,206.517v33.5h9.986v-43.5c0-1.321-.756-1.634-1.691-.7Z"
				transform="translate(-166.546 -142.692)"
			/>
			<path
				id="Path_137"
				data-name="Path 137"
				d="M287.357,154.427a6.618,6.618,0,0,0-1.694,4.081v48.139h9.285V149.241c0-1.321-.758-1.636-1.694-.7Z"
				transform="translate(-201.588 -109.327)"
			/>
			<path
				id="Path_138"
				data-name="Path 138"
				d="M188.312,251.845s-.445.447-1,1a5.661,5.661,0,0,0-.993,3.39V275.1h9.986V246.247c0-1.321-.758-1.636-1.694-.7Z"
				transform="translate(-131.486 -177.783)"
			/>
			<path
				id="Path_139"
				data-name="Path 139"
				d="M138.344,249.71c-.935-.933-1.694-.62-1.694.7v27.632h9.986V260.375a6.434,6.434,0,0,0-1.605-3.99l-1.605-1.6Z"
				transform="translate(-96.432 -180.722)"
			/>
			<path
				id="Path_140"
				data-name="Path 140"
				d="M38.241,305.472l-3.225,3.23a6.028,6.028,0,0,0-1.689,3.589v1.895H44.473V301.623c0-1.32-.756-1.634-1.691-.7Z"
				transform="translate(-23.518 -216.861)"
			/>
			<path
				id="Path_141"
				data-name="Path 141"
				d="M105.4,56.07c.933.935,1.691.62,1.691-.7V21.185a4.888,4.888,0,0,0-4.778-4.591H68.328c-1.321,0-1.636.758-.7,1.694l12.089,12.1-4.931,4.909L51.917,58.185l-12.1-12.093a2.392,2.392,0,0,0-3.383,0L2.8,79.752a9.573,9.573,0,0,0,0,13.536l.235.237a9.565,9.565,0,0,0,13.531,0L38.127,71.953l12.1,12.084a2.4,2.4,0,0,0,3.385,0l39.873-39.88Z"
				transform="translate(0 -16.594)"
			/>
		</svg>
	);
};

InvestorIconFour.defaultProps = {
	id: 'development',
	dataName: 'Development',
	width: 75,
	height: 75,
	viewBox: '0 0 107.091 97.323',
};

export default InvestorIconFour;
