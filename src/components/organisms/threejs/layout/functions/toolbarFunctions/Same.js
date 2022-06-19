import { RemoveObjectCommand } from '@organisms/threejs/js/commands/RemoveObjectCommand';

function Same(editor) {
  let obj = {};

  obj.undo = () => {
    editor.undo();
  };

  obj.redo = () => {
    editor.redo();
  };

  obj.delete = () => {
    var object = editor.selected;

    if (object !== null && object.parent !== null) {
      editor.execute(new RemoveObjectCommand(editor, object));
    }
  };
  return obj;
}

export default Same;
