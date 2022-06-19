import IconLabel from '@molecules/icon-label';
import CopyToClipboard from 'react-copy-to-clipboard';
import { FaBellSlash } from 'react-icons/fa';
import { ImUserPlus } from 'react-icons/im';
import { IoIosCopy, IoMdChatboxes } from 'react-icons/io';
import { toast } from 'react-toastify';

const NewsFeedSingleItemDropdown = (props: any) => {
	const {
		news,
		projectUrl,
		onClickUnFollowUser,
		onClickFollowUser,
		onClickSendMessage,
		isSelfUser,
		isFriend,
		isLoadingConnect,
	} = props;

	const projectFullUrl = `${window?.location?.protocol}${'//'}${window?.location?.hostname}${
		window?.location?.port ? ':' + window?.location?.port : ''
	}${projectUrl}`;

	return (
		<div className="py-4 w-auto shadow-lg hover:shadow-xl transition-all bg-white rounded-lg border border-solid border-gray-500">
			{/* <IconLabel
            mainClass="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out flex items-center"
            tooltipProps={{ open: false }}
            labelValue="Save"
            iconContanerClass="text-lg w-6"
            lableClass={{
                root: `text-gray-700 tracking-tighter text-base 2xl:text-xl ml-2`,
            }}
            iconComponent={
                <BsFillBookmarkFill className="text-gray-910 text-2xl pt-1" />
            }
            /> */}
			{!isSelfUser && (
				<IconLabel
					mainClass="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out flex items-center"
					tooltipProps={{ open: false }}
					labelValue="Send in a private message"
					iconContanerClass="text-lg w-6"
					lableClass={{
						root: `text-gray-700 tracking-tighter text-base 2xl:text-xl ml-2`,
					}}
					iconComponent={<IoMdChatboxes className="text-gray-910 text-xl" />}
					onClick={onClickSendMessage}
				/>
			)}
			<CopyToClipboard
				onCopy={() => toast.success('Copied Project link')}
				text={projectFullUrl}
			>
				<IconLabel
					mainClass="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out flex items-center"
					tooltipProps={{ open: false }}
					labelValue="Copy link to post"
					iconContanerClass="text-lg w-6"
					lableClass={{
						root: `text-gray-700 tracking-tighter text-base 2xl:text-xl ml-2`,
					}}
					iconComponent={<IoIosCopy className="text-gray-910 text-xl" />}
				/>
			</CopyToClipboard>
			{/* <IconLabel
            mainClass="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out flex items-start"
            tooltipProps={{ open: false }}
            labelValue={
                <>
                Hide this post
                <span className="text-gray-910 text-base">
                    I don't want to see this post in my
                    feed
                </span>
                </>
            }
            iconContanerClass="text-lg w-6"
            lableClass={{
                root: `text-gray-700 flex flex-col tracking-tighter text-base 2xl:text-xl ml-2`,
            }}
            iconComponent={
                <IoIosRemoveCircle className="text-gray-910 text-lg" />
            }
            /> */}
			{!isSelfUser && isFriend && (
				<IconLabel
					onClick={isFriend ? onClickUnFollowUser : onClickFollowUser}
					mainClass={`${
						isLoadingConnect ? 'pointer-event-none cursor-not-allowed opacity-30' : ''
					} px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out flex items-start`}
					tooltipProps={{ open: false }}
					labelValue={
						<>
							{isFriend
								? `${isLoadingConnect ? 'Undoing Friend' : 'Unfriend'}`
								: `${
										isLoadingConnect
											? 'Sending Friend Request'
											: 'Send Friend Request'
								  }`}{' '}
							{news?.user?.first_name + ' ' + news?.user?.last_name}
							{isFriend && (
								<span className="text-gray-910 text-base">
									Stay connected but hide {news?.user?.first_name}'s feed
								</span>
							)}
						</>
					}
					iconContanerClass="text-lg w-6"
					lableClass={{
						root: `text-gray-700 flex flex-col tracking-tighter text-base 2xl:text-xl ml-2`,
					}}
					iconComponent={
						isFriend ? (
							<FaBellSlash className="text-gray-910 text-xl" />
						) : (
							<ImUserPlus className="text-gray-910 text-xl" />
						)
					}
				/>
			)}
			{/* <IconLabel
            mainClass="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out flex items-start"
            tooltipProps={{ open: false }}
            labelValue={
                <>
                Report this post
                <span className="text-gray-910 text-base">
                    This post is offensive or account is
                    hacked
                </span>
                </>
            }
            iconContanerClass="text-lg w-6"
            lableClass={{
                root: `text-gray-700 flex flex-col tracking-tighter text-base 2xl:text-xl ml-2`,
            }}
            iconComponent={
                <IoMdFlag className="text-gray-910 text-2xl" />
            }
            /> */}
			{/* <IconLabel
            mainClass="px-4 py-2 hover:bg-gray-100 cursor-pointer transition-all duration-500 ease-in-out flex items-start"
            tooltipProps={{ open: false }}
            labelValue={
                <>
                Improve my feed
                <span className="text-gray-910 text-base">
                    Get recommended sources to show
                </span>
                </>
            }
            iconContanerClass="text-lg w-6"
            lableClass={{
                root: `text-gray-700 flex flex-col tracking-tighter text-base 2xl:text-xl ml-2`,
            }}
            iconComponent={
                <img
                alt="icon"
                src="/images/icon/cogsvg.svg"
                className="w-4 mt-1 ml-1"
                />
            }
            /> */}
		</div>
	);
};

export default NewsFeedSingleItemDropdown;
