import { SetRotationCommand } from '@organisms/threejs/js/commands/SetRotationCommand';
import { SetValueCommand } from '@organisms/threejs/js/commands/SetValueCommand';
import * as THREE from 'three';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';
import { renderPackage } from './renderPackage';

export async function savePackageTypes(
  editor,
  threeDData,
  setSavePackage,
  setSnapshot,
  setVideo,
  setFile
) {
  let file = {};

  editor.execute(
    new SetValueCommand(editor, editor.scene, 'userData', {
      ...editor.scene.userData,
      viewType: 'gg',
    })
  );

  async function renderPackages(viewType, name) {
    // console.log(viewType);
    await renderPackage(
      editor,
      threeDData,
      null,
      viewType,
      'saveFile',
      async (data) => {
        if (!data) return undefined;
        // console.log(data);

        file[name] = data.toJSON();

        //lbr file
        if (viewType === 'schematic') {
          let startStr = `<eagle version="7.1.0">
          <drawing>
          <settings>
          <setting alwaysvectorfont="no"/>
          <setting verticaltext="up"/>
          </settings>
          <grid distance="0.1" unitdist="inch" unit="inch" style="lines" multiple="1" display="no" altdistance="0.01" altunitdist="inch" altunit="inch"/>
          <layers>
          <layer number="94" name="Symbols" color="4" fill="1" visible="yes" active="yes"/>
          <layer number="95" name="Names" color="7" fill="1" visible="yes" active="yes"/>
          <layer number="96" name="Values" color="7" fill="1" visible="yes" active="yes"/>
          </layers>
          <library>
          <symbols>
          <symbol name="${data.name}">`;
          let endStr = `</symbol>
          </symbols>
          </library>
          </drawing>
          </eagle>`;
          let body = data.getObjectByName('Body');
          let scale = new THREE.Vector3().copy(body?.scale);
          scale?.x = scale.x / 2;
          scale?.y = scale.y / 2;

          let str = `<wire x1="-${scale.x * 39.3701}" y1="${
            scale.y * 39.3701
          }" x2="${scale.x * 39.3701}" y2="${
            scale.y * 39.3701
          }" width="0.254" layer="94"/>
          <wire x1="${scale.x * 39.3701}" y1="${scale.y * 39.3701}" x2="${
            scale.x * 39.3701
          }" y2="${-scale.y * 39.3701}" width="0.254" layer="94"/>
          <wire x1="${scale.x * 39.3701}" y1="-${scale.y * 39.3701}" x2="-${
            scale.x * 39.3701
          }" y2="-${scale.y * 39.3701}" width="0.254" layer="94"/>
          <wire x1="-${scale.x * 39.3701}" y1="-${scale.y * 39.3701}" x2="-${
            scale.x * 39.3701
          }" y2="${scale.y * 39.3701}" width="0.254" layer="94"/>`;

          let legs = data.getObjectByName('Legs');
          if (legs) {
            legs.children.forEach((e) => {
              let leg = e.getObjectByName('leg');
              if (leg) {
                str = `${str}
              <pin name="${e.name}" x="${leg.position.x * 39.3701}" y="${
                  leg.position.y * 39.3701
                }" length="middle" ${
                  e?.userData?.side === 0 ? `rot="R180"` : ''
                }/>`;
              }
            });
          }

          var filee = new File(
            [`${startStr}${str}\n${endStr}`],
            'product.lbr',
            {
              type: 'text/plain',
            }
          );

          let url = URL.createObjectURL(filee);
          // console.log(url);
          var downloadLink = document.createElement('a');
          downloadLink.href = url;
          downloadLink.download = 'product.lbr';
          document.body.appendChild(downloadLink);
          // downloadLink.click();
          document.body.removeChild(downloadLink);
        }

        if (viewType === '3d') {
          if (setSavePackage) setSavePackage(file);

          editor.signals.setCameraByAngle.dispatch(
            new THREE.Vector3(-45, 0, 2)
          );
          if (setSnapshot !== undefined) {
            editor.signals.getsnapshot.dispatch();
            setSnapshot(editor.snapshot);
            editor.snapshot = null;
          }

          if (setFile !== undefined) {
            var exporter = new GLTFExporter();
            exporter.parse(data, function (result) {
              const file = new File(
                [JSON.stringify(result, null, 2)],
                'product.gltf',
                {
                  type: 'text/plain',
                }
              );
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
            let video = new File([blob], 'video', { type: 'video/mp4' });
            if (setVideo) setVideo(video);
            chunks = [];
            editor.execute(
              new SetRotationCommand(editor, data, new THREE.Euler(0, 0, 0))
            );
          };

          const timeout = (ms) => {
            return new Promise((resolve) => setTimeout(resolve, ms));
          };

          let speed = 3;
          let rotation = 0;
          const animate = async () => {
            rotation += speed;
            editor.execute(
              new SetRotationCommand(
                editor,
                data,
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
                  data,
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
          };
          if (setVideo !== undefined) {
            mediaRecorder.start();
            await animate();
            if (!videoStream.requestFrame) await timeout(2000);
            mediaRecorder.stop();
          }
        }

        return Promise.resolve();
      }
    );
  }

  await renderPackages('schematic', 'schematic');
  await renderPackages('2d', 'twoD');
  await renderPackages('3d', 'threeD');

  return Promise.resolve();
}
