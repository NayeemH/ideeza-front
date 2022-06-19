import { IContactUs } from '@models/contact';
import { ApiDataType, apiService } from 'utils/request';

export const sendContactUsEmail = async (formData: IContactUs) => {
	let result: IContactUs | null = null;
	const apiData: ApiDataType = {
		method: 'post',
		url: 'core/contact-us/email/',
		data: formData,
	};

	await apiService(apiData, (res: any, err: any) => {
		if (res) {
			console.log('res----');
			result = res?.data?.results || [];
		}
		console.log('error---', err);
	});

	return result;
};
