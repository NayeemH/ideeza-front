import AboutCareerJob from '@molecules/about-career-job';

const CareerJobList = (props: any) => {
	const { jobs } = props;
	// const [selectedJobIndex, setSelectedJobIndex] = useState<number | null>(null)

	// const onChangeJobDetails = (index: any) => {
	// 	setSelectedJobIndex(index)
	// }

	return (
		<div className="pt-4 md:mt-[80px] 2xl:mx-[468px] h-full custom-job-accordion">
			<div className="rounded-t-5xl overflow-hidden relative">
				{jobs?.length > 0 &&
					jobs.map((job: any, index: number) => (
						<AboutCareerJob
							info={job}
							jobIndex={index}
							key={index}
							// expanded={selectedJobIndex === index}
							// handleChange={() => onChangeJobDetails(index)}
						/>
					))}
			</div>
		</div>
	);
};

export default CareerJobList;
