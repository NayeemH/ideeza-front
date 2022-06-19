import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { AddObjectCommand } from '../../js/commands/AddObjectCommand';
import { MoveObjectCommand } from '../../js/commands/MoveObjectCommand';
import { SetGeometryCommand } from '../../js/commands/SetGeometryCommand';
import { SetValueCommand } from '../../js/commands/SetValueCommand';
import { SetMaterialValueCommand } from '../../js/commands/SetMaterialValueCommand';
import { RemoveObjectCommand } from '@organisms/threejs/js/commands/RemoveObjectCommand';
import { SetRotationCommand } from '@organisms/threejs/js/commands/SetRotationCommand';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import C2S from 'canvas2svg';

export const pcbScale = new THREE.Vector3(8, 5, 0.2);
export const copperThickness = 0.01;
export const silkThickness = 0.001;

//2dPlane
let plane2dRaycaster = new THREE.Raycaster();
let plane2dMouse = new THREE.Vector2();

export function create2dPlane(editor, positionZ) {
  // freezing camera
  editor.signals.freezeCamera.dispatch();

  // disabling selecting objects
  editor.cannotSelect();

  // creating invisible 2d plane and adding it in scene
  var geometry = new THREE.PlaneGeometry(10000000000, 10000000000);

  let material = new THREE.MeshStandardMaterial();
  material.transparent = true; // opacity only work if transparent = true
  material.opacity = 0;

  let plane = new THREE.Mesh(geometry, material);
  plane.name = 'plane2d';
  plane.rotation.copy(editor.camera.rotation.clone());
  plane.updateMatrixWorld(true);
  plane.rotation.copy(editor.camera.rotation);

  if (positionZ) {
    plane.position.z = positionZ;
  }

  editor.addObject(plane);
  editor.deselect(); //removing all selected objects
  return plane;
}

export function getCoordinatesFromPlane(
  editor,
  clientX,
  clientY,
  object,
  checkPlanes
) {
  if (object) {
    const dom = editor.container.querySelector('#viewport');
    var rect = dom.getBoundingClientRect();
    var array = [
      (clientX - rect.left) / rect.width,
      (clientY - rect.top) / rect.height,
    ];
    plane2dMouse.fromArray(array);
    plane2dMouse.set(plane2dMouse.x * 2 - 1, -(plane2dMouse.y * 2) + 1);

    // setting raycaster
    plane2dRaycaster.setFromCamera(plane2dMouse, editor.camera);
    object = Array.isArray(object) ? object : [object];
    // getting 3d points of user clicked in polygonBackground
    let intersects = plane2dRaycaster.intersectObjects(object);
    if (intersects[0]) {
      if (checkPlanes) {
        let checkPlane;
        checkPlane = function (obj) {
          if (checkPlanes.includes(obj?.name)) return obj;
          return obj.parent && checkPlane(obj.parent);
        };

        let objName = checkPlane(intersects[0].object);
        if (objName) {
          let point = new THREE.Vector3().setFromMatrixPosition(
            intersects[0].object.matrixWorld
          );
          return {
            object: intersects[0].object,
            point,
            clickedPoint: intersects[0].point,
          };
        }
      }
      return intersects[0].point;
    } else {
      return null;
    }
  } else {
    console.error('object undefined');
    return null;
  }
}

export function destroy2dPlane(editor, plane2d) {
  editor.removeObject(plane2d);
  plane2d = undefined;
  plane2dRaycaster = new THREE.Raycaster();
  plane2dMouse = new THREE.Vector2();

  editor.signals.unFreezeCamera.dispatch();
  editor.canSelect();
}

