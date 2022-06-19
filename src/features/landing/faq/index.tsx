import React from 'react';
import Label from '@atoms/label';
import { AiOutlineSearch } from 'react-icons/ai';
import SingleFaq from '@organisms/single-faq';

const Faq = ({ faqContainer }: any) => {
	return (
		<div className={faqContainer}>
			<Label
				value="Support Center"
				className="text-xl md:text-2xl xl:text-[32px] text-primary font-bold mt-12 md:mt-0 mb-2"
			/>
			<div className="flex items-center bg-white mt-5 xl:mt-7 rounded-md border-2 xl:pr-48 lg:pr-32 md:pr-10 w-8/12">
				<AiOutlineSearch className="text-lg text-[#a8a7a7] mx-4 my-3  2xl:text-xl" />

				<input
					type="text"
					className="text-[#333333]  outline-none placeholder-[#a8a7a7] w-full text-sm  2xl:text-base font-sans  pl-4 px-4 py-1"
					placeholder="Have a question? Enter a search term here..."
				/>
			</div>

			<div className="mt-7 flex w-full xl:w-4/5 justify-between">
				<div className="p-8 bg-[#FBFBFB] w-[365px] border text-2xl flex justify-center font-medium rounded-md mr-4">
					<div className="">
						<div className="w-full flex justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="51.745"
								height="71.585"
								viewBox="0 0 51.745 71.585"
							>
								<g
									id="spaceship"
									transform="translate(-17.75 -0.03)"
								>
									<path
										id="Path_1227"
										data-name="Path 1227"
										d="M69.067,41.421l-14.39-9.79.909-6.084A21.974,21.974,0,0,0,50.976,8.559L44.385.376a1.013,1.013,0,0,0-1.525,0L36.268,8.559A21.976,21.976,0,0,0,31.66,25.546l.909,6.084-14.39,9.79a.98.98,0,0,0-.429.809v8.294a.979.979,0,0,0,.979.979H35.4v4.335a.978.978,0,0,0,.979.979H38.06v.988a21.3,21.3,0,0,0,4.8,13.451.979.979,0,0,0,1.515,0,21.3,21.3,0,0,0,4.8-13.451v-.988H50.86a.978.978,0,0,0,.979-.979V51.5H68.516a.979.979,0,0,0,.979-.979V42.23a.98.98,0,0,0-.429-.809Zm-6.636,8.124H52l1.518-10.159,8.914,6.064ZM37.793,9.787l5.83-7.236,5.83,7.236a20.009,20.009,0,0,1,4.2,15.469L50.019,49.545H37.226L34.6,31.949h0l-1-6.692a20.009,20.009,0,0,1,4.2-15.469ZM35.245,49.545H24.814V45.45l8.914-6.064Zm-15.537-6.8L32.89,33.78l.516,3.457L23.285,44.123a.978.978,0,0,0-.429.809v4.613H19.708ZM47.223,57.805a19.345,19.345,0,0,1-3.6,11.222,19.342,19.342,0,0,1-3.6-11.222v-.988h2.622v4.172a.979.979,0,1,0,1.958,0V56.817h2.622Zm2.661-2.946H37.361V51.5H49.884Zm17.653-5.314H64.389V44.934a.978.978,0,0,0-.428-.809L53.838,37.237l.516-3.457,13.182,8.968Z"
										transform="translate(0 0)"
										fill="#ff00c7"
									/>
									<path
										id="Path_1228"
										data-name="Path 1228"
										d="M59.621,36.964c3.065,0,5.559-3.356,5.559-7.482S62.686,22,59.621,22s-5.559,3.356-5.559,7.482S56.556,36.964,59.621,36.964Zm0-13.006c1.952,0,3.6,2.53,3.6,5.524s-1.649,5.524-3.6,5.524-3.6-2.53-3.6-5.524S57.67,23.958,59.621,23.958Z"
										transform="translate(-15.999 -9.68)"
										fill="#ff00c7"
									/>
								</g>
							</svg>
						</div>

						<Label
							value="Getting Started"
							className="text-[#929292] mt-3"
						/>
					</div>
				</div>
				<div className="p-8 bg-[#FBFBFB] w-[365px] border text-2xl flex justify-center font-medium rounded-md mr-4">
					<div className="">
						<div className="w-full flex justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="54.07"
								height="64.86"
								viewBox="0 0 54.07 64.86"
							>
								<g
									id="idea"
									transform="translate(-35.966)"
								>
									<g
										id="Group_4268"
										data-name="Group 4268"
										transform="translate(35.966)"
									>
										<g
											id="Group_4267"
											data-name="Group 4267"
										>
											<path
												id="Path_1251"
												data-name="Path 1251"
												d="M122.009,93.2a16.705,16.705,0,0,0-11.04,29.22c2.64,2.64,2.4,8.28,2.34,8.34a.993.993,0,0,0,.3.78,1.107,1.107,0,0,0,.72.3h15.3a.994.994,0,0,0,.72-.3,1.141,1.141,0,0,0,.3-.78c0-.06-.3-5.7,2.34-8.34l.18-.18a16.655,16.655,0,0,0-11.16-29.04Zm9.6,27.66c-.06.06-.18.18-.18.24-2.34,2.52-2.76,6.66-2.82,8.64h-13.26c-.06-1.98-.48-6.3-3-8.88a14.61,14.61,0,1,1,19.26,0Z"
												transform="translate(-94.925 -79.22)"
												fill="#ff00c7"
											/>
											<path
												id="Path_1252"
												data-name="Path 1252"
												d="M210.349,121.6a1.02,1.02,0,0,0,0,2.04,10.921,10.921,0,0,1,10.92,10.92,1.02,1.02,0,0,0,2.04,0A12.906,12.906,0,0,0,210.349,121.6Z"
												transform="translate(-183.325 -103.36)"
												fill="#ff00c7"
											/>
											<path
												id="Path_1253"
												data-name="Path 1253"
												d="M170.769,358.4h-13.32a2.52,2.52,0,0,0,0,5.04h13.26a2.588,2.588,0,0,0,2.58-2.52A2.535,2.535,0,0,0,170.769,358.4Zm0,2.94h-13.32a.473.473,0,0,1-.48-.48.442.442,0,0,1,.48-.48h13.26a.473.473,0,0,1,.48.48A.428.428,0,0,1,170.769,361.34Z"
												transform="translate(-137.085 -304.64)"
												fill="#ff00c7"
											/>
											<path
												id="Path_1254"
												data-name="Path 1254"
												d="M180.009,398.8h-9.36a2.52,2.52,0,1,0,0,5.04h9.36a2.535,2.535,0,0,0,2.52-2.52A2.5,2.5,0,0,0,180.009,398.8Zm0,2.94h-9.36a.473.473,0,0,1-.48-.48.442.442,0,0,1,.48-.48h9.36a.48.48,0,1,1,0,.96Z"
												transform="translate(-148.305 -338.98)"
												fill="#ff00c7"
											/>
											<path
												id="Path_1255"
												data-name="Path 1255"
												d="M210.349,9a1.011,1.011,0,0,0,1.02-1.02V1.02a1.02,1.02,0,1,0-2.04,0V7.98A1.051,1.051,0,0,0,210.349,9Z"
												transform="translate(-183.325)"
												fill="#ff00c7"
											/>
											<path
												id="Path_1256"
												data-name="Path 1256"
												d="M298.563,33.306a.968.968,0,0,0-1.38.24l-3.84,5.76a.988.988,0,0,0,.24,1.44.968.968,0,0,0,.54.18.958.958,0,0,0,.84-.48l3.84-5.76A.93.93,0,0,0,298.563,33.306Z"
												transform="translate(-254.558 -28.146)"
												fill="#ff00c7"
											/>
											<path
												id="Path_1257"
												data-name="Path 1257"
												d="M107.822,38.813a.968.968,0,0,0,.54-.18,1.051,1.051,0,0,0,.3-1.44l-3.72-5.82a1.04,1.04,0,0,0-1.74,1.14l3.72,5.82A1,1,0,0,0,107.822,38.813Z"
												transform="translate(-92.978 -26.273)"
												fill="#ff00c7"
											/>
											<path
												id="Path_1258"
												data-name="Path 1258"
												d="M43.55,106.7l-6.06-3.3a1.056,1.056,0,0,0-1.38.42.958.958,0,0,0,.42,1.38l6.06,3.3a1.412,1.412,0,0,0,.48.12.99.99,0,0,0,.9-.54A1.056,1.056,0,0,0,43.55,106.7Z"
												transform="translate(-35.966 -87.8)"
												fill="#ff00c7"
											/>
											<path
												id="Path_1259"
												data-name="Path 1259"
												d="M350.249,103.82a1.056,1.056,0,0,0-1.38-.42l-6.12,3.3a1.056,1.056,0,0,0-.42,1.38.99.99,0,0,0,.9.54,1.13,1.13,0,0,0,.48-.12l6.12-3.3A1.056,1.056,0,0,0,350.249,103.82Z"
												transform="translate(-296.285 -87.8)"
												fill="#ff00c7"
											/>
										</g>
									</g>
								</g>
							</svg>
						</div>
						<Label
							value="Knowledge Base "
							className="text-[#929292] mt-3"
						/>
					</div>
				</div>
				<div className="p-8 bg-[#FBFBFB] w-[365px] border text-2xl flex justify-center font-medium rounded-md mr-4">
					<div className="">
						<div className="w-full flex justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="64.098"
								height="64.038"
								viewBox="0 0 64.098 64.038"
							>
								<g
									id="forum"
									transform="translate(0 -0.24)"
								>
									<path
										id="Path_1239"
										data-name="Path 1239"
										d="M139.772,137l-8.676-6.74v-2.822a10.661,10.661,0,0,0,5.183-9.14v-8.565a7.122,7.122,0,0,0-7.114-7.114H121.2l-.548-1.048A1.562,1.562,0,0,0,118.4,101a7.749,7.749,0,0,0-3.435,6.444V118.3a10.66,10.66,0,0,0,.476,3.156.939.939,0,0,0,1.794-.555,8.783,8.783,0,0,1-.392-2.6v-5.517a52.275,52.275,0,0,1,17.559,0V118.3A8.777,8.777,0,0,1,119,124.058a.939.939,0,0,0-1.417,1.232,10.683,10.683,0,0,0,2.278,1.972v3L111.181,137a11.081,11.081,0,0,0-4.311,8.808v5.441a.939.939,0,1,0,1.878,0v-5.441a9.216,9.216,0,0,1,3.585-7.325l7.791-6.053a5.619,5.619,0,0,0,10.7,0l7.791,6.053a9.216,9.216,0,0,1,3.585,7.325v5.441a.939.939,0,1,0,1.878,0v-5.441A11.082,11.082,0,0,0,139.772,137Zm-22.931-26.122v-3.436a5.872,5.872,0,0,1,2.316-4.678L119.8,104a.939.939,0,0,0,.832.5h8.533a5.242,5.242,0,0,1,5.236,5.236v1.148A54.136,54.136,0,0,0,116.841,110.881Zm8.635,23.584a3.746,3.746,0,0,1-3.742-3.742v-2.5a10.642,10.642,0,0,0,7.483.109v2.39A3.746,3.746,0,0,1,125.477,134.465Z"
										transform="translate(-93.49 -87.914)"
										fill="#ff00c7"
									/>
									<path
										id="Path_1240"
										data-name="Path 1240"
										d="M164.3,458.054a.939.939,0,0,0-.939.939v4.843a.939.939,0,0,0,1.878,0v-4.843A.939.939,0,0,0,164.3,458.054Z"
										transform="translate(-142.905 -400.497)"
										fill="#ff00c7"
									/>
									<path
										id="Path_1241"
										data-name="Path 1241"
										d="M333.557,458.054a.939.939,0,0,0-.939.939v4.843a.939.939,0,1,0,1.878,0v-4.843A.939.939,0,0,0,333.557,458.054Z"
										transform="translate(-290.975 -400.497)"
										fill="#ff00c7"
									/>
									<path
										id="Path_1242"
										data-name="Path 1242"
										d="M3.2,248.361l7.07-6.089a.939.939,0,0,0,.326-.711v-2.317a5.94,5.94,0,0,0,4.394,0v2.317a.939.939,0,0,0,.326.711l1.826,1.573a.939.939,0,1,0,1.226-1.423l-1.5-1.292v-3.081a5.946,5.946,0,0,0,1.888-4.347V231.14a5.963,5.963,0,0,0-11.926,0V233.7a5.946,5.946,0,0,0,1.888,4.347v3.081l-6.744,5.808a1.927,1.927,0,0,0-.67,1.461v3.263a1.825,1.825,0,0,0,1.5,1.8,56.548,56.548,0,0,0,8.936.879h.018a.939.939,0,0,0,.017-1.878,54.694,54.694,0,0,1-8.6-.843V248.4a.051.051,0,0,1,.018-.038ZM8.71,231.14a4.085,4.085,0,0,1,8.17,0V233.7a4.085,4.085,0,1,1-8.17,0Z"
										transform="translate(-1.143 -196.776)"
										fill="#ff00c7"
									/>
									<path
										id="Path_1243"
										data-name="Path 1243"
										d="M380.739,241.56a.939.939,0,0,0,.326.711l1.554,1.339a.939.939,0,1,0,1.226-1.423l-1.228-1.058v-3.081A5.946,5.946,0,0,0,384.5,233.7V231.14a5.963,5.963,0,0,0-11.926,0V233.7a5.946,5.946,0,0,0,1.888,4.347v3.081l-1.5,1.292a.939.939,0,0,0,1.226,1.423l1.826-1.573a.939.939,0,0,0,.326-.711v-2.317a5.94,5.94,0,0,0,4.394,0v2.317Zm-2.2-3.774a4.089,4.089,0,0,1-4.085-4.085V231.14a4.085,4.085,0,0,1,8.17,0V233.7A4.09,4.09,0,0,1,378.542,237.787Z"
										transform="translate(-325.933 -196.776)"
										fill="#ff00c7"
									/>
									<path
										id="Path_1244"
										data-name="Path 1244"
										d="M431.682,382.788l-2.428-2.091a.939.939,0,0,0-1.226,1.423l2.428,2.091a.051.051,0,0,1,.018.039v3.22a54.691,54.691,0,0,1-8.6.843.939.939,0,0,0,.017,1.878h.018a56.569,56.569,0,0,0,8.936-.879,1.825,1.825,0,0,0,1.5-1.8V384.25A1.928,1.928,0,0,0,431.682,382.788Z"
										transform="translate(-368.254 -332.626)"
										fill="#ff00c7"
									/>
									<path
										id="Path_1245"
										data-name="Path 1245"
										d="M358.811,42.392h-.493a.939.939,0,0,0-.829.5l-1.449,2.726-1.4-2.716a.939.939,0,0,0-.834-.508h-5.823a.939.939,0,1,0,0,1.878h5.251l1.255,2.432a1.74,1.74,0,0,0,1.54.945h.011a1.741,1.741,0,0,0,1.541-.926l1.3-2.451a8.88,8.88,0,0,0,7.477-13.558.939.939,0,0,0-1.6.991,7,7,0,0,1-5.953,10.69Z"
										transform="translate(-303.594 -26.269)"
										fill="#ff00c7"
									/>
									<path
										id="Path_1246"
										data-name="Path 1246"
										d="M8.809,18l1.3,2.451a1.74,1.74,0,0,0,1.541.926h.011a1.74,1.74,0,0,0,1.54-.945L14.46,18h4.488a.939.939,0,0,0,0-1.878h-5.06a.939.939,0,0,0-.834.508l-1.4,2.716L10.2,16.622a.939.939,0,0,0-.829-.5H8.881a7,7,0,1,1,0-14.005H55.217a7.009,7.009,0,0,1,3.366.861.939.939,0,1,0,.9-1.646A8.893,8.893,0,0,0,55.217.24H8.881A8.881,8.881,0,0,0,8.809,18Z"
										transform="translate(0 0)"
										fill="#ff00c7"
									/>
									<path
										id="Path_1247"
										data-name="Path 1247"
										d="M116.771,58.117a1.253,1.253,0,1,0,1.022-1.022A1.254,1.254,0,0,0,116.771,58.117Z"
										transform="translate(-102.136 -49.722)"
										fill="#ff00c7"
									/>
									<path
										id="Path_1248"
										data-name="Path 1248"
										d="M202.694,58.329a1.252,1.252,0,1,0,1.252-1.252A1.253,1.253,0,0,0,202.694,58.329Z"
										transform="translate(-177.317 -49.721)"
										fill="#ff00c7"
									/>
									<path
										id="Path_1249"
										data-name="Path 1249"
										d="M377.726,58.329a1.252,1.252,0,1,0-1.252,1.252A1.253,1.253,0,0,0,377.726,58.329Z"
										transform="translate(-328.245 -49.721)"
										fill="#ff00c7"
									/>
									<path
										id="Path_1250"
										data-name="Path 1250"
										d="M289.282,58.329a1.252,1.252,0,1,0,1.252-1.252A1.253,1.253,0,0,0,289.282,58.329Z"
										transform="translate(-253.065 -49.721)"
										fill="#ff00c7"
									/>
								</g>
							</svg>
						</div>
						<Label
							value="Forum"
							className="text-[#929292] mt-3"
						/>
					</div>
				</div>
				<div className="p-8 bg-[#FBFBFB] w-[365px] border text-2xl flex justify-center font-medium rounded-md">
					<div className="">
						<div className="w-full flex justify-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="44.084"
								height="64.038"
								viewBox="0 0 44.084 64.038"
							>
								<path
									id="interview"
									d="M122.63,24.682a.941.941,0,0,0,.941-.941V19.61a4.18,4.18,0,0,0-4.175-4.175h-.041A5.288,5.288,0,0,0,120.616,12V10.256a10.257,10.257,0,0,0-16.4-8.21.941.941,0,1,0,1.13,1.506,8.374,8.374,0,0,1,13.392,6.7V12a3.435,3.435,0,0,1-3.431,3.431h-9.886A3.435,3.435,0,0,1,101.986,12V10.256a8.386,8.386,0,0,1,1-3.966.941.941,0,1,0-1.657-.893,10.273,10.273,0,0,0-1.223,4.859V12a5.284,5.284,0,0,0,1.263,3.431h-.043a4.18,4.18,0,0,0-4.175,4.175v8.295a5.537,5.537,0,0,0-1.161.888l-3.794,3.794a3.363,3.363,0,0,1-2.394.992H80.428a.941.941,0,1,0,0,1.883H89.8a5.234,5.234,0,0,0,3.725-1.543l3.794-3.794a3.6,3.6,0,0,1,2.566-1.063h8.449a3.418,3.418,0,0,1,3.414,3.414V40.1a1.606,1.606,0,0,1-1.6,1.6h-.013a4.185,4.185,0,0,1-4.18-4.18V34.874a.941.941,0,1,0-1.883,0v2.859A3.972,3.972,0,0,1,100.1,41.7H95.916a.941.941,0,0,0,0,1.883H100.1a5.812,5.812,0,0,0,2.607-.615l.405,4.049a.941.941,0,0,0,.936.848.93.93,0,0,0,.095,0,.941.941,0,0,0,.843-1.03l-.521-5.207a5.889,5.889,0,0,0,.593-.789,6.064,6.064,0,0,0,4.727,2.739,4.1,4.1,0,0,0-.246,6.515,4.1,4.1,0,0,0,2.613,7.269h1.8l-.374,3.732a1.181,1.181,0,0,1-1.179,1.067h-4.8a1.181,1.181,0,0,1-1.179-1.067l-1.025-10.247a.941.941,0,1,0-1.873.188l.4,4H94.331a3.575,3.575,0,0,1-3.571-3.571.941.941,0,1,0-1.883,0,5.483,5.483,0,0,0,.039.641H80.443a.941.941,0,0,0,0,1.883H89.5a5.458,5.458,0,0,0,4.832,2.93H104.1l.437,4.365a3.058,3.058,0,0,0,3.052,2.762h4.8a3.058,3.058,0,0,0,3.052-2.762l.392-3.92h3.626a4.1,4.1,0,0,0,2.613-7.269,4.1,4.1,0,0,0,0-6.327,4.1,4.1,0,0,0,0-6.327,4.1,4.1,0,0,0,.386-5.963,2.806,2.806,0,0,0,1.106-2.233V27.752a.941.941,0,0,0-1.883,0v1.484a.928.928,0,0,1-.927.927H113.1a5.3,5.3,0,0,0-4.765-2.985H99.884a5.575,5.575,0,0,0-.853.066V19.61a2.3,2.3,0,0,1,2.292-2.292H119.4a2.3,2.3,0,0,1,2.292,2.292v4.131a.941.941,0,0,0,.941.942Zm-.941,28.569a2.225,2.225,0,0,1-2.222,2.222h-7.316a2.222,2.222,0,0,1,0-4.445h7.316A2.225,2.225,0,0,1,121.689,53.251Zm0-6.327a2.225,2.225,0,0,1-2.222,2.222h-7.316a2.222,2.222,0,0,1,0-4.445h7.316A2.225,2.225,0,0,1,121.689,46.924Zm0-6.327a2.225,2.225,0,0,1-2.222,2.222h-7.148A3.481,3.481,0,0,0,113.63,40.1V38.374h5.836a2.225,2.225,0,0,1,2.222,2.222Zm-2.222-8.55a2.222,2.222,0,0,1,0,4.445H113.63V32.476c0-.145-.008-.288-.019-.43h5.855Z"
									transform="translate(-79.487)"
									fill="#ff00c7"
								/>
							</svg>
						</div>
						<Label
							value="News"
							className="text-[#929292] mt-3"
						/>
					</div>
				</div>
			</div>
			<div className="mt-7 bg-white p-6 rounded-md">
				<Label
					value="Frequently Asked Questions"
					className="text-xl xl:text-2xl font-semibold text-primary "
				/>

				<div className="w-full mt-8 grid grid-cols-1 md:grid-cols-3 gap-12">
					<SingleFaq
						header="Shipping"
						questions={[
							'Lorem ipsum dolores s consecteturadipisicing elit, sed do eismod tempor ?',
							'Sed do eiusmod temporis as alasto ?',
							'Labore et dolore, aliqua ut enima dodisastala a somuniti?',
						]}
					/>
					<SingleFaq
						header="Top questions"
						questions={[
							'How do I cancel production?',
							'How do I earn from Ideeza product?',
							'Why isn’t review appearing on my profile?',
						]}
					/>
					<SingleFaq
						header="Your payout status"
						questions={[
							'When will I get my payot?',
							'Where do I find my payout information',
							'How do I connect Paypal to recieve payout?',
						]}
					/>
					<SingleFaq
						header="Pricing & availability"
						questions={[
							'How do I set a price on my product?',
							'How do I make my product available for others?',
							'How I can cancel payment?',
						]}
					/>
					<SingleFaq
						header="Popular questions"
						questions={[
							'How do taxes work for sellers?',
							'How do I add electronics to my product?',
							'When will I get my product?',
						]}
					/>
					<SingleFaq
						header="Electronics"
						questions={[
							'Lorem ipsum dolores s consecteturadipisicing elit, sed do eismod tempor ?',
							'Sed do eiusmod temporis as alasto ?',
							'Labore et dolore, aliqua ut enima dodisastala a somuniti?',
						]}
					/>
				</div>
			</div>
		</div>
	);
};
Faq.defaultProps = {
	faqContainer: 'pt-[56px] pl-[10px] md:pl-[44px] md:pr-[60px]',
};
export default Faq;
