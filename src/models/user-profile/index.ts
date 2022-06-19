import { IUser } from '@models/auth';

export interface IUserActivities {
	time: Date;
	title: string;
	description: string;
}

export interface IUserFriends {
	id: 0;
	user: string;
	mutual_friends: string;
	updated_at: Date;
	created_at: Date;
	status: 'PENDING' | 'ACCEPTED';
}

export interface IUserConnection {
	is_follower?: boolean;
	is_friend?: boolean;
	room?: number;
	user?: IUser;
}
