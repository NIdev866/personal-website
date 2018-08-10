import React from 'react';

import style from './Contact.scss';
import {contact as data} from '../../../data';
import PhoneNumberIcon from '../../../Assets/Static/Phone.png';
import EmailAddressIcon from '../../../Assets/Static/Email.png';
import LinkedInIcon from '../../../Assets/Static/Linkedin.png';
import ReactLogo from '../../../Assets/Static/React.png';

const Contact = props => {
  const {
    contact,
    contact_details_wrapper,
    contact_details,
    contact_details_item,
    image,
    detail_text,
    contact_form_wrapper,
    text_box,
    text_area,
    form_button,
    form_overlay,
    react_logo_wrapper,
    react_logo,
    message_status_text
  } = style;
  return (
    <div
      className={contact}
    >
      <div className={contact_details_wrapper}>
        <div className={contact_details}>
          <div className={contact_details_item}>
            <img
              className={[image, 'float-left'].join(' ')}
              src={props.icons.phoneNumber}
              onClick={()=> document.getElementById('phone_number_contact_link').click()}
              alt='Phone'
            />
            <a
              id='phone_number_contact_link'
              className={[detail_text, 'float-left'].join(' ')}
              href={`tel:${data.details.phoneNumber}`}
            >
              {data.details.phoneNumber}
            </a>
          </div>
          <div className={contact_details_item}>
            <img
              className={[image, 'float-left'].join(' ')}
              src={props.icons.emailAddress}
              onClick={()=> document.getElementById('email_address_contact_link').click()}
              alt='Email'
            />
            <a
              id='email_address_contact_link'
              className={[detail_text, 'float-left'].join(' ')}
              href={`mailto:${data.details.emailAddress}`}
            >
              {data.details.emailAddress}
            </a>
          </div>
          <div className={contact_details_item}>
            <img
              className={[image, 'float-left'].join(' ')}
              src={props.icons.linkedIn}
              onClick={()=> window.open(data.details.linkedIn, '_blank')}
              alt='LinkedIn'
            />
            <a
              className={[detail_text, 'float-left'].join(' ')}
              href={data.details.linkedIn}
              target='_blank'
            >
              {data.details.linkedIn}
            </a>
          </div>
        </div>
      </div>
      {props.messageStatus !== 'not sent' && (
        <div className={form_overlay}>
          {props.messageStatus === 'sending' && (
            <div className={react_logo_wrapper}>
              <img alt='React logo' src={props.reactLogoImage} className={react_logo}/>
            </div>
          )}
          {props.messageStatus === 'sent' && (
            <div className={message_status_text}>
              Message sent
            </div>
          )}
          {props.messageStatus === 'failed' && (
            <div className={message_status_text}>
              Please try again
            </div>
          )}
        </div>
      )}
      <form className={contact_form_wrapper} onSubmit={e => {
        e.preventDefault();
        props.sendButtonPressed();
        const formData = new FormData();
        formData.append('name', props.yourName);
        formData.append('email', props.yourEmail);
        formData.append('message', props.message);
        const req = new XMLHttpRequest();
        req.open('POST', data.formSubmissionUrl);
        req.setRequestHeader('Accept', 'application/json');
        req.send(formData);
        req.onload = () => props.submissionStatusHandler(req);
      }}>
        <input
          className={text_box}
          placeholder='Your Name'
          type='text'
          value={props.yourName}
          onChange={props.updateYourName}
          required
        />
        <input
          className={text_box}
          placeholder='Your Email'
          type='email'
          value={props.yourEmail}
          onChange={props.updateYourEmail}
          required
        />
        <textarea
          className={[text_box, text_area].join(' ')}
          placeholder='Message'
          value={props.message}
          onChange={props.updateMessage}
          required
        />
        <button
          className={[text_box, form_button].join(' ')}
          type='submit'
        >
          Send
        </button>
      </form>
    </div>
  );
};

Contact.defaultProps = {
  reactLogoImage: ReactLogo,
  icons: {
    phoneNumber: PhoneNumberIcon,
    emailAddress: EmailAddressIcon,
    linkedIn: LinkedInIcon,
  }
};

export default Contact;