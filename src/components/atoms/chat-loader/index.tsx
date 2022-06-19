import React from 'react';

export default function MessageLoader() {
	return (
		<div>
			<div className="flex gap-4 items-end mb-4 animate-pulse">
				<div className="xl:w-12 xl:h-12 2xl:w-20 2xl:h-20 bg-gray-300 rounded-full"></div>
				<div>
					<time className="text-sm text-gray-300 text-right block">▀▀▀▀▀▀▀</time>
					<div className="border p-2 rounded rounded-bl-none ">
						<p className="text-gray-300 text-md flex items-center bg-4">
							████████████████████████████
						</p>
					</div>
				</div>
			</div>

			<div className="flex flex-row-reverse gap-4 items-end mb-4 animate-pulse">
				<div className="xl:w-12 xl:h-12 2xl:w-20 2xl:h-20 bg-gray-300 rounded-full"></div>
				<div>
					<div className="flex flex-row-reverse items-center group">
						<div>
							<time className="text-sm text-gray-300 text-left block">▀▀▀▀▀▀▀</time>
							<div className="border p-2 rounded rounded-br-none ">
								<p className="text-gray-300 text-md flex items-center">
									███████████████████████
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
