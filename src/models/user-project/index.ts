import React from 'react';

export interface ProjectPageContributedProps {
	value: string;
	loader?: any;
	loaded?: boolean;
	showAll?: boolean;
	projects?: any;
	isSeeAll: boolean;
	seeAllMode?: boolean;
	goto: string;
	gotoProjectDetails: (e?: any, id?: any) => void;
	gotoProductDetails?: (e?: any) => void;
	type?: string;
	onclickSeeAll: (e: string) => void;
	noProjectsBorder?: boolean;
	clickedProject?: number;
	numberOfProjectToShow?: number;
}
export interface ProjectHeaderProps {
	value: string;
	onclickSeeAll: (e: string) => void;
	hideSeeAll?: any;
	goto: string;
	isSeeAll: boolean;
	showBackButton?: boolean;
}

export interface ImageCardProps {
	carouselHeight?: string;
	imgSrc?: string;
	value?: string;
	numbering?: any;
	iconComponent1?: React.ReactNode;
	iconComponent2?: React.ReactNode;
	iconComponent3?: React.ReactNode;
	iconsClass?: string;
	iconValue1: number;
	iconValue2: number;
	iconValue3: number;
	noClass?: any;
	mainIconClass?: string;
	iconContanerClass?: string;
	lableClass: any;
	imgClasses?: string;
	onClick?: (e?: any) => void;
	text?: any;
	title?: any;
	projectId?: any;
	bottomIconContainer?: string;
}

export interface ProjectDetailsProps {
	projectId?: any;
	isPartDetails?: boolean;
}

export interface PricingPopupProps {
	open: boolean;
	toggleOpen: (e?: any) => void;
	onClick?: (e?: any) => void;
	onClickI?: (e?: any) => void;
	onClickT?: (e?: any) => void;
	onSuccessAddToCart?: () => void;
	onFailedAddToCart?: () => void;
}

export interface PricingProps {
	mainClass?: string;
	mainLogo?: string;
	labelClass?: string;
	value1Class?: string;
	value2Class?: string;
	src?: any;
	ImgClass?: string;
	ticks?: string;
	labelTick?: string;
	plusLabel?: string;
	labelPrivate?: string;
	consultClass?: string;
	value7Class?: string;
	value7IconClass?: string;
	btnGroupClass?: string;
	addContainer?: string;
	listContainer?: string;
	value?: string;
	value1: string;
	value2: string;
	value3: string;
	value4: string;
	value5: string;
	value6: string;
	value7: string;
	value8: string;
	value9: string;
	value10: string;
	value11?: string;
	heading?: string;
	consult?: string;
	lastBtnClass?: string;
	loginPopup?: (e?: any) => void;
}

export interface EditableInputProps {
	mainClass: string;
	childrenClass?: string;
	editContanerClass?: string;
	multiline?: any;
	isEditIcon?: any;
	rows?: number;
	headerMainClasses?: string;
	// headerClasses?: string;
	headerClasses?: any;
	editComponent: React.ReactNode;
	headerLabel?: string;
	labelValue: string;
	onChangeLabelValue?(value: any): void;
	handleChange?: (e?: any) => void;
	lableClass: any;
	edit: boolean;
	inputClasses: any;
	setTitle: (e?: any) => void;
	value?: any;
	onSubmit?(value?: any): void;
	placeholder?: string;
	onCancel?(): void;
}

export interface AvatarLabelProps {
	src: string;
	avaterClasses?: string;
	mainClassesLabel?: string;
	mainClasses?: string;
	title?: string;
	titleClasses?: string;
	// subtitle?: string;
	subtitle?: any;
	subtitleClasses?: string;
	isAvatarDot?: boolean;
}

export interface AvatarAtomProps {
	variant?: 'circular' | 'rounded' | 'square';
	className?: string;
	classes?: any;
	value?: any;
	src: string;
	sizes?: string;
	alt?: string;
}
export interface UploadProps {
	change?: (e?: any) => void;
	icon?: React.ReactNode;
	value: string;
	labelClass: string;
	mainClass?: string;
	className?: string;
	// type? :string;
}

export interface UploadButtonProps {
	value: any;
	labelValue?: string;
	mainClass: string;
	titleClass?: string;
	lableClass?: string;
	iconMainClass?: string;
	iconComponent?: React.ReactNode;
	labelClass: string;
	iconContanerClass?: string;
	fileClass?: string;
	icon: React.ReactNode;
	btnClass: string;
	btnValue?: string;
	// type? : string
}