export function text(editor, type, color = 0xffffff) {
  editor.signals.freezeCamera.dispatch(); // freezing camera
  editor.cannotSelect(); // disabling selecting objects

  let plane, parent, plane2d;

  if (type === 'pcbDesign') {
    parent = editor.scene.getObjectByName('Layer1');
    if (parent) plane = parent.getObjectByName('Core');
  } else if (type === 'pcbSchematic') {
    plane2d = create2dPlane(editor);
    plane = [plane2d];
    let packages = editor.scene.getObjectByName('Packages');
    if (packages)
      packages.children.forEach((el) => {
        let body = el.getObjectByName('Body');
        if (body) plane.push(body);
      });
    parent = editor.scene;
  } else if (type === 'package') {
    plane2d = create2dPlane(editor);
    plane = [plane2d];
    let packages = editor.scene.getObjectByName('Package');
    if (packages) {
      parent = packages;
      let body = packages.getObjectByName('Body');
      if (body) plane.push(body);
    }
  } else {
    create2dPlane(editor);
    plane = plane2d;
    parent = editor.scene;
  }

  if (!parent || !plane) return;
  let point;

  const dom = editor.container.querySelector('#viewport');
  dom.addEventListener('pointerdown', onPointerDown, false);
  let input, value;

  function onPointerDown(e) {
    point = getCoordinatesFromPlane(editor, e.clientX, e.clientY, plane);

    if (point) {
      input = document.createElement('input');
      input.type = 'text';
      input.className = 'css-class-name';
      input.style.position = 'absolute';
      input.style.top = `${e.clientY}px`;
      input.style.left = `${e.clientX}px`;
      input.style.zIndex = 9999999999;
      input.addEventListener('blur', exit);
      document.body.appendChild(input);
      // input.focus();

      document.addEventListener('keydown', onEnter, false);
      dom.removeEventListener('pointerdown', onPointerDown, false);
    }
  }

  function onEnter(e) {
    if (e.code === 'Enter') {
      exit();
      document.removeEventListener('keydown', onEnter, false);
    }
  }

  function exit() {
    if (input) {
      value = input.value;
      input.removeEventListener('blur', exit);
      document.body.removeChild(input);
    }
    input = undefined;

    const loader = new FontLoader();
    loader.load('/font/helvetiker_regular.typeface.json', (font) => {
      var textShapes = font.generateShapes(`${value}`, 0.25);

      var textGeometry = new THREE.ExtrudeBufferGeometry(textShapes, {
        bevelEnabled: false,
      });
      var textMaterial = new THREE.MeshPhongMaterial({
        color: color,
        side: THREE.DoubleSide,
      });

      let text = new THREE.Mesh(textGeometry, textMaterial);

      textGeometry.center();
      // text.rotation.copy(camera.rotation);
      text.scale.z = silkThickness;
      point.z = point.z + text.scale.z;
      text.position.copy(point);

      text.name = 'Text';
      text.userData = {
        ...text.userData,
        value,
        hideTransformControls: {
          translate: 'z',
          rotate: 'xy',
          scale: 'z',
        },
      };
      groupObjects(editor, parent, 'Texts', text);
    });

    if (plane2d) destroy2dPlane(editor, plane2d);
    editor.signals.unFreezeCamera.dispatch();
    editor.canSelect();
  }
}

