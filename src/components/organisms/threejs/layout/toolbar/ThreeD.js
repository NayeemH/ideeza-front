// import { default as Functions } from '../functions/toolbarFunctions/ThreeD';

export default function ThreeD() {
  // const functions = Functions(editor);

  return [
    {
      title: 'planes',
      expandIcon: 0,
      tools: [
        [
          {
            icon: 46,
          },
          {
            icon: 47,
            options: [{ icon: 0, title: 'do something' }],
          },
          {
            icon: 48,
          },
        ],
      ],
    },
    {
      title: '3D draw',
      expandIcon: 0,
      tools: [
        [{ big: true, icon: 0, iconTitle: 'routing path' }],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [{ icon: 0 }, { icon: 0 }],
        [{ icon: 0 }],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
      ],
    },
    {
      title: '3D relate',
      expandIcon: 0,
      tools: [
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [{ icon: 0 }],
        [{ icon: 0 }, { icon: 0 }],
      ],
    },
    {
      title: '3D intellisketch',
      expandIcon: 0,
      tools: [
        [
          { icon: 0, check: true },
          { icon: 0, check: true },
          { icon: 0, check: true },
        ],
        [
          { icon: 0, check: true },
          { icon: 0, check: true },
          { icon: 0, check: true },
        ],
        [
          { icon: 0, check: true },
          { icon: 0, check: true },
          { icon: 0, check: true },
        ],
        [
          { icon: 0, check: true },
          { icon: 0, check: true },
          { icon: 0, check: true },
        ],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
      ],
    },
    {
      title: 'dimension',
      expandIcon: 0,
      tools: [
        [
          {
            big: true,
            icon: 0,
            iconTitle: 'smart dimension',
          },
        ],
        [{ icon: 0 }, { icon: 0 }],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
      ],
    },
    {
      title: 'close',
      expandIcon: 0,
      tools: [
        [
          {
            big: true,
            icon: 0,
            iconTitle: 'close 3D sketch',
            changeToolbar: 'default',
          },
        ],
      ],
    },
  ];
}
