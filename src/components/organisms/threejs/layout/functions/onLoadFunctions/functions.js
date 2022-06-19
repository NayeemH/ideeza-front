import * as THREE from 'three';
import { load } from '../GlobalFunctions';

export async function loadFile(editor, { id, type, file }) {
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
}

export async function loadGltf(editor, { id, type, file }) {
  if (!id || !file || !type) return;

  let loader;
  let { DRACOLoader } = await import(
    'three/examples/jsm/loaders/DRACOLoader.js'
  );
  let { GLTFLoader } = await import('three/examples/jsm/loaders/GLTFLoader.js');

  let dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('../examples/js/libs/draco/gltf/');

  loader = new GLTFLoader();
  loader.setDRACOLoader(dracoLoader);

  if (typeof (file) === "object") {
    if (Object.keys(file).length !== 0) {
      loader.load(file, function (result) {
        let scene = result.scene;
        scene.name = 'Cover';
        scene.animations.push(...result.animations);
        editor.addObject(scene);
      });
    }
  }
  else {
    loader.load(file, function (result) {
      let scene = result.scene;
      scene.name = 'Cover';
      scene.animations.push(...result.animations);
      editor.addObject(scene);
    });
  }
}
