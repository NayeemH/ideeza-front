import Image from 'next/image';

type TeamMemberInfoType = any;

const AboutTeamContributor = (props: TeamMemberInfoType) => {
	const { info } = props;

	return (
		<div className="justify-center items-center flex ">
			<div className="bg-white mr-[14px] text-center border hover:shadow-lg rounded-[16px]">
				{/* bg-white w-4/5 py-5 md:px-10 px my-1 text-center shadow-full rounded-t-5xl */}
				<div className="w-[100px] pt-[30px] rounded-full m-auto">
					{/* <img
                    className="w-full rounded-full"
                    src={info?.profile_photo || 'assets/landing/avatar.png'}
                    alt="image"
                /> */}
					<Image
						src={info?.profile_photo || 'assets/landing/avatar.png'}
						className="w-full rounded-full"
						alt="image"
						height={'100%'}
						width={'100%'}
					/>
				</div>
				<h3 className="text-[20px] text-[#333333] font-[500] leading-[34px]">
					{`${info?.first_name} ${info?.last_name}`}
				</h3>
				<p className="text-[14px] text-[#787878] leading-[25px] pb-[30px] px-[14px]">
					{info?.about_me}
				</p>
			</div>
		</div>
	);
};

export default AboutTeamContributor;
