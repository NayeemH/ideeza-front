import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';

// import { Line2 } from 'three/examples/jsm/lines/Line2';
// import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';
// import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';

import { AddObjectCommand } from '../js/commands/AddObjectCommand.js';
import { RemoveObjectCommand } from '../js/commands/RemoveObjectCommand.js';
import { SetScaleCommand } from '../js/commands/SetScaleCommand.js';
import { SetPositionCommand } from '../js/commands/SetPositionCommand.js';
import { SetRotationCommand } from '../js/commands/SetRotationCommand.js';
import { SetValueCommand } from '../js/commands/SetValueCommand.js';
import { MoveObjectCommand } from '../js/commands/MoveObjectCommand.js';
import { SetGeometryCommand } from '../js/commands/SetGeometryCommand.js';
import { SetMaterialValueCommand } from '../js/commands/SetMaterialValueCommand.js';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
// import package2d from './package2d.json';
// import package3d from './package3d.json';
// import packageschematic from './packageschematic.json';
// import pcb3d from './pcb3d.json';
// import cover3d from './cover3d.json';

function Functions(editor) {
  const dom = document.querySelector('#viewport');
  const canvas = document.querySelector('#viewport canvas');
  let obj = {};

  const pcbScale = new THREE.Vector3(8, 5, 0.2);
  const copperThickness = 0.01;
  const silkThickness = 0.001;

  //2dPlane
  let plane2d;
  let camera = editor.camera;
  let plane2dRaycaster = new THREE.Raycaster();
  let plane2dMouse = new THREE.Vector2();

  const create2dPlane = (positionZ) => {
    // freezing camera
    editor.signals.freezeCamera.dispatch();

    // disabling selecting objects
    editor.cannotSelect();

    // creating invisible 2d plane and adding it in scene
    var geometry = new THREE.PlaneGeometry(10000000000, 10000000000);

    let material = new THREE.MeshStandardMaterial();
    material.transparent = true; // opacity only work if transparent = true
    material.opacity = 0;

    plane2d = new THREE.Mesh(geometry, material);
    plane2d.name = 'plane2d';
    plane2d.rotation.copy(camera.rotation.clone());
    plane2d.updateMatrixWorld(true);
    plane2d.rotation.copy(camera.rotation);

    if (positionZ) {
      plane2d.position.z = positionZ;
    }

    editor.addObject(plane2d);
    editor.deselect(); //removing all selected objects
  };

  const getCoordinatesFromPlane = (
    clientX,
    clientY,
    object = plane2d,
    checkPlanes
  ) => {
    if (object) {
      var rect = dom.getBoundingClientRect();
      var array = [
        (clientX - rect.left) / rect.width,
        (clientY - rect.top) / rect.height,
      ];
      plane2dMouse.fromArray(array);
      plane2dMouse.set(plane2dMouse.x * 2 - 1, -(plane2dMouse.y * 2) + 1);

      // setting raycaster
      plane2dRaycaster.setFromCamera(plane2dMouse, camera);
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
          // if (
          //   checkPlanes.includes(intersects[0].object?.parent?.name) ||
          //   checkPlanes.includes(intersects[0].object?.parent?.parent?.name)
          // ) {
          //   let point = new THREE.Vector3().setFromMatrixPosition(
          //     intersects[0].object.matrixWorld
          //   );
          //   return { object: intersects[0].object, point };
          // }
        }
        return intersects[0].point;
      } else {
        return null;
      }
    } else {
      console.error('object undefined');
      return null;
    }
  };

  const destroy2dPlane = () => {
    editor.removeObject(plane2d);
    plane2d = undefined;
    plane2dRaycaster = new THREE.Raycaster();
    plane2dMouse = new THREE.Vector2();

    editor.signals.unFreezeCamera.dispatch();
    editor.canSelect();
  };

  obj.clear = () => {
    editor.clear();
  };

  obj.setEditorName = (name) => {
    if (name)
      editor.execute(
        new SetValueCommand(editor, editor.scene, 'userData', {
          ...editor.userData,
          name,
        })
      );
  };

  obj.undo = () => {
    editor.undo();
  };

  obj.redo = () => {
    editor.redo();
  };

  obj.delete = () => {
    var object = editor.selected;

    if (object !== null && object.parent !== null) {
      editor.execute(new RemoveObjectCommand(editor, object));
    }
  };

  obj.rect = () => {
    var geometry = new THREE.BoxGeometry();
    var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'Box';
    mesh.scale.copy(new THREE.Vector3(1, 1, 0.01));
    editor.execute(new AddObjectCommand(editor, mesh));
  };

  obj.circle = () => {
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
    var mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial());
    mesh.name = 'Cylinder';

    editor.execute(new AddObjectCommand(editor, mesh));

    var newScale = new THREE.Vector3(1, 0.01, 1);
    editor.execute(new SetScaleCommand(editor, mesh, newScale));

    var newRotation = new THREE.Euler(
      90 * THREE.MathUtils.DEG2RAD,
      0 * THREE.MathUtils.DEG2RAD,
      0 * THREE.MathUtils.DEG2RAD
    );
    editor.execute(new SetRotationCommand(editor, mesh, newRotation));
  };

  obj.line = () => {
    const dom = document.querySelector('#viewport');

    create2dPlane();

    //saving lines and dots in polygon group
    let polygonGroup = new THREE.Group();
    polygonGroup.name = 'polygonGroup';
    editor.addObject(polygonGroup);

    // creating new event listner on viewport
    dom.addEventListener('pointerdown', onPointerDown, false);
    dom.addEventListener('pointermove', onPointerMove, false);
    document.addEventListener('keydown', onEnter, false);

    let points = [];
    var point = new THREE.Vector3();

    // drawing lines with this fiddle https://jsfiddle.net/wilt/a21ey9y6/
    var count = 0;

    var lineGeometry = new THREE.BufferGeometry();
    var MAX_POINTS = 500;
    var positions = new Float32Array(MAX_POINTS * 3);
    lineGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(positions, 3)
    );

    var lineMaterial = new THREE.LineBasicMaterial({
      color: 0x000000,
      linewidth: 1, //doesn't work for some reason
    });

    var line = new THREE.Line(lineGeometry, lineMaterial);
    polygonGroup.add(line);

    const updateLine = () => {
      positions[count * 3 - 3] = point.x;
      positions[count * 3 - 2] = point.y;
      positions[count * 3 - 1] = point.z;
      line.geometry.attributes.position.needsUpdate = true;
    };

    function onPointerDown() {
      // changing point to point of dot if it clicked on dots
      let intersects = plane2dRaycaster
        .intersectObjects(polygonGroup.children)
        .filter((el) => el.object.type !== 'line');

      if (intersects[0]) {
        point = intersects[0].object.userData.point;
      }

      // updating line and adding points
      const addPoint = () => {
        positions[count * 3 + 0] = point.x;
        positions[count * 3 + 1] = point.y;
        positions[count * 3 + 2] = point.z;
        count++;
        line.geometry.setDrawRange(0, count);
        updateLine();
      };

      if (point) {
        // on first click add an extra point
        if (count === 0) {
          addPoint();
        }
        addPoint();
        points.push(point);

        //drawing dot
        let dotGeometry = new THREE.BufferGeometry();
        dotGeometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(point, 3)
        );
        let dotMaterial = new THREE.PointsMaterial({
          size: 6,
          sizeAttenuation: false,
        });
        let dot = new THREE.Points(dotGeometry, dotMaterial);
        polygonGroup.add(dot);
        dot.userData.point = point;

        editor.signals.reRender.dispatch();
      }
    }

    function onPointerMove(e) {
      // saving point on mouse move
      if (!plane2d) {
        exitPolygonMode();
        return;
      }
      point = getCoordinatesFromPlane(e.clientX, e.clientY);

      if (point) {
        //updating line
        if (count !== 0) {
          updateLine();
        }

        editor.signals.reRender.dispatch();
      }
    }

    function onEnter(e) {
      if (e.code === 'Enter') {
        exitPolygonMode();
        document.removeEventListener('keydown', onEnter, false);
      }
    }

    function exitPolygonMode() {
      dom.removeEventListener('pointerdown', onPointerDown, false);
      dom.removeEventListener('pointermove', onPointerMove, false);

      destroy2dPlane();
      editor.removeObject(polygonGroup);

      points.map((r) => {
        return new THREE.Vector3(r.x, r.y, r.z);
      });

      var tri = new THREE.Triangle(points[2], points[1], points[0]);
      var normal = new THREE.Vector3();
      tri.getNormal(normal);

      var baseNormal = new THREE.Vector3(0, 0, 1);
      var quaternion = new THREE.Quaternion().setFromUnitVectors(
        normal,
        baseNormal
      );

      var tempPoints = [];
      points.forEach((p) => {
        tempPoints.push(p.clone().applyQuaternion(quaternion));
      });

      var polygonShape = new THREE.Shape(tempPoints);

      const extrudeSettings = {
        depth: 1,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 0,
        bevelThickness: 1,
      };

      const polygonGeometry = new THREE.ExtrudeGeometry(
        polygonShape,
        extrudeSettings
      );

      const polygon = new THREE.Mesh(
        polygonGeometry,
        new THREE.MeshStandardMaterial()
      );
      polygon.geometry.vertices = points;

      polygon.name = 'polygon';

      //calculating center by creating buffer geometry with points
      const g = new THREE.BufferGeometry().setFromPoints(points);
      g.computeBoundingSphere();
      const center = new THREE.Vector3().copy(g.boundingSphere.center);

      polygonGeometry.center();
      polygon.position.copy(center);
      polygon.rotation.copy(camera.rotation);
      polygon.scale.copy(new THREE.Vector3(1, 1, 0.03));
      editor.execute(new AddObjectCommand(editor, polygon));

      points = [];
      polygonGroup = new THREE.Group();
    }
  };

  obj.distanceBetween = () => {
    create2dPlane();

    // creating new event listner on viewport
    dom.addEventListener('pointerdown', onPointerDown, false);
    dom.addEventListener('pointermove', onPointerMove, false);

    let point = null;
    let points = [];
    let mouse = [];
    let count = 0;

    let [ox, oy] = [0, 0];
    let dimensionGroup = new THREE.Group();
    dimensionGroup.name = 'dimensions';
    editor.execute(new AddObjectCommand(editor, dimensionGroup));

    editor.deselect();

    let pos, line1, line2, positions1, positions2, arrow1, arrow2, text;

    const setParallelPoints = (e) => {
      pos =
        Math.abs(mouse[0].x - mouse[1].x) > Math.abs(mouse[0].y - mouse[1].y)
          ? 'hor'
          : 'ver';

      // if (hor) {
      const [dx, dy] = [mouse[0].x - mouse[1].x, mouse[0].y - mouse[1].y];

      let midPointX = (mouse[0].x + mouse[1].x) / 2;
      let midPointY = (mouse[0].y + mouse[1].y) / 2;

      // //length between cursor and middle of line
      // var w = e.clientX - midPointX;
      // var h = e.clientY - midPointY;
      // var d = Math.sqrt(w * w + h * h);

      let offset;
      if (pos === 'hor') {
        offset =
          mouse[0].y - mouse[1].y >= 0
            ? midPointY - e.clientY
            : e.clientY - midPointY;
      } else if (pos === 'ver') {
        offset =
          mouse[0].x - mouse[1].x >= 0
            ? midPointX - e.clientX
            : e.clientX - midPointX;
      }

      const scale = offset / (dx * dx + dy * dy) ** 0.5;
      [ox, oy] = [-dy * scale, dx * scale];
    };

    function onPointerDown(e) {
      if (point) {
        if (count < 3) {
          points[count] = point;
          mouse[count] = new THREE.Vector2(e.clientX, e.clientY);

          count++;
        }
        if (count === 3) {
          exit();
        }

        if (count === 2) {
          setParallelPoints(e);

          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x000000,
            linewidth: 1, //doesn't work for some reason
          });

          //line1
          const oPoint1 = getCoordinatesFromPlane(
            ox + mouse[0].x,
            oy + mouse[0].y
          );

          if (oPoint1) {
            var lineGeometry = new THREE.BufferGeometry();
            positions1 = new Float32Array([
              points[0].x,
              points[0].y,
              points[0].z,
              oPoint1.x,
              oPoint1.y,
              oPoint1.z,
            ]);
            lineGeometry.setAttribute(
              'position',
              new THREE.BufferAttribute(positions1, 3)
            );

            line1 = new THREE.Line(lineGeometry, lineMaterial);

            dimensionGroup.add(line1);
          }

          //line2
          const oPoint2 = getCoordinatesFromPlane(
            ox + mouse[1].x,
            oy + mouse[1].y
          );

          if (oPoint2) {
            let lineGeometry = new THREE.BufferGeometry();
            positions2 = new Float32Array([
              points[1].x,
              points[1].y,
              points[1].z,
              oPoint2.x,
              oPoint2.y,
              oPoint2.z,
            ]);
            lineGeometry.setAttribute(
              'position',
              new THREE.BufferAttribute(positions2, 3)
            );

            line2 = new THREE.Line(lineGeometry, lineMaterial);
            dimensionGroup.add(line2);
          }

          //loading font

          let fontLoaded;
          const loader = new FontLoader();
          loader.load('/font/helvetiker_regular.typeface.json', (font) => {
            fontLoaded(font);
          });

          fontLoaded = function (font) {
            const direction1 = new THREE.Vector3().subVectors(oPoint1, oPoint2);

            //text
            (function () {
              var textShapes = font.generateShapes(
                `${direction1.length().toFixed(2)} unit`,
                direction1.length() / 15
              );
              var textGeometry = new THREE.ShapeBufferGeometry(textShapes);
              var textMaterial = new THREE.MeshBasicMaterial({
                color: 0x000000,
                side: THREE.DoubleSide,
              });

              text = new THREE.Mesh(textGeometry, textMaterial);

              textGeometry.center();
              text.rotation.copy(camera.rotation);
              text.position.copy(
                getCoordinatesFromPlane(
                  ox + (mouse[0].x + mouse[1].x) / 2,
                  oy + (mouse[0].y + mouse[1].y) / 2
                )
              );

              text.name = 'text';
              dimensionGroup.add(text);
            })();

            //calculating arrow space from the middle using text size
            const textSize = new THREE.Vector3();
            var box = new THREE.Box3().setFromObject(text);
            box.getSize(textSize);
            let textSpace =
              pos === 'hor'
                ? textSize.x / 2 + direction1.length() / 15
                : textSize.y;

            //arrow1
            arrow1 = new THREE.ArrowHelper(
              direction1.clone().normalize(),
              oPoint2,
              direction1.length() / 2 - textSpace,
              0x000000
            );
            dimensionGroup.add(arrow1);

            //arrow2

            const direction2 = new THREE.Vector3().subVectors(oPoint2, oPoint1);
            arrow2 = new THREE.ArrowHelper(
              direction2.clone().normalize(),
              oPoint1,
              direction2.length() / 2 - textSpace,
              0x000000
            );
            dimensionGroup.add(arrow2);

            editor.signals.reRender.dispatch();
          };
        }

        editor.signals.reRender.dispatch();
      }
    }

    function onPointerMove(e) {
      if (!plane2d) {
        exit();
        return;
      }
      if (count < 3) {
        point = getCoordinatesFromPlane(e.clientX, e.clientY);
      }

      if (count === 2) {
        // hor = x, ver = y
        setParallelPoints(e);

        const oPoint1 = getCoordinatesFromPlane(
          ox + mouse[0].x,
          oy + mouse[0].y
        );
        if (line1) {
          if (oPoint1) {
            positions1[3] = oPoint1.x;
            positions1[4] = oPoint1.y;
            positions1[5] = oPoint1.z;
            line1.geometry.attributes.position.needsUpdate = true;
          }
        }

        const oPoint2 = getCoordinatesFromPlane(
          ox + mouse[1].x,
          oy + mouse[1].y
        );
        if (line2) {
          if (oPoint2) {
            positions2[3] = oPoint2.x;
            positions2[4] = oPoint2.y;
            positions2[5] = oPoint2.z;
            line2.geometry.attributes.position.needsUpdate = true;
          }
        }

        if (arrow1) {
          arrow1.position.copy(oPoint2);
          const direction1 = new THREE.Vector3().subVectors(oPoint1, oPoint2);
          arrow1.setDirection(direction1.normalize());
        }

        if (arrow2) {
          arrow2.position.copy(oPoint1);
          const direction2 = new THREE.Vector3().subVectors(oPoint2, oPoint1);
          arrow2.setDirection(direction2.normalize());
        }

        if (text) {
          text.position.copy(
            getCoordinatesFromPlane(
              ox + (mouse[0].x + mouse[1].x) / 2,
              oy + (mouse[0].y + mouse[1].y) / 2
            )
          );
        }

        editor.signals.reRender.dispatch();
      }
    }

    function exit() {
      dom.removeEventListener('pointerdown', onPointerDown, false);
      dom.removeEventListener('pointermove', onPointerMove, false);
      destroy2dPlane();
      point = null;
      points = [];
      mouse = [];
    }
  };

  obj.renderPackage = async (
    formData,
    viewType,
    editorType,
    optionalFile,
    setThreeDData,
    callback,
    addPackageFile
  ) => {
    //loading font

    let pFormData = editor.scene.userData?.formData;
    let pViewType = editor.scene.userData?.viewType;
    let pEditorType = editor.scene.userData?.editorType;
    let pParts = editor.scene.userData?.parts;

    let isLeg, isBody;

    if (addPackageFile && editorType === 'newPackage') {
      if (pParts?.body !== addPackageFile?.body?.id) isBody = true;
      if (pParts?.leg !== addPackageFile?.leg?.id) isLeg = true;
    }

    if (editorType === 'legMeaning') {
      formData = pFormData;
    }

    if (
      JSON.stringify(pFormData) === JSON.stringify(formData) &&
      pViewType === viewType &&
      pEditorType === editorType &&
      !isLeg &&
      !isBody
    )
      return;

    const loader = new FontLoader();
    loader.load('/font/helvetiker_regular.typeface.json', async (font) => {
      // disabling selecting objects and clearing the editor
      if (!['legMeaning', 'newPackage'].includes(editorType)) {
        editor.cannotSelect();
      } else {
        editor.canSelect();
      }

      if (viewType !== '3d' || pEditorType !== editorType) {
        editor.signals.rotateCamera.dispatch(new THREE.Vector3(0, 0, 0));
      }

      if (viewType !== '3d') {
        editor.signals.freezeCamera.dispatch();
      } else {
        editor.signals.unFreezeCamera.dispatch();
      }

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

      if (pEditorType !== editorType) {
        let tempV = pViewType ? pViewType : viewType;
        let tempP = editor.scene.getObjectByName('Package');
        if (tempP && tempV) {
          if (setThreeDData)
            setThreeDData((prev) => {
              return {
                ...prev,
                [tempV]: tempP.toJSON(),
              };
            });
        }
      }

      let packages;
      // const file = getSaveFileType(viewType);
      if (optionalFile && optionalFile?.object) {
        packages = await load(optionalFile);
        // packages = file;
        if (
          packages &&
          !(editorType === 'newPackage' && pEditorType !== 'newPackage')
        ) {
          let p = editor.scene.getObjectByName('Package');
          if (p) editor.removeObject(p);
          editor.execute(new AddObjectCommand(editor, packages));
        }
      }

      if (packages === undefined) {
        let p = editor.scene.getObjectByName('Package');
        if (p) editor.removeObject(p);
        packages = new THREE.Group();
        packages.name = 'Package';
        editor.execute(new AddObjectCommand(editor, packages));
      }

      let bodySize = new THREE.Vector3(3, 3, 0.01);
      let legSize = new THREE.Vector3(0.05, 0.5, 0.05);
      let pinSides = Number(formData?.pinSides);

      if (viewType === '3d') {
        bodySize.z = 0.2;
      }
      if (viewType === 'schematic') {
        if (formData.noOfPins) {
          bodySize.y = (formData.noOfPins / 2) * 0.7;
          pinSides = 2;
        }
      }

      let body = packages.getObjectByName('Body');

      if (
        !body ||
        pFormData?.bodyType !== formData?.bodyType ||
        (pFormData?.noOfPins !== formData?.noOfPins &&
          viewType === 'schematic') ||
        (addPackageFile?.body?.id &&
          pParts?.body !== addPackageFile?.body?.id) ||
        pViewType !== viewType
      ) {
        if (body && formData.bodyType) editor.removeObject(body);
        if (formData.bodyType === 'rectangle') {
          //body
          if (
            editorType === 'newPackage' &&
            pParts?.body !== addPackageFile?.body?.id &&
            addPackageFile?.body?.three_d_script &&
            viewType === '3d'
          ) {
            body = await load(addPackageFile?.body?.three_d_script);
            if (body) {
              body.name = 'Body';
            }
          } else {
            if (!body) {
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
            packages.add(line);
            body = line;
          }
        }
      }

      if (body && editorType === 'legMeaning') {
        body.userData.unSelect = true;
      }

      // const legUserData = (userData) =>
      //   legMeaning
      //     ? {
      //         ...userData,
      //         selectParent: true,
      //         hideTransformControls: {
      //           translate: 'z',
      //           rotate: 'xyz',
      //           scale: 'xyz',
      //         },
      //       }

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
          gap = viewType !== 'schematic' ? 0.08 : -0.25;
        } else if (formData.packageType === 'smt') {
          gap = viewType !== 'schematic' ? -0.4 : -0.25;
        } else {
          gap = viewType === '3d' ? 0.08 : viewType === '2d' ? -0.4 : -0.25;
        }

        for (let i = 1; i <= formData.noOfPins; i++) {
          let position = new THREE.Vector3(0, 0, 0);
          let rotation = new THREE.Vector3(0, 0, 0);

          let bb = new THREE.Box3().setFromObject(body);
          let size =
            viewType !== 'schematic' && body
              ? bb.getSize(new THREE.Vector3())
              : new THREE.Vector3().copy(bodySize);

          if (side === 0) {
            // position.x = -size.x / 2 - legSize.x / 2;
            position.x = -size.x / 2 + gap;
            position.y =
              size.y / 2 -
              (size.y / legPerSide) * (i - legPerSide * side) +
              size.y / legPerSide / 2;
          } else if (side === 1) {
            // position.y = -size.y / 2 - legSize.x / 2;
            position.y = -size.y / 2 + gap;
            position.x =
              -(size.x / 2) +
              (size.x / legPerSide) * (i - legPerSide * side) -
              size.x / legPerSide / 2;
          } else if (side === 2) {
            let newSide = pinSides === 4 ? side : 1;

            // position.x = size.x / 2 + legSize.x / 2;
            position.x = size.x / 2 - gap;
            position.y =
              size.y / 2 -
              (size.y / legPerSide) * (i - legPerSide * newSide) +
              size.y / legPerSide / 2;
          } else if (side === 3) {
            // position.y = size.y / 2 + legSize.x / 2;
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
              value = editor.scene.userData?.values.find((d) => d.pin_no === i);
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
          mesh.rotation.copy(
            new THREE.Euler(
              90 * THREE.MathUtils.DEG2RAD,
              rotation.y * THREE.MathUtils.DEG2RAD,
              rotation.z * THREE.MathUtils.DEG2RAD
            )
          );
        }

        position.z = -legSize.y / 2;
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
          leg.scale.copy(new THREE.Vector3(0.5, 0.2, 0.01));
        } else {
          let geometry = new THREE.BoxGeometry();
          leg = new THREE.Mesh(
            geometry,
            new THREE.MeshPhongMaterial({
              color: 0xeb0ff5,
            })
          );
          leg.scale.copy(new THREE.Vector3(0.5, 0.2, 0.01));
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
        mesh.scale.copy(new THREE.Vector3(0.5, 0.02, 0.01));
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
        var textShapes = font.generateShapes(`${name}`, 0.25);
        var textGeometry = new THREE.ShapeBufferGeometry(textShapes);
        var textMaterial = new THREE.MeshPhongMaterial({
          color: 0xffffff,
          side: THREE.DoubleSide,
        });

        let text = new THREE.Mesh(textGeometry, textMaterial);

        textGeometry.center();
        // text.rotation.copy(camera.rotation);
        let textPosition = new THREE.Vector3().copy(position);
        textPosition.y = textPosition.y + 0.28;
        text.position.copy(textPosition);

        text.name = 'text';
        leg.add(text);
        return leg;
      }

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
                  let dotGeometry = new THREE.BufferGeometry();
                  dotGeometry.setAttribute(
                    'position',
                    new THREE.Float32BufferAttribute(position, 3)
                  );
                  let dotMaterial = new THREE.PointsMaterial({
                    size: 6,
                    sizeAttenuation: false,
                  });
                  let dot = new THREE.Points(dotGeometry, dotMaterial);
                  dot.userData.unSelect = true;
                  dotGeometry.computeBoundingSphere();
                  const center = new THREE.Vector3().copy(
                    dotGeometry.boundingSphere.center
                  );

                  dotGeometry.center();
                  dot.position.copy(center);
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
        setThreeDData &&
        (!['legMeaning', 'newPackage'].includes(editorType) ||
          (editorType === 'newPackage' &&
            ((addPackageFile?.body?.id &&
              pParts?.body !== addPackageFile?.body?.id) ||
              (addPackageFile?.leg?.id &&
                pParts?.leg !== addPackageFile?.leg?.id))))
      ) {
        setTimeout(() => {
          setThreeDData((prev) => {
            return {
              ...prev,
              [viewType]: packages.toJSON(),
            };
          });
        }, 500);
      }

      let partsObj = {};
      if (editorType === 'newPackage') {
        // if (addPackageFile?.body?.id) {
        if (!partsObj.parts) partsObj.parts = {};
        partsObj.parts.body = addPackageFile?.body?.id;
        // }

        // if (addPackageFile?.leg?.id) {
        if (!partsObj.parts) partsObj.parts = {};
        partsObj.parts.leg = addPackageFile?.leg?.id;
        // }
      }

      editor.execute(
        new SetValueCommand(editor, editor.scene, 'userData', {
          ...editor.scene.userData,
          viewType,
          formData,
          editorType,
          ...partsObj,
        })
      );
      if (viewType !== '3d') {
        editor.signals.freezeCamera.dispatch();
      } else {
        editor.signals.unFreezeCamera.dispatch();
      }
      editor.deselect();
      if (callback) {
        await callback(editor.scene.children.find((e) => e.name === 'Package'));
      }
    });
  };

  obj.packageSchematicConnectionLine = () => {
    const packages = editor.scene.getObjectByName('Package');
    if (!packages) return;

    ///adding legs for plane
    let packageLegs = [];
    if (packages) {
      const legs = packages.getObjectByName('Legs');
      if (legs) {
        if (legs.type === 'Group') {
          legs.children.forEach((e) => {
            const dot = e.children.find((k) => k.name === 'Dot');
            if (dot) packageLegs.push(dot);
          });
        } else packageLegs.push(legs);
      }
    }

    const onExit = (line) => {
      const link = line.userData?.link;
      if (link && link.length === 2) {
        const link1 = JSON.stringify(link[0]);
        const link2 = JSON.stringify(link[1]);
        if (link1 !== link2) {
          let connectionLines = editor.scene.getObjectByName('ConnectionLines');

          if (connectionLines) {
            connectionLines.children.some((el) => {
              if (el.uuid !== line.uuid) {
                const linkC = el.userData?.link;
                if (linkC && linkC.length === 2) {
                  const json = JSON.stringify(linkC);
                  if (json.includes(link1) && json.includes(link2)) {
                    editor.execute(new RemoveObjectCommand(editor, line));
                    alert('Multiple connection on same leg');
                    return true;
                  }
                }
              }
            });
          }
        } else {
          editor.execute(new RemoveObjectCommand(editor, line));
          alert('Cannot connect same package same leg');
        }
      } else {
        editor.execute(new RemoveObjectCommand(editor, line));
        alert('Must have connection with two legs');
      }
      destroy2dPlane();
    };
    create2dPlane(-0.1);
    drawLine(
      'ConnectionLine',
      0xffffff,
      500,
      [plane2d, ...packageLegs],
      ['Legs'],
      { legName: 'Legs' },
      onExit,
      {
        parent: packages,
        name: 'ConnectionLines',
      },
      {
        unSelect: true,
        hideTransformControls: {
          translate: 'z',
          rotate: 'xy',
          scale: 'z',
        },
      }
    );
  };

  obj.packageDrawSchematicShapes = () => {
    const packages = editor.scene.getObjectByName('Package');

    const onExit = () => {
      destroy2dPlane();
    };

    create2dPlane();
    drawLine('BodyShape', 0xffffff, 500, plane2d, null, null, onExit, {
      parent: packages,
      name: 'Body',
    });
  };

  obj.loadPackageParts = async (file) => {
    if (!file || !file?.object) return;

    let data = await load(file);
    if (!data) return;
    if (data?.name === 'Body') {
      editor.execute(new AddObjectCommand(editor, data));
    }
    if (data?.name === 'Leg') {
      editor.execute(new AddObjectCommand(editor, data));
    }
  };

  obj.drawPcb = async (optionalFile, getPackageFile) => {
    // editor.clear();

    //checking if first layer exists
    let layers = editor.scene.children.filter((e) => e.name.includes('Layer'));
    let layer1 = editor.scene.children.find((e) => e.name === `Layer${1}`);
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
      packages = layer1.children.find((e) => e.name === 'Packages');
      if (packages) {
        packages.children.forEach((el) => {
          el.children.forEach((e) => {
            //drawing edges geometry
            let body = e.children.find((k) => k.name === 'Body');
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

    if (optionalFile) {
      const schematics = await load(optionalFile);
      // render packages
      let sPackages = schematics.children.find((e) => e.name === 'Packages');
      const core = layer1.children.find((e) => e.name === 'Core');

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
            nPackage.scale.copy(new THREE.Vector3(0.3, 0.3, 1));
            nPackage.position.copy(position);
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
                  // legs.children[i].userData.hoverColor = 0x5a005e;

                  legs2d.children[i].userData.hoverEffect = true;

                  legs2d.children[i].uuid = THREE.MathUtils.generateUUID();
                  // legs.children[i].material.uuid = THREE.MathUtils.generateUUID();
                  // legs.children[i].geometry.uuid = THREE.MathUtils.generateUUID();

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
              groupObjects(layer1, 'Packages', nPackage);
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

      const connectionLines = layer1.children.find(
        (e) => e.name === 'ConnectionLines'
      );
      let scl = schematics.children.find((e) => e.name === 'ConnectionLines');
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
                  const np2d = np.children.find((k) => k.name === 'Package2d');
                  if (np2d) {
                    const legs = np2d.children.find((k) => k.name === 'Legs');
                    if (legs) {
                      const leg = legs.children.find(
                        (k) => k.name === e.legName
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
                groupObjects(layer1, 'ConnectionLines', line);
              }
            }
          }
        });
      }
    }

    return { pcbLayersCount: layerCount };
  };

  obj.pcbDesignViewType = (viewType) => {
    editor.signals.rotateCamera.dispatch(new THREE.Vector3(0, 0, 0));
    if (viewType === '2d') {
      editor.signals.freezeCamera.dispatch();
    } else if (viewType === '3d') {
      editor.signals.unFreezeCamera.dispatch();
    }

    let layers = editor.scene.children.filter((e) => e.name.includes('Layer'));
    let layer = editor.scene.children.find((e) => e.name === `Layer${1}`);

    if (layer) {
      //clearing and drawing pcb border based on viewType
      let pcbBorder = editor.scene.children.find(
        (e) => e.name === 'Pcb2Dborder'
      );
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
      showLayers();
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
    showLayers();
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
      showLayers();
      return { pcbLayersCount: layerCount };
    }
  };

  obj.showLayer = (layer = 1) => {
    showLayers(layer);
  };

  function showLayers(layerCount = 1) {
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
    const cbh = editor.scene.children.find(
      (e) => e.name === 'CopperBlindHoles'
    );
    if (cth) {
      hideHoles(
        layerCount,
        cth.children,
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
    }
    if (cbh) {
      hideHoles(
        layerCount,
        cbh.children,
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
    }

    const packages = layer1.children.find((e) => e.name === 'Packages');
    if (packages) {
      packages.children.forEach((el) => {
        const packageTwod = el.children.find((e) => e.name === 'Package2d');
        const packageThreed = el.children.find((e) => e.name === 'Package3d');

        if (packageTwod) {
          const legs = packageTwod.children.find((e) => e.name === 'Legs');
          if (legs) {
            if (legs.children[0].type === 'Group') {
              hideHoles(
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

  function groupObjects(parent, name, obj) {
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

  function drawCylinder(name, color, scale, positionz) {
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

  function drawLine(
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
      groupObjects(group.parent, group.name, line);
    }

    let userDataArray = [];
    // creating new event listner on viewport
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
        ? getCoordinatesFromPlane(e.clientX, e.clientY, plane, checkplanes)
        : getCoordinatesFromPlane(e.clientX, e.clientY, plane);
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
                  if (obj?.parent?.name === 'Legs') return obj.name;
                  return obj.parent && checkParent(obj.parent);
                };

                let objName = checkParent(data.object);
                if (objName) {
                  userDataObj[e] = objName;
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
      let point = getCoordinatesFromPlane(e.clientX, e.clientY, plane);

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

  async function load(json) {
    if (!json) return;
    if (typeof json === 'string') json = JSON.parse(json);
    if (!json.object) return;
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

  function hideHoles(layerCount, holes, copperCircleCB, showHole) {
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

  obj.copperCircle = () => {
    const core = editor.scene.children
      .find((e) => e.name === `Layer${1}`)
      ?.children?.find((e) => e.name === 'Core');

    dom.addEventListener('pointerdown', onPointerDown, false);

    function onPointerDown(e) {
      const point = getCoordinatesFromPlane(e.clientX, e.clientY, core);
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
      groupObjects(core.parent, 'CopperCircles', mesh);

      dom.removeEventListener('pointerdown', onPointerDown, false);
    }
  };

  obj.copperRect = () => {
    const core = editor.scene.children
      .find((e) => e.name === `Layer${1}`)
      ?.children?.find((e) => e.name === 'Core');

    dom.addEventListener('pointerdown', onPointerDown, false);

    function onPointerDown(e) {
      const point = getCoordinatesFromPlane(e.clientX, e.clientY, core);
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
      groupObjects(core.parent, 'CopperRects', mesh);

      dom.removeEventListener('pointerdown', onPointerDown, false);
    }
  };

  obj.text = (type, color = 0xffffff) => {
    editor.signals.freezeCamera.dispatch(); // freezing camera
    editor.cannotSelect(); // disabling selecting objects

    let plane, parent;

    if (type === 'pcbDesign') {
      parent = editor.scene.getObjectByName('Layer1');
      if (parent) plane = parent.getObjectByName('Core');
    } else if (type === 'pcbSchematic') {
      create2dPlane();
      plane = [plane2d];
      let packages = editor.scene.getObjectByName('Packages');
      if (packages)
        packages.children.forEach((el) => {
          let body = el.getObjectByName('Body');
          if (body) plane.push(body);
        });
      parent = editor.scene;
    } else if (type === 'package') {
      create2dPlane();
      plane = [plane2d];
      let packages = editor.scene.getObjectByName('Package');
      if (packages) {
        parent = packages;
        let body = packages.getObjectByName('Body');
        if (body) plane.push(body);
      }
    } else {
      create2dPlane();
      plane = plane2d;
      parent = editor.scene;
    }

    if (!parent || !plane) return;
    let point;

    dom.addEventListener('pointerdown', onPointerDown, false);
    let input, value;

    function onPointerDown(e) {
      point = getCoordinatesFromPlane(e.clientX, e.clientY, plane);

      if (point) {
        input = document.createElement('input');
        input.type = 'text';
        input.className = 'css-class-name';
        input.style.position = 'absolute';
        input.style.top = `${e.clientY}px`;
        input.style.left = `${e.clientX}px`;
        input.style.zIndex = 9999999999;
        input.onblur = () => {
          exit();
        };
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
        groupObjects(parent, 'Texts', text);
      });

      if (plane2d) destroy2dPlane();
      editor.signals.unFreezeCamera.dispatch();
      editor.canSelect();
    }
  };

  obj.changeText = ({ object, point }) => {
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
    input.onblur = () => {
      exit();
    };
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
      const point = getCoordinatesFromPlane(e.clientX, e.clientY, core);
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

      groupObjects(editor.scene, 'CopperThruHoles', group);

      hideHoles(
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
      const point = getCoordinatesFromPlane(e.clientX, e.clientY, core);
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

      groupObjects(editor.scene, 'CopperBlindHoles', group);

      hideHoles(
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
      const point = getCoordinatesFromPlane(e.clientX, e.clientY, core);
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
      groupObjects(editor.scene, 'HoleCylinders', holeCylinder);

      dom.removeEventListener('pointerdown', onPointerDown, false);
    }
  };

  obj.show3dPackages = () => {
    const layer = editor.scene.children.find((e) => e.name === `Layer${1}`);
    const packages = layer.children.find((e) => e.name === 'Packages');
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
      }
    };

    drawLine(
      'ConnectionLine',
      0xffffff,
      2,
      [core, ...packageLegs],
      ['Legs'],
      {
        packageId: 'Package',
        legName: 'Legs',
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

      if (link) {
        if (link.length === 2) {
          //checking copper lines in all layers
          layers.some((e) => {
            const copperLines = e.children.find(
              (k) => k.name === 'CopperLines'
            );
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
                  editor.execute(
                    new RemoveObjectCommand(editor, connectionLine)
                  );
                  break;
                }
              }
            }
          }
        } else {
          editor.execute(new RemoveObjectCommand(editor, line));
          alert('should be connected between copper plate');
        }
      }
    };

    drawLine(
      'CopperLine',
      0xd75822,
      500,
      [core, ...planes],
      ['Legs', 'CopperThruHoles', 'CopperBlindHoles'],
      {
        packageId: 'Package',
        legName: 'Legs',
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

  obj.loadPcbSchamaticPackage = async ({ id, type, schematic }) => {
    if (!id || !schematic || !type) return;

    if (!schematic?.object) schematic = JSON.parse(schematic);

    let packages = await load(schematic);

    if (packages) {
      packages.uuid = THREE.MathUtils.generateUUID();
      packages.name = 'Package';

      packages.scale.copy(new THREE.Vector3(0.3, 0.3, 1));
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

      groupObjects(editor.scene, 'Packages', packages);
    }
  };

  obj.pcbSchematicConnectionLine = () => {
    const packages = editor.scene.children.find((e) => e.name === 'Packages');

    ///adding legs for plane
    let packageLegs = [];
    if (packages) {
      packages.children.forEach((el) => {
        const legs = el.children.find((k) => k.name === 'Legs');
        if (legs) {
          if (legs.type === 'Group') {
            legs.children.forEach((e) => {
              const leg = e.children.find((k) => k.name === 'leg');
              if (leg) packageLegs.push(leg);
            });
          } else packageLegs.push(legs);
        }
      });
    }

    const onExit = (line) => {
      const link = line.userData?.link;
      if (link && link.length === 2) {
        const link1 = JSON.stringify(link[0]);
        const link2 = JSON.stringify(link[1]);
        if (link1 !== link2) {
          let connectionLines = editor.scene.children.find(
            (k) => k.name === 'ConnectionLines'
          );

          if (connectionLines) {
            connectionLines.children.some((el) => {
              if (el.uuid !== line.uuid) {
                const linkC = el.userData?.link;
                if (linkC && linkC.length === 2) {
                  const json = JSON.stringify(linkC);
                  if (json.includes(link1) && json.includes(link2)) {
                    editor.execute(new RemoveObjectCommand(editor, line));
                    alert('Multiple connection on same leg');
                    return true;
                  }
                }
              }
            });
          }
        } else {
          editor.execute(new RemoveObjectCommand(editor, line));
          alert('Cannot connect same package same leg');
        }
      } else {
        editor.execute(new RemoveObjectCommand(editor, line));
        alert('Must have connection with two legs');
      }
      destroy2dPlane();
    };

    create2dPlane();
    drawLine(
      'ConnectionLine',
      0xffffff,
      500,
      [plane2d, ...packageLegs],
      ['Legs'],
      { packageId: 'Package', legName: 'Legs' },
      onExit,
      {
        parent: editor.scene,
        name: 'ConnectionLines',
      },
      {
        unSelect: true,
        hideTransformControls: {
          translate: 'z',
          rotate: 'xy',
          scale: 'z',
        },
      }
    );
  };

  obj.renderPcbSchematic = async (optionalFile) => {
    editor.signals.rotateCamera.dispatch(new THREE.Vector3(0, 0, 0));
    editor.signals.freezeCamera.dispatch();

    if (optionalFile) {
      const design = await load(optionalFile);
      if (design) {
        const layer = design.children.find((e) => e.name === 'Layer1');

        const packages = editor.scene.children.find(
          (e) => e.name === 'Packages'
        );

        if (layer) {
          //renderConnectionLines
          const connectionLines = editor.scene.children.find(
            (e) => e.name === 'ConnectionLines'
          );

          let dcl = layer.children.find((e) => e.name === 'ConnectionLines');
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
                          (k) => k.name === e.legName
                        );
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
                  });
                  if (points.length >= 2) {
                    const lineGeometry =
                      new THREE.BufferGeometry().setFromPoints(points);
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
                    groupObjects(editor.scene, 'ConnectionLines', line);
                  }
                }
              }
            });
          }
        }
      }
    }
  };

  obj.addPackagePoints = (
    { name, id },
    setValuePackagePoints,
    setThreeDData
  ) => {
    if (id === undefined || name === undefined) return;
    let packages = editor.scene.getObjectByName('Package');
    if (!packages) return;

    dom.addEventListener('pointerdown', onPointerDown, false);
    let points = [];

    editor.cannotSelect();

    const group = new THREE.Group();
    group.name = 'Point';
    groupObjects(editor.scene, 'Points', group);

    let currentPlane;
    let side;
    function onPointerDown(e) {
      const data = getCoordinatesFromPlane(e.clientX, e.clientY, packages, [
        'Body',
        'Legs',
      ]);
      let point = data?.clickedPoint;
      let object;

      let checkParent;
      checkParent = function (obj) {
        if (obj.name === 'Body' || obj.parent.name === 'Legs') return obj;
        return obj.parent && checkParent(obj.parent);
      };
      if (data?.object) object = checkParent(data?.object);

      if (point && object) {
        if (
          (currentPlane &&
            currentPlane === 'Body' &&
            String(object.name) !== 'Body') ||
          (side && side === String(object?.userData?.side)) ||
          (currentPlane &&
            currentPlane !== 'Body' &&
            String(object.name) === 'Body')
        ) {
          editor.execute(new RemoveObjectCommand(editor, group));
          dom.removeEventListener('pointerdown', onPointerDown, false);
          alert('can only add two points in body or leg');
          return;
        }
        currentPlane = `${object?.name}`;
        if (object.userData?.side !== undefined)
          side = `${object.userData?.side}`;
        // point.z = point.z + 0.01;
        let dotGeometry = new THREE.BufferGeometry();
        dotGeometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(point, 3)
        );
        let dotMaterial = new THREE.PointsMaterial({
          size: 6,
          sizeAttenuation: false,
        });
        let dot = new THREE.Points(dotGeometry, dotMaterial);
        dotGeometry.computeBoundingSphere();
        const center = new THREE.Vector3().copy(
          dotGeometry.boundingSphere.center
        );

        dotGeometry.center();
        dot.name = String(points.length);
        dot.position.copy(center);
        dot.userData.unSelect = true;
        if (side) dot.userData.side = side;
        if (currentPlane) dot.userData.plane = currentPlane;
        group.add(dot);
        points.push(point);
        if (points.length >= 2) {
          group.userData = {
            ...group.userData,
            name,
            id,
            points,
          };
          editor.signals.reRender.dispatch();
          dom.removeEventListener('pointerdown', onPointerDown, false);
          currentPlane = undefined;
          side = undefined;

          if (setValuePackagePoints) {
            setValuePackagePoints(points[0].distanceTo(points[1]));
          }
          editor.canSelect();

          packages = editor.scene.getObjectByName('Package');
          if (setThreeDData && packages)
            setThreeDData((prev) => {
              return {
                ...prev,
                ['3d']: packages.toJSON(),
              };
            });
        }
        editor.signals.reRender.dispatch();
      }
      editor.select(null);
    }
  };

  obj.currentPackagePoints = (id) => {
    const points = editor.scene.children.find((e) => e.name === 'Points');

    if (!points) return;

    points.children.forEach((el) => {
      const pointId = el.userData?.id;

      if (id !== undefined) {
        const visible = id === pointId;
        el.children.forEach((e) => {
          editor.execute(new SetValueCommand(editor, e, 'visible', visible));
        });
      }
    });
  };

  function lenpoint(point1, point2, length) {
    var dx = point2.x - point1.x;
    var dy = point2.y - point1.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance == 0) return { x: point1.x, y: point1.y };

    var rx = point1.x + ((point2.x - point1.x) * length) / distance;
    var ry = point1.y + ((point2.y - point1.y) * length) / distance;
    return { x: rx, y: ry };
  }

  obj.updatePackagePoints = ({ id, name, value }, setThreeDData) => {
    if (id === undefined) return;
    const points = editor.scene.children.find((e) => e.name === 'Points');

    if (!points) return;
    const point = points.children.find((e) => e.userData.id === id);
    if (!point) return;
    if (name) {
      editor.execute(
        new SetValueCommand(editor, point, 'userData', {
          ...point.userData,
          name,
        })
      );
    }

    // https://stackoverflow.com/questions/41729813/get-coordinate-by-length-between-two-points/41729978

    if (value) {
      let pts = point.userData.points;

      const dot1 = point.children.find((e) => String(e.name) === '0');
      const dot2 = point.children.find((e) => String(e.name) === '1');

      if (!dot1 || !dot2) return;
      let mp = { x: (pts[0].x + pts[1].x) / 2, y: (pts[0].y + pts[1].y) / 2 };
      const pt1 = lenpoint(mp, pts[0], value / 2);
      const pt2 = lenpoint(mp, pts[1], value / 2);

      let x = Math.abs(pts[0].x - pts[1].x);
      let y = Math.abs(pts[0].y - pts[1].y);
      let x1 = Math.abs(pt1.x - pt2.x);
      let y1 = Math.abs(pt1.y - pt2.y);
      let d = { x: x1 - x, y: y1 - y };

      if (dot1.userData.plane === 'Body') {
        let body = editor.scene.getObjectByName('Body');
        editor.execute(
          new SetScaleCommand(
            editor,
            body,
            new THREE.Vector3(
              body.scale.x + d.x,
              body.scale.y + d.y,
              body.scale.z
            )
          )
        );
      } else {
        let legs = editor.scene.getObjectByName('Legs');
        if (legs) {
          [dot1?.userData.side, dot2?.userData?.side].forEach((el, i) => {
            let x, y;
            if (el) {
              if (Number(el) % 2 === 0) x = i === 0 ? pt1.x : pt2.x;
              else y = i === 0 ? pt1.y : pt2.y;

              legs.children.forEach((e) => {
                if (e && String(e.userData?.side) === String(el)) {
                  let pos = new THREE.Vector3().copy(e.position);
                  if (x) pos.x = x;
                  if (y) pos.y = y;
                  editor.execute(new SetPositionCommand(editor, e, pos));
                }
              });
            }
          });
        }
      }

      pts[0] = new THREE.Vector3(pt1.x, pt1.y, pts[0].z);
      pts[1] = new THREE.Vector3(pt2.x, pt2.y, pts[1].z);
      let dotGeometry1 = new THREE.BufferGeometry();
      dotGeometry1.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(pts[0], 3)
      );

      editor.execute(new SetGeometryCommand(editor, dot1, dotGeometry1));

      let dotGeometry2 = new THREE.BufferGeometry();
      dotGeometry2.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(pts[1], 3)
      );

      editor.execute(new SetGeometryCommand(editor, dot2, dotGeometry2));

      editor.execute(
        new SetValueCommand(editor, point, 'userData', {
          ...point.userData,
          points: pts,
        })
      );
    }
    let packages = editor.scene.getObjectByName('Package');
    if (setThreeDData && packages)
      setThreeDData((prev) => {
        return {
          ...prev,
          ['3d']: packages.toJSON(),
        };
      });
  };

  obj.deletePackagePoints = (id) => {
    if (id !== undefined) {
      const points = editor.scene.children.find((e) => e.name === 'Points');

      if (points) {
        const point = points.children.find((e) => e.userData.id === id);

        if (point) {
          editor.execute(new RemoveObjectCommand(editor, point));
        }
      }
    }
  };

  obj.currentPackageLeg = (name) => {
    const packages = editor.scene.children.find((e) => e.name === 'Package');

    if (!packages) return;

    const legs = packages.children.find((e) => e.name === 'Legs');

    if (!legs) return;

    const leg = legs.children.find((e) => e.name === name);

    if (leg) {
      editor.select(leg);
    }
  };

  obj.updatePackageLeg = (object) => {
    const packages = editor.scene.children.find((e) => e.name === 'Package');
    if (!packages) return;

    const legs = packages.children.find((e) => e.name === 'Legs');
    if (!legs) return;

    const leg = legs.children.find((e) => e.name === object.name);
    if (!leg) return;

    if (object.newName) {
      editor.execute(new SetValueCommand(editor, leg, 'name', object.newName));
      delete object.newName;
    }
    delete object.name;
    editor.execute(
      new SetValueCommand(editor, leg, 'userdata', {
        ...leg.userData,
        ...object,
      })
    );
  };

  obj.savePackage = async (setSavePackage, setSnapshot, setVideo, setFile) => {
    let file = {};
    let formData = editor.scene.userData.formData;

    editor.execute(
      new SetValueCommand(editor, editor.scene, 'userData', {
        ...editor.scene.userData,
        viewType: 'gg',
      })
    );

    if (!formData) return;
    async function renderPackage(viewType, name) {
      let output;
      obj.renderPackage(
        formData,
        viewType,
        'saveFile',
        null,
        null,
        async (data) => {
          if (!data) return undefined;
          output = data.toJSON();

          file[name] = JSON.stringify(output);
          if (viewType === '3d') {
            if (setSnapshot !== undefined) {
              editor.signals.getsnapshot.dispatch(new THREE.Vector3(0, 0, 0));
              if (setSnapshot) setSnapshot(editor.snapshot);
              editor.snapshot = null;
            }

            if (setFile) {
              var exporter = new GLTFExporter();
              exporter.parse(
                editor.scene,
                function (result) {
                  const file = new File([result], 'gltf', {
                    type: 'text/plain',
                  });
                  setFile(file);
                },

                { binary: true }
              );
            }
          }

          let videoStream = canvas.captureStream(60);
          let mediaRecorder = new MediaRecorder(videoStream);

          var chunks = [];
          mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
          };
          mediaRecorder.onstop = function () {
            let blob = new Blob(chunks, { type: 'video/mp4' }); // other types are available such as 'video/webm' for instance, see the doc for more info

            let data = new File([blob], 'video', { type: 'video/mp4' });
            if (setVideo) setVideo(data);

            chunks = [];
          };

          let speed = 10;
          let rotation = 0;
          async function animate() {
            rotation += speed;
            editor.execute(
              new SetRotationCommand(
                editor,
                editor.scene,
                new THREE.Euler(0, rotation * THREE.MathUtils.DEG2RAD, 0)
              )
            );
            // packages.rotation.y += rotation * THREE.MathUtils.DEG2RAD;

            if (rotation <= 360) {
              return new Promise((resolve) => {
                requestAnimationFrame(resolve);
              }).then(animate);
            } else {
              mediaRecorder.stop();
              return Promise.resolve();
            }
          }

          if (Object.keys(file).length === 3) {
            setSavePackage(file);

            if (setVideo !== undefined) {
              mediaRecorder.start();
              return animate();
            }
          }
        }
      );
    }

    await renderPackage('schematic', 'schematic');
    await renderPackage('2d', 'twoD');
    await renderPackage('3d', 'threeD');
  };

  obj.animateUserGeneral = async (setVideo) => {
    editor.signals.rotateCamera.dispatch(new THREE.Vector3(0, 0, 0));
    editor.cannotSelect();
    let childs = [];

    let pcb = editor.scene.children.filter((e) => e.name === 'Pcb');
    if (pcb) childs = [...childs, ...pcb];

    let cover = editor.scene.children.filter((e) => e.name === 'Cover');
    if (cover) childs = [...childs, ...cover];

    let arr = editor.scene.children.filter(
      (e) => !['Cover', 'Pcb', 'DefaultPointLight', 'Points'].includes(e.name)
    );
    if (arr) childs = [...childs, ...arr];

    let points = editor.scene.children.find((e) => e.name === 'Points')
      ?.userData?.points;

    let videoStream = canvas.captureStream(60);
    let mediaRecorder = new MediaRecorder(videoStream);

    var chunks = [];
    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = function () {
      let blob = new Blob(chunks, { type: 'video/mp4' }); // other types are available such as 'video/webm' for instance, see the doc for more info

      let data = new File([blob], 'video', { type: 'video/mp4' });
      if (setVideo) setVideo(data);
      chunks = [];
    };

    function visibleParents(visible) {
      if (arr)
        arr.forEach((el) => {
          if (el)
            editor.execute(new SetValueCommand(editor, el, 'visible', visible));
        });

      // editor.execute(new SetValueCommand(editor, cover, 'visible', visible));
    }
    //making pcb and cover invisible
    visibleParents(false);

    let position;
    let z = 10;
    const center = new THREE.Vector3(0, 0, 0);

    //calculating position of parts based on points
    if (points) {
      if (points[0]) {
        points[1] = points[1] ? points[1] : new THREE.Vector3(0, 0, 0);
        let newPoint = lenpoint(
          points[1],
          points[0],
          new THREE.Vector3(points[1].x, points[1].y, points[1].z).distanceTo(
            center
          ) + 15
        );
        position = new THREE.Vector3(newPoint.x, newPoint.y, z);
      }
    }

    // calculationg position for parts where to start if points exists else reandom points
    function pos() {
      if (position) return position;
      var randomPoint = new THREE.Vector2(
        Math.ceil(Math.random() * 3) * (Math.round(Math.random()) ? 1 : -1),
        Math.ceil(Math.random() * 3) * (Math.round(Math.random()) ? 1 : -1),
        z
      );
      let newPoint = lenpoint(center, randomPoint, 15);
      return new THREE.Vector3(newPoint.x, newPoint.y, z);
    }

    //positioning all parts outside editor
    function setPos(obj, pos) {
      if (!obj.userData?.originalPosition)
        editor.execute(
          new SetValueCommand(editor, obj, 'userData', {
            ...obj.userData,
            originalPosition: new THREE.Vector3().copy(obj.position),
          })
        );
      editor.execute(new SetValueCommand(editor, obj, 'visible', false));
      editor.execute(new SetPositionCommand(editor, obj, pos));
    }

    //animating parts to place it in exact position
    async function resetPos(obj) {
      editor.execute(new SetValueCommand(editor, obj, 'visible', true));
      const p = obj.userData?.originalPosition;
      let currentP = new THREE.Vector3().copy(obj.position);

      const pts = points ? [...points] : [];
      if (p) {
        pts.push(p);
      } else {
        pts.push(center);
      }
      let currentPts = 0;

      let left = currentP.x <= pts[currentPts].x;
      let bot = currentP.y <= pts[currentPts].y;

      let completed = { x: false, y: false, z: false };

      return animation();

      async function animation() {
        let speed = editor.scene.userData?.animationSpeed;
        speed = speed ? speed : 0.5;

        if (!completed.x) {
          if (left) {
            if (currentP.x <= pts[currentPts].x) {
              currentP.x += speed;
            } else {
              currentP.x = pts[currentPts].x;
              completed.x = true;
            }
          } else {
            if (currentP.x >= pts[currentPts].x) {
              currentP.x -= speed;
            } else {
              currentP.x = pts[currentPts].x;
              completed.x = true;
            }
          }
        }

        if (!completed.y) {
          if (bot) {
            if (currentP.y <= pts[currentPts].y) {
              currentP.y += speed;
            } else {
              currentP.y = pts[currentPts].y;
              completed.y = true;
            }
          } else {
            if (currentP.y >= pts[currentPts].y) {
              currentP.y -= speed;
            } else {
              currentP.y = pts[currentPts].y;
              completed.y = true;
            }
          }
        }

        if (!completed.z) {
          if (currentP.z >= pts[currentPts].z) {
            currentP.z -= speed;
          } else {
            currentP.z = pts[currentPts].z;
            completed.z = true;
          }
        }

        editor.execute(
          new SetPositionCommand(
            editor,
            obj,
            new THREE.Vector3().copy(currentP)
          )
        );

        if (completed.x && completed.y && completed.z && pts[currentPts + 1]) {
          left = pts[currentPts].x <= pts[currentPts + 1].x;
          bot = pts[currentPts].y <= pts[currentPts + 1].y;

          completed = { x: false, y: false, z: false };
          currentPts++;
        }

        if (!(completed.x && completed.y && completed.z)) {
          return new Promise((resolve) => {
            requestAnimationFrame(resolve);
          }).then(animation);
        } else {
          return Promise.resolve();
        }
      }
    }

    //showing/original position or hiding/positioning outside the parts
    async function visibleChilds(visible) {
      const position = async (obj, p) => {
        if (visible) {
          await resetPos(obj);
        } else {
          setPos(obj, p);
        }
      };

      if (childs) {
        for (let y = 0; y < childs.length; y++) {
          if (childs[y].name === 'Cover') {
            for (let i = 0; i < childs[y].children.length; i++)
              await position(childs[y].children[i], pos());
          } else if (childs[y].name === 'Pcb') {
            const layer1 = childs[y].children.find((e) => e.name === 'Layer1');
            if (layer1) {
              const layers = childs[y].children.filter(
                (e) => e.name.includes('Layer') && e.name !== 'Layer1'
              );
              let core = layer1.children.find((e) => e.name === 'Core');
              const others = childs[y].children.filter(
                (e) => !e.name.includes('Layer')
              );
              const l1Childs = layer1.children.filter(
                (e) => e.name !== 'Packages' && e.name !== 'Core'
              );
              const packages = layer1.children.find(
                (e) => e.name === 'Packages'
              );

              core = core ? [core] : [];
              let arr = [...layers, ...core];
              let layerPos = pos();

              for (let i = 0; i < arr.length; i++)
                await position(arr[i], layerPos);

              for (let i = 0; i < others.length; i++)
                await position(others[i], pos());

              for (let i = 0; i < l1Childs.length; i++)
                await position(l1Childs[i], pos());

              if (packages)
                for (let i = 0; i < packages.children.length; i++)
                  await position(packages.children[i], pos());
            } else {
              await position(childs[y], pos());
            }
          } else {
            await position(childs[y], pos());
          }
        }
      }

      // if (cover)
      //   for (let i = 0; i < cover.children.length; i++)
      //     await position(cover.children[i], pos());

      // if (pcb) {
      //   const layers = pcb.children.filter(
      //     (e) => e.name.includes('Layer') && e.name !== 'Layer1'
      //   );
      //   const layer1 = pcb.children.find((e) => e.name === 'Layer1');
      //   let core = layer1.children.find((e) => e.name === 'Core');
      //   const others = pcb.children.filter((e) => !e.name.includes('Layer'));
      //   const l1Childs = layer1.children.filter(
      //     (e) => e.name !== 'Packages' && e.name !== 'Core'
      //   );
      //   const packages = layer1.children.find((e) => e.name === 'Packages');

      //   core = core ? [core] : [];
      //   let arr = [...layers, ...core];
      //   let layerPos = pos();

      //   for (let i = 0; i < arr.length; i++) await position(arr[i], layerPos);

      //   for (let i = 0; i < others.length; i++)
      //     await position(others[i], pos());

      //   for (let i = 0; i < l1Childs.length; i++)
      //     await position(l1Childs[i], pos());

      //   if (packages)
      //     for (let i = 0; i < packages.children.length; i++)
      //       await position(packages.children[i], pos());
      // }
    }

    async function animate() {
      visibleParents(false);

      await visibleChilds(false);

      setTimeout(async () => {
        mediaRecorder.start();
        await visibleChilds(true);
        setTimeout(() => {
          mediaRecorder.stop();
        }, 1000);
      }, 1000);

      visibleParents(true);
    }

    await animate();
    editor.canSelect();
  };

  obj.renderUserGeneral = async () => {
    //loading cover if it doesn't exists
    // let cover = editor.scene.getObjectByName('Cover');
    // if (!cover) {
    //   const ncover = await load(cover3d);
    //   if (ncover) {
    //     const group = new THREE.Group();
    //     group.name = 'Cover';
    //     group.visible = false;
    //     ncover.children.forEach((el) => {
    //       group.add(el);
    //     });
    //     group.scale.copy(
    //       new THREE.Vector3(pcbScale.x, pcbScale.y, group.scale.z)
    //     );
    //     editor.addObject(group);
    //     cover = group;
    //   }
    // }
    //loading pcb if doesn't exists
    // let pcb = editor.scene.getObjectByName('Pcb');
    // if (!pcb) {
    //   const npcb = await load(pcb3d);
    //   if (npcb) {
    //     const group = new THREE.Group();
    //     group.name = 'Pcb';
    //     group.visible = false;
    //     group.children = npcb.children;
    //     editor.addObject(group);
    //     pcb = group;
    //   }
    // }

    let pcb = editor.scene.children.filter((e) => e.name === 'Pcb');
    let packages = editor.scene.children.filter((e) => e.name === 'Package');
    let cover = editor.scene.children.filter((e) => e.name === 'Cover');

    if (pcb)
      pcb.forEach((el) => {
        editor.execute(new SetValueCommand(editor, el, 'visible', true));
      });
    if (packages)
      packages.forEach((el) => {
        editor.execute(new SetValueCommand(editor, el, 'visible', true));
      });
    if (cover)
      cover.forEach((el) => {
        editor.execute(new SetValueCommand(editor, el, 'visible', true));
      });

    await obj.animateUserGeneral();
  };

  obj.renderUserElectronic = async () => {
    let pcb = editor.scene.children.filter((e) => e.name === 'Pcb');
    let packages = editor.scene.children.filter((e) => e.name === 'Package');
    let cover = editor.scene.children.filter((e) => e.name === 'Cover');

    if (pcb)
      pcb.forEach((el) => {
        editor.execute(new SetValueCommand(editor, el, 'visible', true));
      });
    if (packages)
      packages.forEach((el) => {
        editor.execute(new SetValueCommand(editor, el, 'visible', true));
      });
    if (cover)
      cover.forEach((el) => {
        editor.execute(new SetValueCommand(editor, el, 'visible', false));
      });
  };

  obj.renderUserCover = async () => {
    let pcb = editor.scene.children.filter((e) => e.name === 'Pcb');
    let packages = editor.scene.children.filter((e) => e.name === 'Package');
    let cover = editor.scene.children.filter((e) => e.name === 'Cover');

    if (pcb)
      pcb.forEach((el) => {
        editor.execute(new SetValueCommand(editor, el, 'visible', false));
      });
    if (packages)
      packages.forEach((el) => {
        editor.execute(new SetValueCommand(editor, el, 'visible', false));
      });
    if (cover)
      cover.forEach((el) => {
        editor.execute(new SetValueCommand(editor, el, 'visible', true));
      });
  };

  obj.setAnimationSpeed = (animationSpeed) => {
    animationSpeed = Number(animationSpeed);
    if (animationSpeed) {
      editor.execute(
        new SetValueCommand(editor, editor.scene, 'userData', {
          ...editor.scene.userData,
          animationSpeed,
        })
      );
    }
  };

  obj.drawPoints = () => {
    const pointsGroup = editor.scene.children.find((e) => e.name === 'Points');
    let points = [];
    let group;

    dom.addEventListener('pointerdown', onPointerDown, false);
    document.addEventListener('keydown', onEnter, false);

    create2dPlane(1);

    function onPointerDown(e) {
      if (!points[0]) {
        if (pointsGroup)
          editor.execute(new RemoveObjectCommand(editor, pointsGroup));

        group = new THREE.Group();
        group.name = 'Points';
        group.userData.selectParent = true;
        editor.addObject(group);
      }

      const point = getCoordinatesFromPlane(e.clientX, e.clientY, plane2d);
      if (point) {
        let dotGeometry = new THREE.BufferGeometry();
        dotGeometry.setAttribute(
          'position',
          new THREE.Float32BufferAttribute(point, 3)
        );
        let dotMaterial = new THREE.PointsMaterial({
          size: 6,
          sizeAttenuation: false,
        });
        let dot = new THREE.Points(dotGeometry, dotMaterial);
        dotGeometry.computeBoundingSphere();
        const center = new THREE.Vector3().copy(
          dotGeometry.boundingSphere.center
        );

        dotGeometry.center();
        dot.position.copy(center);
        dot.name = String(points.length + 1);
        group.add(dot);
        points.push(point);

        group.userData = {
          ...group.userData,
          points,
        };
        editor.signals.reRender.dispatch();
      }
    }

    function onEnter(e) {
      if (e.code === 'Enter') {
        exit();
      }
    }

    function exit() {
      dom.removeEventListener('pointerdown', onPointerDown, false);
      document.removeEventListener('keydown', onEnter, false);
      destroy2dPlane();

      obj.animateUserGeneral();
    }
  };

  obj.loadFile = async ({ id, type, file }) => {
    if (!id || !file || !type) return;

    if (file?.snapshot) delete file.snapshot;
    let packages = await load(file);

    if (packages) {
      if (packages.name === 'Package') {
        packages.scale.copy(new THREE.Vector3(0.3, 0.3, 1));
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
      }

      editor.addObject(packages);
    }
  };

  obj.setLegValues = (values) => {
    values = values?.leg_meaning;

    const packages = editor.scene.children.find((e) => e.name === 'Package');
    if (!packages) return;

    if (values)
      editor.execute(
        new SetValueCommand(editor, editor.scene, 'userData', {
          ...editor.scene.userData,
          values,
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

  obj.drawDot = () => {
    create2dPlane();

    dom.addEventListener('pointerdown', onPointerDown, false);
    function onPointerDown(e) {
      const point = getCoordinatesFromPlane(e.clientX, e.clientY, plane2d);

      let dotGeometry = new THREE.BufferGeometry();
      dotGeometry.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(point, 3)
      );
      let dotMaterial = new THREE.PointsMaterial({
        size: 6,
        sizeAttenuation: false,
      });
      let dot = new THREE.Points(dotGeometry, dotMaterial);
      dotGeometry.computeBoundingSphere();
      const center = new THREE.Vector3().copy(
        dotGeometry.boundingSphere.center
      );

      dotGeometry.center();
      dot.position.copy(center);
      dot.name = 'Dot';
      dot.userData = {
        ...dot.userData,
        hideTransformControls: {
          translate: 'z',
          rotate: 'xy',
          scale: 'z',
        },
      };

      groupObjects(editor.scene, 'Dots', dot);
      destroy2dPlane();
      setTimeout(() => {
        editor.select(null);
      }, 100);
      dom.removeEventListener('pointerdown', onPointerDown, false);
    }
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

  obj.renderAnimation = async (setVideo, setSnapshot) => {
    if (setSnapshot) {
      editor.signals.getsnapshot.dispatch(new THREE.Vector3(0, 0, 0));
      if (setSnapshot) setSnapshot(editor.snapshot);
      editor.snapshot = null;
    }

    let videoStream = canvas.captureStream(60);
    let mediaRecorder = new MediaRecorder(videoStream);
    var chunks = [];
    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };
    mediaRecorder.onstop = function () {
      let blob = new Blob(chunks, { type: 'video/mp4' }); // other types are available such as 'video/webm' for instance, see the doc for more info

      // let url = URL.createObjectURL(blob);

      let data = new File([blob], 'video', { type: 'video/mp4' });
      if (setVideo) setVideo(data);

      editor.execute(
        new SetRotationCommand(editor, editor.scene, new THREE.Euler(0, 0, 0))
      );

      chunks = [];
    };

    let speed = 10;
    let rotation = 0;
    async function animate() {
      rotation = rotation + speed;
      editor.execute(
        new SetRotationCommand(
          editor,
          editor.scene,
          new THREE.Euler(0, rotation * THREE.MathUtils.DEG2RAD, 0)
        )
      );
      // packages.rotation.y += rotation * THREE.MathUtils.DEG2RAD;

      if (rotation <= 360) {
        return new Promise((resolve) => {
          requestAnimationFrame(resolve);
        }).then(animate);
      } else {
        editor.execute(
          new SetRotationCommand(
            editor,
            editor.scene,
            new THREE.Euler(0, 360 * THREE.MathUtils.DEG2RAD, 0)
          )
        );
        return Promise.resolve();
      }
    }

    // setTimeout(()=> {

    // })
    mediaRecorder.start();
    await animate();
    mediaRecorder.stop();
  };

  obj.deleteObject = (name) => {
    if (!name) return;

    const object = editor.scene.getObjectByName(name);

    if (object) editor.execute(new RemoveObjectCommand(editor, object));
  };

  obj.hideObjects = (names, visible) => {
    if (!names || visible === undefined) return;
    editor.select(null);
    names = Array.isArray(names) ? names : [names];

    names.forEach((el) => {
      const object = editor.scene.getObjectByName(el);

      if (object)
        editor.execute(new SetValueCommand(editor, object, 'visible', visible));
    });
  };

  obj.selectLeg = (id) => {
    if (!id) return;
    let legs = editor.scene.getObjectByName('Legs');

    if (!legs) return;

    let leg = legs.children.find((e) => String(e?.userData?.id) === String(id));

    if (leg) editor.select(leg);
  };

  // obj.testLine = () => {
  //   let pts = [
  //     new THREE.Vector3(-1, 0, 0),
  //     new THREE.Vector3(0, 0, 0),
  //     new THREE.Vector3(1, 0, 0),
  //   ];

  //   let geometry = new LineGeometry();
  //   geometry.setPositions(pts);

  //   let matLine = new LineMaterial({
  //     color: 0xffffff,
  //     linewidth: 5, // in pixels
  //     vertexColors: true,
  //     //resolution:  // to be set by renderer, eventually
  //     dashed: false,
  //     alphaToCoverage: true,
  //   });

  //   let line = new Line2(geometry, matLine);
  //   line.computeLineDistances();
  //   line.scale.set(1, 1, 1);

  //   editor.addObject(line);
  // };

  return obj;
}

export default Functions;
