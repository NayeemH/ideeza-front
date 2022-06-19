// import { default as Functions } from '../functions/toolbarFunctions/Default';

export default function Default() {
  // const functions = Functions(editor);

  return [
    {
      title: 'sketch',
      expandIcon: 0,
      tools: [
        [
          {
            big: 'true',
            icon: 0,
            iconTitle: 'sketch',
            changeToolbar: 'twoD',
          },
        ],
        [
          {
            big: 'true',
            icon: 0,
            iconTitle: '3D sketch',
            changeToolbar: 'threeD',
          },
        ],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
      ],
    },
    {
      title: 'components',
      expandIcon: 0,
      tools: [
        [
          {
            big: true,
            icon: 0,
            arrowTitle: 'insert components',
            options: [{ icon: 0, title: 'do something' }],
          },
        ],
        [
          {
            big: true,
            icon: 0,
            arrowTitle: 'create parts in-Place',
            options: [{ icon: 0, title: 'do something' }],
          },
        ],
      ],
    },
    {
      title: 'assemble',
      expandIcon: 0,
      tools: [
        [
          {
            big: true,
            icon: 0,
            iconTitle: 'assemble',
          },
        ],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [
          { icon: 0 },
          { icon: 0 },
          { icon: 0, options: [{ icon: 0, title: 'do something' }] },
        ],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
      ],
    },
    {
      title: 'modify',
      expandIcon: 0,
      tools: [
        [{ big: true, icon: 0, iconTitle: 'move on select' }],
        [
          {
            big: true,
            icon: 0,
            arrowTitle: 'drag component',
            options: [{ icon: 0, title: 'do something' }],
          },
        ],
        [
          {
            big: true,
            icon: 0,
            arrowTitle: 'drag component',
            options: [{ icon: 0, title: 'do something' }],
          },
        ],
        [{ icon: 0 }, { icon: 0 }],
      ],
    },
    {
      title: 'motors',
      expandIcon: 0,
      tools: [[{ icon: 0 }, { icon: 0 }, { icon: 0 }], [{ icon: 0 }]],
    },
    {
      title: 'face relate',
      expandIcon: 0,
      tools: [
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
      ],
    },
    {
      title: 'pattern',
      expandIcon: 0,
      tools: [
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [{ icon: 0 }, { icon: 0 }],
      ],
    },
    {
      title: 'models',
      expandIcon: 0,
      tools: [[{ icon: 0 }, { icon: 0 }, { icon: 0 }]],
    },
    {
      title: 'orient',
      expandIcon: 0,
      tools: [
        [
          {
            big: true,
            icon: 0,
            iconTitle: 'zoom area',
          },
        ],
        [
          {
            big: true,
            icon: 0,
            iconTitle: 'fit',
          },
        ],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
        [{ icon: 0 }, { icon: 0 }, { icon: 0 }],
      ],
    },
  ];
}
