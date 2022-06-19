import React from 'react';
import MyIdeezaIcon from '@organisms/my-ideeza-icon';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { setMemo, toggleMyIdeeza } from '@organisms/my-ideeza/reducer';
import CreateNewIdeezaProject from '@organisms/create-new-idezza-project';
import { toggleIdezzaModal } from '@features/user/reducer';

function MyIdeeza() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const toggle = useAppSelector((state) => state.myIdeeza.open);
	const memo = useAppSelector((state) => state.myIdeeza.memo);
	const ideezaModel = useAppSelector(({ dashboard }) => dashboard?.project?.ideeza?.modal);
	const toggleIdeezaProject = () => dispatch(toggleIdezzaModal());

	const toggleHandler = () => {
		dispatch(toggleMyIdeeza());

		setTimeout(() => {
			dispatch(setMemo());
		}, 300);
	};

	return (
		<>
			<CreateNewIdeezaProject
				open={ideezaModel}
				// loader={loader}
				close={toggleIdeezaProject}
			/>
			<div className="myIDeeza z-50 fixed bottom-0 flex right-5 3xl:right-0 items-center justify-end">
				<div className="min-w-[58px] h-full 3xl:w-auto relative m-8">
					<div
						onClick={toggleHandler}
						className="outline-none hover:bg-transparent cursor-pointer"
					>
						<img
							src="/images/logo/my-ideeza.png"
							alt=""
							className=""
						/>
					</div>

					{memo ? (
						<div
							onClick={() => {
								toggleHandler();
							}}
						>
							<MyIdeezaIcon
								toggle={toggle}
								// css="right-12 -bottom-10 cursor-pointer"
								img="/images/logo/my-ideeza.png"
								value="New Message"
								right={48}
								bottom={-30}
								click={() => router.push('/user/dashboard/message')}
							/>
							<MyIdeezaIcon
								// css="right-20 bottom-6 cursor-pointer"
								img="/images/logo/notes.png"
								toggle={toggle}
								value="New Notes"
								right={80}
								bottom={30}
								click={() => router.push('/user/dashboard/my-note')}
							/>
							<MyIdeezaIcon
								// css="right-8 bottom-24 cursor-pointer md:pr-2"
								img="/images/logo/notification.png"
								value="New Notification"
								toggle={toggle}
								right={32}
								bottom={96}
								click={() => router.push('/user/dashboard/notifications')}
							/>
							<MyIdeezaIcon
								// css="-right-10 bottom-24 cursor-pointer"
								img="/images/logo/new-noti.png"
								value="New Project"
								toggle={toggle}
								right={-55}
								bottom={96}
								click={toggleIdeezaProject}
								// click={project}
							/>
						</div>
					) : null}
				</div>
			</div>
		</>
	);
}
export default React.memo(MyIdeeza);
