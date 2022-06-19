import Contributors from '@organisms/contributor-project-general';
import ThreeJs from '@organisms/threejs';
import { changeAnimationSpeed } from '@organisms/threejs/layout/functions/GlobalFunctions';
import { renderUserGeneral } from '@organisms/threejs/layout/functions/onLoadFunctions/userNewPackage/newProduct';
import { AddObjectCommand } from '@organisms/threejs/js/commands/AddObjectCommand';
import * as THREE from 'three';
import React, { useEffect, useState } from 'react';
import { RemoveObjectCommand } from '@organisms/threejs/js/commands/RemoveObjectCommand';
const GeneralView: React.FC<any> = ({
	project_id,
	hideContributor,
	eEditorRef,
	cEditorRef,
	gEditorRef,
	isRestored,
	generalHeight,
	generalContributor,
	animeSpeedBar = 'absolute right-[10px] top-0',
	// electronicThreeDData,
	// coverThreeDData,
	// setGeneralThreeDData,
}) =>
	// {
	// projectDetails,
	// img,
	// postProductComment,
	// state,
	// clickHandler,
	// handler,
	// toggleShare,
	// setLike,
	// likeHandler,
	// }
	{
		// console.log('projectDetails', projectDetails);
		const [showContributor, setShowContributor] = useState(false);
		const [animationSpeed, setAnimationSpeed] = useState(0.5);
		const [editorLoaded, setEditorLoaded] = useState(false);

		const handleContributors = () => {
			setShowContributor((prev) => !prev);
		};

		useEffect(() => {
			if (gEditorRef?.current) {
				setTimeout(() => {
					const pcbGroup = gEditorRef?.current.scene.getObjectByName('Pcb');
					const coverGroup = gEditorRef?.current.scene.getObjectByName('Cover');
					if (pcbGroup && coverGroup) {
						const group1 = new THREE.Group();
						group1.name = 'PCB_and_Cover';
						group1.add(pcbGroup);
						group1.add(coverGroup);
						gEditorRef?.current.execute(
							new AddObjectCommand(gEditorRef?.current, group1)
						);

						const coverGroup1 =
							gEditorRef?.current.scene.getObjectByName('PCB_and_Cover');
						if (coverGroup1.children.length === 0) {
							gEditorRef.current.execute(
								new RemoveObjectCommand(gEditorRef?.current, coverGroup1)
							);
						}
					}

					const packages = gEditorRef?.current.scene.getObjectByName('Packages');
					packages?.children.map((el: any) => el.scale.set(0.2, 0.2, 0.2));
				}, 1000);
			}
		}, [gEditorRef?.current]);

		useEffect(() => {
			if (cEditorRef?.current) {
				const covers = cEditorRef?.current.scene.children.filter((el: any) =>
					el.name.includes('Cover')
				);
				covers.map((el: any) => el.scale.set(1, 1, 1));
			}
		}, [cEditorRef?.current]);

		useEffect(() => {
			if (gEditorRef?.current && editorLoaded)
				renderUserGeneral(gEditorRef?.current, eEditorRef?.current, {
					...cEditorRef?.current,
				});
		}, [editorLoaded, gEditorRef, eEditorRef, cEditorRef]);

		useEffect(() => {
			changeAnimationSpeed(animationSpeed);
		}, [animationSpeed]);

		// useEffect(() => {
		//   console.warn('EC', electronicThreeDData);
		//   console.warn('CV', coverThreeDData);
		// }, [electronicThreeDData, coverThreeDData]);

		return (
			<div
				className={`relative mb-6 ${generalHeight}`}
				style={{ position: 'relative' }}
				// className="flex justify-end"
			>
				<ThreeJs
					{...{
						editorFile: 14,
						editorRef: gEditorRef,
						setEditorLoaded,
						noPopup: true,
						noRestore: gEditorRef?.current ? false : !isRestored,
					}}
				/>
				{/* <img
        style={{ width: '100%' }}
        src={
          projectDetails?.image
            ? projectDetails?.image
            : '/images/landing/img_project_genaral.png'
        }
        alt="image"
        className="relative"
      /> */}
				<input
					name="speed"
					// style={{
					//   position: 'absolute',
					//   // zIndex: 999999999,
					//   // zIndex: 100,
					//   right: '10px',
					//   top: '0px',
					// }}
					// className="absolute right-[10px] top-0"
					className={animeSpeedBar}
					type="range"
					min="0.1"
					max="5"
					value={animationSpeed}
					step="0.1"
					onChange={(e: any) => {
						setAnimationSpeed(e.target.value);
					}}
				/>
				<div className={generalContributor}>
					{!hideContributor && (
						<img
							src="/images/user_account_profile_avatar.svg"
							onClick={(e: any) => {
								e.stopPropagation();
								handleContributors();
							}}
							alt=""
							srcSet=""
							className={
								(showContributor ? 'animate-pulse' : '') + ' w-24 relative z-[110]'
							}
						/>
					)}
					<div className=" absolute -right-20 z-[110]">
						{showContributor && <Contributors project_id={project_id} />}
					</div>
				</div>
			</div>
		);
	};

GeneralView.defaultProps = {
	iconsClass: 'flex justify-between space-x-2',
	img: '/images/car.png',
	generalHeight: 'h-[470px]',
	generalContributor: 'cursor-pointer absolute md:top-2 md:right-20',
};

export default GeneralView;
