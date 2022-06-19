import Button from '@atoms/button';
import { BiArrowBack } from 'react-icons/bi';

export default function Custom404() {
	return (
		<div className="text-center flex items-center justify-center min-h-screen">
			<div>
				<h1 className="text-9xl text-primary opacity-50">404</h1>
				<h1 className="text-2xl text-gray-400 mb-6">Page Not Found</h1>
				<Button
					value={'Go back'}
					variant="contained"
					color="primary"
					iconStart={<BiArrowBack />}
					onClick={() => {
						typeof window !== 'undefined' && window.history.go(-1);
						return false;
					}}
				/>
			</div>
		</div>
	);
}
