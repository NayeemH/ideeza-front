import React, { useEffect, useRef, useState } from 'react';
import Tool from './Tool';

function Tools({ obj, setCurrentToolbar, setAddObj }) {
  const { title, expandIcon, tools } = obj;

  const [expand, setExpand] = useState(false);

  const toolRef = useRef(null);

  useEffect(() => {
    if (expand) {
      if (!toolRef.current.classList.contains('expand')) {
        toolRef.current.classList.add('expand');
      }
    } else {
      if (toolRef.current.classList.contains('expand')) {
        toolRef.current.classList.remove('expand');
      }
    }
  }, [expand]);

  return (
    <div
      className="toolbar__tools"
      tabIndex={0}
      ref={toolRef}
      onBlur={(e) => {
        if (e.relatedTarget?.id !== 'toolButton') {
          setExpand(false);
        }
      }}
    >
      <div
        className="toolbar__tools__expand-container"
        onClick={(e) => {
          setExpand((prev) => !prev);
          const iconDom = e.currentTarget.parentNode.childNodes[1];
          iconDom.style.left = 0;
          setTimeout(() => {
            const rect = iconDom.getBoundingClientRect();

            if (rect.x + rect.width > window.innerWidth) {
              iconDom.style.left =
                window.innerWidth - (rect.x + rect.width) - 5 + 'px';
            }
          }, 0.1);
        }}
      >
        <div className="toolbar__tools__expand-container__icon">
          <img
            src={`/images/cover/icons/icon${expandIcon}.png`}
            alt="Expand tool"
          />
        </div>

        <p>{title}</p>
        <img
          src="/images/cover/icons/arrow-drop-down.png"
          alt="arrow"
          className="arrow-icon"
        />
      </div>
      <div className="toolbar__tools__icons-container">
        {tools.map((el, i) => (
          <div key={i} className="toolbar__tools__icons-container__group">
            {el.map((e, j) => (
              <Tool key={j} tool={e} {...{ setCurrentToolbar, setAddObj }} />
            ))}
          </div>
        ))}
      </div>
      <p className="toolbar__tools__title">{title}</p>
    </div>
  );
}

export default Tools;
