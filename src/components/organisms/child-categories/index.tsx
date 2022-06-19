import { setOpenBlockMenu } from '@layouts/private/sidebar/reducer';
import CustomTreeView from '@organisms/custom-treeview';
import { useAppDispatch } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import { apiService } from 'utils/request';

const ChildCategories = ({ parentCat }: any) => {
	const dispatch = useAppDispatch();

	const [publicChildren, setPublicChildren] = useState<any>([]);
	const [privateChildren, setPrivateChildren] = useState<any>([]);
	// const [initRender, setInitRender] = useState<boolean>(true)

	const getChildren = async () => {
		const public_children: any = [];
		const private_children: any = [];
		await apiService(
			{
				method: 'get',
				url: `/core/category-project/${parentCat.id}/children/`,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;
					const newChildren = data?.results;

					if (newChildren?.length > 0) {
						newChildren.forEach((child: any) => {
							if (child?.is_visible === true) {
								public_children.push(child);
							} else {
								private_children.push(child);
							}
						});
					}
					setPublicChildren(public_children);
					setPrivateChildren(private_children);
					return;
				}
			}
		);
	};

	// console.log(`#${parentCat.id} initRender--------${initRender}`)

	useEffect(() => {
		// setInitRender(false)
		getChildren();
		return () => {
			setPublicChildren([]);
			setPrivateChildren([]);
			// setInitRender(true)
		};
	}, []);

	return (
		<>
			{publicChildren.length > 0 && (
				<CustomTreeView title={'Public'}>
					{publicChildren.map((child: any, index: number) => (
						<CustomTreeView
							key={index}
							title={child?.name}
							onClick={() =>
								child?.has_children
									? undefined
									: dispatch(setOpenBlockMenu(child?.name))
							}
						>
							{child?.has_children && <ChildCategories parentCat={child} />}
						</CustomTreeView>
					))}
				</CustomTreeView>
			)}

			{privateChildren.length > 0 && (
				<CustomTreeView title={'Private'}>
					{privateChildren.map((child: any, index: number) => (
						<CustomTreeView
							key={index}
							title={child?.name}
							onClick={() =>
								child?.has_children
									? undefined
									: setTimeout(() => {
											dispatch(setOpenBlockMenu(child?.name));
											// console.log('Clicked Last Children+----Private', initRender)
									  }, 1000)
							}
						>
							{child?.has_children && <ChildCategories parentCat={child} />}
						</CustomTreeView>
					))}
				</CustomTreeView>
			)}
		</>
	);
};

export default ChildCategories;