export function showLayers(editor, layerCount = 1, checkPackage = true) {
  editor.select(null);
  const layer1 = editor.scene.children.find((el) => el.name === 'Layer1');
  const layers = editor.scene.children.filter((el) =>
    el.name.includes('Layer')
  );
  let layer = layers[layerCount - 1];

  let viewType = editor.scene.userData?.viewType;
  if (viewType === '3d') {
    if (layerCount !== 1) {
      layers.forEach((el) => {
        editor.execute(
          new SetValueCommand(editor, el, 'visible', el.name === layer.name)
        );
      });
    } else {
      layers.forEach((el) => {
        editor.execute(new SetValueCommand(editor, el, 'visible', true));
      });
    }
  } else if (viewType === '2d' || viewType === 'schematic') {
    layers.forEach((el) => {
      let copperLines = el.children.find((e) => e.name === 'CopperLines');
      if (copperLines) {
        copperLines.children.forEach((e) => {
          editor.execute(
            new SetMaterialValueCommand(
              editor,
              e,
              'transparent',
              el.name !== layer.name
            )
          );
          editor.execute(
            new SetMaterialValueCommand(
              editor,
              e,
              'opacity',
              el.name === layer.name ? 1 : 0.3
            )
          );
        });
      }
    });
  }

  const cth = editor.scene.children.find((e) => e.name === 'CopperThruHoles');
  const cbh = editor.scene.children.find((e) => e.name === 'CopperBlindHoles');
  if (cth) {
    hideHoles(
      editor,
      layerCount,
      cth.children,
      (el) => {
        let copperCircle = el.children.filter((e) => e.name === 'CopperCircle');
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
  }
  if (cbh) {
    hideHoles(
      editor,
      layerCount,
      cbh.children,
      (el) => {
        let copperCircle = el.children.filter((e) => e.name === 'CopperCircle');
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
  }

  const packages = layer1.children.find((e) => e.name === 'Packages');
  if (packages && checkPackage) {
    packages.children.forEach((el) => {
      const packageTwod = el.children.find((e) => e.name === 'Package2d');
      const packageThreed = el.children.find((e) => e.name === 'Package3d');

      if (packageTwod) {
        const legs = packageTwod.children.find((e) => e.name === 'Legs');
        if (legs) {
          if (legs.children[0].type === 'Group') {
            hideHoles(
              editor,
              layerCount,
              legs.children,
              (el) => {
                let copperCircle = el.children.filter(
                  (e) => e.name === 'CopperCircle'
                );

                function showCircle(l, i) {
                  editor.execute(
                    new SetValueCommand(
                      editor,
                      copperCircle[i],
                      'visible',
                      l === layerCount
                    )
                  );
                }
                showCircle(1, 0);
                showCircle(layers.length, 1);
              },
              () => {
                return true;
              }
            );
          }
        }
      }
      if (packageThreed) {
        editor.execute(
          new SetValueCommand(
            editor,
            packageThreed,
            'visible',
            viewType === '3d'
          )
        );
      }
      if (packageTwod) {
        editor.execute(
          new SetValueCommand(
            editor,
            packageTwod,
            'visible',
            viewType !== 'schematic'
          )
        );
      }
    });
  }

  // update count in layer1 userdata
  editor.execute(
    new SetValueCommand(editor, layer1, 'userData', {
      ...layer1.userData,
      currentLayer: layerCount,
    })
  );
}

export function groupObjects(editor, parent, name, obj) {
  let group = parent.children.find((e) => e.name === name);
  if (!group) {
    const group = new THREE.Group();
    group.name = name;
    group.add(obj);
    editor.addObject(group);
    if (parent === editor.scene) {
      editor.execute(new AddObjectCommand(editor, group));
    } else {
      editor.execute(
        new MoveObjectCommand(editor, group, parent, editor.scene)
      );
    }
  } else {
    editor.addObject(obj);
    editor.execute(new MoveObjectCommand(editor, obj, group, editor.scene));
  }
  editor.select(obj);
}

export function drawCylinder(name, color, scale, positionz) {
  var cylinder = new THREE.Mesh(
    new THREE.CylinderGeometry(1, 1, 1, 60, 1, false, 0, Math.PI * 2),
    new THREE.MeshPhongMaterial({
      color,
    })
  );
  cylinder.name = name;

  cylinder.scale.copy(scale);
  cylinder.position.z = positionz;
  cylinder.rotation.x = 90 * THREE.MathUtils.DEG2RAD;

  return cylinder;
}

export function drawLine(
  editor,
  name,
  color,
  max,
  plane,
  checkplanes,
  checkParents,
  onExit,
  group,
  userData
) {
  // freezing camera
  editor.signals.freezeCamera.dispatch();

  // disabling selecting objects
  editor.cannotSelect();

  let points = [];
  // drawing lines with this fiddle https://jsfiddle.net/wilt/a21ey9y6/
  let count = 0;

  let lineGeometry = new THREE.BufferGeometry();
  let positions = new Float32Array((max + 1) * 3);
  lineGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  );

  let line = new THREE.Line(
    lineGeometry,
    new THREE.LineBasicMaterial({
      color,
      linewidth: 2, //doesn't work for some reason
    })
  );
  line.name = name;
  line.position.z = line.position.z + 0.01;

  line.userData = userData
    ? { ...line.userData, ...userData }
    : { ...line.userData };
  if (!group) {
    editor.execute(new AddObjectCommand(editor, line));
  } else {
    groupObjects(editor, group.parent, group.name, line);
  }

  let userDataArray = [];
  // creating new event listner on viewport
  const dom = editor.container.querySelector('#viewport');
  dom.addEventListener('pointerdown', onPointerDown, false);
  dom.addEventListener('pointermove', onPointerMove, false);
  document.addEventListener('keydown', onEnter, false);

  const updateLine = (point) => {
    positions[count * 3 - 3] = point.x;
    positions[count * 3 - 2] = point.y;
    positions[count * 3 - 1] = point.z;
    line.geometry.attributes.position.needsUpdate = true;
  };

  function onPointerDown(e) {
    let data = checkplanes
      ? getCoordinatesFromPlane(
        editor,
        e.clientX,
        e.clientY,
        plane,
        checkplanes
      )
      : getCoordinatesFromPlane(editor, e.clientX, e.clientY, plane);
    let point = data?.object ? data.point : data;

    // updating line and adding points
    const addPoint = () => {
      positions[count * 3 + 0] = point.x;
      positions[count * 3 + 1] = point.y;
      positions[count * 3 + 2] = point.z;
      count++;
      line.geometry.setDrawRange(0, count);
      updateLine(point);
    };

    if (point) {
      // on first click add an extra point
      if (count === 0) {
        addPoint();
      }
      addPoint();

      points.push(point);

      if (data?.object) {
        if (userDataArray.length <= 2) {
          // let selectParent;
          // selectParent = function (obj) {
          //   if (obj?.userData?.selectParent) return obj;
          //   return obj.parent && selectParent(obj.parent);
          // };
          let userDataObj = {};
          Object.keys(checkParents).forEach((e) => {
            if (checkParents[e] === 'Legs') {
              let checkParent;
              checkParent = function (obj) {
                if (obj?.parent?.name === 'Legs') return obj?.userData?.id;
                return obj.parent && checkParent(obj.parent);
              };

              let objId = checkParent(data.object);
              if (objId) {
                userDataObj[e] = objId;
              }
            } else {
              let checkParent;
              checkParent = function (obj) {
                if (obj.name === checkParents[e]) return obj.uuid;
                return obj.parent && checkParent(obj.parent);
              };
              let uuid = checkParent(data.object);
              if (uuid) {
                userDataObj[e] = uuid;
              }
            }
          });
          userDataArray.push(userDataObj);

          if (userDataArray.length === 2) {
            exit();
            return;
          }
        }
      }
      if (count === max + 1) {
        exit();
        return;
      }
    }

    editor.signals.reRender.dispatch();
  }

  function onPointerMove(e) {
    let point = getCoordinatesFromPlane(editor, e.clientX, e.clientY, plane);

    if (point) {
      //updating line
      if (count !== 0) {
        updateLine(point);
      }

      editor.signals.reRender.dispatch();
    }
  }

  function onEnter(e) {
    if (e.code === 'Enter') {
      exit();
    } else if (e.code === 'Escape') {
      exit();
    }
  }

  function exit() {
    dom.removeEventListener('pointerdown', onPointerDown, false);
    dom.removeEventListener('pointermove', onPointerMove, false);
    document.removeEventListener('keydown', onEnter, false);

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    geometry.computeBoundingSphere();
    const center = new THREE.Vector3().copy(geometry.boundingSphere.center);
    geometry.center();
    center.z = center.z + 0.01;
    line.position.copy(center);
    line.userData = { ...line.userData, points };
    editor.execute(new SetGeometryCommand(editor, line, geometry));

    if (userDataArray.length >= 1) {
      line.userData = { ...line.userData, link: userDataArray };
    }

    if (onExit) {
      onExit(line);
    }

    editor.signals.reRender.dispatch();
    editor.signals.unFreezeCamera.dispatch();
    editor.canSelect();
    setTimeout(() => {
      editor.select(null);
    }, 70);
  }
}

export async function load(json) {
  function IsJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  if (IsJsonString(json)) json = JSON.parse(json);

  if (!json || !json.object) return;
  const loader = new THREE.ObjectLoader();

  if (json?.geometries) {
    // changing edgeGeometry to its child geometry (ObjectLoader doesn't support EdgesGeometry)
    json.geometries.forEach((el, i) => {
      if (el.type === 'EdgesGeometry') {
        let geometry = { ...el.geometry, uuid: el.uuid };
        delete geometry.metadata;
        json.geometries[i] = geometry;
      }
    });
  }
  let object = await loader.parseAsync(json);

  // if(!object) return null;

  if (object.type === 'Scene') {
    let packages = new THREE.Group();
    packages.name = object.userData?.name ? object.userData?.name : 'Group';
    packages.position.copy(object.position);
    packages.rotation.copy(object.rotation);
    packages.scale.copy(object.scale);
    packages.userData = object.userData;
    let arr = [...object.children];
    arr.forEach((e) => {
      if (e.name !== 'DefaultPointLight') {
        packages.add(e);
      }
    });
    object = packages;
  }

  object.uuid = THREE.MathUtils.generateUUID();

  //Drawing EdgesGeometry
  let body = object.getObjectByName('Body');
  if (body) {
    if (body.type === 'LineSegments') {
      body.rotation.copy(new THREE.Euler(0, 0, 0));
      body.geometry = new THREE.EdgesGeometry(body.geometry);
    }
  }

  //fixing for text bevel increases and geometry position changes on its on
  let texts = object.getObjectByName('Texts');
  if (texts)
    texts.traverse((el) => {
      if (el.name === 'Text' && el?.userData?.value) {
        const loader = new FontLoader();
        loader.load('/font/helvetiker_regular.typeface.json', (font) => {
          var textShapes = font.generateShapes(el?.userData?.value, 0.25);

          var textGeometry = new THREE.ExtrudeBufferGeometry(textShapes, {
            bevelEnabled: false,
          });

          textGeometry.center();
          el.geometry = textGeometry;
        });
      }
    });

  return object;
}

export function hideHoles(editor, layerCount, holes, copperCircleCB, showHole) {
  let layer;
  if (layerCount > 1) {
    const layers = editor.scene.children.filter((el) =>
      el.name.includes('Layer')
    );
    layer = layers[layerCount - 1];
  } else {
    layer = editor.scene.children.find((e) => e.name === 'Layer1');
  }

  let core = layer.children.find((e) => e.name === 'Core');

  let viewType = editor.scene.userData?.viewType;

  if (holes) {
    if (layerCount > 1 || viewType !== '3d') {
      holes.forEach((el) => {
        let holeCylinder = el.children.find((e) => e.name === 'HoleCylinder');
        let copperCylinder = el.children.find(
          (e) => e.name === 'CopperCylinder'
        );
        if (holeCylinder) {
          editor.execute(
            new SetValueCommand(editor, holeCylinder, 'visible', false)
          );
        }

        editor.execute(
          new SetValueCommand(editor, copperCylinder, 'visible', false)
        );

        copperCircleCB(el);

        //create temp hole

        let hole = el.children.find((e) => e.name === 'TempHoleCylinder');
        if (hole) {
          editor.execute(new RemoveObjectCommand(editor, hole));
        }
        if (showHole(el)) {
          if (holeCylinder) {
            let obj = drawCylinder(
              'TempHoleCylinder',
              0x000000,
              new THREE.Vector3(
                holeCylinder.scale.x,
                core.scale.z + 0.02 * 2,
                holeCylinder.scale.z
              ),
              core.position.z
            );
            editor.addObject(obj);
            editor.execute(
              new MoveObjectCommand(editor, obj, el, editor.scene)
            );
          }
        }
      });
    } else {
      holes.forEach((el) => {
        let hole = el.children.find((e) => e.name === 'TempHoleCylinder');
        if (hole) {
          editor.execute(new RemoveObjectCommand(editor, hole));
        }
        el.children.forEach((e) => {
          editor.execute(new SetValueCommand(editor, e, 'visible', true));
        });
      });
    }
  }
}

export function hideObjects(editor, names, visible) {
  if (!names || visible === undefined) return;
  editor.select(null);
  names = Array.isArray(names) ? names : [names];

  names.forEach((el) => {
    const object = editor.scene.getObjectByName(el);

    if (object)
      editor.execute(new SetValueCommand(editor, object, 'visible', visible));
  });
}

export function deleteObject(editor, obj) {
  if (!obj) return;

  const object = editor.scene.getObjectByProperty('uuid', obj.uuid);

  if (object) editor.execute(new RemoveObjectCommand(editor, object));
}

export function lenpoint(point1, point2, length) {
  var dx = point2.x - point1.x;
  var dy = point2.y - point1.y;
  var distance = Math.sqrt(dx * dx + dy * dy);
  if (distance == 0) return { x: point1.x, y: point1.y };

  var rx = point1.x + ((point2.x - point1.x) * length) / distance;
  var ry = point1.y + ((point2.y - point1.y) * length) / distance;
  return { x: rx, y: ry };
}

export async function renderAnimation(
  editor,
  object,
  setVideo,
  setSnapshot,
  setFile
) {
  if (!object) return;
  editor.clear();
  editor.signals.setCameraByAngle.dispatch(new THREE.Vector3(-45, 0, 10));

  let light = object.getObjectByName('DefaultPointLight');
  if (light) editor.removeObject(light);

  editor.addObject(object);

  if (setSnapshot) {
    editor.signals.getsnapshot.dispatch();
    if (setSnapshot) setSnapshot(editor.snapshot);
    editor.snapshot = null;
  }

  if (setFile !== undefined) {
    var exporter = new GLTFExporter();
    exporter.parse(object, function (result) {
      const file = new File([JSON.stringify(result, null, 2)], 'product.gltf', {
        type: 'text/plain',
      });
      setFile(file);
    });
  }

  const canvas = editor.container.querySelector('#viewport canvas');

  let videoStream = canvas.captureStream(0);
  let mediaRecorder = new MediaRecorder(videoStream);
  var chunks = [];
  mediaRecorder.ondataavailable = function (e) {
    chunks.push(e.data);
  };
  mediaRecorder.onstop = function () {
    let blob = new Blob(chunks, { type: 'video/mp4' }); // other types are available such as 'video/webm' for instance, see the doc for more info
    // let url = URL.createObjectURL(blob);
    // console.log(url);
    let data = new File([blob], 'video', { type: 'video/mp4' });
    if (setVideo) setVideo(data);
    chunks = [];
    editor.clear();
  };

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  let speed = 3;
  let rotation = 0;
  async function animate() {
    rotation += speed;
    editor.execute(
      new SetRotationCommand(
        editor,
        object,
        new THREE.Euler(0, rotation * THREE.MathUtils.DEG2RAD, 0)
      )
    );

    if (videoStream.requestFrame) {
      videoStream.requestFrame();
    } else {
      await timeout(10);
      videoStream.getVideoTracks()[0].requestFrame();
    }

    if (rotation < 360) {
      return new Promise((resolve) => {
        requestAnimationFrame(resolve);
      }).then(animate);
    } else {
      editor.execute(
        new SetRotationCommand(
          editor,
          object,
          new THREE.Euler(0, 360 * THREE.MathUtils.DEG2RAD, 0)
        )
      );

      if (videoStream.requestFrame) {
        videoStream.requestFrame();
      } else {
        await timeout(10);
        videoStream.getVideoTracks()[0].requestFrame();
      }

      return Promise.resolve();
    }
  }

  mediaRecorder.start();
  await animate();
  if (!videoStream.requestFrame) await timeout(2000);
  mediaRecorder.stop();
}

export function changeAnimationSpeed(editor, animationSpeed) {
  animationSpeed = Number(animationSpeed);
  if (animationSpeed) {
    editor.execute(
      new SetValueCommand(editor, editor.scene, 'userData', {
        ...editor.scene.userData,
        animationSpeed,
      })
    );
  }
}

export function changeText(editor, { object, point }) {
  if (!object || !point) return;
  editor.execute(new SetValueCommand(editor, object, 'visible', false));
  editor.select(null);
  let input, value;

  input = document.createElement('input');
  input.type = 'text';
  input.className = 'css-class-name';
  input.style.position = 'absolute';
  input.style.top = `${point.y}px`;
  input.style.left = `${point.x}px`;
  input.style.zIndex = 9999999999;
  input.addEventListener('blur', exit);
  document.body.appendChild(input);
  // input.focus();

  document.addEventListener('keydown', onEnter, false);

  function onEnter(e) {
    if (e.code === 'Enter') {
      exit();
      document.removeEventListener('keydown', onEnter, false);
    }
  }

  function exit() {
    if (input) {
      value = input.value;
      input.removeEventListener('blur', exit);
      document.body.removeChild(input);
    }
    input = undefined;

    const loader = new FontLoader();
    loader.load('/font/helvetiker_regular.typeface.json', (font) => {
      var textShapes = font.generateShapes(`${value}`, 0.25);

      var textGeometry = new THREE.ExtrudeBufferGeometry(textShapes, {
        bevelEnabled: false,
      });

      textGeometry.center();

      editor.execute(new SetGeometryCommand(editor, object, textGeometry));
      editor.execute(new SetValueCommand(editor, object, 'visible', true));
      editor.execute(
        new SetValueCommand(editor, object, 'userData', {
          ...object.userData,
          value,
        })
      );
      editor.select(null);
    });

    editor.signals.unFreezeCamera.dispatch();
    editor.canSelect();
  }
}

export function setEditorName(editor, name) {
  if (name)
    editor.execute(
      new SetValueCommand(editor, editor.scene, 'userData', {
        ...editor.userData,
        name,
      })
    );
}

export function downloadSvg(editor, names, download, send) {
  if (!names) return;
  editor.select(null);
  names = Array.isArray(names) ? names : [names];

  const div = document.createElement('div');
  div.style.zIndex = -1;
  editor.container.appendChild(div);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    preserveDrawingBuffer: true,
  });
  renderer.outputEncoding = THREE.sRGBEncoding;
  renderer.setSize(1920, 1080);
  const scene = new THREE.Scene();

  let light = editor.scene.getObjectByName('DefaultPointLight');
  if (light) scene.add(light.clone());
  names.forEach((el) => {
    const object = editor.scene.getObjectByName(el);

    if (object) {
      let obj = object.clone();
      // obj.scale.z = 0.01;
      scene.add(obj);
    }
  });

  let camera = editor.camera.clone();
  camera.rotation.copy(new THREE.Euler(0, 0, 0));
  renderer.render(scene, camera);
  renderer.setClearColor(0xffffff, 0);
  div.appendChild(renderer.domElement);
  renderer.render(scene, camera);

  const canvas = renderer.domElement;
  var ctx = new C2S(canvas.clientWidth, canvas.clientHeight);
  // console.log(ctx);
  ctx.canvas.drawImage(canvas, 0, 0);

  let svg = ctx.getSerializedSvg(true);

  // console.log(svg);
  var preface = '<?xml version="1.0" standalone="no"?>\r\n';
  var svgBlob = new Blob([preface, svg], {
    type: 'image/svg+xml;charset=utf-8',
  });
  const file = new File([svgBlob], 'layer.svg', { type: 'image/svg+xml' });
  if (download) {
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'scene.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  editor.container.removeChild(div);
  renderer.dispose();
  if (send) return { file };
}
