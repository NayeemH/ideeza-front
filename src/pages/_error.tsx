import CommonMeta from '@atoms/commonMeta';
import { ErrorDefault, NotFound } from '@organisms/not-found';
import React from 'react';

class Error extends React.Component<any> {
	static getInitialProps({ res, err }: any) {
		const statusCode = res ? res.statusCode : err ? err.statusCode : null;
		return { statusCode };
	}

	render() {
		return (
			<>
				<CommonMeta />
				{this.props.statusCode == 404 ? (
					<NotFound></NotFound>
				) : (
					<ErrorDefault></ErrorDefault>
				)}
			</>
		);
	}
}

export default Error;
