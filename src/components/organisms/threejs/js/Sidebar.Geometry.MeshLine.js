// import * as THREE from 'three';

import { UIRow } from './libs/ui.js';

// import { SetGeometryCommand } from './commands/SetGeometryCommand.js';

function GeometryParametersPanel() {
  // var strings = editor.strings;

  var container = new UIRow();

  // var geometry = object.geometry;
  // var parameters = geometry.parameters;

  // function update() {
  //   editor.execute(
  //     new SetGeometryCommand(editor, object, new THREE.EdgesGeometry())
  //   );
  // }

  return container;
}

export { GeometryParametersPanel };
