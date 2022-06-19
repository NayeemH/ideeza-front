import Label from '@atoms/label';
import AvatarLabels from '@molecules/avatar-label';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { numerify } from 'utils/utils';

function ChatCard(props: any) {
	const {
		mainClass,
		room,
		title,
		msg,
		titleClasses,
		subtitleClasses,
		avaterClasses,
		time,
		timeClass,
		unread,
		numberClass,
		labels,
		main,
		image,
	} = props;

	const { data: session } = useSession();
	const url = `${process.env.NEXT_PUBLIC_SOCKET_URL}/${room?.id}/?token=${session?.user.access}`;
	const { lastJsonMessage, readyState } = useWebSocket(url, {
		shouldReconnect: () => true,
	});

	const connectionStatus = {
		[ReadyState.CONNECTING]: 'Connecting',
		[ReadyState.OPEN]: 'Online',
		[ReadyState.CLOSING]: 'Closing',
		[ReadyState.CLOSED]: 'Closed',
		[ReadyState.UNINSTANTIATED]: 'Uninstantiated',
	}[readyState];

	const [lastMsg, setLastMsg] = useState(msg);

	useEffect(() => {
		setLastMsg(msg);
	}, [msg]);

	useEffect(() => {
		if (lastJsonMessage && lastJsonMessage.message) {
			//------ checking New Message created/arrived and set last message ------------
			setLastMsg(lastJsonMessage?.message?.message);
		}
	}, [lastJsonMessage]);

	// console.log(`#${room?.id} connectionStatus---------`, connectionStatus)

	return (
		<>
			<div className={mainClass}>
				<AvatarLabels
					src={image}
					mainClasses={main}
					title={title}
					subtitle={lastMsg}
					titleClasses={titleClasses}
					subtitleClasses={subtitleClasses}
					avaterClasses={avaterClasses}
					mainClassesLabel={labels}
					isAvatarDot={connectionStatus === 'Online' ? true : false}
				/>
				<Label
					value={
						<>
							{time}
							{(unread && unread > 0 && (
								<span className={numberClass}>{numerify(unread)}</span>
							)) || <></>}
						</>
					}
					classes={{ root: `${timeClass}` }}
				/>
			</div>
		</>
	);
}
ChatCard.defaultProps = {
	mainClass:
		'p-4 py-3 flex justify-between xl:flex-row md:flex-col items-center bg-white cursor-pointer hover:bg-blue-900 overflow-hidden',
	avaterClasses: '2xl:h-[52px] 2xl:w-[52px] xl:w-12 xl:h-12 rounded-full',
	titleClasses: 'text-base 2xl:text-xl font-sans font-semibold text-gray-700',
	subtitleClasses: 'txt-c7-color font-sans md:text-center xl:text-left text-sm pt-1',
	timeClass: 'text-sm text-gray-800 whitespace-nowrap flex flex-col items-end',
	numberClass:
		' text-center text-xs mt-1 text-white font-semibold py-2 px-3 bg-primary rounded-[50%] w-8 h-8 flex items-center justify-center',
	labels: 'pl-4',
	main: 'mt-0 flex flex-row items-center',
};
export default ChatCard;
