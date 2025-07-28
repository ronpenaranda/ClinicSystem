import React from 'react'

const ContactForm = () => {
  return (
    <div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    <div className="col-span-1">
      <label
        className="block text-gray-700 text-sm mb-2"
        htmlFor="name"
      >
        Name
      </label>
      <input
        className="text-sm appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="name"
        type="text"
      />
    </div>

    <div className="col-span-1">
      <label
        className="block text-gray-700 text-sm mb-2"
        htmlFor="email"
      >
        Email
      </label>
      <input
        className="text-sm appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="email"
        type="email"
      />
    </div>

    <div className="col-span-2">
      <label
        className="block text-gray-700 text-sm mb-2"
        htmlFor="subject"
      >
        Subject
      </label>
      <input
        className="text-sm appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="subject"
        type="text"
      />
    </div>

    <div className="col-span-2">
      <label
        className="block text-gray-700 text-sm mb-2"
        htmlFor="message"
      >
        Send
      </label>
      <textarea
        className="text-sm appearance-none border w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="message"
      ></textarea>
    </div>
    <div className="col-span-2">
    <button className='bg-slate-500 text-white px-4 py-2 rounded mt-2 text-sm w-full'> Message </button>
    </div>
  </div></div>
  )
}

export default ContactForm