import { RemoveObjectCommand } from '@organisms/threejs/js/commands/RemoveObjectCommand';
import { create2dPlane, destroy2dPlane, drawLine } from '../GlobalFunctions';
// import GlobalFunctions from '../GlobalFunctions';

function ElectronicPartEditSchematic(editor) {
  let obj = {};

  let plane2d;

  obj.packageSchematicConnectionLine = () => {
    const packages = editor.scene.getObjectByName('Package');
    if (!packages) return;

    ///adding legs for plane
    let packageLegs = [];
    if (packages) {
      const legs = packages.getObjectByName('Legs');
      if (legs) {
        if (legs.type === 'Group') {
          legs.children.forEach((e) => {
            const dot = e.children.find((k) => k.name === 'Dot');
            if (dot) packageLegs.push(dot);
          });
        } else packageLegs.push(legs);
      }
    }

    const onExit = (line) => {
      const link = line.userData?.link;
      if (link && link.length === 2) {
        const link1 = JSON.stringify(link[0]);
        const link2 = JSON.stringify(link[1]);
        if (link1 !== link2) {
          let connectionLines = editor.scene.getObjectByName('ConnectionLines');

          if (connectionLines) {
            connectionLines.children.some((el) => {
              if (el.uuid !== line.uuid) {
                const linkC = el.userData?.link;
                if (linkC && linkC.length === 2) {
                  const json = JSON.stringify(linkC);
                  if (json.includes(link1) && json.includes(link2)) {
                    editor.execute(new RemoveObjectCommand(editor, line));
                    alert('Multiple connection on same leg');
                    return true;
                  }
                }
              }
            });
          }
        } else {
          editor.execute(new RemoveObjectCommand(editor, line));
          alert('Cannot connect same package same leg');
        }
      } else {
        editor.execute(new RemoveObjectCommand(editor, line));
        alert('Must have connection with two legs');
      }
      destroy2dPlane(editor, plane2d);
    };
    plane2d = create2dPlane(editor);
    drawLine(
      editor,
      'ConnectionLine',
      0xffffff,
      500,
      [plane2d, ...packageLegs],
      ['Legs'],
      { legId: 'Legs' },
      onExit,
      {
        parent: packages,
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

  obj.packageDrawSchematicShapes = () => {
    const packages = editor.scene.getObjectByName('Package');

    const onExit = () => {
      destroy2dPlane(editor, plane2d);
    };

    plane2d = create2dPlane(editor);
    drawLine(editor, 'BodyShape', 0xffffff, 500, plane2d, null, null, onExit, {
      parent: packages,
      name: 'Body',
    });
  };

  return obj;
}

export default ElectronicPartEditSchematic;
