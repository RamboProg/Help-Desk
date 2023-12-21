import React, { useState } from 'react';
import axios from 'axios';

export default function Register() {
  const [ticketId, setTicketId] = useState('');

  async function register(ev) {
    ev.preventDefault();
    const { data } = await axios.post('/api/v1/createChat', ticketId);
  }

  return (
    <div className='bg-blue-50 h-screen flex items-center'>
      <form className='w-64 mx-auto mb-12' onSubmit={register}>
        <input
          value={ticketId}
          onChange={(ev) => setTicketId(ev.target.value)}
          type='text'
          placeholder='Ticket ID'
          className='block w-full rounded-s p-2 mb-2 border'
        />
        <button className='bg-blue-500 text-white block w-full rounded-sm p-2'>Register</button>
      </form>
    </div>
  );
}
