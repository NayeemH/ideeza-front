import { apiService } from 'utils/request';
import { base64ToFile } from 'utils/utils';
import { createComponent, registerProductToProject } from './request';
import { toast } from 'react-toastify';

export const addMedia = async (
	model: string,
	modelType: 'video' | 'image',
	modelId: any,
	media: any
) => {
	const mediaData = new FormData();
	if (modelType === 'video') {
		mediaData.append('video_type', 'VIDEO');
		mediaData.append('video', media);
	}

	if (modelType === 'image') {
		const snapshotUrl = await base64ToFile(media);
		mediaData.append('image', snapshotUrl);
	}

	mediaData.append('is_default', 'true');
	mediaData.append(model, modelId);

	await apiService(
		{
			method: 'post',
			url: `/${model}/${modelType}/`,
			data: mediaData,
			token: true,
		},
		(res: any) => {
			if (res) {
				// const { data } = res
				// console.log(`${model} response`, data)

				return;
			}
		}
	);
};

export interface IProjectCreateFlowData {
	project_id?: number;
	is_visible?: boolean;
	name?: string;
	description?: string;
	three_d_script?: any;
	video?: any;
	image?: any;
	editor_script?: string;
	electronicThreeDData?: any;
	coverThreeDData?: any;
	// NFT Data
	minIncrement?: number;
	directBuyPrice?: number;
	startPrice?: number;
	endTime?: any;
	tokenId?: number;
	price?: number;
	royalties?: number;
	chain?: string;
	collection?: string;
}

export interface IProductCreateFlowData {
	project_id?: number;
	is_visible?: boolean;
	name?: string;
	description?: any;
	three_d_script?: any;
	video?: any;
	image?: any;
	editor_script?: string;
	electronicThreeDData?: any;
	coverThreeDData?: any;
	// NFT Data
	minIncrement?: number;
	directBuyPrice?: number;
	startPrice?: number;
	endTime?: any;
	tokenId?: number;
	price?: number;
	royalties?: number;
	chain?: string;
	collection?: string;
}

