import { downloadSvg, hideObjects, text } from '../functions/GlobalFunctions';
import { default as Functions } from '../functions/toolbarFunctions/ElectronicComponentDesign';

export default function ElectronicComponentDesign(editor, obj) {
  const functions = Functions(editor);

  return [
    {
      title: 'general',
      expandIcon: 0,
      tools: [
        [
          {
            icon: 107, click: functions.testLine,
          },
          { icon: 108, click: functions.connectionLine },
          { icon: 109 },
        ],
        [
          { icon: 110 },
          {
            icon: 111,
            click: functions.copperThruHole,
            options: [
              {
                icon: 111,
                title: 'plated thru hole',
                click: functions.copperThruHole,
              },
              {
                icon: 111,
                title: 'plated blind / burried hole',
                form: {
                  input: [
                    {
                      name: 'start',
                      type: 'number',
                      max: obj?.pcbLayersCount,
                    },
                    { name: 'end', type: 'number', max: obj?.pcbLayersCount },
                  ],
                  submit: functions.copperBlindHole,
                },
              },
            ],
          },
          { icon: 112, click: functions.holeCylinder },
        ],
        [
          { icon: 94 },
          {
            icon: 91,
            click: () => {
              text(editor, 'pcbDesign');
            },
          },
          { icon: 113, click: functions.show3dPackages },
        ],
        [{ icon: 114 }, { icon: 81 }, { icon: 82 }],
        [
          { icon: 83, click: functions.makeHoles },
          { icon: 115, click: functions.mirrorPackage },
        ],
      ],
    },
    {
      title: 'general',
      expandIcon: 0,
      tools: [
        [
          { icon: 67 },
          {
            icon: 68,
            checkbox: [
              {
                title: 'Drill',
                onChange: (visible) => {
                  hideObjects(
                    editor,
                    ['HoleCylinders', 'CopperBlindHoles', 'CopperThruHoles'],
                    visible
                  );
                },
                download: () => {
                  downloadSvg(
                    editor,
                    ['HoleCylinders', 'CopperBlindHoles', 'CopperThruHoles'],
                    true
                  );
                },
                send: () => {
                  let o = downloadSvg(
                    editor,
                    ['HoleCylinders', 'CopperBlindHoles', 'CopperThruHoles'],
                    false,
                    true
                  );
                  if (o) return o;
                },
              },
              { title: 'Bottom solder mask' },
              {
                title: 'Top copper',
                onChange: (visible) => {
                  hideObjects(
                    editor,
                    ['CopperRects', 'CopperCircles', 'CopperLines'],
                    visible
                  );
                },
                download: () => {
                  downloadSvg(
                    editor,
                    ['CopperRects', 'CopperCircles', 'CopperLines'],
                    true
                  );
                },
                send: () => {
                  let o = downloadSvg(
                    editor,
                    ['CopperRects', 'CopperCircles', 'CopperLines'],
                    false,
                    true
                  );
                  if (o) return o;
                },
              },
              {
                title: 'Top silk-screen',
                onChange: (visible) => {
                  hideObjects(editor, ['Texts'], visible);
                },
                download: () => {
                  downloadSvg(editor, ['Texts'], true);
                },
                send: () => {
                  let o = downloadSvg(editor, ['Texts'], false, true);
                  if (o) return o;
                },
              },
              { title: 'Bottom copper' },
              { title: 'Top solder mask' },
              { title: 'Bottom silk-screen' },
              {
                title: 'All',
                disabled: true,
                download: () => {
                  downloadSvg(
                    editor,
                    ['HoleCylinders', 'CopperBlindHoles', 'CopperThruHoles'],
                    true
                  );
                  downloadSvg(
                    editor,
                    ['CopperRects', 'CopperCircles', 'CopperLines'],
                    true
                  );
                  downloadSvg(editor, ['Texts'], true);
                },
                send: () => {
                  let files = [];
                  let o = downloadSvg(
                    editor,
                    ['HoleCylinders', 'CopperBlindHoles', 'CopperThruHoles'],
                    false,
                    true
                  );
                  if (o) files.push(o);
                  let o1 = downloadSvg(
                    editor,
                    ['CopperRects', 'CopperCircles', 'CopperLines'],
                    false,
                    true
                  );
                  if (o1) files.push(o1);
                  let o2 = downloadSvg(editor, ['Texts'], false, true);
                  if (o2) files.push(o2);

                  return { file: files };
                },
              },
            ],
          },
        ],
      ],
    },
    {
      title: 'general',
      expandIcon: 0,
      tools: [
        [
          { icon: 75, click: functions.addPcbLayer },
          {
            icon: 76,
            click: functions.removePcbLayer,
            options: obj?.pcbLayersCount // cannot delete layer1
              ? Array.apply(null, Array(obj.pcbLayersCount - 1)).map(
                (el, i) => {
                  return {
                    icon: 107,
                    title: `Delete layer ${i + 2}`,
                    click: () => {
                      return functions.removePcbLayer(i + 2);
                    },
                  };
                }
              )
              : [],
          },
          {
            icon: 77,
            click: functions.showLayer,
            options: obj?.pcbLayersCount // cannot delete layer1
              ? Array.apply(null, Array(obj.pcbLayersCount - 1)).map(
                (el, i) => {
                  return {
                    icon: 107,
                    title: `Show layer ${i + 2}`,
                    click: () => {
                      return functions.showLayer(i + 2);
                    },
                  };
                }
              )
              : [],
          },
        ],
        [
          { icon: 78 },
          {
            icon: 79,
            click: () => {
              functions.positionPackageByFile(obj?.getTxtFile);
            },
          },
          {
            icon: 80,
            click: () => {
              functions.drawLineByFile(obj?.getTxtFile);
            },
          },
        ],
        [{ icon: 84 }, { icon: 85 }, { icon: 119 }],
        [{ icon: 86 }, { icon: 88 }],
      ],
    },
    {
      title: 'general',
      expandIcon: 0,
      tools: [
        [
          { icon: 90, click: functions.copperLine },
          { icon: 93 },
          { icon: 92, click: functions.copperCircle },
        ],
        [{ icon: 95, click: functions.copperRect }],
      ],
    },
    {
      title: 'general',
      expandIcon: 0,
      tools: [
        [{ icon: 96 }, { icon: 97 }, { icon: 98 }],
        [{ icon: 116 }, { icon: 99 }],
      ],
    },
    {
      title: 'general',
      expandIcon: 0,
      tools: [
        [{ icon: 100 }, { icon: 101 }, { icon: 102 }],
        [{ icon: 103 }, { icon: 104 }, { icon: 105 }],
        [{ icon: 106 }],
      ],
    },
    {
      title: 'general',
      expandIcon: 0,
      tools: [[{ icon: 117 }, { icon: 118 }]],
    },
  ];
}
