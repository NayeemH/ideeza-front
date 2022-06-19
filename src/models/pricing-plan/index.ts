export interface IPricingPlan {
	id?: number;
	updated_at?: Date;
	created_at?: Date;
	is_visible?: boolean;
	name?: string;
	slogan?: string;
	image?: string;
	plan_type?: string;
	is_public?: boolean;
	price_monthly?: string;
	price_yearly?: string;
	trial_period?: number;
	is_popular?: boolean;
	features?: any;
}

export interface PricingPlanProps {
	plan?: IPricingPlan;
	planIndex?: number;
	rootClasses?: string;
	popularTagImgClasses?: string;
	planNameClasses?: string;
	planSloganClasses?: string;
	planLogoClasses?: string;
	tickIconClasses?: string;
	tickLabelClasses?: string;
	plusLabelClasses?: string;
	btnGroupClasses?: string;
	addContainer?: string;
	isTickListBoxed?: boolean;
	btnHelperClasses?: string;
	borderColor?: string;
	pricingBottomBg?: string;
	btnLoading?: boolean;
	btnDisabled?: boolean;
	onClickSubscribe?: any;
}
