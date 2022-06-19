import { ApiDataType, apiService } from 'utils/request';

export type TeamRoleType = 'executive' | 'contributor';

export const getTeam = async (role?: TeamRoleType) => {
	let team: any = [];
	const apiData: ApiDataType = {
		method: 'get',
		url: 'account/team/public-list/',
	};
	await apiService(apiData, (res: any) => {
		if (res) {
			team = res?.data || [];

			if ((team.length > 0 && role == 'executive') || 'contributor') {
				team = team.filter((member: any) => {
					switch (role) {
						case 'executive':
							return member.role === 'Admin';
						case 'contributor':
							return member.role !== 'Admin';
						default:
							return member;
					}
				});
			}
			// console.log('team----', team)
		}
		// console.log('error---', err)
	});
	return team;
};

export type JobPositionType = 'Developer' | 'Marketing' | 'Designer';

export const getJobs = async (position?: JobPositionType, isOpen: boolean = true) => {
	let jobs: any = [];
	const apiData: ApiDataType = {
		method: 'get',
		url: `job/?is_open=${isOpen}${position ? '&position__name=' + position : ''}`,
	};
	await apiService(apiData, (res: any) => {
		if (res) {
			// console.log('jobs---', res)
			jobs = res?.data?.results || [];
		}
		// console.log('error---', err)
	});
	return jobs;
};
