import { InvestorIconType } from '@models/common';
import { FC } from 'react';

const InvestorIconOne: FC<InvestorIconType> = (props) => {
	const { id, width, height, dataName, viewBox } = props;

	return (
		<svg
			id={id}
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			data-name={dataName}
			viewBox={viewBox}
		>
			<g
				id="Group_191"
				data-name="Group 191"
				transform="translate(0 0)"
			>
				<g
					id="Group_190"
					data-name="Group 190"
					transform="translate(0 0)"
				>
					<path
						id="Path_131"
						data-name="Path 131"
						d="M106.952,28.338H5.443A5.443,5.443,0,0,0,0,33.781V97.463a5.443,5.443,0,0,0,5.443,5.443H43.406v12.334div8.634a5.035,5.035,0,1,0,0,10.069H83.761a5.035,5.035,0,1,0,0-10.069H68.988V102.906h37.964a5.443,5.443,0,0,0,5.443-5.443V33.781A5.443,5.443,0,0,0,106.952,28.338Zm-2.721,66.4H8.164V36.5H104.23Z"
						transform="translate(0 -28.338)"
					/>
					<path
						id="Path_132"
						data-name="Path 132"
						d="M89.429,137.641l17.168,7.984a3.337,3.337,0,0,0,4.742-3.027v-.088a3.348,3.348,0,0,0-1.931-3.026L98.671,134.5l10.738-4.99a3.349,3.349,0,0,0,1.931-3.026v-.087A3.331,3.331,0,0,0,108,123.06a3.354,3.354,0,0,0-1.4.308l-17.167,7.983a3.349,3.349,0,0,0-1.93,3.025v.239A3.351,3.351,0,0,0,89.429,137.641Z"
						transform="translate(-63.687 -97.282)"
					/>
					<path
						id="Path_133"
						data-name="Path 133"
						d="M173.947,128.484a3.348,3.348,0,0,0,2.695,1.369h.086a3.325,3.325,0,0,0,3.176-2.318l11.31-35.041a3.336,3.336,0,0,0-3.176-4.355h-.085a3.327,3.327,0,0,0-3.178,2.318L173.462,125.5A3.353,3.353,0,0,0,173.947,128.484Z"
						transform="translate(-126.142 -71.864)"
					/>
					<path
						id="Path_134"
						data-name="Path 134"
						d="M237.9,126.479a3.352,3.352,0,0,0,1.931,3.027l10.737,4.988-10.737,4.988a3.348,3.348,0,0,0-1.931,3.026v.088a3.338,3.338,0,0,0,4.744,3.025l17.167-7.983a3.351,3.351,0,0,0,1.929-3.025v-.239a3.349,3.349,0,0,0-1.93-3.025l-17.167-7.983a3.338,3.338,0,0,0-4.743,3.026v.087Z"
						transform="translate(-173.153 -97.28)"
					/>
				</g>
			</g>
		</svg>
	);
};

InvestorIconOne.defaultProps = {
	id: 'investment',
	dataName: 'Investment',
	width: 75,
	height: 75,
	viewBox: '0 0 112.395 96.971',
};

export default InvestorIconOne;
