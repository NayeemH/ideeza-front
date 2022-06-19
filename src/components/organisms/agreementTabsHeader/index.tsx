import React from 'react';

function AgreementTabsHeader(props: any) {
	const { title, icon } = props;
	return (
		<div className="flex flex-wrap justify-between mr-5">
			<div className="flex items-center lg:px-4 px-2 space-x-3 pb-3 border-b-2 border-primary text-primary">
				{/* <i className="el-icon-document lg:text-3xl text-2xl pr-3"></i> */}
				{/* <img src={icon}  /> */}
				{icon}
				<h2 className="text-base font-poppins">{title}</h2>
			</div>
			<div className="flex pt-4 lg:pt-0 lg:space-x-2 lg:w-auto w-full justify-end">
				<div className="text-sm text-gray-600 flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="27"
						height="17"
						viewBox="0 0 32.326 23.09"
					>
						<path
							id="Icon_metro-versions"
							data-name="Icon metro-versions"
							d="M4.5,26.184H9.117V23.875H6.808V14.639H9.117V12.33H4.5V26.184ZM18.353,7.712V30.8H36.825V7.712H18.353ZM32.207,26.184H22.971V12.33h9.236ZM11.426,28.493h4.618V26.184H13.735V12.33h2.309V10.021H11.426V28.493Z"
							transform="translate(-4.499 -7.712)"
							fill="currentColor"
						/>
					</svg>

					<span className="md:px-3 px-1 lg:pr-10">
						<select className="text-base  bg-white focus:outline-none focus:shadow-outline">
							<option value="">v.1.0.11</option>
							<option value="">v.1.1.22</option>
							<option value="">v.1.2.32</option>
							<option value="">v.1.3.44</option>
						</select>
					</span>
				</div>
				<div className="text-xs lg:text-sm text-gray-600 flex items-center">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="18"
						height="28"
						viewBox="0 0 27 36"
					>
						<path
							id="Icon_awesome-file-pdf"
							data-name="Icon awesome-file-pdf"
							d="M12.79,18.007c-.352-1.125-.345-3.3-.141-3.3C13.24,14.709,13.184,17.3,12.79,18.007Zm-.12,3.319a32.444,32.444,0,0,1-2,4.409,25.891,25.891,0,0,1,4.423-1.54A9.108,9.108,0,0,1,12.67,21.326ZM6.054,30.1c0,.056.928-.38,2.454-2.827A9.718,9.718,0,0,0,6.054,30.1ZM17.438,11.25H27V34.313A1.683,1.683,0,0,1,25.313,36H1.688A1.683,1.683,0,0,1,0,34.313V1.688A1.683,1.683,0,0,1,1.688,0H15.75V9.563A1.692,1.692,0,0,0,17.438,11.25Zm-.562,12.08a7.057,7.057,0,0,1-3-3.783c.316-1.3.816-3.277.436-4.514a1.761,1.761,0,0,0-3.361-.478c-.352,1.287-.028,3.1.57,5.414A66.025,66.025,0,0,1,8.648,26c-.007,0-.007.007-.014.007-1.905.977-5.175,3.129-3.832,4.781a2.185,2.185,0,0,0,1.512.7c1.259,0,2.51-1.266,4.3-4.345a40.079,40.079,0,0,1,5.555-1.631,10.656,10.656,0,0,0,4.5,1.371,1.82,1.82,0,0,0,1.385-3.052c-.977-.956-3.818-.682-5.175-.506ZM26.508,7.383,19.617.492A1.686,1.686,0,0,0,18.422,0H18V9h9V8.571A1.682,1.682,0,0,0,26.508,7.383ZM21.3,25.334c.288-.19-.176-.837-3.009-.633C20.9,25.812,21.3,25.334,21.3,25.334Z"
							fill="currentColor"
						/>
					</svg>

					<span className="md:pl-3 pl-1 text-xs lg:text-sm cursor-pointer">
						Download PDF
					</span>
				</div>
			</div>
		</div>
	);
}

export default AgreementTabsHeader;
