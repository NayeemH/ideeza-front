import Button from '@atoms/button';
import Label from '@atoms/label';
import { IInvestorNewsSingle } from '@models/investor';
import { format } from 'date-fns';
import { IMAGE_PLACEHOLDER } from 'enums/common';
import Image from 'next/image';
import { FC } from 'react';
import { getTextExcerpt } from 'utils/utils';

interface InvestorNewsSinglePropsType {
	item?: IInvestorNewsSingle;
}
const InvestorNewsSingle: FC<InvestorNewsSinglePropsType> = (props) => {
	const { item } = props;

	return (
		<div className="md:mr-8 md:-ml-2 rounded-[10px] overflow-hidden bg-white border cursor-pointer">
			<Image
				src={item?.cover_file || IMAGE_PLACEHOLDER}
				className="rounded-t-xl border"
				alt="image"
				width={'100%'}
				height={'70%'}
				layout="responsive"
			/>
			<div className="p-3">
				{item?.title && (
					<Label
						value={item.title}
						className="font-medium text-lg md:text-xl text-[#101010] mb-2 "
					/>
				)}
				{item?.description && (
					<Label
						value={getTextExcerpt(item?.description, 100, true)}
						className="text-[#787878] h-[50px] text-[14px] md:text-[16px] custom-line-height-28"
					/>
				)}
				<div className="flex items-center justify-between pt-4">
					{item?.created_at && (
						<Label
							value={format(new Date(item.created_at), 'dd MMMM, yyyy')}
							className="text-[#999999] text-xs"
						/>
					)}
					<Button
						value="See on blog"
						className="text-white bg-primary px-6 py-3 transform-none tracking-tight rounded hover:shadow-none shadow-none border-0"
						color="primary"
					/>
				</div>
			</div>
		</div>
	);
};

export default InvestorNewsSingle;
