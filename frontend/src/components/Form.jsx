import React, { useState, useRef } from 'react';

function ContactForm({visible}) {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);
  
    const handleSubmit = (event) => {
      console.log(`Submitting form: name=${nameRef.current.value}, email=${emailRef.current.value}, message=${messageRef.current.value}`);
      // You can add your own logic here to send the form data to your server
    }
  
    const handleSaveText = () => {
      const savedText = `${nameRef.current.value} - ${emailRef.current.value} - ${messageRef.current.value}`;
      console.log(`Saved text: ${savedText}`);
    }
  
    return (
      <form onSubmit={handleSubmit} className={ visible===false ? 'hidden':'block grid grid-cols-2 gap-4 justify-items-center	'}>
        <label htmlFor="name">Name:</label>
        <input className='text-blue-500' type="text" id="name" name="name" ref={nameRef} required />
  
        <label htmlFor="email">Email:</label>
        <input className='text-blue-500' type="email" id="email" name="email" ref={emailRef} required />
  
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" className='text-blue-500' ref={messageRef} required />
  
        <input type="submit" value="Submit" />
  
        <button type="button" onClick={handleSaveText}>Save Text</button>
      </form>
    );
}

export default ContactForm;