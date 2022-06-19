export interface IDashboardPopup {
	open?: any;
	toggleOpen?: any;
	handler?: any;
	mySelf?: boolean;
	loader?: boolean;
	toggleMySelftProject?: any;
	toggleIdeezaProject?: any;
	ideeza?: any;
	history?: any;
	state?: any;
	handleJoyRideApprove?: () => void;
}
export interface ICreateProjectPopup {
	open?: any;
	close?(): void;
	handler?: any;
	loader?: any;
	onClose?(): void;
	name?: string;
	is_visible?: boolean;
	onChangeName?(name: string): void;
	nameEdited?: boolean;
	componentType?: any;
	editor_script?: string;
	onChangeNameEdited?(status: boolean): void;
	defaultValue?: {
		name: string;
		description: string;
	};
	gEditorRef?: any;
	eEditorRef?: any;
	cEditorRef?: any;
	openPopup?: boolean;

	video?: any;
	snapshot?: any;
	file?: any;
	electronic?: any;
	cover?: any;
	onCreateSuccess?: () => void;
	onCreateFailed?: (error?: any) => void;
	productCreateMode?: boolean;
}

export interface ILast_Inovation {
	mainClass?: string;
	aboutClass?: string;
	bottomClass?: string;
	imageClass?: string;
	imageSrc?: string;
	userName?: string;
	userNameClass?: string;
	postDate?: string;
	postDateClass?: string;
	postTitle: string;
	postDescription?: string;
	postTitleClass?: string;
	postDescriptionClass?: string;
	comments?: number;
	commentsClass?: string;
	buttonValue?: string;
	buttonClass?: string;
	id?: string | number | undefined;
	setSelectedBlog: (id?: number | string) => void;
	selectedBlog: string | number | undefined;
}
