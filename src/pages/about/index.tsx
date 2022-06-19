import AboutPage from '@features/landing/about';
import { getJobs, getTeam, JobPositionType } from '@features/landing/about/api';
import PublicLayout from 'layouts/public';
import FreelancerSignUpPopup from '@organisms/freelancer-signup-popup';
import ManufacturerSignUpPopup from '@organisms/manufacturer-signup';

const About = (props: any) => {
	return (
		<PublicLayout title="IDEEZA | AI Based SAAS - About">
			<ManufacturerSignUpPopup />
			<FreelancerSignUpPopup />
			<AboutPage
				teamMembers={props.team}
				jobsDeveloper={props.jobs}
			/>
		</PublicLayout>
	);
};

export default About;

export const getServerSideProps = async () => {
	const team: any = await getTeam();

	const selectedJobPosition: JobPositionType = 'Developer';
	const jobsDeveloper: any = await getJobs(selectedJobPosition);

	return {
		props: {
			team,
			jobs: jobsDeveloper,
		},
	};
};
