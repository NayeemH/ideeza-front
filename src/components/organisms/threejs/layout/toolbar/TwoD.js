import { default as Functions } from '../functions/toolbarFunctions/TwoD';

export default function TwoD(editor) {
  const functions = Functions(editor);

  return [
    {
      title: 'draw',
      expandIcon: 0,
      tools: [
        [
          {
            icon: 18,
            click: functions.line,
            desc: {
              big: true,
              title: 'line',
              content: [
                { text: 'Creats a line or arc between two points.' },
                {
                  text: 'You can enter a value in the box that focus. Continue placing new points to draw a series of endpoint connected elements.',
                },
                {
                  text: 'You can change from line mode to arc mode as you draw using the line Line Arc options. This displays an intent zone.',
                },
                {
                  text: 'You can use this to control whether the new elements is tangent to, perpendicular to, or at some other orientation to the previous eleements.',
                },
                { image: 3, width: 100 },
              ],
            },
            options: [
              { icon: 18, title: 'line' },
              { icon: 58, title: 'point' },
              { icon: 59, title: 'draw' },
              { icon: 60, title: 'free sketch' },
            ],
          },
          {
            icon: 19,
            click: functions.rect,
            desc: {
              big: true,
              title: 'rectangle by center',
              content: [
                {
                  text: 'Draw a rectangle by dragging its center and corner.',
                },
                { image: 4, width: 100 },
                {
                  text: 'Define the center point of the rectangle (A) and then define the height and width (B).',
                },
                {
                  text: 'You can press and hold the Shift key to create a square.',
                },
                { image: 5, width: 100 },
              ],
            },
            options: [
              { icon: 19, title: 'rectangle by center' },
              { icon: 61, title: 'rectangle by 2 points' },
              { icon: 62, title: 'rectangle by 3 points' },
              { icon: 63, title: 'rectangle by center' },
            ],
          },
          {
            icon: 20,
            click: functions.circle,
            desc: {
              title: 'circle by center point',
              content: [{ text: 'Creates a circle by center and endpoints.' }],
            },
            options: [{ icon: 0, title: 'do something' }],
          },
        ],
        [
          {
            icon: 21,
            desc: {
              title: 'tangent arc',
              content: [{ text: 'Creates a tangent or perpendicular arc.' }],
            },
            options: [
              { icon: 21, title: 'tangent arc' },
              { icon: 64, title: 'arc by 3 points' },
              { icon: 65, title: 'arc by center points' },
            ],
          },
          {
            icon: 22,
            desc: {
              title: 'curve',
              content: [{ text: 'Creates a smooth curve by points.' }],
            },
          },
          {
            icon: 23,
            desc: {
              title: 'fillet',
              content: [{ text: 'Creates a fillet between 2 elements.' }],
            },
            options: [
              { icon: 24, title: 'fillet' },
              { icon: 66, title: 'chamfer' },
            ],
          },
        ],
        [
          {
            icon: 24,
            desc: {
              title: 'split',
              content: [
                { text: 'Splits a selected elements at a specified point.' },
              ],
            },
            options: [{ icon: 0, title: 'do something' }],
          },
          {
            icon: 25,
            desc: {
              title: 'trim',
              content: [{ text: 'Trims elements.' }],
            },
          },
          {
            icon: 26,
            desc: {
              title: 'Trim Corner',
              content: [
                {
                  text: 'Trims or extends elements to a corner.',
                },
              ],
            },
          },
        ],
        [
          {
            icon: 27,
            desc: {
              title: 'offset',
              content: [
                {
                  text: 'Offset selected elements to a specified side and distance.',
                },
              ],
            },
            options: [{ icon: 0, title: 'do something' }],
          },
          {
            icon: 28,
            desc: {
              title: 'move',
              content: [{ text: 'Moves elements with precision.' }],
            },
            options: [{ icon: 0, title: 'do something' }],
          },
          {
            icon: 29,
            desc: {
              title: 'mirror',
              content: [
                { text: 'Makes a mirror image of the selected geometry' },
              ],
            },
            options: [{ icon: 0, title: 'do something' }],
          },
        ],
      ],
    },
    {
      title: 'dimension',
      expandIcon: 30,
      tools: [
        [
          {
            icon: 30,
            big: true,
            iconTitle: 'smart dimension',
            desc: {
              big: true,
              title: 'Smart Dimension',
              content: [
                {
                  text: 'Creates a dimension on a single element, or places dimensions that measure the distance or angle between elements.',
                },
                {
                  text: 'You can press the following keys to change the type of dimension that is created.',
                },
                { text: 'A > Linear or angular.' },
                { text: 'D > Radial or diameter or concentric diameter.' },
                {
                  text: 'Shift > The horizontal or vertical distance between two elements, or the minimum distance between two points.',
                },
                { image: 6, width: 100 },
              ],
            },
          },
        ],
        [
          {
            icon: 31,
            click: functions.distanceBetween,
            desc: {
              big: true,
              title: 'Distance Between',
              content: [
                {
                  text: 'Creates a linear distance dimension between elements or keypoints on the model.',
                },
                {
                  text: 'You can create stacked and chained dimension groups based on your cursor position when the next dimension is placed. Above=Stacked, Below=Chained',
                },
                { text: 'To place ' },
                {
                  text: 'Shift > The horizontal or vertical distance between two elements, or the minimum distance between two points.',
                },
                { image: 7, width: 100 },
              ],
            },
          },
          {
            icon: 32,
            desc: {
              title: 'Angle Between',
              content: [{ text: 'Dimension the angle between elements.' }],
            },
          },
          {
            icon: 33,
            desc: {
              title: 'Automatic Coordinate Dimension',
              content: [
                {
                  text: 'Automatically creates coordinate dimensions based on items selected.',
                },
              ],
            },
          },
        ],
        [
          {
            icon: 34,
            desc: {
              title: 'Angular Coordinate Dimension',
              content: [{ text: 'Dimension angles from a common axis.' }],
            },
          },
          {
            icon: 35,
            desc: {
              big: true,
              title: 'Symmetric Diameter',
              content: [
                {
                  text: 'Dimension between two points and present the value as twice the actual distance.',
                },
                {
                  text: 'Use the Symmetric Diameter command to place dimensions on parts with shafts and concentric diameters, such as drive shafts, gear shafts, mixers, and ',
                },
                {
                  text: 'The Diameter - Half/Full button on the command bar changes the dimension display type between full diameter dimension and half diameter dimension.',
                },
                { image: 8, width: 100 },
              ],
            },
          },
          {
            icon: 36,
            desc: {
              title: 'Chamfer Dimension',
              content: [{ text: 'Places a chamfer dimension.' }],
            },
          },
        ],
        [
          {
            icon: 37,
            desc: {
              title: 'Auto-Dimension',
              content: [
                {
                  text: 'Toggles automatic dimensioning on and off for newly drawn geometry.',
                },
              ],
            },
          },
          {
            icon: 38,
            desc: {
              title: 'Attach Dimension',
              content: [
                {
                  text: 'Attaches a detached dimension or redefines a dimension.',
                },
              ],
            },
          },
          {
            icon: 39,
            desc: {
              big: true,
              title: 'Retrive Dimensions',
              content: [
                {
                  text: 'Dimensions drawing views by referecing original model.',
                },
                {
                  text: 'The Retrieve Dimensions command copies PMI dimensions and annotations from a 3D model to orthogonal and section drawing views that you select. It also retrieves ordered sketch dimensions and unconsumed synchronous sketch dimensions.',
                },
                {
                  text: 'You can remove retrieved dimensions by selecting the Remove Dimensions options on the command bar and then clicking the drawing view.',
                },
                { image: 9, width: 100 },
              ],
            },
          },
        ],
        [
          {
            icon: 40,
            desc: {
              title: 'Line Up Text',
              content: [{ text: 'Lines up the text of selected items.' }],
            },
          },
          {
            icon: 41,
            desc: {
              title: 'Copy Attributes',
              content: [
                {
                  text: 'Copies attributes from one dimension or annotation to another.',
                },
              ],
            },
          },
          {
            icon: 42,
            desc: {
              title: 'Maintain Alignment Set',
              content: [
                {
                  text: 'Maintains the alignment between dimensions by creating an alignment set that can be moved as one.',
                },
              ],
            },
          },
        ],
        [
          {
            icon: 43,
            desc: {
              title: 'Remove from Alignment Set',
              content: [
                {
                  text: 'Remvoes the selected dimensions from the alignment set.',
                },
              ],
            },
          },
          {
            icon: 44,
            desc: {
              title: 'Arrange Dimensions',
              content: [{ text: 'Arranges the selected dimensions.' }],
            },
          },
          {
            icon: 45,
            desc: {
              title: 'Updated Retrieved Dimensions',
              content: [
                {
                  text: 'Updates the dimensions and annotations retrieved from the model.',
                },
              ],
            },
          },
        ],
      ],
    },
    {
      title: 'planes',
      expandIcon: 0,
      tools: [
        [
          {
            icon: 46,
            desc: {
              title: 'Draw Shape with Angle',
              content: [{ text: 'Draw Shape with Angle' }],
            },
          },
          {
            icon: 47,
            desc: {
              title: 'Resize Angular Shape',
              content: [{ text: 'Resize Angular Shape' }],
            },
            options: [{ icon: 0, title: 'do something' }],
          },
          {
            icon: 48,
            desc: {
              title: 'Angles',
              content: [{ text: 'Angles' }],
            },
          },
        ],
      ],
    },
    {
      title: 'solids',
      expandIcon: 0,
      tools: [
        [
          {
            semi: true,
            icon: 49,
            iconTitle: 'extrude',
            desc: {
              title: 'extrude',
              content: [{ text: 'extrude' }],
            },
          },
          {
            semi: true,
            icon: 50,
            iconTitle: 'resolve',
            desc: {
              title: 'resolve',
              content: [{ text: 'resolve' }],
            },
          },
        ],
        [
          {
            semi: true,
            icon: 51,
            arrowTitle: 'hole',
            desc: {
              title: 'hole',
              content: [{ text: 'hole' }],
            },
            options: [{ icon: 0, title: 'do something' }],
          },
          {
            semi: true,
            icon: 52,
            arrowTitle: 'round',
            desc: {
              title: 'round',
              content: [{ text: 'round' }],
            },
            options: [{ icon: 0, title: 'do something' }],
          },
        ],
        [
          {
            semi: true,
            icon: 53,
            iconTitle: 'draft',
            desc: {
              title: 'draft',
              content: [{ text: 'draft' }],
            },
          },
          {
            semi: true,
            icon: 54,
            arrowTitle: 'thin wall',
            desc: {
              title: 'thin wall',
              content: [{ text: 'thin wall' }],
            },
            options: [{ icon: 0, title: 'do something' }],
          },
        ],
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
            iconTitle: 'close sketch',
            changeToolbar: 'default',
          },
        ],
      ],
    },
  ];
}
