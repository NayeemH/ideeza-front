import Button from '@atoms/button';
import Label from '@atoms/label';
import { useRouter } from 'next/router';
import React from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';

const ServiceProviderQuestionnarie = () => {
	const router = useRouter();
	return (
		<div className="bg-white p-4 shadow-xl rounded-xl">
			<Button
				value={
					<>
						<BsArrowLeftCircle className="mr-1" />
						<span>Go back</span>
					</>
				}
				className="text-white bg-primary mx-3 text-xl font-semibold"
				color="primary"
				onClick={() => router.back()}
			/>
			<Label
				value="Questionnaire"
				className="text-3xl font-medium text-primary ml-3 mt-5"
			/>
			<Label
				value="User has not yet filled the questionnaire out."
				className="text-xl font-medium text-[#3E3E3E] mt-5 mb-3 ml-3"
			/>
			<Button
				value="Remind"
				className="text-white bg-primary mx-3 mb-5"
				color="primary"
				onClick={() => router.push('/service-provider/projects/1/questionnaire/reminder')}
			/>
		</div>
	);
};

export default ServiceProviderQuestionnarie;
