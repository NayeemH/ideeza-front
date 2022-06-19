import * as THREE from 'three';
import { AddObjectCommand } from '@organisms/threejs/js/commands/AddObjectCommand';
import { RemoveObjectCommand } from '@organisms/threejs/js/commands/RemoveObjectCommand';
import { SetValueCommand } from '@organisms/threejs/js/commands/SetValueCommand';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { drawCylinder, load } from '../../GlobalFunctions';

export async function renderPackage(
  editor,
  threeDData,
  formData,
  viewType,
  editorType,
  callback,
  addPackageFile
) {
  //getting previous data in useEffect
  let pFormData = editor.scene.userData?.formData;
  let pViewType = editor.scene.userData?.viewType;
  let pEditorType = editor.scene.userData?.editorType;
  let pParts = editor.scene.userData?.parts;

  if (!formData) formData = pFormData; //getting previous for data to calculate leg meaning 2d and 3d view

  if (
    !threeDData?.current['2d'] &&
    !threeDData?.current['3d'] &&
    !threeDData?.current['schematic']
  )
    editor.clear();

  if (!formData) return;
  const loader = new FontLoader(); //loading font for schematic text
  loader.load('/font/helvetiker_regular.typeface.json', async (font) => {
    // disabling select
    if (!['legMeaning', 'newPackage'].includes(editorType)) {
      editor.cannotSelect();
    } else {
      editor.canSelect();
    }

    //centering camera
    if (viewType !== '3d') {
      editor.signals.setCameraByAngle.dispatch(new THREE.Vector3(0, 0, 3));
      editor.signals.freezeCamera.dispatch();
    } else {
      editor.signals.setCameraByAngle.dispatch(new THREE.Vector3(135, 0, 3));
      editor.signals.unFreezeCamera.dispatch();
    }

    //handling points based on editor type
    const points = editor.scene.getObjectByName('Points');
    if (points) {
      if (editorType === 'newPackage')
        editor.execute(new RemoveObjectCommand(editor, points));
      else
        points.children.forEach((el) => {
          el.children.forEach((e) => {
            editor.execute(new SetValueCommand(editor, e, 'visible', false));
          });
        });
    }

    // saving previous threeDData to save newpackage
    if (pEditorType !== editorType) {
      let tempV = pViewType ? pViewType : viewType;
      let tempP = editor.scene.getObjectByName('Package');
      if (tempP && tempV) {
        if (threeDData)
          threeDData.current = {
            ...threeDData?.current,
            [tempV]: tempP.toJSON(),
          };
      }
    }

    let packages;
    if (
      threeDData &&
      threeDData?.current &&
      threeDData?.current[viewType] &&
      threeDData?.current[viewType]?.object
    ) {
      packages = await load(threeDData?.current[viewType]); //loading threeDData if exists

      if (
        packages &&
        !(editorType === 'newPackage' && pEditorType !== 'newPackage')
      ) {
        let p = editor.scene.children.filter((e) => e.name === 'Package');
        if (p) {
          p.forEach((e) => {
            editor.removeObject(e);
          });
        }
        editor.execute(new AddObjectCommand(editor, packages));
      }
    }

    //creating new Package if doesn't exiss
    if (packages === undefined) {
      let p = editor.scene.children.filter((e) => e.name === 'Package');
      if (p) {
        p.forEach((e) => {
          editor.removeObject(e);
        });
      }
      packages = new THREE.Group();
      packages.name = 'Package';
      editor.execute(new AddObjectCommand(editor, packages));
    }

    let bodySize = new THREE.Vector3(1, 1, 0.01);
    let legSize = new THREE.Vector3(0.015, 0.15, 0.015);
    let pinSides = Number(formData?.pinSides);

    if (viewType === '3d') {
      bodySize.z = 0.06;
    }
    if (viewType === 'schematic') {
      if (formData.noOfPins) {
        bodySize.y = (formData.noOfPins / 2) * 0.21;
        pinSides = 2;
      }
    }

    let body = packages.getObjectByName('Body');
    if (
      !body ||
      pFormData?.bodyType !== formData?.bodyType ||
      (pFormData?.noOfPins !== formData?.noOfPins &&
        viewType === 'schematic') ||
      (body?.geometry?.type === 'BoxGeometry' && viewType === 'schematic') ||
      (addPackageFile?.body?.id && pParts?.body !== addPackageFile?.body?.id) ||
      pViewType !== viewType
    ) {
      if (body && formData.bodyType) {
        editor.removeObject(body);
        let connectionLines = packages.getObjectById('ConnectionLines');
        if (connectionLines) editor.removeObject(connectionLines);
      }
      if (formData.bodyType === 'rectangle') {
        //body
        if (
          editorType === 'newPackage' &&
          pParts?.body !== addPackageFile?.body?.id &&
          addPackageFile?.body?.three_d_script &&
          viewType === '3d'
        ) {
          body = await load(addPackageFile?.body?.three_d_script); //loading loaded 3d body if already exists
          if (body) {
            body.name = 'Body';
          }
        } else {
          if (
            !body ||
            (body?.geometry?.type === 'BoxGeometry' && viewType === 'schematic')
          ) {
            if (editorType !== 'newPackage') {
              let geometry = new THREE.BoxGeometry();
              body = new THREE.Mesh(
                geometry,
                new THREE.MeshPhongMaterial({
                  color: 0x4c4c4c,
                })
              );
              body.scale.copy(bodySize);
              body.name = 'Body';
            }
          }
        }

        if (viewType !== '2d') {
          if (body) packages.add(body);
        } else {
          //border
          let geometry = new THREE.BoxGeometry();
          const edges = new THREE.EdgesGeometry(geometry);
          const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: 0xffffff })
          );
          line.name = 'Body';
          line.scale.copy(bodySize);
          line.rotation.copy(new THREE.Euler(0, 0, 0));
          line.userData.unSelect = true;
          body = line;
          packages.add(line);
        }
      }
    }

    if (body && editorType === 'legMeaning') {
      body.userData.unSelect = true;
    }

    if (editorType === 'newPackage') {
      if (!formData.noOfPins) formData.noOfPins = 16;
      if (!pinSides) pinSides = 4;
    }

    let legObj;
    let legs = packages.getObjectByName('Legs');
    if (
      (formData.noOfPins &&
        pinSides &&
        formData.noOfPins % pinSides === 0 &&
        editorType !== 'editPackageSchematic' &&
        !(
          editorType === 'newPackage' && !addPackageFile?.leg?.three_d_script
        ) &&
        (!legs ||
          pFormData?.noOfPins !== formData?.noOfPins ||
          pFormData?.pinSides !== formData?.pinSides)) ||
      (addPackageFile?.leg?.id && pParts?.leg !== addPackageFile?.leg?.id) ||
      pViewType !== viewType
    ) {
      if (legs) editor.removeObject(legs);

      if (addPackageFile?.leg?.three_d_script && viewType === '3d') {
        legObj = await load(addPackageFile?.leg?.three_d_script);
      } else {
        if (legs?.children[0]) legObj = legs?.children[0].clone();
      }

      legs = new THREE.Group();
      legs.name = 'Legs';
      packages.add(legs);

      let side = 0;
      let legPerSide = formData.noOfPins / pinSides;
      let gap;
      if (formData.packageType === 'tht') {
        gap = viewType !== 'schematic' ? 0.05 : -0.075;
      } else if (formData.packageType === 'smt') {
        gap = viewType !== 'schematic' ? -0.4 : -0.25;
      } else {
        gap = viewType === '3d' ? 0.08 : viewType === '2d' ? -0.4 : -0.25;
      }

      for (let i = 1; i <= formData.noOfPins; i++) {
        let position = new THREE.Vector3(0, 0, 0);
        let rotation = new THREE.Vector3(0, 0, 0);

        let size =
          viewType !== 'schematic' && body
            ? new THREE.Box3().setFromObject(body).getSize(new THREE.Vector3())
            : new THREE.Vector3().copy(bodySize);

        if (side === 0) {
          position.x = -size.x / 2 + gap;
          position.y =
            size.y / 2 -
            (size.y / legPerSide) * (i - legPerSide * side) +
            size.y / legPerSide / 2;
        } else if (side === 1) {
          position.y = -size.y / 2 + gap;
          position.x =
            -(size.x / 2) +
            (size.x / legPerSide) * (i - legPerSide * side) -
            size.x / legPerSide / 2;
        } else if (side === 2) {
          let newSide = pinSides === 4 ? side : 1;

          position.x = size.x / 2 - gap;
          position.y =
            size.y / 2 -
            (size.y / legPerSide) * (i - legPerSide * newSide) +
            size.y / legPerSide / 2;
        } else if (side === 3) {
          position.y = size.y / 2 - gap;
          position.x =
            -(size.x / 2) +
            (size.x / legPerSide) * (i - legPerSide * side) -
            size.x / legPerSide / 2;
        }

        if (viewType !== '3d') {
          rotation.z = 90 * side;
        }
        let leg;
        if (viewType === '3d') {
          leg = drawLeg3D(position, rotation);
        } else if (viewType === '2d') {
          leg = drawLeg2D(position, rotation);
        } else if (viewType === 'schematic') {
          leg = drawLegSchematic(position, rotation, `${i}`);
        }

        if (leg) {
          let value = {};
          if (editor.scene.userData?.values) {
            value = editor.scene.userData?.values.find(
              (d) => String(d.pin_no) === String(i)
            );
          }

          leg.name = value?.pin_name ? value?.pin_name : `${i}`;
          leg.userData = {
            ...leg.userData,
            id: `${i}`,
            side,
            selectParent: true,
            hideTransformControls: {
              translate: 'z',
              rotate: 'xyz',
              scale: 'xyz',
            },
            value,
          };
          legs.add(leg);
        }

        if ((side + 1) * legPerSide === i) {
          side = pinSides === 4 ? side + 1 : 2;
        }
      }
    }

    function drawLeg3D(position, rotation) {
      let mesh;
      if (legObj) {
        mesh = legObj.clone();
        mesh.uuid = THREE.MathUtils.generateUUID();
      } else {
        let geometry = new THREE.CylinderGeometry(
          1,
          1,
          1,
          60,
          1,
          false,
          0,
          Math.PI * 2
        );
        mesh = new THREE.Mesh(
          geometry,
          new THREE.MeshPhongMaterial({
            color: 'silver',
          })
        );
        mesh.scale.copy(legSize);
        mesh.scale.y = legSize.y * 2;
        mesh.rotation.copy(
          new THREE.Euler(
            90 * THREE.MathUtils.DEG2RAD,
            rotation.y * THREE.MathUtils.DEG2RAD,
            rotation.z * THREE.MathUtils.DEG2RAD
          )
        );
      }

      position.z = -mesh.scale.y / 2;
      mesh.position.copy(position);
      return mesh;
    }

    function drawLeg2D(position, rotation) {
      let leg;
      if (formData.packageType === 'tht') {
        leg = new THREE.Group();

        leg.add(
          drawCylinder(
            'HoleCylinder',
            0x000000,
            new THREE.Vector3(legSize.x, 0.013, legSize.z),
            0
          )
        );

        leg.add(
          drawCylinder(
            'CopperCylinder',
            0xd75822,
            new THREE.Vector3(legSize.x * 1.5, 0.01, legSize.z * 1.5),
            0
          )
        );

        leg.add(
          drawCylinder(
            'CopperCircle',
            0xd75822,
            new THREE.Vector3(legSize.x * 2, 0.01, legSize.z * 2),
            0
          )
        );
        leg.add(
          drawCylinder(
            'CopperCircle',
            0xd75822,
            new THREE.Vector3(legSize.x * 2, 0.01, legSize.z * 2),
            0
          )
        );
      } else if (formData.packageType === 'smt') {
        let geometry = new THREE.BoxGeometry();
        leg = new THREE.Mesh(
          geometry,
          new THREE.MeshPhongMaterial({
            color: 0xeb0ff5,
          })
        );
        leg.scale.copy(new THREE.Vector3(0.15, 0.06, 0.01));
      } else {
        let geometry = new THREE.BoxGeometry();
        leg = new THREE.Mesh(
          geometry,
          new THREE.MeshPhongMaterial({
            color: 0xeb0ff5,
          })
        );
        leg.scale.copy(new THREE.Vector3(0.15, 0.06, 0.01));
      }
      leg.position.copy(position);
      leg.rotation.copy(
        new THREE.Euler(
          rotation.x * THREE.MathUtils.DEG2RAD,
          rotation.y * THREE.MathUtils.DEG2RAD,
          rotation.z * THREE.MathUtils.DEG2RAD
        )
      );
      return leg;
    }

    function drawLegSchematic(position, rotation, name) {
      let leg = new THREE.Group();
      let geometry = new THREE.BoxGeometry();
      let mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial({
          color: 0xeb0ff5,
        })
      );
      mesh.name = 'leg';
      mesh.scale.copy(new THREE.Vector3(0.15, 0.006, 0.01));
      mesh.position.copy(position);
      let rotateX = viewType === '3d' ? 90 : 0;
      mesh.rotation.copy(
        new THREE.Euler(
          rotateX * THREE.MathUtils.DEG2RAD,
          rotation.y * THREE.MathUtils.DEG2RAD,
          rotation.z * THREE.MathUtils.DEG2RAD
        )
      );
      leg.add(mesh);

      //font
      var textShapes = font.generateShapes(`${name}`, 0.075);
      var textGeometry = new THREE.ShapeBufferGeometry(textShapes);
      var textMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        side: THREE.DoubleSide,
      });

      let text = new THREE.Mesh(textGeometry, textMaterial);

      textGeometry.center();
      // text.rotation.copy(camera.rotation);
      let textPosition = new THREE.Vector3().copy(position);
      textPosition.y = textPosition.y + 0.084;
      text.position.copy(textPosition);

      text.name = 'text';
      leg.add(text);
      return leg;
    }

    // timeout to prevent instant rerender
    setTimeout(() => {
      if (editorType === 'editPackageSchematic') {
        if (body) editor.removeObject(body);
        body = new THREE.Group();
        body.name = 'Body';
        body.userData = {
          ...body.userData,
          unSelect: true,
          selectParent: true,
        };
        packages.add(body);

        if (legs) {
          legs.children.forEach((el) => {
            if (el.type === 'Group') {
              let leg = el.getObjectByName('leg');
              if (leg) {
                let position = new THREE.Vector3().copy(leg.position);
                position.x =
                  Math.sign(position.x) === -1
                    ? position.x + leg.scale.x / 2
                    : position.x - leg.scale.x / 2;
                position.z = position.z + leg.scale.z / 2;
                const dot = new THREE.Mesh(
                  new THREE.BoxGeometry(),
                  new THREE.MeshPhongMaterial({
                    color: 0x561f80,
                  })
                );
                dot.scale.copy(new THREE.Vector3(0.03, 0.03, 0.01));
                dot.userData.hoverEffect = true;
                dot.position.copy(position);

                //bug. dot position is random for raycaster
                // let dotGeometry = new THREE.BufferGeometry();
                // dotGeometry.setAttribute(
                //   'position',
                //   new THREE.Float32BufferAttribute(position, 3)
                // );
                // let dotMaterial = new THREE.PointsMaterial({
                //   size: 6,
                //   sizeAttenuation: false,
                // });
                // let dot = new THREE.Points(dotGeometry, dotMaterial);
                // dotGeometry.computeBoundingSphere();
                // const center = new THREE.Vector3().copy(
                //   dotGeometry.boundingSphere.center
                // );

                // dotGeometry.center();
                // dot.position.copy(center);
                // dot.userData.unSelect = true;
                dot.name = 'Dot';
                el.add(dot);
              }
            }
          });
        }
      } else {
        if (legs) {
          legs.children.forEach((el) => {
            if (el.type === 'Group') {
              let dot = el.getObjectByName('Dot');
              if (dot) editor.execute(new RemoveObjectCommand(editor, dot));
            }
          });
        }
      }
    }, 100);

    if (
      packages &&
      threeDData &&
      (!['legMeaning', 'newPackage'].includes(editorType) ||
        (editorType === 'newPackage' &&
          ((addPackageFile?.body?.id &&
            pParts?.body !== addPackageFile?.body?.id) ||
            (addPackageFile?.leg?.id &&
              pParts?.leg !== addPackageFile?.leg?.id))))
    )
      setTimeout(() => {
        // timeout to prevent instant rerender
        threeDData.current = {
          ...threeDData?.current,
          [viewType]: packages.toJSON(),
        };
      }, 500);

    let partsObj = {};
    if (editorType === 'newPackage') {
      if (!partsObj.parts) partsObj.parts = {};
      partsObj.parts.body = addPackageFile?.body?.id;

      if (!partsObj.parts) partsObj.parts = {};
      partsObj.parts.leg = addPackageFile?.leg?.id;
    }

    //saving data in useEffect
    editor.execute(
      new SetValueCommand(editor, editor.scene, 'userData', {
        ...editor.scene.userData,
        viewType,
        formData,
        editorType,
        ...partsObj,
      })
    );

    editor.deselect();
    if (callback) {
      await callback(editor.scene.children.find((e) => e.name === 'Package'));
    }
  });
}
