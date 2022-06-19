import Agrement from '@features/landing/agreement';
import { getAgreement } from '@features/landing/agreement/api';
import PublicLayout from '@layouts/public';
import FreelancerSignUpPopup from '@organisms/freelancer-signup-popup';
import ManufacturerSignUpPopup from '@organisms/manufacturer-signup';

const AgrementPage = (props: any) => {
	return (
		<PublicLayout isSupport="support">
			<ManufacturerSignUpPopup />
			<FreelancerSignUpPopup />
			<Agrement
				agreement={props.agreement}
				selectedType={props.selectedType}
			/>
		</PublicLayout>
	);
};

export default AgrementPage;

export const getServerSideProps = async () => {
	const selectedType = 'PRIVACY_POLICY';
	const agreement: any = await getAgreement(selectedType);

	return {
		props: {
			agreement,
			selectedType,
		},
	};
};
