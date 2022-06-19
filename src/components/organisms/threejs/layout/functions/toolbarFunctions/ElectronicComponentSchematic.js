import { RemoveObjectCommand } from '@organisms/threejs/js/commands/RemoveObjectCommand';
import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import {
  create2dPlane,
  destroy2dPlane,
  drawLine,
  getCoordinatesFromPlane,
  groupObjects,
} from '../GlobalFunctions';
// import { MeshLine, MeshLineMaterial, MeshLineRaycast } from 'three.meshline';
function ElectronicComponentSchematic(editor) {
  const dom = editor.container.querySelector('#viewport');
  let obj = {};

  let plane2d;

  obj.drawDot = () => {
    plane2d = create2dPlane(editor);
    dom.addEventListener('pointerdown', onPointerDown, false);
    function onPointerDown(e) {
      const point = getCoordinatesFromPlane(
        editor,
        e.clientX,
        e.clientY,
        plane2d
      );

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

      groupObjects(editor, editor.scene, 'Dots', dot);
      destroy2dPlane(editor, plane2d);
      setTimeout(() => {
        editor.select(null);
      }, 100);
      dom.removeEventListener('pointerdown', onPointerDown, false);
    }
  };

  obj.pcbSchematicConnectionLine = (color = 0xffffff) => {
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
                    document.getElementById("semantic")?.style.cursor = "auto"
                    alert('Multiple connection on same leg');
                    return true;
                  }
                }
              }
            });
          }
          document.getElementById("semantic")?.style.cursor = "auto"
        } else {
          editor.execute(new RemoveObjectCommand(editor, line));
          document.getElementById("semantic")?.style.cursor = "auto"
          alert('Cannot connect same package same leg');
        }
      } else {
        editor.execute(new RemoveObjectCommand(editor, line));
        document.getElementById("semantic")?.style.cursor = "auto"
        alert('Must have connection with two legs');
      }
      destroy2dPlane(editor, plane2d);
    };

    plane2d = create2dPlane(editor);
    drawLine(
      editor,
      'ConnectionLine',
      // 0xffffff,
      color,
      500,
      [plane2d, ...packageLegs],
      ['Legs'],
      { packageId: 'Package', legId: 'Legs' },
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

  obj.testLine = () => {
    const geometry = new LineGeometry();
    // let positions = new Float32Array((max + 1) * 3);
    let positions = [-1, 0, 0, 0, -1, 0, 1, 1, 0];
    geometry.setPositions(positions);
    // let points = [
    //   new THREE.Vector3(-1, 0, 0),
    //   new THREE.Vector3(0, -1, 0),
    //   new THREE.Vector3(1, 1, 0),
    // ];

    // const canvas = editor.container.querySelector('#viewport canvas');
    // const line = new MeshLine();
    // line.setPoints(positions);
    // const material = new MeshLineMaterial({
    //   lineWidth: 0.2,
    //   sizeAttenuation: 1,
    //   transparent: true,
    //   resolution: new THREE.Vector2(canvas.clientWidth, canvas.clientHeight),
    // });
    // const mesh = new THREE.Mesh(line, material);
    // mesh.raycast = MeshLineRaycast;
    // console.log(mesh);
    // editor.addObject(mesh);

    var matLine = new LineMaterial({
      color: 0xc72785,
      linewidth: 20, // in pixels
    });
    geometry.setAttribute(
      'linewidth',
      new THREE.InstancedBufferAttribute(new Float32Array(3), 1)
    );

    let line = new Line2(geometry, matLine);
    line.computeLineDistances();
    line.scale.set(1, 1, 1);
    line.name = 'line';
    // console.log(line);
    editor.addObject(line);
  };

  return obj;
}

export default ElectronicComponentSchematic;
