import Label from '@atoms/label';
import Loader from '@atoms/loader';
import AgreementTabsHeader from '@organisms/agreementTabsHeader';
import { FC } from 'react';

interface AgreementTabContentType {
	content: string;
	icon: any;
	title: string;
	loading: boolean;
}

const AgreementTabContent: FC<AgreementTabContentType> = (props) => {
	const { content, icon, title, loading } = props;

	return (
		<div className="relative">
			{loading && (
				<Loader
					type="relative"
					isTransparentBg
				/>
			)}
			<AgreementTabsHeader
				icon={icon}
				title={title}
			/>
			<div className="py-8">
				{content ? (
					<div
						className="overflow-auto md:pr-12 pr-6 agreement-content"
						dangerouslySetInnerHTML={{ __html: content }}
					></div>
				) : (
					<Label
						value="No content found!"
						className="text-xl md:text-2xl xl:text-3xl 2xl:text-3xl my-32 text-black-300 font-meri xl:mx-32 md:mx-20 font-normal text-center"
					/>
				)}
			</div>
		</div>
	);
};

export default AgreementTabContent;
