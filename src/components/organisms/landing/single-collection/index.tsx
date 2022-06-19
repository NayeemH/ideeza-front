// import AvatarAtom from "@atoms/avatar";
import Label from '@atoms/label';
import React from 'react';

const SingleCollection = (props: any) => {
	return (
		<div className="flex justify-between items-center lg:items-start border-b border-[#E6E6E6] py-[15px] lg:pt-0 pb-[30px] pt-[30px] px-4">
			<div className="flex items-center">
				<div className="flex items-center">
					<span className="text-[16px] font-semibold pr-[16px]">{props.id}</span>
					<div className="ml-0">
						<img
							src="/images/choose-your-avatar/img-avater.png"
							className="rounded-full"
							alt="avatar"
						/>
						{/* <AvatarAtom
              src="/images/choose-your-avatar/img-avater.png"
              variant="circular"
              sx={{ width: 56, height: 56 }}
            /> */}
					</div>
				</div>
				<div className="pl-3">
					<Label
						value="Invisible Friends"
						className="font-[500] font-poppins text-[#000000] text-[14px] md:text-[16px]"
					/>
					{/* <Label
            value="floor-price -> 3.29$"
            className="text-md text-gray-400"
          /> */}
					<div className="flex items-center ">
						<p className="text-[#787878] text-[12px]">floor-price:</p>
						<div className="flex items-center ml-2">
							<img
								src="/images/icon/dimond-black-icon.svg"
								alt="icon"
							/>
							<p className="ml-2 text-[#787878] text-[12px]">8.3</p>
						</div>
					</div>
				</div>
			</div>
			<div className="">
				<Label
					value="+66.57%"
					className="text-[#20D377] text-sm font-medium"
				/>
				{/* <Label value="17603" className="text-gray-600 text-sm" /> */}
				<div className="flex items-center mt-2">
					<img
						src="/images/icon/dimond-black-icon.svg"
						alt="icon"
					/>
					<p className="pl-2 text-sm">17603</p>
				</div>
			</div>
		</div>
	);
};

export default SingleCollection;
