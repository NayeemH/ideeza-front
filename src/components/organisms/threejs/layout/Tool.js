import React, { useEffect, useRef, useState } from 'react';

function Tool({ tool, setCurrentToolbar, setAddObj }) {
  const {
    big,
    semi,
    width,
    icon,
    arrowTitle,
    iconTitle,
    options,
    desc,
    click,
    changeToolbar,
    checkbox,
  } = tool;

  const [showOptions, setShowOptions] = useState(false);
  const [showCheckbox, setShowCheckbox] = useState(false);
  const [showDesc, setShowDesc] = useState(false);

  const [showOptionForm, setShowOptionForm] = useState(-1);

  const [formData, setFormData] = useState({});

  const [checkboxData, setCheckBoxData] = useState([]);

  const [timeout, setTimeOut] = useState();
  const optionsRef = useRef(null);
  const checkboxRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    if (!showOptions) {
      setShowOptionForm(-1);
    }
  }, [showOptions]);

  useEffect(() => {
    if (checkbox) {
      setCheckBoxData(checkbox.map(() => true));
    }
  }, [checkbox]);

  return (
    <>
      <button
        className={`toolbar__tools__icons-container__group__icon ${
          big ? 'big-icon' : ''
        } ${showOptions ? 'options' : ''} ${showCheckbox ? 'checkbox' : ''} ${
          semi ? 'semi-icon' : ''
        }`}
        id="toolButton"
        onBlur={(e) => {
          if (
            e.relatedTarget?.id !== 'optionInput' &&
            e.relatedTarget?.id !== 'checkbox'
          ) {
            setShowOptions(false);
            setShowCheckbox(false);
          }
        }}
      >
        <div
          className="toolbar__tools__icons-container__group__icon__icon-container"
          onClick={() => {
            clearTimeout(timeout);
            let obj;
            if (click) {
              obj = click();
            }
            if (obj && Object.keys(obj)?.length > 0) {
              setAddObj((prev) => {
                return {
                  ...prev,
                  ...obj,
                };
              });
            }

            if (changeToolbar) {
              setCurrentToolbar(changeToolbar);
            }

            if (checkbox) {
              setShowCheckbox((prev) => !prev);

              setTimeout(() => {
                const checkboxDom = checkboxRef.current;
                if (checkboxDom) {
                  checkboxDom.style.left = 0;
                  const rect = checkboxDom.getBoundingClientRect();

                  if (rect.x + rect.width > window.innerWidth) {
                    checkboxDom.style.left =
                      window.innerWidth - (rect.x + rect.width) - 5 + 'px';
                  }
                }
              }, 0.1);
            }
          }}
          onMouseMove={() => {
            clearTimeout(timeout);
            setTimeOut(
              setTimeout(function () {
                setShowDesc(true);

                setTimeout(() => {
                  const descDom = descRef.current;
                  if (descDom) {
                    descDom.style.left = 0;
                    const rect = descDom.getBoundingClientRect();

                    if (rect.x + rect.width > window.innerWidth) {
                      descDom.style.left =
                        window.innerWidth - (rect.x + rect.width) - 5 + 'px';
                    }
                  }
                }, 0.1);
              }, 500)
            );
          }}
          onMouseLeave={() => {
            clearTimeout(timeout);
            setTimeout(() => {
              setShowDesc(false);
            }, 500);
          }}
        >
          <img
            src={`/images/cover/icons/icon${icon}.png`}
            alt="tool"
            style={{ width: `${width}px` }}
          />
          {iconTitle && <p>{iconTitle}</p>}
        </div>
        {options?.length > 0 && (
          <>
            <div
              className="toolbar__tools__icons-container__group__icon__arrow-container"
              onClick={() => {
                setShowOptions((prev) => !prev);

                setTimeout(() => {
                  const optionsDom = optionsRef.current;
                  if (optionsDom) {
                    optionsDom.style.left = 0;
                    const rect = optionsDom.getBoundingClientRect();

                    if (rect.x + rect.width > window.innerWidth) {
                      optionsDom.style.left =
                        window.innerWidth - (rect.x + rect.width) - 5 + 'px';
                    }
                  }
                }, 0.1);
              }}
            >
              {arrowTitle && <p>{arrowTitle}</p>}
              <img
                src="/images/cover/icons/arrow-drop-down.png"
                className="arrow-icon"
                alt="arrow"
              />
            </div>
            {showOptions && (
              <div
                ref={optionsRef}
                className="toolbar__tools__icons-container__group__icon__options-container"
              >
                {options.map((el, i) => (
                  <div
                    key={i}
                    className="toolbar__tools__icons-container__group__icon__options-container__option"
                    onClick={() => {
                      let obj;
                      if (el.click) {
                        obj = el.click();
                        setShowOptions(false);
                      }
                      if (obj) {
                        setAddObj(obj);
                      }

                      if (el.form) {
                        setShowOptionForm(i);
                      }
                    }}
                  >
                    <img
                      src={`/images/cover/icons/icon${el.icon}.png`}
                      alt="tool"
                    />
                    <p>{el.title}</p>
                    {showOptionForm === i && el.form && (
                      <form
                        className="toolbar__tools__icons-container__group__icon__options-container__option__form"
                        onSubmit={(e) => {
                          e.preventDefault();
                          el?.form?.submit(formData);
                          setShowOptions(false);
                        }}
                      >
                        {el.form.input.map((e, k) => (
                          <div
                            key={k}
                            className="toolbar__tools__icons-container__group__icon__options-container__option__form__input-container"
                          >
                            <label htmlFor={e.name}>{e.name}</label>
                            <input
                              id="optionInput"
                              type={e.type}
                              name={e.name}
                              min="1"
                              max={e?.max}
                              required
                              onChange={(ev) => {
                                setFormData((prev) => {
                                  return {
                                    ...prev,
                                    [e.name]: ev.target.value,
                                  };
                                });
                              }}
                            />
                          </div>
                        ))}

                        <button type="submit" id="optionInput">
                          Add
                        </button>
                      </form>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        {checkbox?.length > 0 && showCheckbox && (
          <div
            ref={checkboxRef}
            className="toolbar__tools__icons-container__group__icon__checkbox-container"
          >
            {checkbox.map((el, i) => (
              <div
                key={i}
                className="toolbar__tools__icons-container__group__icon__checkbox-container__content"
              >
                <input
                  name={el?.title}
                  id="checkbox"
                  disabled={el?.disabled}
                  type="checkbox"
                  defaultChecked={checkboxData[i]}
                  onChange={(e) => {
                    setCheckBoxData((prev) => {
                      let arr = [...prev];
                      arr[i] = e.target.checked;
                      return arr;
                    });
                    if (el.onChange) {
                      el.onChange(e.target.checked);
                    }
                  }}
                />
                <p>{el?.title}</p>
                <div className="toolbar__tools__icons-container__group__icon__checkbox-container__content__icon-container">
                  <img
                    src={`/images/cover/icons/arrow-drop-down.png`}
                    alt="tool"
                    onClick={() => {
                      if (!el?.download) return;
                      let obj = el.download();
                      if (obj && Object.keys(obj)?.length > 0) {
                        setAddObj((prev) => {
                          return {
                            ...prev,
                            ...obj,
                          };
                        });
                      }
                    }}
                  />
                  <img
                    src={`/images/cover/icons/arrow-drop-down.png`}
                    alt="tool"
                    onClick={() => {
                      if (!el?.send) return;
                      let obj = el.send();
                      if (obj && Object.keys(obj)?.length > 0) {
                        setAddObj((prev) => {
                          return {
                            ...prev,
                            ...obj,
                          };
                        });
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </button>

      {showDesc && (
        <div
          ref={descRef}
          className={`toolbar__tools__icons-container__group__icon-desc ${
            desc?.big ? 'big-desc' : ''
          }`}
        >
          {desc?.title && (
            <div className="toolbar__tools__icons-container__group__icon-desc__title">
              <img src={`/images/cover/icons/icon${icon}.png`} alt="tool" />
              <p>{desc.title}</p>
            </div>
          )}
          {desc?.content && (
            <div className="toolbar__tools__icons-container__group__icon-desc__content">
              {desc.content.map((el, i) => (
                <div key={i}>
                  {el.text && <p>{el.text}</p>}
                  {el.image && (
                    <img
                      style={{ width: `${el.width}%` }}
                      src={`/images/cover/images/image${el.image}.png`}
                      alt="description"
                    />
                  )}
                </div>
              ))}
            </div>
          )}

          <p className="toolbar__tools__icons-container__group__icon-desc__help">
            Press F1 for help.
          </p>
        </div>
      )}
    </>
  );
}

export default Tool;