export const createProjectFlow = async (
	data: IProjectCreateFlowData,
	onsale = false,
	successCallback?: () => void,
	failedCallback?: (error: any) => void
) => {
	// console.log('data from CreateProjectFlow Function--------', data)
	const projectFormData: any = new FormData();
	projectFormData.append('is_visible', `${data?.is_visible}`);
	projectFormData.append('name', data?.name || '');
	projectFormData.append('description', data?.description || '');
	projectFormData.append('editor_script', data?.editor_script || '');
	projectFormData.append('three_d_script', JSON.stringify(data.electronicThreeDData));
	projectFormData.append('three_d_file', data?.three_d_script?.file);

	// NFT FormData
	if (onsale) projectFormData.append('on_sale', onsale);
	if (onsale && data?.minIncrement) projectFormData.append('minIncrement', data?.minIncrement);
	if (onsale && data?.directBuyPrice)
		projectFormData.append('directBuyPrice', data?.directBuyPrice);
	if (onsale && data?.startPrice) projectFormData.append('startPrice', data?.startPrice);
	if (onsale && data?.endTime) projectFormData.append('endTime', data?.endTime);
	if (onsale && data?.tokenId) projectFormData.append('tokenId', data?.tokenId);

	await apiService(
		{
			method: 'post',
			url: `/project/`,
			data: projectFormData,
			token: true,
		},
		async (projectResponse: any, projectErr: any) => {
			if (projectResponse) {
				const project_id = projectResponse.data.id;

				// Create Project video
				if (data?.video) {
					await addMedia('project', 'video', project_id, data?.video);
				}

				// Create Project Image
				if (data?.image) {
					await addMedia('project', 'image', project_id, data?.image);
				}

				const productFormData: any = new FormData();
				productFormData.append('is_visible', `${data?.is_visible}`);
				productFormData.append('name', data?.name || '');
				productFormData.append('description', data?.description || '');
				// productFormData.append(
				//     'three_d_script',
				//     JSON.stringify(data.three_d_script)
				// )
				productFormData.append('editor_script', data?.editor_script || '');

				productFormData.append('three_d_script', JSON.stringify(data.electronicThreeDData));
				// productFormData.append('three_d_file', data.coverThreeDData)
				productFormData.append('three_d_file', data?.three_d_script?.file);

				// const getFileFromUrl = async (url: string, name:any, defaultType = 'text/plain') => {
				//     const response = await fetch(url);
				//     const data = await response.blob();
				//     return new File([data], name, {
				//       type: data.type || defaultType,
				//     });
				//   }

				// const file = await getFileFromUrl('/scene.gltf', 'example.gltf');
				// console.log('file', file);

				// productFormData.append('three_d_file', file)
				// productFormData.append('three_d_file', data?.three_d_script?.file)

				// NFT FormData
				if (onsale) productFormData.append('on_sale', onsale);
				if (onsale && data?.minIncrement)
					productFormData.append('minIncrement', data?.minIncrement);
				if (onsale && data?.directBuyPrice)
					productFormData.append('directBuyPrice', data?.directBuyPrice);
				if (onsale && data?.startPrice)
					productFormData.append('startPrice', data?.startPrice);
				if (onsale && data?.endTime) productFormData.append('endTime', data?.endTime);
				if (onsale && data?.tokenId) productFormData.append('tokenId', data?.tokenId);

				await apiService(
					{
						method: 'post',
						url: `/product/`,
						data: productFormData,
						token: true,
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					},
					async (productResponse: any, productErr: any) => {
						if (productResponse) {
							const product_id = productResponse.data.id;

							// Create Product video
							if (data?.video) {
								await addMedia('product', 'video', product_id, data?.video);
							}

							// Create Product Image
							if (data?.image) {
								await addMedia('product', 'image', product_id, data?.image);
							}

							await registerProductToProject({
								id: project_id,
								products: [product_id],
							});

							await createComponent({
								is_visible: data?.is_visible,
								name: data?.name,
								editor_script: data?.editor_script,
								component_type: 'CODE',
								product: product_id,
							});

							await createComponent({
								is_visible: data?.is_visible,
								name: data.name,
								three_d_script: JSON.stringify(data?.electronicThreeDData),
								component_type: 'ELECTRONIC',
								product: product_id,
							});

							const coverFormData: any = new FormData();
							coverFormData.append('is_visible', `${data?.is_visible}`);
							coverFormData.append('name', data?.name || '');
							coverFormData.append('three_d_file', data?.coverThreeDData);
							coverFormData.append('component_type', 'COVER');
							coverFormData.append('product', product_id);

							await apiService(
								{
									method: 'post',
									url: `/component/`,
									data: coverFormData,
									token: true,
								},
								(codeRes: any, codeError: any) => {
									if (codeRes) {
										return;
									} else if (codeError) {
										return;
									}
								}
							);

							// await createComponent({
							//     is_visible: data?.is_visible,
							//     name: data.name,
							//     three_d_file: data?.coverThreeDData,
							//     component_type: 'COVER',
							//     product: product_id,
							// })
							if (typeof successCallback === 'function') successCallback();
						}
						if (productErr && typeof failedCallback === 'function') {
							return failedCallback(productErr);
						}
					}
				);
			}
			if (projectErr && typeof failedCallback === 'function') {
				return failedCallback(projectErr);
			}
		}
	);
};

