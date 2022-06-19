import { InvestorIconType } from '@models/common';
import { FC } from 'react';

const InvestorIconThree: FC<InvestorIconType> = (props) => {
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
			<g
				id="Group_193"
				data-name="Group 193"
				transform="translate(35.197 0.776)"
			>
				<g
					id="Group_192"
					data-name="Group 192"
					transform="translate(0)"
				>
					<path
						id="Path_142"
						data-name="Path 142"
						d="M263.636,43.545,225.854,5.758a5.678,5.678,0,1,0-8.032,8.029l37.787,37.785a5.676,5.676,0,0,0,8.026-8.026Z"
						transform="translate(-216.163 -4.1)"
					/>
				</g>
			</g>
			<g
				id="Group_195"
				data-name="Group 195"
				transform="translate(20.313 15.686)"
			>
				<g
					id="Group_194"
					data-name="Group 194"
				>
					<path
						id="Path_143"
						data-name="Path 143"
						d="M151.234,82.9l-.284,1.425a61.011,61.011,0,0,1-13.456,27.254l20.557,20.557a60.808,60.808,0,0,1,27.122-13.588l1.428-.284Z"
						transform="translate(-137.494 -82.905)"
					/>
				</g>
			</g>
			<g
				id="Group_197"
				data-name="Group 197"
				transform="translate(0 48.624)"
			>
				<g
					id="Group_196"
					data-name="Group 196"
				>
					<path
						id="Path_144"
						data-name="Path 144"
						d="M46.68,256.989,32.631,271.035a8.513,8.513,0,0,0,0,12.042l8.026,8.026a8.513,8.513,0,0,0,12.042,0l14.048-14.048Zm2.007,22.075a2.838,2.838,0,0,1-4.013-4.013l4.013-4.013a2.838,2.838,0,1,1,4.013,4.013Z"
						transform="translate(-30.136 -256.989)"
					/>
				</g>
			</g>
			<g
				id="Group_199"
				data-name="Group 199"
				transform="translate(30.59 65.479)"
			>
				<g
					id="Group_198"
					data-name="Group 198"
				>
					<path
						id="Path_145"
						data-name="Path 145"
						d="M209.684,364.845l3.861-3.861a8.507,8.507,0,0,0,0-12.039l-2.868-2.87a53.754,53.754,0,0,0-4.57,3.456l3.425,3.43a2.832,2.832,0,0,1,0,4.01l-3.924,3.924-5.767-5.588-8.027,8.027,12.877,12.477a5.677,5.677,0,0,0,8.024-8.032Z"
						transform="translate(-191.813 -346.075)"
					/>
				</g>
			</g>
			<g
				id="Group_201"
				data-name="Group 201"
				transform="translate(57.088)"
			>
				<g
					id="Group_200"
					data-name="Group 200"
				>
					<path
						id="Path_146"
						data-name="Path 146"
						d="M334.7,0a2.836,2.836,0,0,0-2.838,2.838V8.514a2.838,2.838,0,0,0,5.676,0V2.838A2.836,2.836,0,0,0,334.7,0Z"
						transform="translate(-331.864)"
					/>
				</g>
			</g>
			<g
				id="Group_203"
				data-name="Group 203"
				transform="translate(74.117 22.705)"
			>
				<g
					id="Group_202"
					data-name="Group 202"
				>
					<path
						id="Path_147"
						data-name="Path 147"
						d="M430.378,120H424.7a2.838,2.838,0,1,0,0,5.676h5.676a2.838,2.838,0,1,0,0-5.676Z"
						transform="translate(-421.864 -120)"
					/>
				</g>
			</g>
			<g
				id="Group_205"
				data-name="Group 205"
				transform="translate(68.441 5.676)"
			>
				<g
					id="Group_204"
					data-name="Group 204"
				>
					<path
						id="Path_148"
						data-name="Path 148"
						d="M402.384,30.831a2.837,2.837,0,0,0-4.013,0L392.7,36.507a2.838,2.838,0,0,0,4.013,4.013l5.676-5.676A2.837,2.837,0,0,0,402.384,30.831Z"
						transform="translate(-391.864 -30)"
					/>
				</g>
			</g>
		</svg>
	);
};

InvestorIconThree.defaultProps = {
	id: 'financial_growth',
	dataName: 'Financial Growth',
	width: 75,
	height: 75,
	viewBox: '0 0 85.469 96.873',
};

export default InvestorIconThree;
