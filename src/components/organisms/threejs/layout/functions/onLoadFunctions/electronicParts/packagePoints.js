import * as THREE from 'three';
import { SetValueCommand } from '@organisms/threejs/js/commands/SetValueCommand';
import {
  getCoordinatesFromPlane,
  groupObjects,
  lenpoint,
} from '../../GlobalFunctions';
import { RemoveObjectCommand } from '@organisms/threejs/js/commands/RemoveObjectCommand';
import { SetPositionCommand } from '@organisms/threejs/js/commands/SetPositionCommand';
import { SetScaleCommand } from '@organisms/threejs/js/commands/SetScaleCommand';
import { SetGeometryCommand } from '@organisms/threejs/js/commands/SetGeometryCommand';

export function addPackagePoints(
  editor,
  { name, id },
  setValuePackagePoint,
  threeDData
) {
  if (id === undefined || name === undefined) return;
  let packages = editor.scene.getObjectByName('Package');
  if (!packages) return;

  const dom = document.querySelector('#viewport');
  dom.addEventListener('pointerdown', onPointerDown, false);
  let points = [];

  editor.cannotSelect();

  const group = new THREE.Group();
  group.name = 'Point';
  groupObjects(editor, editor.scene, 'Points', group);

  let currentPlane;
  let side;
  function onPointerDown(e) {
    const data = getCoordinatesFromPlane(
      editor,
      e.clientX,
      e.clientY,
      packages,
      ['Body', 'Legs']
    );
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

        if (setValuePackagePoint) {
          setValuePackagePoint(points[0].distanceTo(points[1]));
        }
        editor.canSelect();

        packages = editor.scene.getObjectByName('Package');
        if (threeDData && packages)
          threeDData.current = {
            ...threeDData?.current,
            ['3d']: packages.toJSON(),
          };
      }
      editor.signals.reRender.dispatch();
    }
    editor.select(null);
  }
}

export function currentPackagePoints(editor, id) {
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
}

export function updatePackagePoints(editor, { id, name, value }, threeDData) {
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
  if (threeDData && packages)
    threeDData.current = {
      ...threeDData?.current,
      ['3d']: packages.toJSON(),
    };
}

export function deletePackagePoints(editor, id) {
  if (id !== undefined) {
    const points = editor.scene.children.find((e) => e.name === 'Points');

    if (points) {
      const point = points.children.find((e) => e.userData.id === id);

      if (point) {
        editor.execute(new RemoveObjectCommand(editor, point));
      }
    }
  }
}
