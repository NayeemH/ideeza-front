import React from 'react';
import AvatarAtom from '@atoms/avatar';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip
		{...props}
		classes={{ popper: className }}
	/>
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#fff',
		color: 'rgba(0, 0, 0, 0.87)',
		maxWidth: 220,
		fontSize: theme.typography.pxToRem(12),
		boxShadow: 'rgb(100 100 111 / 20%) 0px 0px 50px 0px',
	},
}));

const ContributorsTab: React.FC<any> = (props) => {
	const contributors = props.data.length > 0 ? props.data : [];

	/*const avaterTooltips = ([
    {
      id: 1,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 2,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater1.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 3,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 4,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater1.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 5,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 6,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater1.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 7,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 8,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater1.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 9,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 10,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater1.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 11,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 12,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater1.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 13,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 14,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 15,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 16,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 17,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 18,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
    {
      id: 19,
      avatar: (
        <AvatarAtom
          variant="circular"
          src="/images/choose-your-avatar/seller-avater.png"
          className="w-[70px] h-[70px]"
        />
      ),
    },
  ]);*/

	const data: any = [];

	contributors.forEach((contributor: any) => {
		data.push({
			id: contributor?.id,
			avatar: (
				<AvatarAtom
					variant="circular"
					src={contributor?.user?.profile_photo}
					className="w-[70px] h-[70px]"
				/>
			),
			name: contributor?.user?.first_name + ' ' + contributor?.user?.last_name,
			title: contributor?.user?.about_me,
		});
	});

	return (
		<div className={`w-full mt-[35px]`}>
			<div className="flex flex-wrap gap-4">
				{data && data.length > 0 ? (
					data.map((avaterTooltip: any) => (
						<div key={avaterTooltip.id}>
							<HtmlTooltip
								title={
									<React.Fragment>
										<h5 className="text-[18px] font-semibold">
											{avaterTooltip?.name}
										</h5>
										<p className="text-[16px]">{avaterTooltip?.title}</p>
										{/*<p className="text-[16px]">25 followers</p>*/}
									</React.Fragment>
								}
							>
								<div>
									<div className="cursor-pointer">{avaterTooltip.avatar}</div>
								</div>
							</HtmlTooltip>
						</div>
					))
				) : (
					<>No Contributors</>
				)}
			</div>
		</div>
	);
};

export default React.memo(ContributorsTab);