export const createProductFlow = async (
	data: IProductCreateFlowData,
	onsale = false, // onsale: 'false' for public and save product
	successCallback?: () => void,
	failedCallback?: (error: any) => void
) => {
	const project_id = data?.project_id;

	// console.log("GJSON", data);

	const productFormData: any = new FormData();
	productFormData.append('is_visible', `${data?.is_visible}`);
	productFormData.append('name', data?.name || '');
	productFormData.append('three_d_file', data?.three_d_script?.file);
	productFormData.append('description', data?.description || '');
	productFormData.append('three_d_script', JSON.stringify(data.electronicThreeDData));
	productFormData.append('on_sale', onsale);
	productFormData.append('editor_script', data?.editor_script || '');

	await apiService(
		{
			method: 'post',
			url: `/product/`,
			data: productFormData,
			token: true,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		},
		async (productResponse: any, productErr: any) => {
			if (productResponse) {
				const product_id = productResponse.data.id;

				// Create Product video
				if (data?.video) {
					await addMedia('product', 'video', product_id, data?.video);
				}

				// Create Product Image
				if (data?.image) {
					await addMedia('product', 'image', product_id, data?.image);
				}

				await registerProductToProject({
					id: project_id,
					products: [product_id],
				});

				await createComponent({
					is_visible: data?.is_visible,
					name: data?.name,
					editor_script: data?.editor_script,
					component_type: 'CODE',
					product: product_id,
				});

				await createComponent({
					is_visible: data?.is_visible,
					name: data.name,
					three_d_script: JSON.stringify(data?.electronicThreeDData),
					component_type: 'ELECTRONIC',
					product: product_id,
				});

				const coverFormData: any = new FormData();
				coverFormData.append('is_visible', `${data?.is_visible}`);
				coverFormData.append('name', data?.name || '');
				coverFormData.append('three_d_file', data?.coverThreeDData);
				coverFormData.append('component_type', 'COVER');
				coverFormData.append('product', product_id);

				await apiService(
					{
						method: 'post',
						url: `/component/`,
						data: coverFormData,
						token: true,
					},
					(codeRes: any, codeError: any) => {
						if (codeRes) {
							return;
						} else if (codeError) {
							return;
						}
					}
				);

				// await createComponent({
				//     is_visible: data?.is_visible,
				//     name: data.name,
				//     three_d_file: data?.coverThreeDData,
				//     component_type: 'COVER',
				//     product: product_id,
				// })
				if (typeof successCallback === 'function') successCallback();
			}
			if (productErr && typeof failedCallback === 'function') {
				return failedCallback(productErr);
			}
		}
	);
};

export const deleteProjectFlow = async (
	projectData: any,
	callback: (() => void) | undefined = undefined
) => {
	const promises = [];

	const deleteComponent = async (id: any) => {
		return await apiService(
			{
				method: 'delete',
				url: `/component/${id}/`,
				token: true,
			},
			(codeRes: any, codeError: any) => {
				if (codeRes) {
					return;
				} else if (codeError) {
					return;
				}
			}
		);
	};

	const deleteProduct = async (id: any) => {
		return await apiService(
			{
				method: 'delete',
				url: `/product/${id}/`,
				token: true,
			},
			(codeRes: any, codeError: any) => {
				if (codeRes) {
					return;
				} else if (codeError) {
					return;
				}
			}
		);
	};

	const deleteProject = async (id: any) => {
		return await apiService(
			{
				method: 'delete',
				url: `/project/${id}/`,
				token: true,
			},
			(codeRes: any, codeError: any) => {
				if (codeRes) {
					return;
				} else if (codeError) {
					toast.error('Failed to delete the project!');
					return;
				}
			}
		);
	};

	if (projectData?.products && projectData?.products?.length > 0) {
		projectData?.products?.forEach((product: any) => {
			if (product?.id && Number(product?.id) > 0) {
				// productIdList?.push(product?.id);
				// Delete the project here
			}

			if (product?.components && product?.components?.length > 0) {
				product?.components?.forEach((component: any) => {
					if (component?.id && Number(component?.id) > 0) {
						promises.push(deleteComponent(component?.id));
					}
				});

				promises.push(deleteProduct(product?.id));
			}
		});

		// Delete the project here
		promises.push(deleteProject(projectData?.id));

		Promise.all(promises).then(() => {
			if (callback && typeof callback === 'function') {
				callback();
			}
		});
	}
};
