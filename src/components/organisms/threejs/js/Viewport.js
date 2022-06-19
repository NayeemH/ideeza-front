import * as THREE from 'three';

import { TransformControls } from 'three/examples/jsm/controls/TransformControls.js';
// const TransformControls = window.TransformControls;

import { UIPanel } from './libs/ui.js';

import { EditorControls } from './EditorControls.js';

// import { ViewportCamera } from './Viewport.Camera.js';
import { ViewportInfo } from './Viewport.Info.js';
import { ViewHelper } from './Viewport.ViewHelper.js';
import { VR } from './Viewport.VR.js';
import { AR } from './Viewport.AR.js';

import { SetPositionCommand } from './commands/SetPositionCommand.js';
import { SetRotationCommand } from './commands/SetRotationCommand.js';
import { SetScaleCommand } from './commands/SetScaleCommand.js';

import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { SetValueCommand } from './commands/SetValueCommand.js';
import { SetGeometryCommand } from './commands/SetGeometryCommand.js';
import { SetMaterialColorCommand } from './commands/SetMaterialColorCommand.js';
// import { SetMaterialColorCommand } from './commands/SetMaterialColorCommand.js';
// const RoomEnvironment = window.RoomEnvironment;

function Viewport(editor, setDoubleClickedObject) {
  var signals = editor.signals;

  var container = new UIPanel();
  container.setId('viewport');
  container.setPosition('absolute');

  // container.add(new ViewportCamera(editor));
  container.add(new ViewportInfo(editor));

  //

  var renderer = null;
  var pmremGenerator = null;

  var camera = editor.camera;
  var scene = editor.scene;
  var sceneHelpers = editor.sceneHelpers;
  var showSceneHelpers = true;

  var pointLight = editor.pointLight;
  scene.add(pointLight);

  var objects = [];

  // helpers

  var grid = new THREE.Group();
  grid.visible = false;
  var grid1 = new THREE.GridHelper(30, 30, 0x888888);
  grid1.material.color.setHex(0x888888);
  grid1.material.vertexColors = false;
  grid.add(grid1);

  var grid2 = new THREE.GridHelper(30, 6, 0x222222);
  grid2.material.color.setHex(0x222222);
  grid2.material.depthFunc = THREE.AlwaysDepth;
  grid2.material.vertexColors = false;
  grid.add(grid2);
  var viewHelper = new ViewHelper(camera, container, editor);
  var vr = new VR(editor);
  var ar = new AR(editor);

  //

  var box = new THREE.Box3();

  var selectionBox = new THREE.BoxHelper();
  selectionBox.material.depthTest = false;
  selectionBox.material.transparent = true;
  selectionBox.visible = false;
  sceneHelpers.add(selectionBox);

  var objectPositionOnDown = null;
  var objectRotationOnDown = null;
  var objectScaleOnDown = null;

  var transformControls = new TransformControls(camera, container.dom);

  let getPcb;
  getPcb = function (obj) {
    if (obj?.name === 'Pcb') return obj;
    return obj.parent && getPcb(obj.parent);
  };

  transformControls.addEventListener('change', function () {
    var object = transformControls.object;

    if (object !== undefined) {
      selectionBox.setFromObject(object);

      var helper = editor.helpers[object.id];

      if (helper !== undefined && helper.isSkeletonHelper !== true) {
        helper.update();
      }
      signals.refreshSidebarObject3D.dispatch(object);
    }

    render();
  });

  transformControls.addEventListener('mouseDown', function () {
    var object = transformControls.object;

    objectPositionOnDown = object.position.clone();
    objectRotationOnDown = object.rotation.clone();
    objectScaleOnDown = object.scale.clone();

    if (!editor.cameraFreezed) controls.enabled = false;

    if (object.name === 'Package') {
      let pcb = getPcb(object);

      let connectionLines;

      if (pcb) {
        connectionLines = pcb.getObjectByName('ConnectionLines');
      } else {
        connectionLines = editor.scene.getObjectByName('ConnectionLines');
      }

      if (connectionLines)
        editor.execute(
          new SetValueCommand(editor, connectionLines, 'visible', false)
        );
    }

    if (
      ['Package', 'CopperThruHole', 'CopperBlindHole'].includes(object.name)
    ) {
      let pcb = getPcb(object);

      let layers;
      if (pcb) {
        layers = pcb.children.filter((e) => e.name.includes('Layer'));
      } else {
        layers = editor.scene.children.filter((e) => e.name.includes('Layer'));
      }

      layers.forEach((el) => {
        const copperLines = el.children.find((e) =>
          e.name.includes('CopperLines')
        );

        if (copperLines)
          editor.execute(
            new SetValueCommand(editor, copperLines, 'visible', false)
          );
      });
    }
  });

  transformControls.addEventListener('mouseUp', function () {
    var object = transformControls.object;

    if (object !== undefined) {
      switch (transformControls.getMode()) {
        case 'translate':
          if (!objectPositionOnDown.equals(object.position)) {
            editor.execute(
              new SetPositionCommand(
                editor,
                object,
                object.position,
                objectPositionOnDown
              )
            );
          }

          break;

        case 'rotate':
          if (!objectRotationOnDown.equals(object.rotation)) {
            editor.execute(
              new SetRotationCommand(
                editor,
                object,
                object.rotation,
                objectRotationOnDown
              )
            );
          }

          break;

        case 'scale':
          if (!objectScaleOnDown.equals(object.scale)) {
            editor.execute(
              new SetScaleCommand(
                editor,
                object,
                object.scale,
                objectScaleOnDown
              )
            );
          }

          break;
      }

      //copperLines
      if (
        ['Package', 'CopperThruHole', 'CopperBlindHole'].includes(object.name)
      ) {
        let pcb = getPcb(object);

        let layers;
        if (pcb) {
          layers = pcb.children.filter((e) => e.name.includes('Layer'));
        } else {
          layers = editor.scene.children.filter((e) =>
            e.name.includes('Layer')
          );
        }

        layers.forEach((el) => {
          const copperLines = el.getObjectByName('CopperLines');
          if (copperLines) {
            copperLines.children.forEach((e) => {
              let link = e.userData.link;
              let points = e.userData.points;
              let changed = false;

              if (link) {
                link.forEach((f, index) => {
                  let i = index === 0 ? 0 : points.length - 1;
                  if (f.packageId) {
                    if (f.packageId === object.uuid) {
                      changed = true;
                      let viewType = editor.scene.userData.viewType;
                      if (viewType) {
                        let packages =
                          viewType !== 'schematic'
                            ? object.getObjectByName('Package2d')
                            : object.getObjectByName('PackageSchematic');
                        if (packages) {
                          let legs = packages.getObjectByName('Legs');
                          if (legs) {
                            let leg = legs.children.find(
                              (k) => k.userData?.id === f.legId
                            );
                            if (leg) {
                              if (leg.type === 'Group') {
                                if (viewType !== 'schematic') {
                                  let copperCircle =
                                    leg.getObjectByName('CopperCircle');
                                  if (copperCircle) {
                                    points[i] =
                                      new THREE.Vector3().setFromMatrixPosition(
                                        copperCircle.matrixWorld
                                      );
                                  }
                                } else {
                                  let l = leg.getObjectByName('leg');
                                  if (l) {
                                    points[i] =
                                      new THREE.Vector3().setFromMatrixPosition(
                                        l.matrixWorld
                                      );
                                  }
                                }
                              } else {
                                points[i] =
                                  new THREE.Vector3().setFromMatrixPosition(
                                    leg.matrixWorld
                                  );
                              }
                            }
                          }
                        }
                      }
                    }
                  } else if (f.cth || f.cbh) {
                    if (object.uuid === f.cth || object.uuid === f.cbh) {
                      changed = true;
                      let point = new THREE.Vector3().copy(object.position);
                      point.z = points[i].z;
                      points[i] = point;
                    }
                  }

                  if (changed) {
                    const geometry = new THREE.BufferGeometry().setFromPoints(
                      points
                    );

                    geometry.computeBoundingSphere();
                    const center = new THREE.Vector3().copy(
                      geometry.boundingSphere.center
                    );
                    geometry.center();
                    center.z = center.z + 0.01;
                    editor.execute(new SetPositionCommand(editor, e, center));
                    editor.execute(
                      new SetValueCommand(editor, e, 'userData', {
                        ...e.userData,
                        points,
                      })
                    );
                    editor.execute(new SetGeometryCommand(editor, e, geometry));
                  }
                });
              }
            });
            editor.execute(
              new SetValueCommand(editor, copperLines, 'visible', true)
            );
          }
        });
      }

      //connectionLines
      if (object.name === 'Package') {
        let pcb = getPcb(object);
        let connectionLines;
        if (pcb) {
          connectionLines = pcb.getObjectByName('ConnectionLines');
        } else {
          connectionLines = editor.scene.getObjectByName('ConnectionLines');
        }
        if (connectionLines) {
          connectionLines.children.forEach((el) => {
            let link = el.userData.link;
            let points = el.userData.points;
            let changed = false;
            if (link) {
              link.forEach((f, index) => {
                let i = index === 0 ? 0 : points.length - 1;
                if (f.packageId === object.uuid) {
                  let viewType = editor.scene.userData.viewType;

                  let packages =
                    viewType !== 'schematic'
                      ? object.getObjectByName('Package2d')
                      : object;
                  changed = true;

                  if (packages) {
                    let legs = packages.getObjectByName('Legs');
                    if (legs) {
                      let leg = legs.children.find(
                        (k) => k.userData?.id === f.legId
                      );
                      if (leg) {
                        if (leg.type === 'Group') {
                          if (viewType !== 'schematic') {
                            let copperCircle =
                              leg.getObjectByName('CopperCircle');
                            if (copperCircle) {
                              points[i] =
                                new THREE.Vector3().setFromMatrixPosition(
                                  copperCircle.matrixWorld
                                );
                            }
                          } else {
                            let l = leg.getObjectByName('leg');
                            if (l) {
                              points[i] =
                                new THREE.Vector3().setFromMatrixPosition(
                                  l.matrixWorld
                                );
                            }
                          }
                        } else {
                          points[i] = new THREE.Vector3().setFromMatrixPosition(
                            leg.matrixWorld
                          );
                        }
                      }
                    }
                  }

                  if (changed) {
                    const geometry = new THREE.BufferGeometry().setFromPoints(
                      points
                    );

                    geometry.computeBoundingSphere();
                    const center = new THREE.Vector3().copy(
                      geometry.boundingSphere.center
                    );
                    geometry.center();
                    center.z = center.z + 0.01;
                    editor.execute(new SetPositionCommand(editor, el, center));
                    editor.execute(
                      new SetValueCommand(editor, el, 'userData', {
                        ...el.userData,
                        points,
                      })
                    );
                    editor.execute(
                      new SetGeometryCommand(editor, el, geometry)
                    );
                  }
                }
              });
            }
          });

          editor.execute(
            new SetValueCommand(editor, connectionLines, 'visible', true)
          );
        }
      }
    }

    if (!editor.cameraFreezed) controls.enabled = true;
  });

  function hideTransformControlsSides(mode, object) {
    transformControls.showX = true;
    transformControls.showY = true;
    transformControls.showZ = true;

    const str = object.userData?.hideTransformControls?.[mode];
    if (str) {
      str.split('').forEach((el) => {
        transformControls[`show${el.toUpperCase()}`] = false;
      });
    }
  }

  sceneHelpers.add(transformControls);

  // object picking

  var raycaster = new THREE.Raycaster();
  var mouse = new THREE.Vector2();

  // events

  function updateAspectRatio() {
    camera.aspect = container.dom.offsetWidth / container.dom.offsetHeight;
    camera.updateProjectionMatrix();
  }

  function getIntersects(point, objects) {
    mouse.set(point.x * 2 - 1, -(point.y * 2) + 1);

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(objects);

    if (intersects.length > 0) {
      if (intersects[0].object.userData.barrier) {
        return [];
      } else {
        return intersects.filter(
          (intersect) =>
            intersect.object.visible === true &&
            !intersect.object.userData?.unSelect
        );
      }
    } else {
      return [];
    }
  }

  var onDownPosition = new THREE.Vector2();
  var onUpPosition = new THREE.Vector2();
  var onDoubleClickPosition = new THREE.Vector2();
  var hoveredObject;

  function getMousePosition(dom, x, y) {
    var rect = dom.getBoundingClientRect();
    return [(x - rect.left) / rect.width, (y - rect.top) / rect.height];
  }

  function handleClick() {
    if (onDownPosition.distanceTo(onUpPosition) === 0) {
      var intersects = getIntersects(onUpPosition, objects);
      if (intersects.length > 0) {
        var object = intersects[0].object;

        if (object.userData.object !== undefined) {
          // helper

          editor.select(object.userData.object);
        } else {
          //recursive function to check if selectParent exists in any on of the object
          let selectParent;
          selectParent = function (obj) {
            if (obj?.userData?.selectParent) return obj;
            return obj.parent && selectParent(obj.parent);
          };

          let obj = selectParent(object);
          if (obj) {
            editor.select(obj);
          } else {
            editor.select(object);
          }
        }
      } else {
        editor.select(null);
      }

      render();
    }
  }

  function onMouseDown(event) {
    // event.preventDefault();
    if (editor.selectable) {
      var array = getMousePosition(container.dom, event.clientX, event.clientY);
      onDownPosition.fromArray(array);

      document.addEventListener('mouseup', onMouseUp, false);
    }
  }

  function onMouseUp(event) {
    var array = getMousePosition(container.dom, event.clientX, event.clientY);
    onUpPosition.fromArray(array);

    handleClick();

    document.removeEventListener('mouseup', onMouseUp, false);
  }

  function onTouchStart(event) {
    if (editor.selectable) {
      var touch = event.changedTouches[0];

      var array = getMousePosition(container.dom, touch.clientX, touch.clientY);
      onDownPosition.fromArray(array);

      document.addEventListener('touchend', onTouchEnd, false);
    }
  }

  function onTouchEnd(event) {
    var touch = event.changedTouches[0];

    var array = getMousePosition(container.dom, touch.clientX, touch.clientY);
    onUpPosition.fromArray(array);

    handleClick();

    document.removeEventListener('touchend', onTouchEnd, false);
  }

  function onDoubleClick(event) {
    if (editor.selectable) {
      var array = getMousePosition(container.dom, event.clientX, event.clientY);
      onDoubleClickPosition.fromArray(array);

      var intersects = getIntersects(onDoubleClickPosition, objects);

      if (intersects.length > 0) {
        var intersect = intersects[0];
        setDoubleClickedObject({
          object: intersect?.object,
          point: { x: event.clientX, y: event.clientY },
        });
        if (intersect?.object?.name !== 'Text')
          signals.objectFocused.dispatch(intersect?.object);
      }
    }
  }

  function onPointerMove(event) {
    var array = getMousePosition(container.dom, event.clientX, event.clientY);
    let point = new THREE.Vector2().fromArray(array);
    var intersects = getIntersects(point, objects);

    let intersect;
    if (intersects.length > 0) {
      let int = intersects.find(
        (e) =>
          e?.object?.userData?.hoverEffect ||
          e?.object?.parent?.userData?.hoverEffect
      );
      if (int) {
        let hover;
        hover = function (obj) {
          if (obj?.userData?.hoverEffect) return obj;
          return obj.parent && hover(obj.parent);
        };

        let obj = hover(int.object);
        if (obj) {
          intersect = obj;
        }
      }
    }
    if (intersect) {
      if (!hoveredObject) {
        hoveredObject = intersect;

        intersect.traverse((child) => {
          if (child.material) {
            editor.execute(
              new SetMaterialColorCommand(
                editor,
                child,
                'emissive',
                // '16714192',
                '11111111',
                0
              )
            );
          }
        });
      }
    } else {
      if (hoveredObject) {
        hoveredObject.traverse((child) => {
          if (child.material) {
            editor.execute(
              new SetMaterialColorCommand(editor, child, 'emissive', '0', 0)
            );
            // );
          }
        });
        hoveredObject = undefined;
      }
    }
  }

  container.dom.addEventListener('mousedown', onMouseDown, false);
  container.dom.addEventListener('touchstart', onTouchStart, false);
  container.dom.addEventListener('dblclick', onDoubleClick, false);
  container.dom.addEventListener('pointermove', onPointerMove, false);

  // controls need to be added *after* main logic,
  // otherwise controls.enabled doesn't work.

  var controls = new EditorControls(camera, container.dom);
  controls.addEventListener('change', function () {
    signals.cameraChanged.dispatch(camera);
    signals.refreshSidebarObject3D.dispatch(camera);
  });
  viewHelper.controls = controls;

  // signals

  signals.editorCleared.add(function () {
    controls.center.set(0, 0, 0);
    render();
  });

  signals.transformModeChanged.add(function (mode) {
    if (transformControls.object) {
      hideTransformControlsSides(mode, transformControls.object);
    }

    transformControls.setMode(mode);
  });

  signals.snapChanged.add(function (dist) {
    transformControls.setTranslationSnap(dist);
  });

  signals.spaceChanged.add(function (space) {
    transformControls.setSpace(space);
  });

  signals.rendererUpdated.add(function () {
    scene.traverse(function (child) {
      if (child.material !== undefined) {
        child.material.needsUpdate = true;
      }
    });

    render();
  });

  signals.rendererCreated.add(function (newRenderer) {
    if (renderer !== null) {
      renderer.setAnimationLoop(null);
      renderer.dispose();
      pmremGenerator.dispose();

      container.dom.removeChild(renderer.domElement);
    }

    renderer = newRenderer;

    renderer.setAnimationLoop(animate);
    renderer.setClearColor(0xaaaaaa);

    if (window.matchMedia) {
      var mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addListener(function (event) {
        renderer.setClearColor(event.matches ? 0x333333 : 0xaaaaaa);
        updateGridColors(
          grid1,
          grid2,
          event.matches ? [0x222222, 0x888888] : [0x888888, 0x282828]
        );

        render();
      });

      renderer.setClearColor(mediaQuery.matches ? 0x333333 : 0xaaaaaa);
      updateGridColors(
        grid1,
        grid2,
        mediaQuery.matches ? [0x222222, 0x888888] : [0x888888, 0x282828]
      );
    }

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(container.dom.offsetWidth, container.dom.offsetHeight);

    pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();

    container.dom.appendChild(renderer.domElement);

    render();
  });

  signals.sceneGraphChanged.add(function () {
    render();
  });

  signals.cameraChanged.add(function () {
    render();
  });

  signals.objectSelected.add(function (object) {
    selectionBox.visible = false;
    transformControls.detach();

    if (object !== null && object !== scene && object !== camera) {
      box.setFromObject(object);

      if (box.isEmpty() === false) {
        selectionBox.setFromObject(object);
        selectionBox.visible = true;
      }

      hideTransformControlsSides(transformControls.getMode(), object);

      transformControls.attach(object);
    }

    render();
  });

  signals.objectFocused.add(function (object) {
    controls.focus(object);
  });

  signals.geometryChanged.add(function (object) {
    if (object !== undefined) {
      selectionBox.setFromObject(object);
    }

    render();
  });

  signals.objectAdded.add(function (object) {
    if (object.traverse)
      object.traverse(function (child) {
        objects.push(child);
      });
  });

  signals.objectChanged.add(function (object) {
    if (editor.selected === object) {
      selectionBox.setFromObject(object);
    }

    if (object.isPerspectiveCamera) {
      object.updateProjectionMatrix();
    }

    if (editor.helpers[object.id] !== undefined) {
      editor.helpers[object.id].update();
    }

    render();
  });

  signals.objectRemoved.add(function (object) {
    if (!editor.cameraFreezed) controls.enabled = true; // see #14180
    if (object === transformControls.object) {
      transformControls.detach();
    }

    object.traverse(function (child) {
      objects.splice(objects.indexOf(child), 1);
    });
  });

  signals.helperAdded.add(function (object) {
    var picker = object.getObjectByName('picker');

    if (picker !== undefined) {
      objects.push(picker);
    }
  });

  signals.helperRemoved.add(function (object) {
    var picker = object.getObjectByName('picker');

    if (picker !== undefined) {
      objects.splice(objects.indexOf(picker), 1);
    }
  });

  signals.materialChanged.add(function () {
    render();
  });

  signals.animationStopped.add(function () {
    render();
  });

  // background

  signals.sceneBackgroundChanged.add(function (
    backgroundType,
    backgroundColor,
    backgroundTexture,
    backgroundEquirectangularTexture
  ) {
    switch (backgroundType) {
      case 'None':
        scene.background = null;

        break;

      case 'Color':
        scene.background = new THREE.Color(backgroundColor);

        break;

      case 'Texture':
        if (backgroundTexture) {
          scene.background = backgroundTexture;
        }

        break;

      case 'Equirectangular':
        if (backgroundEquirectangularTexture) {
          backgroundEquirectangularTexture.mapping =
            THREE.EquirectangularReflectionMapping;
          scene.background = backgroundEquirectangularTexture;
        }

        break;
    }

    render();
  });

  // environment

  signals.sceneEnvironmentChanged.add(function (
    environmentType,
    environmentEquirectangularTexture
  ) {
    switch (environmentType) {
      case 'None':
        scene.environment = null;

        break;

      case 'Equirectangular':
        scene.environment = null;

        if (environmentEquirectangularTexture) {
          environmentEquirectangularTexture.mapping =
            THREE.EquirectangularReflectionMapping;
          scene.environment = environmentEquirectangularTexture;
        }

        break;

      case 'ModelViewer':
        scene.environment = pmremGenerator.fromScene(
          new RoomEnvironment(),
          0.04
        ).texture;

        break;
    }

    render();
  });

  // fog

  signals.sceneFogChanged.add(function (
    fogType,
    fogColor,
    fogNear,
    fogFar,
    fogDensity
  ) {
    switch (fogType) {
      case 'None':
        scene.fog = null;
        break;
      case 'Fog':
        scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);
        break;
      case 'FogExp2':
        scene.fog = new THREE.FogExp2(fogColor, fogDensity);
        break;
    }

    render();
  });

  signals.sceneFogSettingsChanged.add(function (
    fogType,
    fogColor,
    fogNear,
    fogFar,
    fogDensity
  ) {
    switch (fogType) {
      case 'Fog':
        scene.fog.color.setHex(fogColor);
        scene.fog.near = fogNear;
        scene.fog.far = fogFar;
        break;
      case 'FogExp2':
        scene.fog.color.setHex(fogColor);
        scene.fog.density = fogDensity;
        break;
    }

    render();
  });

  signals.viewportCameraChanged.add(function () {
    var viewportCamera = editor.viewportCamera;

    if (viewportCamera.isPerspectiveCamera) {
      viewportCamera.aspect = editor.camera.aspect;
      viewportCamera.projectionMatrix.copy(editor.camera.projectionMatrix);
    } else if (viewportCamera.isOrthographicCamera) {
      // TODO
    }

    // disable EditorControls when setting a user camera

    controls.enabled = viewportCamera === editor.camera;

    render();
  });

  signals.exitedVR.add(render);
  signals.exitedAR.add(render);

  //

  signals.windowResize.add(function () {
    updateAspectRatio();

    renderer.setSize(container.dom.offsetWidth, container.dom.offsetHeight);

    render();
  });

  signals.showGridChanged.add(function (showGrid) {
    grid.visible = showGrid;
    render();
  });

  signals.showHelpersChanged.add(function (showHelpers) {
    showSceneHelpers = showHelpers;
    transformControls.enabled = showHelpers;

    render();
  });

  signals.freezeCamera.add(function () {
    controls.enabled = false;
    editor.cameraFreezed = true;
  });
  signals.unFreezeCamera.add(function () {
    controls.enabled = true;
    editor.cameraFreezed = false;
  });

  signals.reRender.add(function () {
    render();
  });

  signals.getsnapshot.add(function () {
    editor.snapshot = renderer.domElement.toDataURL('image/jpeg');
  });

  signals.setCameraByAngle.add(function (rotation) {
    let center = new THREE.Vector3();
    let vector = new THREE.Vector3();
    vector.z = rotation.z;

    var spherical = new THREE.Spherical();
    spherical.setFromVector3(vector);
    spherical.theta += rotation.x * THREE.MathUtils.DEG2RAD;
    spherical.phi += rotation.y * THREE.MathUtils.DEG2RAD;
    spherical.makeSafe();
    vector.setFromSpherical(spherical);

    camera.position.copy(center).add(vector);
    camera.lookAt(center);

    signals.cameraChanged.dispatch(camera);
    signals.refreshSidebarObject3D.dispatch(camera);
  });

  signals.transparentBackground.add(function () {
    renderer.setClearColor(0xffffff, 0);
  });

  signals.cameraResetted.add(updateAspectRatio);

  // animations

  var clock = new THREE.Clock(); // only used for animations

  function animate() {
    var mixer = editor.mixer;
    var delta = clock.getDelta();

    var needsUpdate = false;

    if (mixer.stats.actions.inUse > 0) {
      mixer.update(delta);
      needsUpdate = true;
    }

    if (viewHelper.animating === true) {
      viewHelper.update(delta);
      needsUpdate = true;
    }

    if (vr.currentSession !== null || ar.currentSession !== null) {
      needsUpdate = true;
    }

    if (needsUpdate === true) render();
  }

  //

  var startTime = 0;
  var endTime = 0;

  function render() {
    startTime = performance.now();
    pointLight.position.copy(editor.viewportCamera.position);
    // renderer.setClearColor(0xffffff, 0);

    // Adding/removing grid to scene so materials with depthWrite false
    // don't render under the grid.
    scene.add(grid);

    // if (lines)
    //   lines.traverse((el) => {
    //     if (el.material?.type === 'LineMaterial') {
    //       console.log(1);
    //       el?.material?.resolution.set(window.innerHeight, window.innerHeight);
    //     }
    //   });
    renderer.setViewport(
      0,
      0,
      container.dom.offsetWidth,
      container.dom.offsetHeight
    );

    let line = editor.scene.getObjectByName('line');

    if (line) {
      line.material.resolution.set(
        container.dom.offsetWidth,
        container.dom.offsetHeight
      );
    }

    renderer.render(scene, editor.viewportCamera);
    scene.remove(grid);

    if (camera === editor.viewportCamera) {
      renderer.autoClear = false;
      if (showSceneHelpers === true) renderer.render(sceneHelpers, camera);
      if (vr.currentSession === null && ar.currentSession === null)
        viewHelper.render(renderer);
      renderer.autoClear = true;
    }

    endTime = performance.now();
    editor.signals.sceneRendered.dispatch(endTime - startTime);
  }

  return container;
}

function updateGridColors(grid1, grid2, colors) {
  grid1.material.color.setHex(colors[0]);
  grid2.material.color.setHex(colors[1]);
}

export { Viewport };
