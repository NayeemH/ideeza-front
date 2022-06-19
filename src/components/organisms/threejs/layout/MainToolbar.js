import React, { useCallback, useEffect, useRef, useState } from 'react';
import Default from './toolbar/Default';
import ElectronicComponentDesign from './toolbar/ElecctronicComponentDesign';
import ElectronicComponentSchematic from './toolbar/ElectronicComponentSchematic';
import ElectronicPartEditSchematic from './toolbar/ElectronicPartEditSchematic';
import Same from './toolbar/Same';
import ThreeD from './toolbar/ThreeD';
import TwoD from './toolbar/TwoD';
import Tools from './Tools';

function MainToolbar({
  threejsRef,
  editor,
  menubar,
  toolbar,
  setAddObj,
  addObj,
}) {
  const [currentToolbar, setCurrentToolbar] = useState('');

  const toolbarRef = useRef(null);

  const SameOptRef = Same(editor);

  const [tools, setTools] = useState([]);

  const onResizeCB = useCallback(() => {
    let toolbarWidth = toolbarRef.current.offsetWidth;
    let containerWidth = threejsRef.current.offsetWidth;

    const spaceAround = 100;

    const tools = [...toolbarRef.current.querySelectorAll('.toolbar__tools')];
    if (!tools || tools.length <= 0) return;

    if (containerWidth - spaceAround <= toolbarWidth) {
      for (let i = tools.length - 1; i >= 0; i--) {
        if (!tools[i].classList.contains('group')) {
          tools[i].classList.add('group');
          if (!(containerWidth - spaceAround <= toolbarRef.current.offsetWidth))
            break;
        }
      }
    } else {
      for (let i = 0; i < tools.length; i++) {
        if (tools[i].classList.contains('group')) {
          tools[i].classList.remove('group');
          if (containerWidth - spaceAround <= toolbarRef.current.offsetWidth) {
            tools[i].classList.add('group');
            break;
          }
        }
      }
    }
  }, [toolbarRef, threejsRef]);

  useEffect(() => {
    const current = toolbar ? toolbar : '';
    setCurrentToolbar(current);
  }, [toolbar]);

  useEffect(() => {
    switch (currentToolbar) {
      case 'default':
        setTools(Default(editor));
        break;
      case 'twoD':
        setTools(TwoD(editor));
        break;
      case 'threeD':
        setTools(ThreeD(editor));
        break;
      case 'electronicComponentSchematic':
        setTools(ElectronicComponentSchematic(editor, addObj));
        break;
      case 'electronicComponentDesign':
        setTools(ElectronicComponentDesign(editor, addObj)); //to update pcb layer count in editor
        break;
      case 'electronicPartEditSchematic':
        setTools(ElectronicPartEditSchematic(editor));
        break;
    }
    const timeout = setTimeout(() => {
      onResizeCB();
    }, 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentToolbar, addObj, editor, onResizeCB]);

  useEffect(() => {
    if (toolbarRef.current) {
      toolbarRef.current.prepend(menubar);
    }
  }, [menubar]);

  useEffect(() => {
    // const timeout = setTimeout(() => {
    //   onResizeCB();
    // }, 1000);

    window.addEventListener('resize', onResizeCB, false);
    return () => {
      // clearTimeout(timeout);
      window.removeEventListener('resize', onResizeCB, false);
    };
  }, [onResizeCB]);

  return (
    <div ref={toolbarRef} id="main-toolbar" className={`toolbar hide-toolbar`}>
      <div
        className="show-menu"
        id="show-menu"
        onClick={(e) => {
          const menubar = threejsRef?.current?.querySelector('#menubar');
          const toolbar = threejsRef?.current?.querySelector('#main-toolbar');

          if (menubar) menubar.classList.toggle('hide-menubar');
          if (toolbar) toolbar.classList.toggle('lower-toolbar');
          e.currentTarget.classList.toggle('lower-show-menubtn');
        }}
      >
        <svg
          width="12px"
          height="12px"
          viewBox="0 0 8 8"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.5 0l-1.5 1.5 4 4 4-4-1.5-1.5-2.5 2.5-2.5-2.5z"
            transform="translate(0 1)"
          />
        </svg>
      </div>

      {SameOptRef.map((el, i) => (
        <Tools key={i} obj={el} {...{ setCurrentToolbar, setAddObj }} />
      ))}

      {tools.length > 0 &&
        tools.map((el, i) => (
          <Tools key={i} obj={el} {...{ setCurrentToolbar, setAddObj }} />
        ))}
    </div>
  );
}

export default MainToolbar;
