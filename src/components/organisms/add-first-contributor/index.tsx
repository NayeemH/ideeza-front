import Button from '@atoms/button';
import Label from '@atoms/label';
import Modal from '@atoms/modal';
import React, { useState } from 'react';

const AddFirstContributor = () => {
	const [openModal, setOpenModal] = useState(false);
	const handleModal = () => {
		setOpenModal((prev) => !prev);
	};
	return (
		<>
			<Modal
				width="md"
				close={handleModal}
				// header={
				//   <Button
				//     value="x"
				//     classes={{
				//       root: `text-red-600 font-bold`,
				//     }}
				//     onClick={handleModal}
				//   />
				// }
				content={
					<>
						<div className="flex flex-col justify-start">
							<Label
								value="Invite contributors"
								classes={{ root: `font-sans font-bold text-lg` }}
							/>
							<Label
								value="Friend's account"
								classes={{ root: `font-sans fnt-t3-small text-lg` }}
							/>
							<textarea
								placeholder="Search through friend's list"
								className="w-full px-4 h-36 border-2 text-lg rounded-md"
							/>
							<Label
								value="Add to Item"
								classes={{ root: `font-sans fnt-t3-small  text-lg` }}
							/>
							<input
								type="text"
								placeholder="Manager"
								className="w-full px-4 py-2 border-2 text-lg rounded-md"
							/>
							{/* <Input
                placeholder="Manager"
                // containerClass="font-sans fnt-t3-small border-2  text-lg"
                classes={{ root: `font-sans fnt-t3-small border-2  text-lg` }}
              /> */}
						</div>
					</>
				}
				actions={<></>}
				open={openModal}
			/>
			<div
				style={{ width: '320px', height: '320px' }}
				className="flex flex-col items-center font-sans"
			>
				<div className="mt-10">
					<div className="flex">
						<img
							src="/images/plus.svg"
							alt=""
							srcSet=""
							width="30px"
						/>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="49.919"
							height="53.485"
							viewBox="0 0 49.919 53.485"
							className="ml-10"
						>
							<path
								id="Path_216"
								data-name="Path 216"
								d="M65.5,45.557a8.084,8.084,0,0,0-7.851-6.335h-7.6v-.981a4.465,4.465,0,0,0,3.566-4.368V30.219a4.465,4.465,0,0,0,3.566-4.368v-10.7a15.154,15.154,0,1,0-30.308,0v10.7a4.465,4.465,0,0,0,3.566,4.368v3.655A4.465,4.465,0,0,0,34,38.241v.981H26.4a8.086,8.086,0,0,0-7.852,6.339l-1.462,6.846a.892.892,0,0,0,.685,1.058.876.876,0,0,0,.186.02H66.092a.892.892,0,0,0,.891-.891.875.875,0,0,0-.02-.186ZM35.785,38.33h12.48V41.9A2.674,2.674,0,0,1,45.59,44.57H38.459A2.674,2.674,0,0,1,35.785,41.9Zm8.023-18.72a.892.892,0,0,0-.891.891v1.783H41.133V20.5a.892.892,0,0,0-.891-.891H33.111a.892.892,0,0,0-.891.891V16.937H51.83V20.5a.892.892,0,0,0-.891-.891Zm6.24,1.783v5.348H44.7V21.394Zm-10.7,0v5.348H34V21.394Zm14.262,6.979V23.341c.029.011.058.016.089.027.049.02.1.043.145.065a2.731,2.731,0,0,1,.287.156c.044.027.089.053.129.083a2.725,2.725,0,0,1,.3.246c.02.019.042.035.061.053a2.706,2.706,0,0,1,.3.357c.024.036.045.075.068.111a2.822,2.822,0,0,1,.164.3q.033.073.062.15a2.386,2.386,0,0,1,.1.321c.012.049.027.1.036.146a2.623,2.623,0,0,1,.047.494A2.678,2.678,0,0,1,53.613,28.373ZM28.654,15.154a13.371,13.371,0,1,1,26.742,0v7.131c-.043-.031-.089-.058-.133-.089s-.076-.052-.114-.077a4.4,4.4,0,0,0-.661-.357c-.033-.014-.068-.026-.1-.039a4.347,4.347,0,0,0-.759-.236l-.015,0h0V16.045a.892.892,0,0,0-.891-.891H31.328a.892.892,0,0,0-.891.891v5.438h-.012a4.356,4.356,0,0,0-.759.236c-.034.013-.069.025-.1.039a4.408,4.408,0,0,0-.661.357c-.038.025-.077.05-.114.077s-.089.057-.133.089Zm0,10.7a2.6,2.6,0,0,1,.05-.491c.009-.05.023-.1.036-.146a2.687,2.687,0,0,1,.1-.322c.02-.05.039-.1.062-.148a2.606,2.606,0,0,1,.164-.3c.023-.037.044-.076.068-.111a2.706,2.706,0,0,1,.3-.357c.019-.019.041-.035.061-.053a2.725,2.725,0,0,1,.3-.246c.042-.029.089-.056.129-.083a2.683,2.683,0,0,1,.287-.156c.048-.022.1-.045.145-.065.028-.011.058-.016.089-.027v5.032A2.68,2.68,0,0,1,28.654,25.851Zm3.566,8.023v-6.24a.892.892,0,0,0,.891.891h7.131a.892.892,0,0,0,.891-.891V24.068h1.783v3.566a.892.892,0,0,0,.891.891h7.131a.892.892,0,0,0,.891-.891v6.24a2.674,2.674,0,0,1-2.674,2.674H34.893A2.674,2.674,0,0,1,32.219,33.874ZM57.934,51.7l-.767-4.6-1.758.294.718,4.31h-28.2l.718-4.31L26.883,47.1l-.767,4.6H19.058l1.231-5.766A6.292,6.292,0,0,1,26.4,41H34V41.9a4.462,4.462,0,0,0,4.457,4.457H45.59A4.462,4.462,0,0,0,50.047,41.9V41h7.6a6.29,6.29,0,0,1,6.108,4.929L64.991,51.7Z"
								transform="translate(-17.065)"
								fill="#231f20"
							/>
						</svg>
					</div>
					<div className="flex">
						<img
							src="/images/man.svg"
							alt=""
							srcSet=""
							width="44px"
						/>

						<img
							src="/images/plus.svg"
							width="15px"
							className="ml-10 mt-7"
							alt=""
							srcSet=""
						/>
					</div>
				</div>

				<Label
					value="Invite your team and start"
					className="fnt-t3-small pt-7"
				/>
				<Button
					value="Invite contributor"
					onClick={handleModal}
					// type="submit"
					// onClick={() => dispatch(handleMySelfProject())}
					classes={{
						root: `bg-white invite-contributor shadow-none border text-ideeza-300 p-2 px-10 tracking-tight fnt-t3-small font-sans capitalize mt-5`,
					}}
				/>
			</div>
		</>
	);
};

export default AddFirstContributor;
