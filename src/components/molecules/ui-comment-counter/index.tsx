import { numerify } from 'utils/utils';

interface CommentCounterType {
	count: number;
}

const UiCommentCounter = (props: CommentCounterType) => {
	const { count } = props;

	const counterLabel = (count: number) => {
		if (count < 1) return <span>No Comments</span>;
		else if (count === 1) return <span>One Comment</span>;
		else if (count === 2) return <span>Two Comments</span>;
		else
			return (
				<>
					<span>Comments</span>
					<span className="ml-2">({numerify(count)})</span>
				</>
			);
	};

	return (
		<div className="text-[20px] text-[#333333] font-poppins font-[500]">
			{counterLabel(count)}
		</div>
	);
};

UiCommentCounter.defaultProps = {
	count: 0,
};

export default UiCommentCounter;
