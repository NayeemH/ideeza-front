import * as THREE from 'three';

import { TGALoader } from 'three/examples/jsm/loaders/TGALoader.js';
// const TGALoader = window.TGALoader;

import { AddObjectCommand } from './commands/AddObjectCommand.js';
import { SetSceneCommand } from './commands/SetSceneCommand.js';

import { LoaderUtils } from './LoaderUtils.js';

import { unzipSync, strFromU8 } from 'three/examples/jsm/libs/fflate.module.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
// const { unzipSync, strFromU8 } = window.fflate;

function Loader(editor) {
  let scope = this;

  this.texturePath = '';

  this.loadItemList = function (items, setLoading, setLoaderObj) {
    LoaderUtils.getFilesFromItemList(items, function (files, filesMap) {
      scope.loadFiles(files, filesMap, setLoading, setLoaderObj);
    });
  };

  this.loadFiles = function (files, filesMap, setLoading, setLoaderObj) {
    if (files.length > 0) {
      filesMap = filesMap || LoaderUtils.createFilesMap(files);

      let manager = new THREE.LoadingManager();
      manager.setURLModifier(function (url) {
        url = url.replace(/^(\.?\/)/, ''); // remove './'

        let file = filesMap[url];

        if (file) {
          // console.log('Loading', url);

          return URL.createObjectURL(file);
        }

        return url;
      });

      manager.addHandler(/\.tga$/i, new TGALoader());

      for (let i = 0; i < files.length; i++) {
        if (i === files.length - 1) {
          scope.loadFile(files[i], manager, setLoading, setLoaderObj);
        } else {
          scope.loadFile(files[i], manager, setLoading, setLoaderObj);
        }
      }
    }
  };

  this.loadFile = function (file, manager, setLoading, setLoaderObj) {
    let filename = file.name;
    let extension = filename.split('.').pop().toLowerCase();

    let reader = new FileReader();
    // reader.addEventListener('progress', function (event) {
    //   let size = '(' + Math.floor(event.total / 1000).format() + ' KB)';
    //   let progress = Math.floor((event.loaded / event.total) * 100) + '%';

    //   if (progress) console.log('Loading', filename, size, progress);
    // });

    switch (extension) {
      case '3dm':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let { Rhino3dmLoader } = await import(
              'three/examples/jsm/loaders/3DMLoader.js'
            );

            let loader = new Rhino3dmLoader();
            loader.setLibraryPath('../examples/jsm/libs/rhino3dm/');
            loader.parse(contents, function (object) {
              editor.execute(new AddObjectCommand(editor, object));
              if (setLoading) setLoading(false);
            });
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case '3ds':
        reader.addEventListener(
          'load',
          async function (event) {
            let { TDSLoader } = await import(
              'three/examples/jsm/loaders/TDSLoader.js'
            );

            let loader = new TDSLoader();
            let object = loader.parse(event.target.result);

            editor.execute(new AddObjectCommand(editor, object));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case '3mf':
        reader.addEventListener(
          'load',
          async function (event) {
            let { ThreeMFLoader } = await import(
              'three/examples/jsm/loaders/3MFLoader.js'
            );

            let loader = new ThreeMFLoader();
            let object = loader.parse(event.target.result);

            editor.execute(new AddObjectCommand(editor, object));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case 'amf':
        reader.addEventListener(
          'load',
          async function (event) {
            let { AMFLoader } = await import(
              'three/examples/jsm/loaders/AMFLoader.js'
            );

            let loader = new AMFLoader();
            let amfobject = loader.parse(event.target.result);

            editor.execute(new AddObjectCommand(editor, amfobject));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case 'dae':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let { ColladaLoader } = await import(
              'three/examples/jsm/loaders/ColladaLoader.js'
            );

            let loader = new ColladaLoader(manager);
            let collada = loader.parse(contents);

            collada.scene.name = filename;

            editor.execute(new AddObjectCommand(editor, collada.scene));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsText(file);

        break;

      case 'drc':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let { DRACOLoader } = await import(
              'three/examples/jsm/loaders/DRACOLoader.js'
            );

            let loader = new DRACOLoader();
            loader.setDecoderPath('../examples/js/libs/draco/');
            loader.decodeDracoFile(contents, function (geometry) {
              let object;

              if (geometry.index !== null) {
                let material = new THREE.MeshStandardMaterial();

                object = new THREE.Mesh(geometry, material);
                object.name = filename;
              } else {
                let material = new THREE.PointsMaterial({ size: 0.01 });
                material.vertexColors = geometry.hasAttribute('color');

                object = new THREE.Points(geometry, material);
                object.name = filename;
              }

              loader.dispose();
              editor.execute(new AddObjectCommand(editor, object));
              if (setLoading) setLoading(false);
            });
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case 'fbx':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let { FBXLoader } = await import(
              'three/examples/jsm/loaders/FBXLoader.js'
            );

            let loader = new FBXLoader(manager);
            let object = loader.parse(contents);

            editor.execute(new AddObjectCommand(editor, object));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case 'glb':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let { DRACOLoader } = await import(
              'three/examples/jsm/loaders/DRACOLoader.js'
            );
            let { GLTFLoader } = await import(
              'three/examples/jsm/loaders/GLTFLoader.js'
            );

            let dracoLoader = new DRACOLoader();
            dracoLoader.setDecoderPath('../examples/js/libs/draco/gltf/');

            let loader = new GLTFLoader();
            loader.setDRACOLoader(dracoLoader);
            loader.parse(contents, '', function (result) {
              let scene = result.scene;
              scene.name = filename;

              scene.animations.push(...result.animations);
              editor.execute(new AddObjectCommand(editor, scene));
              if (setLoading) setLoading(false);
            });
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case 'gltf':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let loader;

            if (isGLTF1(contents)) {
              alert(
                'Import of glTF asset not possible. Only versions >= 2.0 are supported. Please try to upgrade the file to glTF 2.0 using glTF-Pipeline.'
              );
            } else {
              let { DRACOLoader } = await import(
                'three/examples/jsm/loaders/DRACOLoader.js'
              );
              let { GLTFLoader } = await import(
                'three/examples/jsm/loaders/GLTFLoader.js'
              );

              let dracoLoader = new DRACOLoader();
              dracoLoader.setDecoderPath('../examples/js/libs/draco/gltf/');

              loader = new GLTFLoader(manager);
              loader.setDRACOLoader(dracoLoader);
            }

            loader.parse(contents, '', function (result) {
              let scene = result.scene;
              scene.name = filename;

              scene.animations.push(...result.animations);
              editor.execute(new AddObjectCommand(editor, scene));
              if (setLoading) setLoading(false);
            });
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case 'js':
      case 'json':
        reader.addEventListener(
          'load',
          function (event) {
            let contents = event.target.result;

            // 2.0

            if (contents.indexOf('postMessage') !== -1) {
              let blob = new Blob([contents], { type: 'text/javascript' });
              let url = URL.createObjectURL(blob);

              let worker = new Worker(url);

              worker.onmessage = function (event) {
                event.data.metadata = { version: 2 };
                handleJSON(event.data, setLoading);
              };

              worker.postMessage(Date.now());

              return;
            }

            // >= 3.0

            let data;

            try {
              data = JSON.parse(contents);
            } catch (error) {
              alert(error);
              return;
            }

            handleJSON(data, setLoading);
          },
          false
        );
        reader.readAsText(file);

        break;

      case 'ifc':
        reader.addEventListener(
          'load',
          async function (event) {
            let { IFCLoader } = await import(
              'three/examples/jsm/loaders/IFCLoader.js'
            );

            let loader = new IFCLoader();
            loader.ifcManager.setWasmPath('three/examples/jsm/loaders/ifc/');

            let model = await loader.parse(event.target.result);
            model.mesh.name = filename;

            editor.execute(new AddObjectCommand(editor, model.mesh));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case 'kmz':
        reader.addEventListener(
          'load',
          async function (event) {
            let { KMZLoader } = await import(
              'three/examples/jsm/loaders/KMZLoader.js'
            );

            let loader = new KMZLoader();
            let collada = loader.parse(event.target.result);

            collada.scene.name = filename;

            editor.execute(new AddObjectCommand(editor, collada.scene));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case 'ldr':
      case 'mpd':
        reader.addEventListener(
          'load',
          async function (event) {
            let { LDrawLoader } = await import(
              'three/examples/jsm/loaders/LDrawLoader.js'
            );

            let loader = new LDrawLoader();
            loader.fileMap = {}; // TODO Uh...
            loader.setPath('../../examples/models/ldraw/officialLibrary/');
            loader.parse(event.target.result, undefined, function (group) {
              group.name = filename;
              // Convert from LDraw coordinates: rotate 180 degrees around OX
              group.rotation.x = Math.PI;

              editor.execute(new AddObjectCommand(editor, group));
              if (setLoading) setLoading(false);
            });
          },
          false
        );
        reader.readAsText(file);

        break;

      case 'md2':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let { MD2Loader } = await import(
              'three/examples/jsm/loaders/MD2Loader.js'
            );

            let geometry = new MD2Loader().parse(contents);
            let material = new THREE.MeshStandardMaterial();

            let mesh = new THREE.Mesh(geometry, material);
            mesh.mixer = new THREE.AnimationMixer(mesh);
            mesh.name = filename;

            mesh.animations.push(...geometry.animations);
            editor.execute(new AddObjectCommand(editor, mesh));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case 'obj':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let { OBJLoader } = await import(
              'three/examples/jsm/loaders/OBJLoader.js'
            );

            let object = new OBJLoader().parse(contents);
            object.name = filename;

            editor.execute(new AddObjectCommand(editor, object));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsText(file);

        break;

      case 'ply':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let { PLYLoader } = await import(
              'three/examples/jsm/loaders/PLYLoader.js'
            );

            let geometry = new PLYLoader().parse(contents);
            let object;

            if (geometry.index !== null) {
              let material = new THREE.MeshStandardMaterial();

              object = new THREE.Mesh(geometry, material);
              object.name = filename;
            } else {
              let material = new THREE.PointsMaterial({ size: 0.01 });
              material.vertexColors = geometry.hasAttribute('color');

              object = new THREE.Points(geometry, material);
              object.name = filename;
            }

            editor.execute(new AddObjectCommand(editor, object));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case 'stl':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let { STLLoader } = await import(
              'three/examples/jsm/loaders/STLLoader.js'
            );

            let geometry = new STLLoader().parse(contents);
            let material = new THREE.MeshStandardMaterial();

            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = filename;

            editor.execute(new AddObjectCommand(editor, mesh));
            if (setLoading) setLoading(false);
          },
          false
        );

        if (reader.readAsBinaryString !== undefined) {
          reader.readAsBinaryString(file);
        } else {
          reader.readAsArrayBuffer(file);
        }

        break;

      case 'svg':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let { SVGLoader } = await import(
              'three/examples/jsm/loaders/SVGLoader.js'
            );

            let loader = new SVGLoader();
            let paths = loader.parse(contents).paths;

            //

            let group = new THREE.Group();
            group.scale.multiplyScalar(0.1);
            group.scale.y *= -1;

            for (let i = 0; i < paths.length; i++) {
              let path = paths[i];

              let material = new THREE.MeshBasicMaterial({
                color: path.color,
                depthWrite: false,
              });

              let shapes = SVGLoader.createShapes(path);

              for (let j = 0; j < shapes.length; j++) {
                let shape = shapes[j];

                let geometry = new THREE.ShapeGeometry(shape);
                let mesh = new THREE.Mesh(geometry, material);

                group.add(mesh);
              }
            }

            editor.execute(new AddObjectCommand(editor, group));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsText(file);

        break;

      case 'vox':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let { VOXLoader, VOXMesh } = await import(
              'three/examples/jsm/loaders/VOXLoader.js'
            );

            let chunks = new VOXLoader().parse(contents);

            let group = new THREE.Group();
            group.name = filename;

            for (let i = 0; i < chunks.length; i++) {
              const chunk = chunks[i];

              const mesh = new VOXMesh(chunk);
              group.add(mesh);
            }

            editor.execute(new AddObjectCommand(editor, group));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case 'vtk':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let { VTKLoader } = await import(
              'three/examples/jsm/loaders/VTKLoader.js'
            );

            let geometry = new VTKLoader().parse(contents);
            let material = new THREE.MeshStandardMaterial();

            let mesh = new THREE.Mesh(geometry, material);
            mesh.name = filename;

            editor.execute(new AddObjectCommand(editor, mesh));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case 'wrl':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let { VRMLLoader } = await import(
              'three/examples/jsm/loaders/VRMLLoader.js'
            );

            let result = new VRMLLoader().parse(contents);

            editor.execute(new SetSceneCommand(editor, result));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsText(file);

        break;

      case 'xyz':
        reader.addEventListener(
          'load',
          async function (event) {
            let contents = event.target.result;

            let { XYZLoader } = await import(
              'three/examples/jsm/loaders/XYZLoader.js'
            );

            let geometry = new XYZLoader().parse(contents);

            let material = new THREE.PointsMaterial();
            material.vertexColors = geometry.hasAttribute('color');

            let points = new THREE.Points(geometry, material);
            points.name = filename;

            editor.execute(new AddObjectCommand(editor, points));
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsText(file);

        break;

      case 'zip':
        reader.addEventListener(
          'load',
          function (event) {
            handleZIP(event.target.result, setLoading);
          },
          false
        );
        reader.readAsArrayBuffer(file);

        break;

      case 'lbr':
        reader.addEventListener(
          'load',
          function (event) {
            let contents = event.target.result;

            if (contents) {
              const extract = ([beg, end]) => {
                const matcher = new RegExp(`${beg}(.*?)${end}`, 'gm');
                const normalise = (str) =>
                  str.slice(beg.length, end.length * -1);
                return function (str) {
                  return str.match(matcher).map(normalise);
                };
              };
              let arr = extract(['<', '/>'])(
                contents.replace(/(?:\r\n|\r|\n)/g, '')
              );
              let packages = new THREE.Group();
              packages.name = 'Package';
              packages.userData = {
                ...packages.userData,
                selectParent: true,
                hideTransformControls: {
                  translate: 'z',
                  rotate: 'xy',
                  scale: 'z',
                },
              };

              //desc
              if (setLoaderObj) {
                let desc = arr.find(
                  (e) =>
                    e.includes('attribute') &&
                    (e.toLowerCase().includes(`name="description"`) ||
                      e.toLowerCase().includes(`name='description'`))
                );
                if (desc) {
                  let value;
                  if (desc.includes(`"`)) {
                    value = extract([`value="`, `"`])(desc);
                  } else {
                    value = extract([`value='`, `'`])(desc);
                  }
                  if (value && value[0]) {
                    setLoaderObj((prev) => {
                      return {
                        ...prev,
                        desc: value[0],
                      };
                    });
                  }
                }

                // desc.forEach((e) => {
                //   // let descArr = e
                //   // .trim()
                //   // .replace('<', '')
                //   // .replace('/>', '')
                //   // .split(' ');
                //   // let name;
                //   // descArr.forEach(el => {
                //   //   if (el.includes('name=')) {
                //   //    name = el
                //   //     .split('=')[1]
                //   //     .replace(`"`, '')
                //   //     .replace(`"`, '')
                //   //     .replace(`'`, '')
                //   //     .replace(`'`, '').toLowerCase();
                //   //   }
                //   //   if (el.includes('value=')) {
                //   //     name = el
                //   //     .split('=')[1]
                //   //     .replace(`"`, '')
                //   //     .replace(`"`, '')
                //   //     .replace(`'`, '')
                //   //     .replace(`'`, '').toLowerCase();
                //   //   }
                //   // })
                // });
              }

              //body
              let wire = arr.filter((e) => e.includes('wire'));

              if (wire[0]) {
                let wireArr = wire[0]
                  .trim()
                  .replace('<', '')
                  .replace('/>', '')
                  .split(' ');

                let width, height;
                wireArr.forEach((el) => {
                  if (el.includes('x1=')) {
                    width =
                      (Number(
                        el
                          .split('=')[1]
                          .replace(`"`, '')
                          .replace(`"`, '')
                          .replace(`'`, '')
                          .replace(`'`, '')
                      ) /
                        39.3701) *
                      2;
                  }
                  if (el.includes('y1=')) {
                    height =
                      (Number(
                        el
                          .split('=')[1]
                          .replace(`"`, '')
                          .replace(`"`, '')
                          .replace(`'`, '')
                          .replace(`'`, '')
                      ) /
                        39.3701) *
                      2;
                  }
                });
                let geometry = new THREE.BoxGeometry();
                let body = new THREE.Mesh(
                  geometry,
                  new THREE.MeshPhongMaterial({
                    color: 0x4c4c4c,
                  })
                );
                body.scale.copy(new THREE.Vector3(width, height, 0.01));
                body.name = 'Body';
                packages.add(body);
              }

              //legs
              let legs = new THREE.Group();
              packages.add(legs);
              legs.name = 'Legs';
              let pins = arr.filter((e) => e.includes('pin'));

              pins.forEach((e, i) => {
                let pinArr = e
                  .trim()
                  .replace('<', '')
                  .replace('/>', '')
                  .split(' ');
                let x, y, name;
                let side = 2;
                pinArr.forEach((el) => {
                  if (el.includes('name=')) {
                    name = el
                      .split('=')[1]
                      .replace(`"`, '')
                      .replace(`"`, '')
                      .replace(`'`, '')
                      .replace(`'`, '');
                  }
                  if (el.includes('x=')) {
                    x =
                      Number(
                        el
                          .split('=')[1]
                          .replace(`"`, '')
                          .replace(`"`, '')
                          .replace(`'`, '')
                          .replace(`'`, '')
                      ) / 39.3701;
                  }
                  if (el.includes('y=')) {
                    y =
                      Number(
                        el
                          .split('=')[1]
                          .replace(`"`, '')
                          .replace(`"`, '')
                          .replace(`'`, '')
                          .replace(`'`, '')
                      ) / 39.3701;
                  }
                  if (el.includes('rot=')) {
                    side = 0;
                  }
                });

                const drawLegSchematic = (position, name) => {
                  let leg = new THREE.Group();
                  let geometry = new THREE.BoxGeometry();
                  let mesh = new THREE.Mesh(
                    geometry,
                    new THREE.MeshPhongMaterial({
                      color: 0xeb0ff5,
                    })
                  );
                  mesh.name = 'leg';
                  mesh.scale.copy(new THREE.Vector3(0.15, 0.006, 0.01));
                  mesh.position.copy(position);
                  mesh.rotation.copy(new THREE.Euler(0, 0, 0));
                  leg.add(mesh);

                  //font
                  const loader = new FontLoader();
                  loader.load(
                    '/font/helvetiker_regular.typeface.json',
                    async (font) => {
                      var textShapes = font.generateShapes(`${name}`, 0.015);
                      var textGeometry = new THREE.ShapeBufferGeometry(
                        textShapes
                      );
                      var textMaterial = new THREE.MeshPhongMaterial({
                        color: 0xffffff,
                        side: THREE.DoubleSide,
                      });

                      let text = new THREE.Mesh(textGeometry, textMaterial);

                      textGeometry.center();
                      // text.rotation.copy(camera.rotation);
                      let textPosition = new THREE.Vector3().copy(position);
                      textPosition.y = textPosition.y + 0.084;
                      text.position.copy(textPosition);

                      text.name = 'text';
                      leg.add(text);
                    }
                  );
                  return leg;
                };

                let leg = drawLegSchematic(new THREE.Vector3(x, y, 0), name);
                if (leg) {
                  leg.name = 'Leg';
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
                  };
                  legs.add(leg);
                }
              });

              let prevPackage = editor.scene.children.find(
                (e) => e.name === 'Package'
              );

              if (prevPackage) {
                editor.removeObject(prevPackage);
              }

              if (packages)
                editor.execute(new AddObjectCommand(editor, packages));
            }
            if (setLoading) setLoading(false);
          },
          false
        );
        reader.readAsText(file);

        break;

      default:
        console.error('Unsupported file format (' + extension + ').');

        break;
    }
  };

  function handleJSON(data, setLoading) {
    if (data.metadata === undefined) {
      // 2.0

      data.metadata = { type: 'Geometry' };
    }

    if (data.metadata.type === undefined) {
      // 3.0

      data.metadata.type = 'Geometry';
    }

    if (data.metadata.formatVersion !== undefined) {
      data.metadata.version = data.metadata.formatVersion;
    }

    let loader;
    switch (data.metadata.type.toLowerCase()) {
      case 'buffergeometry':
        loader = new THREE.BufferGeometryLoader();
        var result = loader.parse(data);

        var mesh = new THREE.Mesh(result);

        editor.execute(new AddObjectCommand(editor, mesh));
        if (setLoading) setLoading(false);

        break;

      case 'geometry':
        console.error('Loader: "Geometry" is no longer supported.');

        break;

      case 'object':
        loader = new THREE.ObjectLoader();
        loader.setResourcePath(scope.texturePath);

        loader.parse(data, function (result) {
          if (result.isScene) {
            editor.execute(new SetSceneCommand(editor, result));
          } else {
            editor.execute(new AddObjectCommand(editor, result));
          }
          if (setLoading) setLoading(false);
        });

        break;

      case 'app':
        editor.fromJSON(data);
        if (setLoading) setLoading(false);

        break;
    }
  }

  async function handleZIP(contents, setLoading) {
    let zip = unzipSync(new Uint8Array(contents));
    // Poly

    let keys = Object.keys(zip);

    let obj = keys.find((e) => e.includes('.obj'));
    let mtl = keys.find((e) => e.includes('.mtl'));

    if (obj && mtl && zip[obj] && zip[mtl]) {
      let { MTLLoader } = await import(
        'three/examples/jsm/loaders/MTLLoader.js'
      );
      let { OBJLoader } = await import(
        'three/examples/jsm/loaders/OBJLoader.js'
      );

      let materials = new MTLLoader().parse(strFromU8(zip[mtl]));
      let object = new OBJLoader()
        .setMaterials(materials)
        .parse(strFromU8(zip[obj]));
      editor.execute(new AddObjectCommand(editor, object));
      if (setLoading) setLoading(false);
    }

    //

    for (let path in zip) {
      let file = zip[path];

      let manager = new THREE.LoadingManager();
      manager.setURLModifier(function (url) {
        let file = zip[url];

        if (file) {
          // console.log('Loading', url);

          let blob = new Blob([file.buffer], {
            type: 'application/octet-stream',
          });
          return URL.createObjectURL(blob);
        }

        return url;
      });

      let extension = path.split('.').pop().toLowerCase();
      let loader;
      switch (extension) {
        case 'fbx':
          var { FBXLoader } = await import(
            'three/examples/jsm/loaders/FBXLoader.js'
          );

          loader = new FBXLoader(manager);
          var object = loader.parse(file.buffer);

          editor.execute(new AddObjectCommand(editor, object));

          break;

        case 'glb':
          dracoLoader.setDecoderPath('../examples/js/libs/draco/gltf/');

          loader = new GLTFLoader();
          loader.setDRACOLoader(dracoLoader);

          loader.parse(file.buffer, '', function (result) {
            let scene = result.scene;

            scene.animations.push(...result.animations);
            editor.execute(new AddObjectCommand(editor, scene));
          });

          break;

        case 'gltf':
          var { DRACOLoader } = await import(
            'three/examples/jsm/loaders/DRACOLoader.js'
          );
          var { GLTFLoader } = await import(
            'three/examples/jsm/loaders/GLTFLoader.js'
          );

          var dracoLoader = new DRACOLoader();
          dracoLoader.setDecoderPath('../examples/js/libs/draco/gltf/');

          loader = new GLTFLoader(manager);
          loader.setDRACOLoader(dracoLoader);
          loader.parse(strFromU8(file), '', function (result) {
            let scene = result.scene;

            scene.animations.push(...result.animations);
            editor.execute(new AddObjectCommand(editor, scene));
          });

          break;
      }
    }
  }

  function isGLTF1(contents) {
    let resultContent;

    if (typeof contents === 'string') {
      // contents is a JSON string
      resultContent = contents;
    } else {
      let magic = THREE.LoaderUtils.decodeText(new Uint8Array(contents, 0, 4));

      if (magic === 'glTF') {
        // contents is a .glb file; extract the version
        let version = new DataView(contents).getUint32(4, true);

        return version < 2;
      } else {
        // contents is a .gltf file
        resultContent = THREE.LoaderUtils.decodeText(new Uint8Array(contents));
      }
    }

    let json = JSON.parse(resultContent);

    return json.asset != undefined && json.asset.version[0] < 2;
  }
}

export { Loader };
