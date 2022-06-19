import SuccessStory from '@features/landing/story';
import { getSuccessStories } from '@features/landing/story/api';
import { ISuccessStoryAPIData } from '@models/success-story';
import PublicLayout from 'layouts/public';
import { getPaginateMeta } from 'utils/utils';
import FreelancerSignUpPopup from '@organisms/freelancer-signup-popup';
import ManufacturerSignUpPopup from '@organisms/manufacturer-signup';

const SuccessStoryPage = (props: any) => {
	return (
		<PublicLayout isSupport="support">
			<ManufacturerSignUpPopup />
			<FreelancerSignUpPopup />
			<SuccessStory
				successStories={props.successStories}
				paginateMeta={props.paginateMeta}
			/>
		</PublicLayout>
	);
};
export default SuccessStoryPage;

export const getServerSideProps = async () => {
	const page = 1;
	const perPage = 3;
	const storyData: ISuccessStoryAPIData = await getSuccessStories(page, perPage);
	const successStories = storyData?.results || [];
	const paginateMeta = getPaginateMeta(storyData, page, perPage);

	// console.log(paginateMeta, '------storyData, paginateMeta')

	return {
		props: {
			successStories,
			paginateMeta,
		},
	};
};
