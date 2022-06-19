import { text } from '../functions/GlobalFunctions';
import { default as Functions } from '../functions/toolbarFunctions/ElectronicPartEditSchematic';

export default function ElectronicPartEditSchematic(editor) {
  const functions = Functions(editor);

  return [
    {
      title: 'general',
      expandIcon: 0,
      tools: [
        [
          { icon: 114, click: functions.packageSchematicConnectionLine },
          { icon: 18, click: functions.packageDrawSchematicShapes },
          {
            icon: 91,
            click: () => {
              text(editor, 'package', 0xffffff);
            },
          },
        ],
      ],
    },
  ];
}
