import React from 'react';

import style from './Experience.scss';

const Experience = props => {
  const {
    main_title_logo_wrapper,
    main_title,
    bold_main_title,
    desktop_display_none,
    no_logo_main_title_wrapper,
    logo_wrapper_mobile,
    desktop_logo_text_wrapper,
    logo_wrapper_dektop,
    logo,
    bigger_text,
    description,
    smaller_text
  } = style;
  return (
    <div>
      <div className={main_title_logo_wrapper}>
        <div
          className={[
            main_title,
            !props.data.logo && bold_main_title,
            !props.data.logo && desktop_display_none
          ].join(' ')}
        >
          {props.data.mainTitle}
        </div>
        {props.data.logo && (
          <div className={logo_wrapper_mobile}>
            <img alt='Logo' className={logo} src={props.data.logo} />
          </div>
        )}
      </div>
      <div className={desktop_logo_text_wrapper}>
        {props.data.logo && (
          <div className={logo_wrapper_dektop}>
            <img alt='Logo' className={logo} src={props.data.logo} />
          </div>
        )}
        {!props.data.logo && (
          <div
            className={[
              no_logo_main_title_wrapper,
              !props.data.logo && bold_main_title
            ].join(' ')}
          >
            <div>
              {props.data.mainTitle}
            </div>
          </div>
        )}
        <div>
          <div className={bigger_text}>
            Position:
          </div>
          <div className={bigger_text}>
            {props.data.position}
          </div>
          <div className={bigger_text}>
            <div>
              (
              <span className='d-inline-block'>
                {props.data.monthStarted}
              </span>
              &nbsp;
              <span>
                {props.data.yearStarted}
              </span>
              <span>
                &nbsp;
              </span>
              <span>
                -
              </span>
              <span className='d-inline-block'>
                &nbsp;
              </span>
              <span>
                {props.data.monthFinished}
              </span>
              &nbsp;
              <span>
                {props.data.yearFinished}
              </span>
              )
            </div>
          </div>
        </div>
      </div>
      <div className={[description, smaller_text].join(' ')}>
        {props.data.description}
      </div>
      {props.data.technologiesUsed && (
        <div className={smaller_text}>
          <div>Some of the technologies used:</div>
          <div>
            {props.data.technologiesUsed.map(technologyUsed => (
              <div key={technologyUsed}>{technologyUsed}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Experience;