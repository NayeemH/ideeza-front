export interface INewsFeedSectionProps {
	state?: any;
	loading?: boolean;
	handleSearchEnter?(search: string): void;
	classessort?: any;
	onSort?(sortBy: string): void;
	onReloadFeed?(): void;
}
