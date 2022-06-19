import { SetValueCommand } from '@organisms/threejs/js/commands/SetValueCommand';
import * as THREE from 'three';

import { groupObjects, load, silkThickness } from '../../GlobalFunctions';

export async function renderPcbSchematic(editor, designFile, setLoading) {
  editor.signals.setCameraByAngle.dispatch(new THREE.Vector3(0, 0, 10));
  editor.signals.freezeCamera.dispatch();
  if (designFile?.scene) {
    const design = designFile.scene;
    // const design = await load(designFile);
    if (design) {
      const layer = design.getObjectByName('Layer1');
      const packages = editor.scene.getObjectByName('Packages');

      if (layer) {
        //renderConnectionLines
        const connectionLines = editor.scene.getObjectByName('ConnectionLines');
        let dcl = layer.getObjectByName('ConnectionLines');
        if (dcl) {
          dcl.children.forEach((el) => {
            const dup = connectionLines
              ? connectionLines.children.find((e) => e.uuid === el.uuid)
              : undefined;

            if (!dup) {
              const link = el.userData?.link;
              if (packages && link && link.length === 2) {
                let points = [];

                link.forEach((e, i) => {
                  const np = packages.children.find(
                    (k) => k.uuid === e.packageId
                  );

                  if (np) {
                    const legs = np.children.find((k) => k.name === 'Legs');
                    if (legs) {
                      const leg = legs.children.find(
                        (k) => k.userData?.id === e.legId
                      );
                      if (leg) {
                        if (leg.type === 'Group') {
                          let l = leg.children.find((k) => k.name === 'leg');
                          if (l) {
                            points[i] =
                              new THREE.Vector3().setFromMatrixPosition(
                                l.matrixWorld
                              );
                          }
                        } else {
                          points[i] = new THREE.Vector3().setFromMatrixPosition(
                            leg.matrixWorld
                          );
                        }
                      }
                    }
                  }
                });
                if (points.length >= 2) {
                  const lineGeometry = new THREE.BufferGeometry().setFromPoints(
                    points
                  );
                  let line = new THREE.Line(
                    lineGeometry,
                    new THREE.LineBasicMaterial({
                      color: 0xffffff,
                    })
                  );

                  line.name = 'ConnectionLine';
                  line.uuid = el.uuid;
                  line.userData = {
                    ...line.userData,
                    hideTransformControls: {
                      translate: 'z',
                      rotate: 'xy',
                      scale: 'z',
                    },
                    points,
                    link,
                  };
                  groupObjects(editor, editor.scene, 'ConnectionLines', line);
                }
              }
            }
          });
        }
      }
    }
  }
  if (!editor.scene.userData?.viewType)
    editor.execute(
      new SetValueCommand(editor, editor.scene, 'userData', {
        ...editor.scene.userData,
        viewType: 'schematic',
      })
    );

  if (setLoading)
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
}

export async function loadPcbSchamaticPackage(editor, { id, type, schematic }, setLoading) {
  if (!id || !schematic || !type) {
    setLoading(false);
    return;
  }

  if (!schematic?.object) schematic = JSON.parse(schematic);

  let packages = await load(schematic);

  if (!packages) {
    setLoading(false);
    return;
  }

  if (type === 'Component') {
    if (packages?.children)
      packages.children.forEach((el) => {
        let group = editor.scene.getObjectByName(el?.name);
        if (group && el?.children) {
          el.children.forEach((e) => {
            group.add(e);
          });
        } else {
          editor.addObject(el);
        }
      });
  } else {
    packages.uuid = THREE.MathUtils.generateUUID();
    packages.name = 'Package';

    // packages.scale.copy(new THREE.Vector3(0.3, 0.3, 1));
    packages.userData = {
      ...packages.userData,
      id,
      type,
      selectParent: true,
      hideTransformControls: {
        translate: 'z',
        rotate: 'xy',
        scale: 'z',
      },
    };

    let body = packages.children.find((e) => e.name === 'Body');
    let legs = packages.children.find((e) => e.name === 'Legs');

    if (body) body.scale.z = silkThickness;

    if (legs) {
      legs.children.forEach((el, i) => {
        legs.children[i].uuid = THREE.MathUtils.generateUUID();
        legs.children[i].userData.hoverEffect = true;
        if (el.type === 'Group') {
          el.children.forEach((e, k) => {
            if (e.name === 'text') {
              legs.children[i].children[k].geometry.center();
            }
          });
        }
      });
    }

    groupObjects(editor, editor.scene, 'Packages', packages);

  }
  setLoading(false);
}
