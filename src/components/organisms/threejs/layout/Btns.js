import React from 'react';

function Btns({ threejsRef }) {
  return (
    <>
      <div
        className="show-toolbar"
        id="show-toolbar"
        onClick={() => {
          const toolbar = threejsRef?.current?.querySelector(`#main-toolbar`);
          if (toolbar) toolbar?.classList?.toggle('hide-toolbar');
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="70"
          viewBox="0 0 102.055 102.055"
        >
          <defs>
            <filter
              id="Path_1745"
              x="0"
              y="0"
              width="102.055"
              height="102.055"
              filterUnits="userSpaceOnUse"
            >
              <feOffset input="SourceAlpha" />
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feFlood floodOpacity="0.161" />
              <feComposite operator="in" in2="blur" />
              <feComposite in="SourceGraphic" />
            </filter>
            <clipPath id="clip-path">
              <path
                id="Path_1747"
                // data-name="Path 1747"
                d="M2.513,0C-1.291,0-.108,4.635,1.7,5.983a1.8,1.8,0,0,0,1.084.391C5.259,6.374,7.037.459,3.1.033A5.5,5.5,0,0,0,2.513,0"
                transform="translate(0 0)"
                fill="none"
              />
            </clipPath>
            <pattern
              id="pattern"
              preserveAspectRatio="none"
              width="100%"
              height="100%"
              viewBox="0 0 14 11"
            >
              <image
                width="14"
                height="11"
                xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAALCAYAAABPhbxiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAoSURBVChTY/z//z8DOYAxVK6BVJ0HVz2sd2CCckgGoxrxgCGjkYEBANn2CA8oZI8uAAAAAElFTkSuQmCC"
              />
            </pattern>
          </defs>
          <g
            id="Group_3419"
            // data-name="Group 3419"
            transform="translate(4429 3838)"
          >
            <g
              id="Group_3415"
              //   data-name="Group 3415"
              transform="translate(-4420 -3829)"
            >
              <g
                transform="matrix(1, 0, 0, 1, -9, -9)"
                filter="url(#Path_1745)"
              >
                <path
                  id="Path_1745-2"
                  //   data-name="Path 1745"
                  d="M68.295,84.055H15.76A15.759,15.759,0,0,1,0,68.295V15.76A15.759,15.759,0,0,1,15.76,0H68.295a15.759,15.759,0,0,1,15.76,15.76V68.295A15.759,15.759,0,0,1,68.295,84.055Z"
                  transform="translate(9 9)"
                  fill="#fff"
                />
              </g>
              <g
                id="Group_3414"
                // data-name="Group 3414"
                transform="translate(7.458 12.695)"
              >
                <path
                  id="Path_1737"
                  //   data-name="Path 1737"
                  d="M206.784,36.616c0-12.888-15.807-23.335-35.3-23.335-14.624,0-26.539,6.31-31.936,14.006-5.445,7.765-1.643,15.182,1.247,18.542,4.258,4.953,5.98,7.939,9.624,16.706,2.631,6.325,8.285,8.242,14.575,8.287,5.177.037,9.991-3.556,13.068-7.179,3.065-3.6,9.86-7.93,14.531-9.472,8.953-2.953,14.193-9.2,14.193-17.556"
                  transform="translate(-136.785 -13.281)"
                  fill="#561f80"
                />
                <g id="vector" transform="translate(18.155 8.949)">
                  <g id="Group_3407" data-name="Group 3407">
                    <g id="Group_3406" data-name="Group 3406">
                      <path
                        id="Path_1741"
                        data-name="Path 1741"
                        d="M33.63,0H29.5a1.014,1.014,0,0,0-1.015,1.015V2.03H20.18a3.027,3.027,0,0,0-5.716,0H6.158V1.015A1.014,1.014,0,0,0,5.143,0H1.015A1.014,1.014,0,0,0,0,1.015v4.06A1.014,1.014,0,0,0,1.015,6.09H5.143A1.014,1.014,0,0,0,6.158,5.075V4.046h4.168A13.241,13.241,0,0,0,4.2,14.441a3.036,3.036,0,1,0,2.026.046,11.138,11.138,0,0,1,8.4-10.055,3.019,3.019,0,0,0,5.39,0,11.138,11.138,0,0,1,8.4,10.055,3.054,3.054,0,1,0,2.026-.046A13.216,13.216,0,0,0,24.319,4.06h4.168V5.075A1.014,1.014,0,0,0,29.5,6.09H33.63a1.014,1.014,0,0,0,1.015-1.015V1.015A1.014,1.014,0,0,0,33.63,0Z"
                        fill="#fff"
                      />
                    </g>
                  </g>
                  <g
                    id="Group_3409"
                    // data-name="Group 3409"
                    transform="translate(10.373 30.517)"
                  >
                    <g id="Group_3408" data-name="Group 3408">
                      <path
                        id="Path_1742"
                        // data-name="Path 1742"
                        d="M167.149,453.869a4.127,4.127,0,0,0-3.86-2.869H157.2a4.128,4.128,0,0,0-3.86,2.869,1,1,0,0,0,.987,1.259h11.836A1,1,0,0,0,167.149,453.869Z"
                        transform="translate(-153.294 -451)"
                        fill="#fff"
                      />
                    </g>
                  </g>
                  <g
                    id="Group_3411"
                    // data-name="Group 3411"
                    transform="translate(8.187 8.895)"
                  >
                    <g id="Group_3410" data-name="Group 3410">
                      <path
                        id="Path_1743"
                        // data-name="Path 1743"
                        d="M139.1,143.383l-7.949-11.924v9.629a3.045,3.045,0,1,1-2.03,0v-9.629l-7.949,11.924a1.015,1.015,0,0,0,.127,1.281,12.817,12.817,0,0,1,3.514,6.839,6.044,6.044,0,0,1,2.279-.451h6.09a6.046,6.046,0,0,1,2.278.451,12.816,12.816,0,0,1,3.514-6.838A1.015,1.015,0,0,0,139.1,143.383Z"
                        transform="translate(-121 -131.459)"
                        fill="#fff"
                      />
                    </g>
                  </g>
                  <g
                    id="Group_3413"
                    // data-name="Group 3413"
                    transform="translate(16.307 20.367)"
                  >
                    <g id="Group_3412" data-name="Group 3412">
                      <path
                        id="Path_1744"
                        // data-name="Path 1744"
                        d="M242.015,301a1.015,1.015,0,1,0,1.015,1.015A1.016,1.016,0,0,0,242.015,301Z"
                        transform="translate(-241 -301)"
                        fill="#fff"
                      />
                    </g>
                  </g>
                </g>
              </g>
            </g>
            <g
              id="Group_3418"
              //   data-name="Group 3418"
              transform="matrix(0.921, -0.391, 0.391, 0.921, -4365.954, -3762.954)"
            >
              <g
                id="Group_3417"
                // data-name="Group 3417"
                transform="translate(0 0)"
              >
                <path
                  id="Path_1746"
                  //   data-name="Path 1746"
                  d="M8.116,2.385C5.331-1.424,2.393-.1,1.039,2.405s-1.9,5.91,1.634,7.613,10.74-.387,5.443-7.634"
                  transform="translate(1.391 11.372) rotate(-98)"
                  fill="#561f80"
                />
                <g
                  id="Group_3416"
                  //   data-name="Group 3416"
                  transform="translate(12.558 7.531) rotate(-98)"
                  clipPath="url(#clip-path)"
                >
                  <rect
                    id="Rectangle_543"
                    // data-name="Rectangle 543"
                    width="8.508"
                    height="6.544"
                    transform="translate(-1.389 -0.088)"
                    fill="url(#pattern)"
                  />
                </g>
              </g>
            </g>
          </g>
        </svg>
      </div>

      <div
        className="show-sidebar"
        // id="show-sidebar"
        onClick={() => {
          const sidebar = threejsRef?.current?.querySelector('#sidebar');
          const resizer = threejsRef?.current?.querySelector('#resizer');

          if (sidebar) sidebar.classList.toggle('hide-sidebar');
          if (resizer) resizer.classList.toggle('hide-resizer');

          const hsidebar = document.getElementsByClassName("hide-sidebar").length
          if(hsidebar === 1){
            document.getElementsByClassName("show-sidebar")[0].style.right = "300px"
            document.getElementsByClassName("show-sidebar")[0].style.transform = "scaleX(-1)"
          }else{
            document.getElementsByClassName("show-sidebar")[0].style.right = "0"
            document.getElementsByClassName("show-sidebar")[0].style.transform = "scaleX(1)"
          }
        }}
      >
        <svg
          width="48px"
          height="48px"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="48" height="48" fill="white" fillOpacity="0.01" />
          <path
            d="M31 36L19 24L31 12"
            stroke="black"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div
        className="show-fullscreen"
        id="show-fullscreen"
        onClick={() => {
          if (!threejsRef?.current) return;
          if (document.fullscreenElement === null) {
            threejsRef.current.requestFullscreen();
          } else {
            document.exitFullscreen();
          }
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="21"
          height="21"
          viewBox="0 0 21 21"
        >
          <image
            id="_-e-3d_Viewport_Resize"
            dataname="-e-3d Viewport Resize"
            width="21"
            height="21"
            xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAACpF6WWAAAABHNCSVQICAgIfAhkiAAAAXlJREFUOE+11T9IlVEYx/HPVclBDAwEUxAHCyoawsG1rVEEJ4f8M9jUJg21WhG0tRWkNtQShJu4OTqLJOiiWFeRCMqG0nrlgfe+qHTvPcL1hXc4nOd8n995/p1SlmVldKn9HaEFv9CPHqygGbv5ehgfY13KsiyrA4ztPSziJ6ZxGU9xCV/xGDewgGup0GXcTXAe4JuNhobfpkZDIySTjYbOYazR0NcXobQTvalKV3EHf+tUQCs6AnqIb1ivcuAKbuM97tcBv8JERek8xqtAo2veYTQBXCTqALN4WONqqeBCafT9d/yuE69q4Bm8wRaKmA5gG/sJbXgWvINHuIclFNmPCfQWUwnQMDkJrhx5gKjRU3VaK1H/8/UiV1jZe55PqiJRMU9D6ZNEpRHDs7Yf8uooer8J/xKBYdaL6+g78UdOYqYWU2oEa/h8DnA105intyrFv4GhHPwM3fiTX/MHXqL9PJM/noOrCMWf8CV/s6LPB/P1JtoS36jyMa3bqI61dSdIAAAAAElFTkSuQmCC"
          />
        </svg>
      </div>
    </>
  );
}

export default Btns;
