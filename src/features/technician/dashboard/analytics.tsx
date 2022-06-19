import Label from '@atoms/label';
import IconLabel from '@molecules/icon-label';

function Analytics(props: any) {
	const {
		mainClass = 'xl:flex  w-full items-center space-y-2 lg:space-y-0',
		morningTitle,
		greeting,
		cards = 'w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[200px_200px_200px_320px] xl:grid-cols-4 2xl:grid-cols-[225px_225px_225px_350px] gap-[15px]',
		cardMainClass = 'flex-row flex items-center lg:flex-wrap 2xl:flex-nowrap bg-white shadow-full rounded-sm sm:justify-start xl:justify-center 2xl:justify-start lg:justify-start px-[10px] py-[4px] md:px-5 md:py-3',
		cardLabelMain = 'text-[12px] xl:text-[18px] lg:text-center 2xl:text-left',
		innerLabel = 'md:text-[26px] text-[14px] font-proxima-nova font-semibold text-left leading-[35px]',
		// cardIcon,
		cardIcon = 'w-[35px]',
		messages,
		articles,
		tasks,
		score,
	} = props;
	return (
		<>
			<div className={mainClass}>
				<Label
					value={greeting ?? 'Greeting!'}
					classes={{
						root: `${morningTitle}`,
					}}
				/>
				<div className={cards}>
					<IconLabel
						// TODO
						onClick={() => {
							'goto';
						}}
						tooltipProps={{ open: false }}
						labelValue={
							<>
								<div className="flex justify-between items-center">
									<span className={innerLabel}>{messages?.count ?? 0}</span>
									{/* <img
										src="/images/icon/tech-customer-reviews.svg"
										className="sm:hidden h-[20px] w-[20px]"
										alt="icon"
									/> */}
								</div>
								{messages?.title}
							</>
						}
						iconContanerClass="text-lg"
						lableClass={{
							root: `${cardLabelMain}`,
						}}
						iconComponent={
							<div className="w-[57px] h-[57px] bg-[#FFE8FA] flex items-center justify-center mr-[15px] rounded-[6px]">
								<img
									src="/images/icon/tech-customer-reviews.svg"
									className={cardIcon}
									alt="icon"
								/>
							</div>
						}
						mainClass={cardMainClass}
					/>
					<IconLabel
						// TODO
						onClick={() => {
							'goto';
						}}
						tooltipProps={{ open: false }}
						labelValue={
							<>
								<div className="flex justify-between items-center">
									<span className={innerLabel}>{articles?.count ?? 0}</span>
									{/* <img
										src="/images/icon/article.svg"
										className="sm:hidden h-[20px] w-[20px]"
										alt="icon"
									/> */}
								</div>
								{articles?.title}
							</>
						}
						iconContanerClass="text-lg"
						lableClass={{
							root: `${cardLabelMain}`,
						}}
						iconComponent={
							<div className="w-[57px] h-[57px] bg-[#FFE8FA] flex items-center justify-center mr-[15px] rounded-[6px]">
								<img
									src="/images/icon/article.svg"
									className="w-[30px]"
									alt="icon"
								/>
							</div>
						}
						mainClass={cardMainClass}
					/>
					<IconLabel
						// TODO
						onClick={() => {
							'goto';
						}}
						tooltipProps={{ open: false }}
						labelValue={
							<>
								<div className="flex justify-between items-center">
									<span className={innerLabel}>{tasks?.count ?? 0}</span>
									{/* <img
										src="/images/icon/search.svg"
										className="sm:hidden h-[20px] w-[20px]"
										alt="icon"
									/> */}
								</div>
								{tasks?.title}
							</>
						}
						iconContanerClass="text-lg"
						lableClass={{
							root: `${cardLabelMain}`,
						}}
						iconComponent={
							<div className="w-[57px] h-[57px] bg-[#FFE8FA] flex items-center justify-center mr-[15px] rounded-[6px]">
								<img
									src="/images/icon/search.svg"
									className="w-[30px]"
									alt="icon"
								/>
							</div>
						}
						mainClass={cardMainClass}
					/>
					<IconLabel
						tooltipProps={{ open: false }}
						labelValue={
							<>
								<div className="flex justify-between items-center">
									<span className={innerLabel}>{score?.count ?? 0}</span>
									{/* <img
										src="/images/icon/radio-btn.svg"
										className="sm:hidden h-[20px] w-[20px]"
										alt="icon"
									/> */}
								</div>
								{score?.title}
							</>
						}
						iconContanerClass="text-lg"
						lableClass={{
							root: `${cardLabelMain}`,
						}}
						iconComponent={
							<div className="w-[57px] h-[57px] bg-[#FFE8FA] flex items-center justify-center mr-[15px] rounded-[6px]">
								<img
									src="/images/icon/radio-btn.svg"
									className="w-[24px]"
									alt="icon"
								/>
							</div>
						}
						mainClass={cardMainClass}
						// TODO
						onClick={() => {
							'goto';
						}}
						isRookie={true}
					/>
				</div>
			</div>
		</>
	);
}
Analytics.defaultProps = {
	morningTitle:
		' md:w-1/2 font-proxima-nova md:pr-1 text-3xl md:text-2xl xl:text-[40px] text-primary font-bold',
};
export default Analytics;
