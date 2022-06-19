import * as THREE from 'three';
import { CSG } from 'three-csg-ts';

import { AddObjectCommand } from '@organisms/threejs/js/commands/AddObjectCommand';
import { RemoveObjectCommand } from '@organisms/threejs/js/commands/RemoveObjectCommand';
import { SetGeometryCommand } from '@organisms/threejs/js/commands/SetGeometryCommand';
import { SetPositionCommand } from '@organisms/threejs/js/commands/SetPositionCommand';
import { SetRotationCommand } from '@organisms/threejs/js/commands/SetRotationCommand';
import { SetScaleCommand } from '@organisms/threejs/js/commands/SetScaleCommand';
import { SetValueCommand } from '@organisms/threejs/js/commands/SetValueCommand';
import { MoveObjectCommand } from '@organisms/threejs/js/commands/MoveObjectCommand';
import {
  copperThickness,
  drawCylinder,
  drawLine,
  getCoordinatesFromPlane,
  groupObjects,
  hideHoles,
  pcbScale,
  showLayers,
} from '../GlobalFunctions';

function ElectronicComponentDesign(editor) {
  const dom = editor.container.querySelector('#viewport');

  let obj = {};

  obj.connectionLine = () => {
    const layer = editor.scene.children.find((e) => e.name === `Layer${1}`);

    const core = layer.children?.find((e) => e.name === 'Core');

    const packages = layer.children.find((e) => e.name === 'Packages');
    let packageLegs = [];
    if (packages) {
      packages.children.forEach((el) => {
        const packageTwod = el.children.find((e) => e.name === 'Package2d');
        if (packageTwod) {
          let arr = [];
          const legs = packageTwod.children.find((e) => e.name === 'Legs');

          if (legs) {
            if (legs.children[0].type === 'Group') {
              legs.children.forEach((el) => {
                let copperCircle = el.children.find(
                  (e) => e.name === 'CopperCircle'
                );
                if (copperCircle) {
                  arr.push(copperCircle);
                }
              });
            }
            packageLegs = [...packageLegs, ...arr];
          }
        }
      });
    }

    const onExit = (line) => {
      let link = line.userData.link;

      if (link && link.length === 2) {
        const connectionLines = layer.children.find(
          (e) => e.name === 'ConnectionLines'
        );

        if (connectionLines?.children[0]) {
          for (let i = 0; i < connectionLines.children.length; i++) {
            let connectionLine = connectionLines.children[i];
            if (line.uuid !== connectionLine.uuid) {
              let linkC = connectionLine.userData?.link;
              if (linkC && linkC.length === 2) {
                let json = JSON.stringify(linkC);
                if (
                  json.includes(JSON.stringify(link[0])) &&
                  json.includes(JSON.stringify(link[1]))
                ) {
                  editor.execute(new RemoveObjectCommand(editor, line));
                  alert('cannot connect same leg again');
                  break;
                }
              }
            }
          }
        }
      } else {
        editor.execute(new RemoveObjectCommand(editor, line));
        alert('Must have connection with two legs');
      }
    };

    drawLine(
      editor,
      'ConnectionLine',
      0xffffff,
      2,
      [core, ...packageLegs],
      ['Legs'],
      {
        packageId: 'Package',
        legId: 'Legs',
        cth: 'CopperThruHole',
        cbh: 'CopperBlindHole',
      },
      onExit,
      {
        parent: core.parent,
        name: 'ConnectionLines',
      },
      {
        hideTransformControls: {
          translate: 'z',
          rotate: 'xy',
          scale: 'z',
        },
      }
    );
  };

  obj.copperThruHole = () => {
    const core = editor.scene.children
      .find((e) => e.name === `Layer${1}`)
      ?.children?.find((e) => e.name === 'Core');
    const layerCount = core.parent.userData?.currentLayer
      ? core.parent.userData?.currentLayer
      : 1;
    const layers = editor.scene.children.filter((el) =>
      el.name.includes('Layer')
    );

    dom.addEventListener('pointerdown', onPointerDown, false);

    function onPointerDown(e) {
      const point = getCoordinatesFromPlane(editor, e.clientX, e.clientY, core);
      point.z = 0;

      const group = new THREE.Group();
      group.name = 'CopperThruHole';
      group.position.copy(point);
      group.userData = {
        ...group.userData,
        hoverEffect: true,
        selectParent: true,
        hideTransformControls: {
          translate: 'z',
          rotate: 'xy',
          scale: 'z',
        },
      };

      group.add(
        drawCylinder(
          'CopperCylinder',
          0xd75822,
          new THREE.Vector3(0.15, pcbScale.z, 0.15),
          0
        )
      );
      group.add(
        drawCylinder(
          'HoleCylinder',
          0x000000,
          new THREE.Vector3(0.1, pcbScale.z + 0.02, 0.1),
          0
        )
      );

      layers.forEach((el) => {
        let core = el.children.find((e) => e.name === 'Core');
        if (core) {
          group.add(
            drawCylinder(
              'CopperCircle',
              0xd75822,
              new THREE.Vector3(0.2, copperThickness, 0.2),
              core.position.z + (core.scale.z / 2 + copperThickness / 2)
            )
          );

          group.add(
            drawCylinder(
              'CopperCircle',
              0xd75822,
              new THREE.Vector3(0.2, copperThickness, 0.2),
              core.position.z - (core.scale.z / 2 + copperThickness / 2)
            )
          );
        }
      });

      groupObjects(editor, editor.scene, 'CopperThruHoles', group);

      hideHoles(
        editor,
        layerCount,
        [group],
        (el) => {
          let copperCircle = el.children.filter(
            (e) => e.name === 'CopperCircle'
          );
          copperCircle.forEach((e, i) => {
            editor.execute(
              new SetValueCommand(
                editor,
                e,
                'visible',
                i === layerCount * 2 - 1 || i === layerCount * 2 - 2
              )
            );
          });
        },
        () => {
          return true;
        }
      );

      dom.removeEventListener('pointerdown', onPointerDown, false);
    }
    editor.deselect();
  };

  obj.copperBlindHole = (data) => {
    const { start, end } = data;

    const layers = editor.scene.children.filter((el) =>
      el.name.includes('Layer')
    );

    const layer1 = editor.scene.children.find((e) => e.name === 'Layer1');
    const layerCount = layer1.userData?.currentLayer
      ? layer1.userData?.currentLayer
      : 1;
    const core = layer1.children.find((e) => e.name === 'Core');

    const core1 = layers[start - 1].children?.find((e) => e.name === 'Core');

    const core2 = layers[end - 1].children?.find((e) => e.name === 'Core');

    if (core1 && core2) {
      dom.addEventListener('pointerdown', onPointerDown, false);
    }

    function onPointerDown(e) {
      const point = getCoordinatesFromPlane(editor, e.clientX, e.clientY, core);
      point.z = 0;

      let startz = core1.position.z + (core1.scale.z / 2 + copperThickness / 2);
      let endz = core2.position.z - (core2.scale.z / 2 + copperThickness / 2);
      let positionz = (startz + endz) / 2;

      let length = startz <= endz ? startz - endz : endz - startz;
      length = Math.abs(length);

      const group = new THREE.Group();
      group.name = 'CopperBlindHole';
      group.position.copy(point);
      group.userData = {
        ...group.userData,
        hoverEffect: true,
        ...{
          start: Number(core1.parent.name.replace('Layer', '')),
          end: Number(core2.parent.name.replace('Layer', '')),
        },
        selectParent: true,
        hideTransformControls: {
          translate: 'z',
          rotate: 'xy',
          scale: 'z',
        },
      };

      group.add(
        drawCylinder(
          'CopperCylinder',
          0xd75822,
          new THREE.Vector3(0.15, length, 0.15),
          positionz
        )
      );

      group.add(
        drawCylinder(
          'HoleCylinder',
          0x000000,
          new THREE.Vector3(0.1, length + 0.02, 0.1),
          positionz
        )
      );

      group.add(
        drawCylinder(
          'CopperCircle',
          0xd75822,
          new THREE.Vector3(0.2, copperThickness, 0.2),
          startz
        )
      );
      group.add(
        drawCylinder(
          'CopperCircle',
          0xd75822,
          new THREE.Vector3(0.2, copperThickness, 0.2),
          endz
        )
      );

      groupObjects(editor, editor.scene, 'CopperBlindHoles', group);

      hideHoles(
        editor,
        layerCount,
        [group],
        (el) => {
          let copperCircle = el.children.filter(
            (e) => e.name === 'CopperCircle'
          );
          function showCircle(name, i) {
            editor.execute(
              new SetValueCommand(
                editor,
                copperCircle[i],
                'visible',
                el?.userData?.[name] && el?.userData?.[name] === layerCount
              )
            );
          }
          showCircle('start', 0);
          showCircle('end', 1);
        },
        (el) => {
          //ascending order
          if (el?.userData?.start && el?.userData?.end) {
            const arr = [el?.userData?.start, el?.userData?.end];
            arr.sort(function (a, b) {
              return a - b;
            });
            return arr[0] <= layerCount && arr[1] >= layerCount;
          }
        }
      );
      dom.removeEventListener('pointerdown', onPointerDown, false);
    }
    editor.deselect();
  };

  obj.holeCylinder = () => {
    const core = editor.scene.children
      .find((e) => e.name === `Layer${1}`)
      ?.children?.find((e) => e.name === 'Core');

    dom.addEventListener('pointerdown', onPointerDown, false);

    function onPointerDown(e) {
      const point = getCoordinatesFromPlane(editor, e.clientX, e.clientY, core);
      point.z = 0;

      //invis hole
      var holeCylinder = new THREE.Mesh(
        new THREE.CylinderGeometry(1, 1, 1, 60, 1, false, 0, Math.PI * 2),
        new THREE.MeshPhongMaterial({
          color: 0x000000,
        })
      );
      holeCylinder.name = 'HoleCylinder';
      // holeCylinder.material.transparent = true; // opacity only work if transparent = true
      // holeCylinder.material.opacity = 0;

      holeCylinder.scale.copy(new THREE.Vector3(0.2, pcbScale.z + 0.02, 0.2));
      holeCylinder.position.copy(point);
      holeCylinder.rotation.copy(
        new THREE.Euler(
          90 * THREE.MathUtils.DEG2RAD,
          0 * THREE.MathUtils.DEG2RAD,
          0 * THREE.MathUtils.DEG2RAD
        )
      );
      holeCylinder.userData = {
        ...holeCylinder.userData,
        hideTransformControls: {
          translate: 'z',
          rotate: 'xy',
          scale: 'z',
        },
      };
      groupObjects(editor, editor.scene, 'HoleCylinders', holeCylinder);

      dom.removeEventListener('pointerdown', onPointerDown, false);
    }
  };

  obj.show3dPackages = () => {
    const packages = editor.scene.getObjectByName('Packages');
    if (!packages) return;
    const show3d =
      packages.userData?.show3d !== undefined
        ? packages.userData?.show3d
        : true;

    const viewType = editor.scene?.userData?.viewType;
    if (viewType === '3d') {
      packages.children.forEach((el) => {
        let package3d = el.children.find((e) => e.name === 'Package3d');
        if (package3d) {
          editor.execute(
            new SetValueCommand(editor, package3d, 'visible', !show3d)
          );
        }
      });
    }
    editor.execute(
      new SetValueCommand(editor, packages, 'userData', {
        ...packages.userData,
        show3d: !show3d,
      })
    );
  };

  obj.makeHoles = () => {
    const layers = editor.scene.children.filter((e) =>
      e.name.includes('Layer')
    );
    const layer1 = editor.scene.children.find((el) => el.name === 'Layer1');

    let holes = [];

    const holeCylinders = editor.scene.children.find(
      (e) => e.name === 'HoleCylinders'
    );
    if (holeCylinders) holes = [...holes, ...holeCylinders.children];

    function holeCoppers(arr) {
      arr.forEach((el) => {
        let holeCylinder = el.children.find((e) => e.name === 'HoleCylinder');
        let copperCylinder = el.children.find(
          (e) => e.name === 'CopperCylinder'
        );
        if (holeCylinder) {
          el.children.forEach((e) => {
            if (e.name !== 'HoleCylinder') {
              e.updateMatrix();
              holeCylinder.updateMatrix();
              let hMesh = CSG.subtract(e, holeCylinder);
              if (hMesh) {
                editor.execute(
                  new SetGeometryCommand(editor, e, hMesh.geometry)
                );
              }
            }
          });

          holeCylinder.scale.copy(copperCylinder.scale);
          holes.push(holeCylinder);
        }
      });
    }

    const cth = editor.scene.children.find((e) => e.name === 'CopperThruHoles');
    if (cth) holeCoppers(cth.children);

    const cbh = editor.scene.children.find(
      (e) => e.name === 'CopperBlindHoles'
    );
    if (cbh) holeCoppers(cbh.children);

    const packages = layer1.children.find((e) => e.name === 'Packages');
    if (packages) {
      packages.children.forEach((el) => {
        const packageTwod = el.children.find((e) => e.name === 'Package2d');

        if (packageTwod) {
          const legs = packageTwod.children.find((e) => e.name === 'Legs');
          if (legs) {
            if (legs.children[0].type === 'Group') holeCoppers(legs.children);
          }
        }
      });
    }

    layers.forEach((el) => {
      let core = el.children.find((e) => e.name === 'Core');

      if (core) {
        let hCore = core;

        if (holes) {
          holes.forEach((el) => {
            const hole = el.clone();
            hole.position.copy(
              new THREE.Vector3().setFromMatrixPosition(el.matrixWorld)
            );

            hCore.updateMatrix();
            hole.updateMatrix();
            hCore = CSG.subtract(hCore, hole);
            editor.removeObject(el);
          });
        }

        if (hCore) {
          editor.execute(new SetGeometryCommand(editor, core, hCore.geometry));
        }
      }
    });
  };

  obj.mirrorPackage = () => {
    if (editor.selected && editor.selected?.name === 'Package') {
      editor.execute(
        new SetRotationCommand(
          editor,
          editor.selected,
          new THREE.Euler(
            editor.selected.x,
            180 * THREE.MathUtils.DEG2RAD,
            editor.selected.x
          )
        )
      );
    }
  };

  obj.addPcbLayer = () => {
    //existing and the new layer that gonna add
    const layers = editor.scene.children.filter((el) =>
      el.name.includes('Layer')
    );
    const layerCount = layers.length + 1;
    const layerThickness = pcbScale.z / layerCount;

    // CopperThruHoles circles position
    let copperCirclesP = [];

    //resizing oldlayers
    layers.forEach((el, i) => {
      let core = el.children.find((e) => e.name === 'Core');
      if (core) {
        let scale = new THREE.Vector3().copy(core.scale);
        scale.z = layerThickness - copperThickness * 2;
        editor.execute(new SetScaleCommand(editor, core, scale));

        let position = new THREE.Vector3().copy(core.position);
        position.z = pcbScale.z / 2 - (layerThickness * i + layerThickness / 2);
        editor.execute(new SetPositionCommand(editor, core, position));

        copperCirclesP = [
          ...copperCirclesP,
          position.z + (scale.z / 2 + copperThickness / 2),
          position.z - (scale.z / 2 + copperThickness / 2),
        ];
      }
    });

    ////newlayer
    // getting and update count in layer1 userdata
    const layer1 = editor.scene.getObjectByName('Layer1');
    const core1 = layer1.getObjectByName('Core');
    const currentCount = layer1?.userData?.layerCount + 1;
    editor.execute(
      new SetValueCommand(editor, layer1, 'userData', {
        ...layer1.userData,
        layerCount: currentCount,
      })
    );

    const layer = new THREE.Group();
    layer.name = `Layer${currentCount}`;

    let core = new THREE.Mesh(
      new THREE.BoxGeometry(),
      new THREE.MeshPhongMaterial({
        color: 0x008c4a,
      })
    );

    let coreScale = !core1
      ? new THREE.Vector3().copy(pcbScale)
      : new THREE.Vector3().copy(core1.scale);
    coreScale.z = layerThickness - copperThickness * 2;
    core.scale.copy(coreScale);
    core.position.z = -(pcbScale.z / 2) + layerThickness / 2;
    core.name = 'Core';
    if (editor.scene.userData.viewType === '2d') {
      core.visible = false;
    }
    core.userData.barrier = true;
    layer.add(core);
    editor.execute(new AddObjectCommand(editor, layer));

    //positioning copperThroughHoles
    const cth = editor.scene.children.find((e) => e.name === 'CopperThruHoles');

    if (cth) {
      cth.children.forEach((el) => {
        let circlePosition = new THREE.Vector3();
        el.children
          .filter((k) => k.name === 'CopperCircle')
          .forEach((e, i) => {
            let position = new THREE.Vector3().copy(e.position);
            if (copperCirclesP[i]) {
              position.z = copperCirclesP[i];
            }
            editor.execute(new SetPositionCommand(editor, e, position));

            if (i === 0) {
              circlePosition.copy(position);
            }
          });

        //draw 2 new circle on new layer
        const addCylinders = (positionz) => {
          let obj = drawCylinder(
            'CopperCircle',
            0xd75822,
            new THREE.Vector3(0.2, copperThickness, 0.2),
            positionz
          );
          editor.addObject(obj);
          editor.execute(new MoveObjectCommand(editor, obj, el, editor.scene));
        };

        addCylinders(
          core.position.z + (core.scale.z / 2 + copperThickness / 2)
        );

        addCylinders(
          core.position.z - (core.scale.z / 2 + copperThickness / 2)
        );
      });
    }

    //positioning copperBlindHoles
    const cbh = editor.scene.children.find(
      (e) => e.name === 'CopperBlindHoles'
    );

    if (cbh) {
      cbh.children.forEach((el) => {
        const { start, end } = el.userData;

        if ((start, end)) {
          const core1 = editor.scene.children
            .find((e) => e.name === `Layer${start}`)
            ?.children?.find((e) => e.name === 'Core');

          const core2 = editor.scene.children
            .find((e) => e.name === `Layer${end}`)
            ?.children?.find((e) => e.name === 'Core');

          let startz =
            core1.position.z + (core1.scale.z / 2 + copperThickness / 2);
          let endz =
            core2.position.z - (core2.scale.z / 2 + copperThickness / 2);

          let positionz = (startz + endz) / 2;

          let length = startz <= endz ? startz - endz : endz - startz;
          length = Math.abs(length);

          let holeCylinder = el.children.find((e) => e.name === 'HoleCylinder');
          let copperCylinder = el.children.find(
            (e) => e.name === 'CopperCylinder'
          );
          let copperCircle = el.children.filter(
            (e) => e.name === 'CopperCircle'
          );

          if (holeCylinder) {
            editor.execute(
              new SetScaleCommand(
                editor,
                holeCylinder,
                new THREE.Vector3(
                  holeCylinder.scale.x,
                  length + 0.02,
                  holeCylinder.scale.z
                )
              )
            );
            editor.execute(
              new SetPositionCommand(
                editor,
                holeCylinder,
                new THREE.Vector3(
                  holeCylinder.position.x,
                  holeCylinder.position.y,
                  positionz
                )
              )
            );
          }

          if (copperCylinder) {
            editor.execute(
              new SetScaleCommand(
                editor,
                copperCylinder,
                new THREE.Vector3(
                  copperCylinder.scale.x,
                  length,
                  copperCylinder.scale.z
                )
              )
            );
            editor.execute(
              new SetPositionCommand(
                editor,
                copperCylinder,
                new THREE.Vector3(
                  copperCylinder.position.x,
                  copperCylinder.position.y,
                  positionz
                )
              )
            );
          }

          if (copperCircle[0])
            editor.execute(
              new SetPositionCommand(
                editor,
                copperCircle[0],
                new THREE.Vector3(
                  copperCircle[0].position.x,
                  copperCircle[0].position.y,
                  startz
                )
              )
            );
          if (copperCircle[1])
            editor.execute(
              new SetPositionCommand(
                editor,
                copperCircle[1],
                new THREE.Vector3(
                  copperCircle[1].position.x,
                  copperCircle[1].position.y,
                  endz
                )
              )
            );
        }
      });
    }

    editor.deselect();
    showLayers(editor);
    return { pcbLayersCount: layerCount };
  };

  obj.removePcbLayer = (layer) => {
    const layersD = editor.scene.children.filter((el) =>
      el.name.includes('Layer')
    );
    if (!layer) {
      layer = layersD.length;
    }

    let layerD = layersD[layer - 1];

    if (!layerD.userData?.noDelete) {
      let layerIndexD = Number(layerD.name.replace('Layer', ''));

      editor.execute(new RemoveObjectCommand(editor, layerD));

      const layers = editor.scene.children.filter((el) =>
        el.name.includes('Layer')
      );
      const layerCount = layers.length;
      const layerThickness = pcbScale.z / layerCount;

      // CopperThruHoles circles position
      let copperCirclesP = [];

      //resizing oldlayers
      layers.forEach((el, i) => {
        let core = el.children.find((e) => e.name === 'Core');
        if (core) {
          let scale = new THREE.Vector3().copy(core.scale);
          scale.z = layerThickness - copperThickness * 2;
          editor.execute(new SetScaleCommand(editor, core, scale));

          let position = new THREE.Vector3().copy(core.position);
          position.z =
            pcbScale.z / 2 - (layerThickness * i + layerThickness / 2);
          editor.execute(new SetPositionCommand(editor, core, position));

          copperCirclesP = [
            ...copperCirclesP,
            position.z + (scale.z / 2 + copperThickness / 2),
            position.z - (scale.z / 2 + copperThickness / 2),
          ];
        }
      });

      //positioning copperThroughHoles
      const cth = editor.scene.children.find(
        (e) => e.name === 'CopperThruHoles'
      );

      if (cth) {
        cth.children.forEach((el) => {
          let circlePosition = new THREE.Vector3();
          el.children
            .filter((el) => el.name === 'CopperCircle')
            .forEach((e, i) => {
              if (copperCirclesP[i]) {
                let position = new THREE.Vector3().copy(e.position);
                if (copperCirclesP[i]) {
                  position.z = copperCirclesP[i];
                }
                editor.execute(new SetPositionCommand(editor, e, position));

                if (i === 0) {
                  circlePosition.copy(position);
                }
              } else {
                editor.execute(new RemoveObjectCommand(editor, e));
              }
            });
        });
      }

      //positioning copperBlindHoles
      const cbh = editor.scene.children.find(
        (e) => e.name === 'CopperBlindHoles'
      );

      if (cbh) {
        cbh.children.forEach((el) => {
          const { start, end } = el.userData;

          if ((start, end)) {
            if (start === layerIndexD || end === layerIndexD) {
              editor.execute(new RemoveObjectCommand(editor, el));
            } else {
              const core1 = editor.scene.children
                .find((e) => e.name === `Layer${start}`)
                ?.children?.find((e) => e.name === 'Core');

              const core2 = editor.scene.children
                .find((e) => e.name === `Layer${end}`)
                ?.children?.find((e) => e.name === 'Core');

              let startz =
                core1.position.z + (core1.scale.z / 2 + copperThickness / 2);
              let endz =
                core2.position.z - (core2.scale.z / 2 + copperThickness / 2);

              let positionz = (startz + endz) / 2;

              let length = startz <= endz ? startz - endz : endz - startz;
              length = Math.abs(length);

              let holeCylinder = el.children.find(
                (e) => e.name === 'HoleCylinder'
              );
              let copperCylinder = el.children.find(
                (e) => e.name === 'CopperCylinder'
              );
              let copperCircle = el.children.filter(
                (e) => e.name === 'CopperCircle'
              );

              if (holeCylinder) {
                editor.execute(
                  new SetScaleCommand(
                    editor,
                    holeCylinder,
                    new THREE.Vector3(
                      holeCylinder.scale.x,
                      length + 0.02,
                      holeCylinder.scale.z
                    )
                  )
                );
                editor.execute(
                  new SetPositionCommand(
                    editor,
                    holeCylinder,
                    new THREE.Vector3(
                      holeCylinder.position.x,
                      holeCylinder.position.y,
                      positionz
                    )
                  )
                );
              }

              if (copperCylinder) {
                editor.execute(
                  new SetScaleCommand(
                    editor,
                    copperCylinder,
                    new THREE.Vector3(
                      copperCylinder.scale.x,
                      length,
                      copperCylinder.scale.z
                    )
                  )
                );
                editor.execute(
                  new SetPositionCommand(
                    editor,
                    copperCylinder,
                    new THREE.Vector3(
                      copperCylinder.position.x,
                      copperCylinder.position.y,
                      positionz
                    )
                  )
                );
              }

              if (copperCircle[0])
                editor.execute(
                  new SetPositionCommand(
                    editor,
                    copperCircle[0],
                    new THREE.Vector3(
                      copperCircle[0].position.x,
                      copperCircle[0].position.y,
                      startz
                    )
                  )
                );

              if (copperCircle[1])
                editor.execute(
                  new SetPositionCommand(
                    editor,
                    copperCircle[1],
                    new THREE.Vector3(
                      copperCircle[1].position.x,
                      copperCircle[1].position.y,
                      endz
                    )
                  )
                );
            }
          }
        });
      }
      showLayers(editor);
      return { pcbLayersCount: layerCount };
    }
  };

  obj.showLayer = (layer = 1) => {
    showLayers(editor, layer);
  };

  obj.copperLine = () => {
    const layer1 = editor.scene.children.find((e) => e.name === 'Layer1');
    let layer = layer1.userData?.currentLayer;

    layer = layer ? Number(layer) : 1;

    const layers = editor.scene.children.filter((el) =>
      el.name.includes('Layer')
    );

    const core = layers[layer - 1].children.find((e) => e.name === 'Core');

    let planes = [];
    if (layer === 1) {
      const packages = core.parent.children.find((e) => e.name === 'Packages');
      if (packages) {
        let packageLegs = [];
        packages.children.forEach((el) => {
          const packageTwod = el.children.find((e) => e.name === 'Package2d');
          if (packageTwod) {
            let arr = [];
            const legs = packageTwod.children.find((e) => e.name === 'Legs');

            if (legs) {
              if (legs.children[0].type === 'Group') {
                legs.children.forEach((el) => {
                  let copperCircle = el.children.find(
                    (e) => e.name === 'CopperCircle'
                  );
                  if (copperCircle && copperCircle.visible) {
                    arr.push(copperCircle);
                  }
                });
              }
              packageLegs = [...packageLegs, ...arr];
            }
          }
        });
        planes = [...planes, ...packageLegs];
      }
    }

    const cth = editor.scene.children.find((e) => e.name === 'CopperThruHoles');
    const cbh = editor.scene.children.find(
      (e) => e.name === 'CopperBlindHoles'
    );

    if (cth) {
      let circles = [];
      cth.children.forEach((el) => {
        circles = [
          ...circles,
          ...el.children.filter((e) => e.name === 'CopperCircle'),
        ];
      });
      planes = [...planes, ...circles];
    }

    if (cbh) {
      let circles = [];
      cbh.children.forEach((el) => {
        circles = [
          ...circles,
          ...el.children.filter((e) => e.name === 'CopperCircle'),
        ];
      });
      planes = [...planes, ...circles];
    }

    const onExit = (line) => {
      let link = line.userData.link;

      if (link && link.length === 2) {
        //checking copper lines in all layers
        layers.some((e) => {
          const copperLines = e.children.find((k) => k.name === 'CopperLines');
          let exists = false;
          if (copperLines) {
            copperLines.children.some((el) => {
              let linkC = el.userData?.link;
              if (linkC && el.uuid !== line.uuid) {
                let json = JSON.stringify(linkC);
                if (
                  json.includes(JSON.stringify(link[0])) &&
                  json.includes(JSON.stringify(link[1]))
                ) {
                  editor.execute(new RemoveObjectCommand(editor, line));
                  alert('cannot connect same leg again');
                  exists = true;
                  return true;
                }
              }
            });
          }
          if (exists) {
            return true;
          }
        });

        //checking connectionline to delete it
        const connectionLines = layer1.children.find(
          (e) => e.name === 'ConnectionLines'
        );

        if (connectionLines?.children[0]) {
          for (let i = 0; i < connectionLines.children.length; i++) {
            let connectionLine = connectionLines.children[i];
            let linkC = connectionLine.userData?.link;
            if (linkC && linkC.length === 2) {
              let json = JSON.stringify(linkC);
              if (
                json.includes(JSON.stringify(link[0])) &&
                json.includes(JSON.stringify(link[1]))
              ) {
                editor.execute(new RemoveObjectCommand(editor, connectionLine));
                break;
              }
            }
          }
        }
      } else {
        editor.execute(new RemoveObjectCommand(editor, line));
        alert('should be connected between copper plate');
      }
    };

    drawLine(
      editor,
      'CopperLine',
      0xd75822,
      500,
      [core, ...planes],
      ['Legs', 'CopperThruHoles', 'CopperBlindHoles'],
      {
        packageId: 'Package',
        legId: 'Legs',
        cth: 'CopperThruHole',
        cbh: 'CopperBlindHole',
      },
      onExit,
      {
        parent: core.parent,
        name: 'CopperLines',
      },
      {
        hideTransformControls: {
          translate: 'z',
          rotate: 'xy',
          scale: 'z',
        },
      }
    );
  };

  obj.copperCircle = () => {
    const core = editor.scene.children
      .find((e) => e.name === `Layer${1}`)
      ?.children?.find((e) => e.name === 'Core');

    dom.addEventListener('pointerdown', onPointerDown, false);

    function onPointerDown(e) {
      const point = getCoordinatesFromPlane(editor, e.clientX, e.clientY, core);
      var geometry = new THREE.CylinderGeometry(
        1,
        1,
        1,
        60,
        1,
        false,
        0,
        Math.PI * 2
      );
      var mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial({
          color: 0xd75822,
        })
      );

      // const edges = new THREE.EdgesGeometry(geometry);
      // const mesh = new THREE.LineSegments(
      //   edges,
      //   new THREE.LineBasicMaterial({ color: 0xffffff })
      // );

      mesh.name = 'CopperCircle';
      mesh.scale.copy(new THREE.Vector3(0.2, copperThickness, 0.2));

      point.z = core.position.z + core.scale.z / 2 + mesh.scale.y / 2;
      mesh.position.copy(point);

      mesh.rotation.copy(
        new THREE.Euler(
          90 * THREE.MathUtils.DEG2RAD,
          0 * THREE.MathUtils.DEG2RAD,
          0 * THREE.MathUtils.DEG2RAD
        )
      );

      mesh.userData = {
        ...mesh.userData,
        hideTransformControls: {
          translate: 'z',
          rotate: 'xy',
          scale: 'z',
        },
      };
      groupObjects(editor, core.parent, 'CopperCircles', mesh);

      dom.removeEventListener('pointerdown', onPointerDown, false);
    }
  };

  obj.copperRect = () => {
    const core = editor.scene.children
      .find((e) => e.name === `Layer${1}`)
      ?.children?.find((e) => e.name === 'Core');

    dom.addEventListener('pointerdown', onPointerDown, false);

    function onPointerDown(e) {
      const point = getCoordinatesFromPlane(editor, e.clientX, e.clientY, core);
      var geometry = new THREE.BoxGeometry();
      var mesh = new THREE.Mesh(
        geometry,
        new THREE.MeshPhongMaterial({
          color: 0xd75822,
        })
      );

      mesh.name = 'CopperRect';

      mesh.scale.copy(new THREE.Vector3(0.4, 0.2, copperThickness));

      point.z = core.position.z + core.scale.z / 2 + mesh.scale.z / 2;
      mesh.position.copy(point);

      mesh.userData = {
        ...mesh.userData,
        hideTransformControls: {
          translate: 'z',
          rotate: 'xy',
          scale: 'z',
        },
      };
      groupObjects(editor, core.parent, 'CopperRects', mesh);

      dom.removeEventListener('pointerdown', onPointerDown, false);
    }
  };

  obj.positionPackageByFile = async (getTxtFile) => {
    if (!getTxtFile) return;
    let url = await getTxtFile('package');

    if (!url) return;
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        if (text && editor.selected && editor.selected?.name === 'Package') {
          let txt = text.trim().split(';');
          txt.forEach((e) => {
            if (e.toLowerCase().includes('position')) {
              let posStr = e.split(':');
              if (posStr[1]) {
                let pos = posStr[1].split(',');
                if (pos && Number(pos[0]) && Number(pos[1])) {
                  editor.execute(
                    new SetPositionCommand(
                      editor,
                      editor.selected,
                      new THREE.Vector3(
                        Number(pos[0]),
                        Number(pos[1]),
                        editor.selected.position.z
                      )
                    )
                  );
                }
              }
            } else if (e.toLowerCase().includes('side')) {
              let sideStr = e.split(':');
              if (Number(sideStr[1]) === 0) {
                editor.execute(
                  new SetRotationCommand(
                    editor,
                    editor.selected,
                    new THREE.Euler(
                      editor.selected.x,
                      0 * THREE.MathUtils.DEG2RAD,
                      editor.selected.x
                    )
                  )
                );
              } else if (Number(sideStr[1]) === 1) {
                editor.execute(
                  new SetRotationCommand(
                    editor,
                    editor.selected,
                    new THREE.Euler(
                      editor.selected.x,
                      180 * THREE.MathUtils.DEG2RAD,
                      editor.selected.x
                    )
                  )
                );
              }
            }
          });
        }
      });
  };

  obj.drawLineByFile = async (getTxtFile) => {
    if (!getTxtFile) return;
    let url = await getTxtFile('line');

    if (!url) return;
    fetch(url)
      .then((response) => response.text())
      .then((text) => {
        let textArr = text.split('\n');
        textArr.forEach((k) => {
          let pointsStr = k.split(',');
          let points = pointsStr.map((e) => Number(e.trim()));

          if (points && points.length % 3 === 0) {
            const geometry = new THREE.BufferGeometry();
            const vertices = new Float32Array(points);

            // itemSize = 3 because there are 3 values (components) per vertex
            geometry.setAttribute(
              'position',
              new THREE.BufferAttribute(vertices, 3)
            );
            const material = new THREE.LineBasicMaterial({
              color: 0xffffff,
            });

            const line = new THREE.Line(geometry, material);
            line.name = 'fileLine';
            editor.execute(new AddObjectCommand(editor, line));
          }
        });
      });
  };

  obj.testLine = () => {
    var path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(2, 2, - 2),
      new THREE.Vector3(2, - 2, - 0.6666666666666667),
      new THREE.Vector3(- 2, - 2, 0.6666666666666667),
      new THREE.Vector3(- 2, 2, 2)
    ]);

    var geometry = new THREE.TubeGeometry(path, 30, 0.15, 8, false);
    var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'Tube';
    mesh.scale.set(0.650, 0.630, 0.900)
    mesh.position.set(0, 1, 0)

    editor.execute(new AddObjectCommand(editor, mesh));
  };

  return obj;
}

export default ElectronicComponentDesign;
