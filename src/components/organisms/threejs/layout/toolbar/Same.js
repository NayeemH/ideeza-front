import { default as Functions } from '../functions/toolbarFunctions/Same';

export default function Same(editor) {
  const functions = Functions(editor);

  return [
    {
      title: 'paste',
      expandIcon: 1,
      tools: [
        [
          {
            big: true,
            width: 50,
            icon: 1,
            arrowTitle: 'paste',
            options: [
              { icon: 1, title: 'paste' },
              { icon: 1, title: 'paste' },
            ],
            desc: {
              title: 'Paste (Ctrl+V)',
              content: [{ text: 'Paste the contents of Clipboard' }],
            },
          },
        ],
        [
          {
            icon: 2,
            width: 22,
            desc: {
              title: 'Cut  (Ctrl+X)',
              content: [
                {
                  text: 'Cut the selection from the document and put it on the clipboard.',
                },
              ],
            },
          },
          {
            icon: 3,
            width: 22,
            desc: {
              title: 'Copy  (Ctrl+C)',
              content: [{ text: 'Copies the current selection.' }],
            },
            options: [
              { icon: 1, title: 'paste' },
              { icon: 1, title: 'paste' },
            ],
          },
          {
            icon: 4,
            width: 22,
            desc: {
              title: 'Copy  to Library',
              content: [
                { text: 'Copies the selected geometry into the Library.' },
              ],
            },
          },
        ],
      ],
    },
    {
      title: 'select',
      expandIcon: '5',
      tools: [
        [
          {
            big: true,
            icon: 5,
            desc: {
              big: true,
              title: 'select',
              content: [
                { text: 'Selects elements for modification.' },
                {
                  text: 'To select more than one element at a time, hold the shift or Ctrl key while you click.',
                },
                {
                  text: 'You also can drag the cursor to fense select multiple elements. Use the Fense Filter list to specify whether an elements must be completely inside or outside the fense to be selected',
                },
                {
                  text: 'Dragging from left to right selects only geometry completely inside the fence.',
                },
                { image: 1, width: 100 },
                {
                  text: 'Dragging from right to left selects inside and overlapping geometry within the fence.',
                },
                { image: 1, width: 100 },
              ],
            },
          },
          {
            icon: 6,
            desc: {
              title: 'Select All (Ctrl+A)',
              content: [{ text: 'Selects all objects.' }],
            },
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
            icon: 7,
            click: functions.undo,
            desc: {
              title: 'Undo (Ctrl+Z)',
              content: [{ text: 'Undo (Ctrl+Z)' }],
            },
          },
          {
            icon: 8,
            desc: {
              title: 'Rotate',
              content: [{ text: 'Rotate' }],
            },
          },
          {
            icon: 9,
            desc: {
              title: 'New',
              content: [{ text: 'New' }],
            },
          },
        ],
        [
          {
            icon: 10,
            click: functions.redo,
            desc: {
              title: 'Redo (Ctrl+Shift+Z)',
              content: [{ text: 'Redo (Ctrl+Shift+Z)' }],
            },
          },
          {
            icon: 11,
            click: functions.drawPoints,
            desc: {
              title: 'Rotate (360)',
              content: [{ text: 'Rotate (360)' }],
            },
          },
          {
            icon: 12,
            desc: {
              title: 'edit',
              content: [{ text: 'Edit' }],
            },
          },
        ],
        [
          {
            icon: 13,
            desc: {
              title: 'select color',
              content: [{ text: 'select color' }],
            },
          },
          {
            icon: 14,
            desc: {
              title: 'resize',
              content: [{ text: 'resize' }],
            },
          },
          {
            icon: 15,
            desc: {
              title: 'Save (Ctrl+S)',
              content: [{ text: 'Save (Ctrl+S)' }],
            },
          },
        ],
        [
          {
            icon: 16,
            desc: {
              title: 'Grid',
              content: [{ text: 'Grid' }],
            },
          },
          {
            icon: 17,
            click: functions.delete,
            desc: {
              title: 'Delete',
              content: [{ text: 'Delete' }],
            },
          },
        ],
      ],
    },
  ];
}
