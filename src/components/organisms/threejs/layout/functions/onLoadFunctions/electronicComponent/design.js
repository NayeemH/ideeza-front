import * as THREE from 'three';
import { AddObjectCommand } from '@organisms/threejs/js/commands/AddObjectCommand';
import { SetGeometryCommand } from '@organisms/threejs/js/commands/SetGeometryCommand';
import { SetPositionCommand } from '@organisms/threejs/js/commands/SetPositionCommand';
import { SetValueCommand } from '@organisms/threejs/js/commands/SetValueCommand';
import {
  copperThickness,
  groupObjects,
  load,
  pcbScale,
  showLayers,
  silkThickness,
} from '../../GlobalFunctions';
import { RemoveObjectCommand } from '@organisms/threejs/js/commands/RemoveObjectCommand';
import { SetMaterialValueCommand } from '@organisms/threejs/js/commands/SetMaterialValueCommand';
import { SetRotationCommand } from '@organisms/threejs/js/commands/SetRotationCommand';

export async function drawPcb(editor, schematicFile, getPackageFile) {
  //checking if first layer exists
  let layers = editor.scene.children.filter((e) => e.name.includes('Layer'));
  let layer1 = editor.scene.getObjectByName('Layer1');
  let layerCount = layers.length;
  let packages;
  if (!layer1) {
    const layer = new THREE.Group();
    layer.name = 'Layer1';
    layer.userData = { ...layer.userData, layerCount: 1, noDelete: true };
    let core = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshPhongMaterial({
        color: 0x008c4a,
      })
    );
    let scale = new THREE.Vector3().copy(pcbScale);
    scale.z = scale.z - copperThickness * 2;
    core.scale.copy(scale);
    core.name = 'Core';
    core.userData.barrier = true;
    layer.add(core);
    editor.execute(new AddObjectCommand(editor, layer));
    editor.deselect();
    layer1 = layer;
    layers = editor.scene.children.filter((e) => e.name.includes('Layer'));
    layerCount = layerCount + 1;
  } else {
    packages = layer1.getObjectByName('Packages');
    if (packages) {
      packages.children.forEach((el) => {
        el.children.forEach((e) => {
          //drawing edges geometry
          let body = e.getObjectByName('Body');
          if (body?.type === 'LineSegments') {
            if (body.geometry.type !== 'EdgesGeometry') {
              body.rotation.copy(new THREE.Euler(0, 0, 0));
              let geometry = new THREE.EdgesGeometry(body.geometry);
              editor.execute(new SetGeometryCommand(editor, body, geometry));
            }
          }
        });
      });
    }

    layer1.traverse((el) => {
      if (!el.visible)
        editor.execute(new SetValueCommand(editor, el, 'visible', true));
    });

    editor.scene.traverse((el) => {
      if (!el.visible)
        editor.execute(new SetValueCommand(editor, el, 'visible', true));
    });
  }

  if (schematicFile?.scene) {
    // const schematics = await load(schematicFile);
    const schematics = schematicFile.scene;
    // render packages
    if (schematics) {
      let sPackages = schematics.getObjectByName('Packages');
      const core = layer1.getObjectByName('Core');

      let c = {
        x: pcbScale.x / 2 + 0.5,
        y: pcbScale.y / 2,
      };
      const packagess = [[], []];

      //get existing packages inside container
      if (packages) {
        packages.children.forEach((el) => {
          let p = el.position;
          if (p.x >= c.x && p.y <= c.y) packagess[0].push(el);
        });
      }

      //get packages doesn't exists in design
      if (sPackages) {
        sPackages.children.forEach((el) => {
          const dup = packages
            ? packages.children.some((e) => e.uuid === el.uuid)
            : undefined;
          if (!dup) {
            packagess[1].push(el);
          }
        });
      }

      let col = Math.ceil(Math.sqrt(packagess[0].length + packagess[1].length));
      let currentRow = 1;
      let packageWidth = 3;
      let currentCol = 1;
      let count = 0;

      for (let i = 0; i < packagess.length; i++) {
        for (let k = 0; k < packagess[i].length; k++) {
          let e = packagess[i][k];
          let id = e.userData?.id;
          let type = e.userData?.type;
          if (!id || !type) return;
          let position = new THREE.Vector3(
            c.x + 0.5 + (packageWidth / 2) * (currentCol - 1),
            c.y - (packageWidth / 2) * (currentRow - 1),
            e.position.z
          );
          if (i === 0) {
            editor.execute(new SetPositionCommand(editor, e, position));
          } else {
            let nPackage = new THREE.Group();
            nPackage.name = 'Package';

            nPackage.uuid = e.uuid;
            // nPackage.scale.copy(new THREE.Vector3(0.3, 0.3, 1));
            // nPackage.position.copy(position);
            nPackage.position.set(0, 0, 0);
            nPackage.userData = {
              ...nPackage.userData,
              id,
              type,
              selectParent: true,
              hideTransformControls: {
                translate: 'z',
                rotate: 'xy',
                scale: 'z',
              },
            };

            // let packageTwod = await load(package2d);
            // let packageThreed = await load(package3d);
            let packageTwodScript = await getPackageFile(id, type, 'twoD');
            if (!packageTwodScript?.object)
              packageTwodScript = JSON.parse(packageTwodScript);
            let packageTwod = await load(packageTwodScript);

            let packageThreedScript = await getPackageFile(id, type, 'threeD');
            if (!packageThreedScript?.object)
              packageThreedScript = JSON.parse(packageThreedScript);
            let packageThreed = await load(packageThreedScript);

            if (packageTwod && packageThreed) {
              packageTwod.name = 'Package2d';
              packageThreed.name = 'Package3d';

              editor.execute(new SetRotationCommand(editor, packageThreed, new THREE.Euler(0, 0, 0)));
              let body2d = packageTwod.children.find((e) => e.name === 'Body');
              let legs2d = packageTwod.children.find((e) => e.name === 'Legs');

              if (body2d && core) {
                if (body2d.scale.z === 0) {
                  body2d.scale.z = silkThickness;
                }
                body2d.position.z =
                  core.position.z + core.scale.z / 2 + body2d.scale.z / 2;
              }

              if (legs2d) {
                legs2d.children.forEach((el, i) => {
                  legs2d.children[i].userData.hoverEffect = true;
                  legs2d.children[i].uuid = THREE.MathUtils.generateUUID();
                  legs2d.children[i].traverse((n) => {
                    if (n.material)
                      n.material.uuid = THREE.MathUtils.generateUUID();

                    if (n.geometry)
                      n.geometry.uuid = THREE.MathUtils.generateUUID();
                  });

                  let holeCylinder = el.children.find(
                    (e) => e.name === 'HoleCylinder'
                  );
                  let copperCylinder = el.children.find(
                    (e) => e.name === 'CopperCylinder'
                  );
                  let copperCircles = el.children.filter(
                    (e) => e.name === 'CopperCircle'
                  );

                  if (holeCylinder) {
                    holeCylinder.scale.copy(
                      new THREE.Vector3(
                        holeCylinder.scale.x,
                        pcbScale.z + 0.02,
                        holeCylinder.scale.z
                      )
                    );

                    holeCylinder.position.copy(
                      new THREE.Vector3(
                        holeCylinder.position.x,
                        holeCylinder.position.y,
                        0
                      )
                    );
                  }

                  if (copperCylinder) {
                    copperCylinder.scale.copy(
                      new THREE.Vector3(
                        copperCylinder.scale.x,
                        pcbScale.z,
                        copperCylinder.scale.z
                      )
                    );

                    copperCylinder.position.copy(
                      new THREE.Vector3(
                        copperCylinder.position.x,
                        copperCylinder.position.y,
                        0
                      )
                    );
                  }

                  if (copperCircles.length >= 1) {
                    let z =
                      (pcbScale.z - copperThickness * 2) / 2 +
                      copperCircles[0].scale.y / 2;

                    copperCircles[0].position.copy(
                      new THREE.Vector3(
                        copperCircles[0].position.x,
                        copperCircles[0].position.y,
                        z
                      )
                    );
                    copperCircles[1].position.copy(
                      new THREE.Vector3(
                        copperCircles[1].position.x,
                        copperCircles[1].position.y,
                        -z
                      )
                    );
                  }
                });
              }

              packageThreed.position.z = 0.1;
              // packageThreed.visible = viewType === '3d';

              nPackage.add(packageTwod, packageThreed);
              groupObjects(editor, layer1, 'Packages', nPackage);
            }
          }
          if ((count + 1) % col === 0) {
            currentRow++;
            currentCol = 1;
          } else {
            currentCol++;
          }
          count++;
        }
      }

      packages = layer1.children.find((e) => e.name === 'Packages');

      //connecting connection from schematics
      const connectionLines = layer1.getObjectByName('ConnectionLines');
      let scl = schematics.getObjectByName('ConnectionLines');
      if (scl) {
        scl.children.forEach((el) => {
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
                  const np2d = np.getObjectByName('Package2d');
                  if (np2d) {
                    const legs = np2d.getObjectByName('Legs');
                    if (legs) {
                      const leg = legs.children.find(
                        (k) => k.userData?.id === e.legId
                      );
                      if (leg) {
                        if (leg.type === 'Group') {
                          let copperCircle = leg.children.find(
                            (e) => e.name === 'CopperCircle'
                          );
                          if (copperCircle) {
                            points[i] =
                              new THREE.Vector3().setFromMatrixPosition(
                                copperCircle.matrixWorld
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
                groupObjects(editor, layer1, 'ConnectionLines', line);
              }
            }
          }
        });
      }
    }
  }

  return { pcbLayersCount: layerCount };
}

export function pcbDesignViewType(editor, viewType, setLoading, checkPackage = true) {
  editor.signals.setCameraByAngle.dispatch(new THREE.Vector3(0, 0, 10));

  if (viewType === '2d') {
    editor.signals.freezeCamera.dispatch();
  } else if (viewType === '3d') {
    editor.signals.unFreezeCamera.dispatch();
  }

  let layers = editor.scene.children.filter((e) => e.name.includes('Layer'));
  let layer = editor.scene.getObjectByName('Layer1');

  if (layer) {
    //clearing and drawing pcb border based on viewType
    let pcbBorder = editor.scene.children.find((e) => e.name === 'Pcb2Dborder');
    if (viewType === '2d') {
      if (pcbBorder) {
        editor.execute(new RemoveObjectCommand(editor, pcbBorder));
      }
      let geometry = new THREE.EdgesGeometry(new THREE.BoxGeometry());
      let mesh = new THREE.LineSegments(
        geometry,
        new THREE.LineBasicMaterial({ color: 0xffffff })
      );
      mesh.name = 'Pcb2Dborder';
      mesh.userData.unSelect = true;
      mesh.scale.copy(pcbScale);
      mesh.scale.z = 0;
      editor.addObject(mesh);
    } else if (viewType === '3d' && pcbBorder) {
      editor.execute(new RemoveObjectCommand(editor, pcbBorder));
    }

    //hiding all layers
    layers.forEach((el) => {
      let core = el.children.find((e) => e.name === 'Core');
      editor.execute(
        new SetMaterialValueCommand(
          editor,
          core,
          'transparent',
          viewType === '2d'
        )
      );
      editor.execute(
        new SetMaterialValueCommand(
          editor,
          core,
          'opacity',
          viewType === '2d' ? 0 : 1
        )
      );
    });

    //hiding package3d based on viewType
    let packages = layer.children.find((e) => e.name === 'Packages');
    if (packages) {
      packages.children.forEach((el) => {
        el.children.forEach((e) => {
          if (e.name === 'Package3d') {
            editor.execute(
              new SetValueCommand(editor, e, 'visible', viewType === '3d')
            );
          }
        });
      });
      editor.execute(
        new SetValueCommand(editor, packages, 'userData', {
          ...packages.userData,
          show3d: viewType === '3d',
        })
      );
    }

    editor.execute(
      new SetValueCommand(editor, editor.scene, 'userData', {
        ...editor.scene.userData,
        viewType,
      })
    );
    showLayers(editor, 1, checkPackage);
  }
  if (setLoading)
    setTimeout(() => {
      setLoading(false);
    }, [1000]);
}
