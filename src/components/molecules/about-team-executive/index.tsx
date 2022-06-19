import Image from 'next/image';

type TeamMemberInfoType = any;

const AboutTeamExecutive = (props: TeamMemberInfoType) => {
	const { info } = props;

	return (
		<div className="bg-white mr-[14px] text-center border hover:shadow-lg rounded-[16px]">
			<div className="w-[100px] pt-[50px] rounded-full m-auto">
				{/* <img
                    className="w-full rounded-full"
                    src={info?.profile_photo || 'assets/landing/avatar.png'}
                    // width={50}
                    // height={50}
                /> */}
				<Image
					src={info?.profile_photo || 'assets/landing/avatar.png'}
					className="w-full rounded-full"
					alt="image"
					layout="responsive"
					height={'100%'}
					width={'100%'}
				/>
			</div>
			<h3 className="text-[24px] text-[#333333] font-[500] leading-[41px]">
				{`${info?.first_name} ${info?.last_name}`}
			</h3>
			<p className="text-[14px] text-[#787878] leading-[29px] px-[30px] pb-[70px]">
				Spent last 7+ years designing electro-optics systems for civil & military
				applications. With Moran, co-founded gas sensor IoT company and IoT optics startup.
				PhD in Electrical Engineering, specialization in electro-optics, Ariel University.
			</p>
		</div>
	);
};

export default AboutTeamExecutive;
