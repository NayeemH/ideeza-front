import Label from '@atoms/label';
import AgentCard from '@molecules/agent-card';
import SearchInput from '@molecules/search-input';
import React from 'react';

function Agent({ friends }: any) {
	return (
		<div className="max-h-96 pr-3 pb-3 overflow-y-auto">
			<div className="flex justify-end ">
				<SearchInput
					placeholder="search"
					className="border"
					inputClass="text-base 2xl:text-xl py-2"
				/>
			</div>
			<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-4">
				{Array.isArray(friends) && friends.length > 0 ? (
					friends.map((item) => {
						return (
							<AgentCard
								key={item.id}
								data={item}
							/>
						);
					})
				) : (
					<p>No data found!</p>
				)}
			</div>
			<Label
				value="End of the search results"
				className="text-gray-900 text-center tracking-tight w-full pt-14"
			/>
		</div>
	);
}
export default Agent;
