import { setBlock } from '@layouts/private/sidebar/reducer';
import { ICodeBlock } from '@models/code';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useState } from 'react';
import { FiShoppingCart } from 'react-icons/fi';
import { MdDeleteForever } from 'react-icons/md';

// interface addedPartsProps {
// 	onChangeXml?(xmlString: any, partBlocks: any[]): void;
// 	removeBlock?()
// }

export default function AddedParts(props: any) {
	const selectedBlock = useAppSelector((state) => state.sidebar.block);
	const dispatch = useAppDispatch();
	const [show, setShow] = useState(false);
	const [toggle, setToggle] = useState<number | null>();

	const toggler = (i: number) => {
		setToggle(toggle === i ? null : i);
	};
	const handleDelete = (i: number) => {
		const removeItem = selectedBlock[i];
		if (props.onRemovePart) {
			props.onRemovePart(removeItem);
		}
		const allBlock = selectedBlock.filter((v) => v !== removeItem);
		dispatch(setBlock(allBlock));
	};

	return (
		<div>
			<div
				className={`w-96 bg-white rounded-bl-md shadow-md p-6 fixed z-20 transition-all ${
					show ? 'right-0' : '-right-96'
				}`}
			>
				<button
					className="bg-white px-4 py-3 rounded-l-md absolute -left-12 top-0 shadow-md z-10"
					onClick={() => setShow(!show)}
				>
					<FiShoppingCart size="20" />
				</button>
				<h3 className="text-primary text-md font-bold text-center mb-4">Added Parts</h3>
				<div className="h-60 overflow-y-auto">
					{Array.isArray(selectedBlock) && selectedBlock.length > 0 ? (
						<div className="w-full">
							{selectedBlock.map((item: ICodeBlock, i: number) => (
								<div
									key={i}
									className="odd:bg-gray-100 even:bg-white"
								>
									<div className="flex gap-4 items-center p-2 border-b">
										<div
											className="text-gray-600 cursor-pointer flex-1"
											onClick={() => toggler(i)}
										>
											{item?.name}
										</div>
										<div className="flex-1">
											<img
												src="https://via.placeholder.com/40/40/"
												alt="block"
											/>
										</div>
										<div>
											<button
												className="text-gray-600"
												onClick={() => handleDelete(i)}
											>
												<MdDeleteForever size="20" />
											</button>
										</div>
									</div>
									{toggle === i && (
										<div className="bg-white p-4">
											<h6 className="font-normal text-gray-400">
												Description
											</h6>
											<p className="font-light">
												{item.description
													? item.description
													: 'No description'}
											</p>
										</div>
									)}
								</div>
							))}
						</div>
					) : (
						<div className="flex justify-center h-full items-center">
							<p>Cart is empty!</p>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
