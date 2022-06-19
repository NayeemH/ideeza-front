import * as THREE from 'three';
import { AddObjectCommand } from '@organisms/threejs/js/commands/AddObjectCommand';
import { SetScaleCommand } from '@organisms/threejs/js/commands/SetScaleCommand';
import { SetRotationCommand } from '@organisms/threejs/js/commands/SetRotationCommand';
import {
  create2dPlane,
  destroy2dPlane,
  getCoordinatesFromPlane,
} from '../GlobalFunctions';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';

function TwoD(editor) {
  const dom = editor.container.querySelector('#viewport');

  let obj = {};

  let camera = editor.camera;
  let plane2d;
  let plane2dRaycaster = new THREE.Raycaster();

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
    plane2d = create2dPlane(editor);

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
        .filter((el) => el.object.type !== 'Line');

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
      point = getCoordinatesFromPlane(editor, e.clientX, e.clientY, plane2d);
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

      destroy2dPlane(editor, plane2d);
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
    plane2d = create2dPlane(editor);

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
            editor,
            ox + mouse[0].x,
            oy + mouse[0].y,
            plane2d
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
            editor,
            ox + mouse[1].x,
            oy + mouse[1].y,
            plane2d
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
                  editor,
                  ox + (mouse[0].x + mouse[1].x) / 2,
                  oy + (mouse[0].y + mouse[1].y) / 2,
                  plane2d
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
        point = getCoordinatesFromPlane(editor, e.clientX, e.clientY, plane2d);
      }

      if (count === 2) {
        // hor = x, ver = y
        setParallelPoints(e);

        const oPoint1 = getCoordinatesFromPlane(
          editor,
          ox + mouse[0].x,
          oy + mouse[0].y,
          plane2d
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
          editor,
          ox + mouse[1].x,
          oy + mouse[1].y,
          plane2d
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
              editor,
              ox + (mouse[0].x + mouse[1].x) / 2,
              oy + (mouse[0].y + mouse[1].y) / 2,
              plane2d
            )
          );
        }

        editor.signals.reRender.dispatch();
      }
    }

    function exit() {
      dom.removeEventListener('pointerdown', onPointerDown, false);
      dom.removeEventListener('pointermove', onPointerMove, false);
      destroy2dPlane(editor, plane2d);
      point = null;
      points = [];
      mouse = [];
    }
  };

  return obj;
}

export default TwoD;
