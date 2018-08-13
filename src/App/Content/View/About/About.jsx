import React from 'react';

import style from './About.scss';
import GithubIcon from '../../../../Assets/Static/Github.png';
import CodepenIcon from '../../../../Assets/Static/Codepen.png';
import YoutubeIcon from '../../../../Assets/Static/Youtube.png';

const About = props => {
  const {
    content_above_links,
    desktop_profile_picture_wrapper,
    full_name,
    mobile_profile_picture_wrapper,
    profile_picture,
    title_style,
    description,
    links,
    link_wrapper,
    link_style,
    link_image_wrapper,
    link_image,
    link_text
  } = style;
  return (
    <div>
      <div className={content_above_links}>
        <div className={desktop_profile_picture_wrapper}>
          <img
            alt='Profile'
            src={props.data.profilePicture}
            className={profile_picture}
          />
        </div>
        <div>
          <div className={full_name}>
            <span>
              {props.data.firstName}
            </span>
            &nbsp;
            <span>
              {props.data.lastName}
            </span>
          </div>
          <div className={mobile_profile_picture_wrapper}>
            <img
              alt='Profile'
              src={props.data.profilePicture}
              className={profile_picture}
            />
          </div>
          <div className={title_style}>
            {props.data.title}
          </div>
          <div className={description}>
            {props.data.description}
          </div>
        </div>
      </div>
      <div className={links}>
        {props.data.githubUrl && (
          <div className={link_wrapper}>
            <div className={link_style}>
              <div className={link_image_wrapper}>
                <img
                  alt='github'
                  className={link_image}
                  onClick={()=> document.getElementById('github_link').click()}
                  src={props.githubIcon}
                />
              </div>
              <a
                id='github_link'
                href={props.data.githubUrl}
                target='_blank'
                className={link_text}
              >
                {props.data.githubText || 'My Github'}
              </a>
            </div>
          </div>
        )}
        {props.data.codepenUrl && (
          <div className={link_wrapper}>
            <div className={link_style}>
              <div className={link_image_wrapper}>
                <img
                  alt='codepen'
                  className={link_image}
                  onClick={()=> document.getElementById('codepen_link').click()}
                  src={props.codepenIcon}
                />
              </div>
              <a
                id='codepen_link'
                href={props.data.codepenUrl}
                target='_blank'
                className={link_text}
              >
                {props.data.codepenText || 'My Codepen'}
              </a>
            </div>
          </div>
        )}
        {props.data.youtubeUrl && (
          <div className={link_wrapper}>
            <div className={link_style}>
              <div className={link_image_wrapper}>
                <img
                  alt='youtube'
                  className={link_image}
                  onClick={()=> document.getElementById('youtube_link').click()}
                  src={props.youtubeIcon}
                />
              </div>
              <a
                id='youtube_link'
                href={props.data.youtubeUrl}
                target='_blank'
                className={link_text}
              >
                {props.data.youtubeText || 'My Youtube'}
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

About.defaultProps = {
  githubIcon: GithubIcon,
  codepenIcon: CodepenIcon,
  youtubeIcon: YoutubeIcon
};

export default About;