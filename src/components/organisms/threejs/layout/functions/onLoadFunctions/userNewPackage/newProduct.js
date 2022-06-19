import * as THREE from 'three';
import { SetValueCommand } from '@organisms/threejs/js/commands/SetValueCommand';
import { lenpoint } from '../../GlobalFunctions';
import { SetPositionCommand } from '@organisms/threejs/js/commands/SetPositionCommand';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { pcbDesignViewType } from '../electronicComponent/design';

export async function renderUserGeneral(
  editor,
  electronicFile,
  coverFile,
  noAnimate
) {
  let pcb = editor.scene.children.filter((e) => e.name === 'Pcb');
  if (pcb)
    pcb.forEach((e) => {
      editor.removeObject(e);
    });

  if (electronicFile?.scene) {
    if (electronicFile.scene.userData.viewType === '2d') {
      pcbDesignViewType(electronicFile, '3d');
    }
    let object = electronicFile.scene.clone();
    let packages = new THREE.Group();
    packages.name = 'Pcb';
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
    editor.addObject(packages);

    // electronicFile.scene.children.forEach((el) => {
    //   let obj = editor.scene.children.find((e) => e.uuid === el.uuid);
    //   if (!obj && el?.name !== 'DefaultPointLight') {
    //     editor.addObject(el);
    //   }
    // });
  }

  if (coverFile?.scene) {
    coverFile.scene.children.forEach((el) => {
      let obj = editor.scene.children.find((e) => e.uuid === el.uuid);
      if (!obj && el?.name !== 'DefaultPointLight') {
        editor.addObject(el.clone());
      }
    });
  }

  if (!noAnimate) await animateUserGeneral(editor);
}

export async function animateUserGeneral(editor, setVideo) {
  editor.signals.setCameraByAngle.dispatch(new THREE.Vector3(0, 0, 10));
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

  let points = editor.scene.children.find((e) => e.name === 'Points')?.userData
    ?.points;

  function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
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

    return await animation();

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
        new SetPositionCommand(editor, obj, new THREE.Vector3().copy(currentP))
      );

      if (completed.x && completed.y && completed.z && pts[currentPts + 1]) {
        left = pts[currentPts].x <= pts[currentPts + 1].x;
        bot = pts[currentPts].y <= pts[currentPts + 1].y;

        completed = { x: false, y: false, z: false };
        currentPts++;
      }

      if (videoStream.requestFrame) {
        videoStream.requestFrame();
      } else {
        await timeout(10);
        videoStream.getVideoTracks()[0].requestFrame();
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
            const packages = layer1.children.find((e) => e.name === 'Packages');

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
  }

  async function animate() {
    visibleParents(false);

    await visibleChilds(false);

    await timeout(1000);

    mediaRecorder.start();
    await visibleChilds(true);
    if (!videoStream.requestFrame) await timeout(2000);
    mediaRecorder.stop();

    visibleParents(true);
  }

  await animate();
  editor.canSelect();
}

export async function saveUserGeneral(editor, setCover, setElectronic) {
  let pcb = new THREE.Group();
  let cover = new THREE.Group();
  let arr = [...editor.scene.children];
  arr.forEach((e) => {
    if (e.name === 'Pcb') {
      pcb.add(e.clone());
    } else {
      cover.add(e.clone());
    }
  });
  let electronicPcb = editor.scene.getObjectByName("Packages")
  // if (setElectronic) setElectronic(pcb.toJSON());
  if (setElectronic) setElectronic(electronicPcb.toJSON());
  if (setCover) {
    var exporter = new GLTFExporter();
    exporter.parse(cover, function (result) {
      const file = new File([JSON.stringify(result, null, 2)], 'product.gltf', {
        type: 'text/plain',
      });
      setCover(file);
    });
  }
}
