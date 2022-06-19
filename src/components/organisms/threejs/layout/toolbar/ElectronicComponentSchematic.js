import { text } from '../functions/GlobalFunctions';
import { default as Functions } from '../functions/toolbarFunctions/ElectronicComponentSchematic';

export default function ElectronicComponentSchematic(editor) {
  const functions = Functions(editor);

  const toggleToolbar = () => {
    const toolbar = document.querySelector(`#main-toolbar`);
    if (toolbar) toolbar?.classList?.toggle('hide-toolbar');
  }
  return [
    {
      title: 'general',
      expandIcon: 0,
      tools: [
        [
          {
            icon: 67,
          },
          {
            icon: 68,
          },
          {
            icon: 69,
          },
        ],
        [
          {
            icon: 70,
          },
        ],
      ],
    },
    {
      title: 'general',
      expandIcon: 0,
      tools: [
        [
          {
            icon: 71,
            click: () => {
              toggleToolbar()
              document.getElementById("semantic")?.style.cursor = `url("/images/cover/icons/icon71.png"), auto`
              functions.pcbSchematicConnectionLine()
            },
            options: [
              {
                icon: 71,
                title: 'Red Wire',
                click: () => {
                  toggleToolbar()
                  document.getElementById("semantic")?.style.cursor = `url("/images/cover/icons/icon71.png"), auto`
                  functions.pcbSchematicConnectionLine(0xff0000)
                },
              },
              {
                icon: 71,
                title: 'Blue Wire',
                click: () => {
                  toggleToolbar()
                  document.getElementById("semantic")?.style.cursor = `url("/images/cover/icons/icon71.png"), auto`
                  functions.pcbSchematicConnectionLine(0x0000ff)
                },
              },
              {
                icon: 71,
                title: 'Green Wire',
                click: () => {
                  toggleToolbar()
                  document.getElementById("semantic")?.style.cursor = `url("/images/cover/icons/icon71.png"), auto`
                  functions.pcbSchematicConnectionLine(0x00ff00)
                },
              },
            ],
          },
          {
            icon: 72,
            // click: functions.testLine,
          },
          {
            icon: 73,
            click: () => {
              toggleToolbar()
              functions.drawDot()
            },
          },
        ],
        [
          {
            icon: 74,
          },
        ],
      ],
    },
    {
      title: 'general',
      expandIcon: 0,
      tools: [
        [
          {
            icon: 75,
          },
          {
            icon: 76,
            options: [{ icon: 0, title: 'DO SOMETHING' }],
          },
          {
            icon: 77,
          },
        ],
        [
          {
            icon: 78,
            options: [{ icon: 0, title: 'DO SOMETHING' }],
          },
          {
            icon: 79,
          },
          {
            icon: 80,
          },
        ],
        [
          {
            icon: 81,
          },
          {
            icon: 82,
          },
          {
            icon: 83,
          },
        ],
      ],
    },
    {
      title: 'general',
      expandIcon: 0,
      tools: [
        [
          {
            icon: 84,
          },
          {
            icon: 85,
          },
          {
            icon: 86,
          },
        ],
        [
          {
            icon: 87,
          },
          {
            icon: 88,
          },
          {
            icon: 89,
          },
        ],
      ],
    },
    {
      title: 'general',
      expandIcon: 0,
      tools: [
        [
          {
            icon: 90,
          },
          {
            icon: 91,
            click: () => {
              toggleToolbar()
              text(editor, 'pcbSchematic', 'white');
            },
            options: [
              {
                icon: 91,
                title: 'Red Text',
                click: () => {
                  toggleToolbar()
                  text(editor, 'pcbSchematic', 'red');
                },
              },
              {
                icon: 91,
                title: 'Blue Text',
                click: () => {
                  toggleToolbar()
                  text(editor, 'pcbSchematic', 'blue');
                },
              },
              {
                icon: 91,
                title: 'Yellow Text',
                click: () => {
                  toggleToolbar()
                  text(editor, 'pcbSchematic', 'yellow');
                },
              },
            ],
          },
          {
            icon: 92,
          },
        ],
        [
          {
            icon: 93,
          },
          {
            icon: 94,
          },
          {
            icon: 95,
          },
        ],
      ],
    },
    {
      title: 'general',
      expandIcon: 0,
      tools: [
        [
          {
            icon: 96,
          },
          {
            icon: 97,
          },
          {
            icon: 98,
          },
        ],
        [
          {
            icon: 99,
          },
        ],
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
  ];
}
