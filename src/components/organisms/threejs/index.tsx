import React, { useEffect, useRef, useState } from 'react';

import * as THREE from 'three';
import { Editor } from './js/Editor.js';
import { Viewport } from './js/Viewport.js';
import { Toolbar } from './js/Toolbar.js';
// import { Script } from './js/Script.js';
import { Player } from './js/Player.js';
import { Sidebar } from './js/Sidebar.js';
import { Menubar } from './js/Menubar.js';
import { Resizer } from './js/Resizer.js';
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';
// import { MenubarAdd } from './js/Menubar.Add';
import { RemoveObjectCommand } from './js/commands/RemoveObjectCommand';

// import Functions from './layout/Functionss.js';
import MainToolbar from './layout/MainToolbar.js';
import Btns from './layout/Btns.js';

import * as signals from './js/libs/signals.min.js';
import {
  changeText,
  setEditorName,
} from './layout/functions/GlobalFunctions.js';
import StoragePopup from './layout/StoragePopup.js';
import Loader from '@atoms/loader/index';
import {
  loadFile,
  loadGltf,
} from './layout/functions/onLoadFunctions/functions.js';

function ThreeJs({
  editorRef,
  editorName,
  editorFile,
  toolbar,
  hideSidePanel,
  hideInfo,
  setPcbComponents,
  setCurrentLeg,
  viewFile,
  containerClass,
  setEditorLoaded,
  toolbarObj,
  noStorage,
  noPopup,
  setIsRestored,
  noRestore,
  setFile,
  setLoaderStr,
}: any) {
  const threejsRef = useRef(null);

  const editorrRef = useRef<any>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const [selectedObject, setSelectedObject] = useState<any>({});
  const [doubleClickedObject, setDoubleClickedObject] = useState<any>({});

  // const [functions, setFunctions] = useState<any>(null);
  const [addObj, setAddObj] = useState<any>(undefined);
  const [menubar, setMenuBar] = useState();

  const [showPopup, setShowPopup] = useState<any>(false);
  const [popupFunctions, setPopupFunctions] = useState<any>({
    onSave: null,
    onExit: null,
  });

  const [init, setInit] = useState(false);

  const [pcbComponentss, setPcbComponentss] = useState(null);

  const [FileLoading, setFileLoading] = useState(false);

  const [loaderObj, setLoaderObj] = useState<any>({});

  //current editor count: 10
  // useEffect(() => {
  //   console.log("selectedObject", selectedObject)
  //   selectedObject["isSelected"] = true
  // }, [selectedObject])

  useEffect(() => {
    //preventing rerender
    if (init) return;
    setInit(true);

    (window as any).signals = signals;

    (window as any).URL = (window as any).URL || (window as any).webkitURL;
    (window as any).BlobBuilder =
      (window as any).BlobBuilder ||
      (window as any).WebKitBlobBuilder ||
      (window as any).MozBlobBuilder;

    (Number as any).prototype.format = function () {
      return this.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    };

    const editor = new Editor(setSelectedObject);
    (window as any).editor = editor; // Expose editor to Console
    // (window as any).THREE = THREE; // Expose THREE to APP Scripts and Console
    (window as any).VRButton = VRButton; // Expose VRButton to APP Scripts

    editorrRef.current = editor;
    if (editorRef !== undefined) editorRef.current = editor;

    editor.container = threejsRef.current;
    const container: any = threejsRef.current;

    const viewport = new (Viewport as any)(editor, setDoubleClickedObject);
    container.appendChild(viewport.dom);

    // let script = new Script(editor);
    // container.appendChild(script.dom);

    const player = new (Player as any)(editor);
    container.appendChild(player.dom);

    const sidebar = new (Sidebar as any)(editor);
    container.appendChild(sidebar.dom);

    const menubar = new (Menubar as any)(editor);
    setMenuBar(menubar.dom);

    const resizer = new (Resizer as any)(editor, threejsRef);
    container.appendChild(resizer.dom);

    if (!hideSidePanel) {
      const toolbar = new (Toolbar as any)(editor);
      container.appendChild(toolbar.dom);
    }

    // // adding options in toolbar

    // const opts = document.createElement('div');
    // opts.classList.add('options');
    // const opt = [...MenubarAdd(editor).dom.childNodes[1].childNodes].slice(
    //   4,
    //   17
    // );
    // opt.forEach((el) => {
    //   opts.appendChild(el);
    // });
    // document.getElementById('more-shapes').appendChild(opts);
    const editorFileCount = editorFile ? editorFile : 0;
    editor.editorFile = editorFileCount;

    function pcbComponents() {
      if (setPcbComponents) {
        const arr: any = [];

        editor.scene.children.forEach((el: any) => {
          if (
            !el?.name.includes('Layer') &&
            !el?.name.includes('Light') &&
            !el?.name.includes('Pcb2Dborder')
          ) {
            arr.push({
              name: el?.name,
              count: el?.children?.length,
            });
          }
        });

        const layer1 = editor.scene.getObjectByName('Layer1');

        if (layer1) {
          layer1.children.forEach((el: any) => {
            if (!['ConnectionLines', 'Core'].includes(el?.name)) {
              arr.push({
                name: el?.name,
                count: el?.children?.length,
                sceneObjects: layer1?.children[0].children
              });
            }
          });
        }

        setPcbComponentss(arr);
      }
    }

    let timeout: any;

    editor.storage.init(function () {
      if (viewFile) {
        editor.signals.setCameraByAngle.dispatch(new THREE.Vector3(0, 0, 10));
        if (viewFile?.electronic) {
          loadFile(editor, {
            id: 9999,
            type: 'type',
            file: viewFile?.electronic,
          });
        }
        if (viewFile?.cover) {
          loadGltf(editor, { id: 99999, type: 'type', file: viewFile?.cover });
        }
        // load(viewFile).then((res) => {
        //   if (res) editor.addObject(res);
        // });
        return;
      }

      editor.storage.get(editorFileCount, function (state: any) {
        if (isLoadingFromHash) {
          // setTimeout(() => {
          setDataLoaded(true);
          // }, 100);
          return;
        }

        if (state !== undefined) {
          const child = state?.scene?.object?.children;
          let fArr = [];
          if (child && Array.isArray(child)) {
            const arr = [...child];
            fArr = arr.filter((e) => e.name !== 'DefaultPointLight');
          }

          if (noRestore || fArr.length < 1) {
            // setTimeout(() => {
            editor.clear();
            setDataLoaded(true);
            // }, 100);
            return;
          }

          const save = () => {
            editor.fromJSON(state);

            // removing temporary objects if not removed, eg: reloads in middle of polygon mode
            // setTimeout(() => {
            editor.scene.children.forEach((e: any) => {
              if (e.name === 'plane2d' || e.name === 'polygonGroup') {
                editor.execute(new RemoveObjectCommand(editor, e));
              }
            });
            // }, 1000);
            // setTimeout(() => {

            editor.signals.savingFinished.dispatch();

            pcbComponents();
            // }, 1000);

            // setTimeout(() => {
            setDataLoaded(true);
            // }, 100);

            const selected = editor.config.getKey('selected');

            if (selected !== undefined) {
              editor.selectByUuid(selected);
            }
          };

          if (noPopup || editorFileCount === 9999) {
            save();
          } else {
            setPopupFunctions(() => {
              return {
                onSave: () => {
                  save();
                  if (setIsRestored) setIsRestored(true);
                  setShowPopup(false);
                },
                onExit: () => {
                  editor.clear();
                  setDataLoaded(true);
                  setShowPopup(false);
                },
              };
            });
            setShowPopup(true);
          }
        } else {
          // setTimeout(() => {
          setDataLoaded(true);
          // }, 100);
        }
      });

      //

      function saveState() {
        if (editor.config.getKey('autosave') === false) {
          return;
        }

        clearTimeout(timeout);

        timeout = setTimeout(function () {
          editor.signals.savingStarted.dispatch();

          timeout = setTimeout(function () {
            const editorJSON: any = editor.toJSON();
            editor.storage.set(editorFileCount, editorJSON);
            editor.signals.savingFinished.dispatch();

            pcbComponents();
          }, 100);
        }, 1000);
      }

      const signals = editor.signals;

      signals.geometryChanged.add(saveState);
      signals.objectAdded.add(saveState);
      signals.objectChanged.add(saveState);
      signals.objectRemoved.add(saveState);
      signals.materialChanged.add(saveState);
      signals.sceneBackgroundChanged.add(saveState);
      signals.sceneEnvironmentChanged.add(saveState);
      signals.sceneFogChanged.add(saveState);
      signals.sceneGraphChanged.add(saveState);
      signals.scriptChanged.add(saveState);
      signals.historyChanged.add(saveState);
    });

    function onDragOver(event: any) {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'copy';
    }

    function onDrop(event: any) {
      event.preventDefault();

      if (event.dataTransfer.types[0] === 'text/plain') return; // Outliner drop
      setFileLoading(true);
      if (event.dataTransfer.items) {
        // DataTransferItemList supports folders

        editor.loader.loadItemList(
          event.dataTransfer.items,
          setFileLoading,
          setLoaderObj
        );
      } else {
        editor.loader.loadFiles(
          event.dataTransfer.files,
          null,
          setFileLoading,
          setLoaderObj
        );
      }
    }

    document.addEventListener('dragover', onDragOver, false);
    document.addEventListener('drop', onDrop, false);

    function onWindowResize() {
      editor.signals.windowResize.dispatch();
    }

    window.addEventListener('resize', onWindowResize, false);

    onWindowResize();

    let isLoadingFromHash = false;
    const hash = window.location.hash;

    if (hash.substr(1, 5) === 'file=') {
      const file = hash.substr(6);

      if (confirm('Any unsaved data will be lost. Are you sure?')) {
        const loader = new THREE.FileLoader();
        loader.crossOrigin = '';
        loader.load(file, function (text: any) {
          editor.clear();
          editor.fromJSON(JSON.parse(text));
        });

        isLoadingFromHash = true;
      }
    }
    // hide sidebar
    // const sideBar: any = container.querySelector('#sidebar');
    // sideBar.classList.add('hide-sidebar');

    // setFunctions((Functions as any)(editor));
    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [
    init,
    noPopup,
    noStorage,
    editorRef,
    editorFile,
    hideSidePanel,
    viewFile,
    noRestore,
    setIsRestored,
    setPcbComponents,
  ]);

  // useEffect(() => {
  //   if (setThreeDData) {
  //     setThreeDData(data);
  //   }
  // }, [data, setThreeDData]);

  useEffect(() => {
    if (setEditorLoaded && dataLoaded) setEditorLoaded(dataLoaded);
  }, [setEditorLoaded, dataLoaded]);

  useEffect(() => {
    if (toolbarObj)
      setAddObj((prev: any) => {
        return {
          ...prev,
          ...toolbarObj,
        };
      });
  }, [toolbarObj]);

  useEffect(() => {
    if (addObj?.file && setFile) setFile(addObj.file);
  }, [addObj, setFile]);

  useEffect(() => {
    if (setLoaderStr && loaderObj && loaderObj?.desc)
      setLoaderStr(loaderObj?.desc);
  }, [loaderObj, setLoaderStr]);

  useEffect(() => {
    if (editorName && dataLoaded && editorrRef?.current) {
      setEditorName(editorrRef?.current, editorName);
    }
  }, [editorName, dataLoaded, editorrRef]);

  useEffect(() => {
    if (setCurrentLeg !== undefined) {
      if (selectedObject && selectedObject?.parent?.name === 'Legs') {
        setCurrentLeg(selectedObject?.userData?.id);
      }
    }
  }, [setCurrentLeg, selectedObject]);

  useEffect(() => {
    if (
      doubleClickedObject !== undefined &&
      doubleClickedObject.object &&
      editorrRef
    ) {
      if (doubleClickedObject?.object?.name === 'Text')
        changeText(editorrRef?.current, doubleClickedObject);
    }
  }, [doubleClickedObject, editorrRef]);

  useEffect(() => {
    if (pcbComponentss) setPcbComponents(pcbComponentss);
  }, [setPcbComponents, pcbComponentss]);

  return (
    <div
      ref={threejsRef}
      className={`threejs ${hideInfo ? 'hide-info' : ''} ${containerClass ? containerClass : ''
        }`}
      id="threejs"
    >
      {FileLoading && <Loader type="relative" isTransparentBg />}
      {toolbar !== 'none' && (
        <>
          {showPopup && <StoragePopup {...{ ...popupFunctions }} />}
          <Btns {...{ threejsRef }} />
          {menubar && (
            <MainToolbar
              {...{
                threejsRef,
                editor: editorrRef.current,
                menubar,
                toolbar,
                setAddObj,
                addObj,
                setFile,
              }}
            />
          )}
        </>
      )}
    </div>
  );
}

export default ThreeJs;
