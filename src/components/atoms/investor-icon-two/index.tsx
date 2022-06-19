import { InvestorIconType } from '@models/common';
import { FC } from 'react';

const InvestorIconTwo: FC<InvestorIconType> = (props) => {
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
				id="Layer_1_110_"
				transform="translate(0 0)"
			>
				<g
					id="Group_189"
					data-name="Group 189"
				>
					<path
						id="Path_126"
						data-name="Path 126"
						d="M31.235,27.287l-6.476-6.121a9.491,9.491,0,0,0,1.221-4.6A9.67,9.67,0,1,0,21.454,24.7l6.467,6.114A22,22,0,0,1,31.235,27.287Z"
						transform="translate(8.558 6.752)"
					/>
					<path
						id="Path_127"
						data-name="Path 127"
						d="M31.977,34.185,40.582,19.7a9.5,9.5,0,1,0-4.175-2.437L27.829,31.707A21.491,21.491,0,0,1,31.977,34.185Z"
						transform="translate(35.209 -0.911)"
					/>
					<path
						id="Path_128"
						data-name="Path 128"
						d="M54.722,20.952a9.6,9.6,0,0,0-8.988,6.286l-11.956-1.18c0,.091.014.177.014.265a22.016,22.016,0,0,1-.482,4.551l11.951,1.18a9.591,9.591,0,1,0,9.462-11.1Z"
						transform="translate(42.143 24.445)"
					/>
					<path
						id="Path_129"
						data-name="Path 129"
						d="M33.726,44.147,31.053,32.468a21.887,21.887,0,0,1-4.716,1.09l2.677,11.682a9.576,9.576,0,1,0,4.712-1.092Z"
						transform="translate(30.146 39.015)"
					/>
					<path
						id="Path_130"
						data-name="Path 130"
						d="M32.522,25.37,17.639,30.356A9.588,9.588,0,1,0,19.211,35.6c0-.222-.048-.426-.066-.643l14.93-5A21.933,21.933,0,0,1,32.522,25.37Z"
						transform="translate(0 30.035)"
					/>
					<circle
						id="Ellipse_11"
						data-name="Ellipse 11"
						cx="16.47"
						cy="16.47"
						r="16.47"
						transform="translate(37.51 34.298)"
					/>
				</g>
			</g>
		</svg>
	);
};

InvestorIconTwo.defaultProps = {
	id: 'marketing',
	dataName: 'Marketing',
	width: 75,
	height: 75,
	viewBox: '0 0 106.465 102.338',
};

export default InvestorIconTwo;
