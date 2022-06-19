import { UIElement } from './libs/ui.js';

function Resizer(editor, threejsRef) {
  const signals = editor.signals;

  const dom = document.createElement('div');
  dom.id = 'resizer';
  dom.classList.add('hide-resizer');

  function onPointerDown(event) {
    if (event.isPrimary === false) return;

    dom.ownerDocument.addEventListener('pointermove', onPointerMove, false);
    dom.ownerDocument.addEventListener('pointerup', onPointerUp, false);
  }

  function onPointerUp(event) {
    if (event.isPrimary === false) return;

    dom.ownerDocument.removeEventListener('pointermove', onPointerMove);
    dom.ownerDocument.removeEventListener('pointerup', onPointerUp);
  }

  function onPointerMove(event) {
    // PointerEvent's movementX/movementY are 0 in WebKit

    if (event.isPrimary === false) return;

    const offsetWidth = document.body.offsetWidth;
    const clientX = event.clientX;

    const cX = clientX < 0 ? 0 : clientX > offsetWidth ? offsetWidth : clientX;

    const x = offsetWidth - cX;

    if (x > 300) {
      dom.style.right = x + 'px';

      threejsRef?.current?.querySelector('#sidebar').style.width = x + 'px';
      threejsRef?.current?.querySelector('#player').style.right = x + 'px';
      // document.getElementById('script').style.right = x + 'px';
      // document.getElementById( 'viewport' ).style.right = x + 'px';

      signals.windowResize.dispatch();
    } else {
      threejsRef?.current?.querySelector('#sidebar').classList.add('hide-sidebar');
      dom.classList.add('hide-resizer');
    }
  }

  dom.addEventListener('pointerdown', onPointerDown, false);

  return new UIElement(dom);
}

export { Resizer };
