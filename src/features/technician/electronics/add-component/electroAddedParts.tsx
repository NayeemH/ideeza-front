import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { AiOutlineDisconnect } from 'react-icons/ai';
import { BsGearWideConnected } from 'react-icons/bs';
import { FiShoppingCart } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';

export default function ElectroAddedParts({ data, onDelete }: any) {
	// const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	const [connectShow, setConnectShow] = useState(false);
	const [settingShow, setSettingShow] = useState(false);

	// const handleDelete = (id: any) => {
	//   dispatch(onCodePartDelete(id));
	// };

	return (
		<div>
			<div
				className={`2xl:w-[630px] w-96 bg-white rounded-bl-md shadow-md p-6 fixed transition-all ${
					show ? 'right-0 z-[150]' : ' 2xl:-right-[630px] -right-96 z-20'
				}`}
			>
				<button
					className="bg-white px-[30px] py-[25px] absolute left-[-80px] top-0 shadow-none border rounded-tl-[10px] rounded-bl-[10px] z-10"
					onClick={() => setShow(!show)}
				>
					<FiShoppingCart size="20" />
					{/* <AiOutlineDisconnect size="20" />
          <BsGearWideConnected size="20" /> */}
				</button>
				<h3 className="text-primary text-md font-bold text-center mb-4 uppercase">
					Added Parts
				</h3>
				<div className="h-60 overflow-y-auto">
					{Array.isArray(data) && data.length > 0 ? (
						<table className="w-full text-center">
							{/* {data.map((part, index) => (
                <tr key={index} className="even:bg-gray-100">
                  <td className="text-gray-630 cursor-pointer text-left text-lg">
                    <span className="py-2">{part?.name}</span>
                  </td>
                  <td>
                    <button
                        className="text-gray-630 text-lg"
                        onClick={() => onDelete(part)}
                    >
                      <MdDeleteForever size="20" />
                    </button>
                  </td>
                </tr>
            ))} */}
							{data[0]?.sceneObjects?.map((part: any, index: number) => {
								return (
									<tr
										key={index}
										className="even:bg-gray-100"
									>
										<td className="text-gray-630 cursor-pointer text-left text-lg">
											<span className="py-2">{`${part.name}_${part.uuid.slice(
												0,
												8
											)}`}</span>
										</td>
										<td>
											<button
												className="text-gray-630 text-lg"
												onClick={() => {
													onDelete({ ...part });
												}}
											>
												<MdDeleteForever size="20" />
											</button>
										</td>
									</tr>
								);
							})}

							{/*<tr key={2} className="even:bg-gray-100">
              <td className="text-gray-630 cursor-pointer text-left text-lg">
                <span className="py-2"> ATMEGA32M1-AU-ND</span>
              </td>
               <td>
                    <img src="https://via.placeholder.com/40/40/" alt="block" />
                  </td>
              <td>
                <button
                  className="text-gray-630 text-lg"
                  // onClick={() => handleDelete(item?.id)}
                >
                  <MdDeleteForever size="20" />
                </button>
              </td>
            </tr>
            <tr key={3} className="even:bg-gray-100">
              <td className="text-gray-630 cursor-pointer text-left text-lg">
                <span className="py-2"> ATMEGA32M1-AU-ND</span>
              </td>
               <td>
                    <img src="https://via.placeholder.com/40/40/" alt="block" />
                  </td>
              <td>
                <button
                  className="text-gray-630 text-lg"
                  // onClick={() => handleDelete(item?.id)}
                >
                  <MdDeleteForever size="20" />
                </button>
              </td>
            </tr>
            <tr key={4} className="even:bg-gray-100">
              <td className="text-gray-630 cursor-pointer text-left text-lg">
                <span className="py-2"> ATMEGA32M1-AU-ND</span>
              </td>
               <td>
                    <img src="https://via.placeholder.com/40/40/" alt="block" />
                  </td>
              <td>
                <button
                  className="text-gray-630 text-lg"
                  // onClick={() => handleDelete(item?.id)}
                >
                  <MdDeleteForever size="20" />
                </button>
              </td>
            </tr>*/}
						</table>
					) : (
						<div className="flex justify-center h-full items-center">
							<CircularProgress size={50} />
						</div>
					)}
				</div>
			</div>
			<div
				className={`2xl:w-[630px] w-96 bg-white rounded-bl-md shadow-md p-6 fixed transition-all ${
					connectShow ? 'right-0 z-[150]' : '2xl:-right-[630px] -right-96 z-20'
				}`}
			>
				<button
					className="bg-white px-[30px] py-[25px] absolute left-[-80px] top-[70px] shadow-none border rounded-tl-[10px] rounded-bl-[10px] z-10"
					onClick={() => setConnectShow(!connectShow)}
				>
					{/* <FiShoppingCart size="20" /> */}
					<AiOutlineDisconnect size="20" />
					{/* <BsGearWideConnected size="20" /> */}
				</button>
				<h3 className="text-primary text-md font-bold text-left mb-4">Connections</h3>
				<div className="h-60 overflow-y-auto">
					{/* {Array.isArray(data) && data.length > 0 ? ( */}
					<table className="w-full text-left">
						{/* {data.map((item) => ( */}
						<tr
							key={7}
							className="even:bg-gray-100 "
						>
							<td className="text-primary text-[18px] ">
								<span className="py-2">EDIT</span>
							</td>
							<td className="text-[18px] text-[#333333] font-semibold">
								{/* <img src="https://via.placeholder.com/40/40/" alt="block" /> */}
								Connection 1
							</td>
							<td className="text-[18px] text-[#333333] font-semibold">
								{/* <img src="https://via.placeholder.com/40/40/" alt="block" /> */}
								Properties
							</td>
							{/* <td>
                    <button
                      className="text-gray-630"
                      // onClick={() => handleDelete(item?.id)}
                    >
                      <MdDeleteForever size="20" />
                    </button>
                  </td> */}
						</tr>
						<tr
							key={9}
							className="even:bg-gray-100"
						>
							<td className="text-gray-630 text-[18px]">
								<span className="py-2">
									<button
										className=""
										// onClick={() => handleDelete(item?.id)}
									>
										<MdDeleteForever size="25" />
									</button>
								</span>
							</td>
							<td className="text-[18px] text-[#333333] text-left">
								{/* <img src="https://via.placeholder.com/40/40/" alt="block" /> */}
								<span className="text-gray-630 text-[16px]">Part 1:</span>
								<span className="text-gray-630 text-[16px] ml-2">
									ATMEGA328P-XMINI
								</span>
							</td>
							<td className="text-[18px] text-[#333333]">
								{/* <img src="https://via.placeholder.com/40/40/" alt="block" /> */}
								Name
							</td>
							{/* <td>
                    <button
                      className="text-gray-630"
                      // onClick={() => handleDelete(item?.id)}
                    >
                      <MdDeleteForever size="20" />
                    </button>
                  </td> */}
						</tr>
						<tr
							key={10}
							className="even:bg-gray-100"
						>
							<td className="text-gray-630 text-[18px]"></td>
							<td className="text-[18px] text-[#333333] text-left">
								{/* <img src="https://via.placeholder.com/40/40/" alt="block" /> */}
								<span className="text-gray-630 text-[16px]">Leg 1:</span>
								<span className="text-gray-630 text-[16px] ml-2">14</span>
							</td>
							<td className="text-[18px] text-[#333333]">
								{/* <img src="https://via.placeholder.com/40/40/" alt="block" /> */}
								<span className="py-2"> Property</span>
							</td>
							{/* <td>
                    <button
                      className="text-gray-630"
                      // onClick={() => handleDelete(item?.id)}
                    >
                      <MdDeleteForever size="20" />
                    </button>
                  </td> */}
						</tr>
						<tr
							key={90}
							className="even:bg-gray-100"
						>
							<td className="text-gray-630 text-[18px]"></td>
							<td className="text-[18px] text-[#333333] text-left">
								{/* <img src="https://via.placeholder.com/40/40/" alt="block" /> */}
								<span className="text-gray-630 text-[16px]">Part 2:</span>
								<span className="text-gray-630 text-[16px] ml-2">
									ATMEGA328P-XMINI
								</span>
							</td>
							<td className="text-[18px] text-[#333333]">
								{/* <img src="https://via.placeholder.com/40/40/" alt="block" /> */}
								<span className="py-2"> Min</span>
							</td>
							{/* <td>
                    <button
                      className="text-gray-630"
                      // onClick={() => handleDelete(item?.id)}
                    >
                      <MdDeleteForever size="20" />
                    </button>
                  </td> */}
						</tr>
						<tr
							key={78}
							className="even:bg-gray-100"
						>
							<td className="text-gray-630 text-[18px]"></td>
							<td className="text-[18px] text-[#333333] text-left">
								{/* <img src="https://via.placeholder.com/40/40/" alt="block" /> */}
								<span className="text-gray-630 text-[16px]">Leg 2:</span>
								<span className="text-gray-630 text-[16px] ml-2">12</span>
							</td>
							<td className="text-[18px] text-[#333333]">
								{/* <img src="https://via.placeholder.com/40/40/" alt="block" /> */}
								<span className="py-2"> Max</span>
							</td>
							{/* <td>
                    <button
                      className="text-gray-630"
                      // onClick={() => handleDelete(item?.id)}
                    >
                      <MdDeleteForever size="20" />
                    </button>
                  </td> */}
						</tr>

						{/* ))} */}
					</table>
					{/* ) : ( */}
					{/* <div className="flex justify-center h-full items-center">
              <CircularProgress size={50} />
            </div> */}
					{/* )} */}
				</div>
			</div>
			<div
				className={`2xl:w-[630px] w-96 bg-white rounded-bl-md shadow-md p-6 fixed z-[150]  transition-all ${
					settingShow ? 'right-0 z-[150]' : ' 2xl:-right-[630px] -right-96 z-[5]'
				}`}
			>
				<button
					className="bg-white px-[30px] py-[25px] absolute left-[-80px] top-[140px] shadow-none border rounded-tl-[10px] rounded-bl-[10px] z-10"
					onClick={() => setSettingShow(!settingShow)}
				>
					{/* <FiShoppingCart size="20" /> */}
					{/* <AiOutlineDisconnect size="20" /> */}
					<BsGearWideConnected size="20" />
				</button>
				<h3 className="text-primary text-md font-bold text-center mb-4">Settings</h3>
				<div className="h-60 overflow-y-auto">
					{Array.isArray(data) && data.length > 0 ? (
						<table className="w-full text-center">
							{data.map((item) => (
								<tr
									key={item.name}
									className="even:bg-gray-100"
								>
									<td className="text-gray-630 cursor-pointer">{item?.name}</td>
									<td>
										<img
											src="https://via.placeholder.com/40/40/"
											alt="block"
										/>
									</td>
									<td>
										<button
											className="text-gray-630"
											// onClick={() => handleDelete(item?.id)}
										>
											<MdDeleteForever size="20" />
										</button>
									</td>
								</tr>
							))}
						</table>
					) : (
						<div className="flex justify-center h-full items-center">
							<CircularProgress size={50} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
