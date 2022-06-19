import OnHoverPlayVideo from '@molecules/on-hover-play';
import { AiFillCamera } from 'react-icons/ai';
import { FiStar } from 'react-icons/fi';
import { IoTrashOutline } from 'react-icons/io5';

const TabsProjectsVideosContent = (props: any) => {
	const {
		type,
		mediaList,
		defaultMediaUrl,
		onClickSetDefaultMedia,
		onClickSetNew,
		onClickDeleteMedia,
	} = props;

	return (
		<div className="w-full flex flex-col items-center justify-center">
			<div className="w-[420px] p-3">
				{type === 'image' && (
					<div
						className="w-[380px] h-[190px] bg-no-repeat bg-cover bg-center"
						style={{
							backgroundImage: `url(${defaultMediaUrl || '/images/project/car.png'})`,
						}}
					></div>
				)}
				{type === 'video' && (
					<OnHoverPlayVideo
						poster={'/images/placeholder.jpg'}
						src={defaultMediaUrl}
						videoSize="w-[380px] h-[190px] object-cover"
					/>
				)}
				<div className="flex items-center justify-center mt-4">
					<div
						className="m-2 border border-primary rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
						onClick={onClickSetDefaultMedia}
					>
						<FiStar className="text-primary text-xl" />
					</div>
					<div
						className="m-2 border border-primary rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
						onClick={onClickSetNew}
					>
						<AiFillCamera className="text-primary text-xl" />
					</div>
					<div
						className="m-2 border border-primary rounded-full h-10 w-10 flex items-center justify-center cursor-pointer"
						onClick={onClickDeleteMedia}
					>
						<IoTrashOutline className="text-primary text-xl" />
					</div>
				</div>
			</div>

			{mediaList?.length > 0 && (
				<div className="w-full px-2">
					<div className="flex items-center flex-wrap">
						{mediaList.map((item: any, key: number) => (
							<>
								{type == 'video' ? (
									<OnHoverPlayVideo
										poster={'/images/placeholder.jpg'}
										src={item?.video}
										videoSize={`w-20 h-20 object-cover ${
											item?.is_default
												? 'pointer-event-none'
												: 'cursor-pointer'
										}`}
										key={key}
									/>
								) : (
									<div
										className="w-20 h-20 bg-no-repeat bg-cover bg-center m-1.5"
										style={{
											backgroundImage: `url(${
												item?.image || '/images/project/car.png'
											})`,
										}}
										key={key}
									></div>
								)}
							</>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default TabsProjectsVideosContent;
