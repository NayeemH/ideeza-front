import Loader from '@atoms/loader';
import AgentCard from '@molecules/agent-card';
import { useDetectSelfUser } from 'app/hooks';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { apiService } from '../../../../utils/request';

function TabFriends() {
	const router = useRouter();
	const user_id = Number(router.query.id);
	const [loading, setLoading] = useState(true);
	const [friendList, setFriendList] = useState<any[]>([]);
	const isSelfUser = useDetectSelfUser(user_id);

	const getFriendList = async () => {
		const url = isSelfUser
			? `/account/user/${user_id}/friendlist/`
			: `/account/user/${user_id}/friendlist/`;
		// "account/friend/"

		await apiService(
			{
				method: 'get',
				url,
				token: true,
			},
			(res: any) => {
				if (res) {
					const { data } = res;

					setFriendList(data.results);
					setLoading(false);
					return;
				}

				setLoading(false);
			}
		);
	};

	useEffect(() => {
		getFriendList();
	}, []);

	return (
		<>
			{loading ? (
				<div className="relative h-96">
					<Loader type="relative" />
				</div>
			) : (
				<div className="max-h-96 pr-3 pb-3 overflow-y-auto relative mt-[23px]">
					<div className="mb-5">
						<input
							type="text"
							className="text-base text-[#999999] focus:outline-none bg-[#FBFBFB] border border-[#E6E6E6] rounded-sm w-[260px] pl-5 pt-3 pb-4"
							placeholder="Search"
						/>
					</div>
					{Array.isArray(friendList) && friendList.length > 0 ? (
						<>
							{/*<div className="flex justify-end ">
                        <SearchInput
                            placeholder="search"
                            className="border"
                            inputClass="text-base 2xl:text-xl py-2"
                        />
                    </div>*/}
							<div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-4">
								{friendList.map((item) => {
									return (
										<AgentCard
											key={(item as any).id}
											data={item}
										/>
									);
								})}
							</div>
						</>
					) : (
						<p className="text-center">No friend(s) found!</p>
					)}
				</div>
			)}
		</>
	);
}

export default TabFriends;
