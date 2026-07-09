import React from 'react'

// Card component receives props from parent (App.jsx)
// Props here are: username and btnText
// btnText has a default value "visit me" if not provided
function Card({ username, btnText = "visit me" }) {
  console.log(username); // logs the username prop to console

  return (
    <div className="relative h-[400px] w-[300px] rounded-md">
      {/* Background image (using the GitHub avatar you provided) */}
      <img
        src="https://avatars.githubusercontent.com/u/168270210?v=4"
        alt="Profile"
        className="z-0 h-full w-full rounded-md object-cover"
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>

      {/* Text content using props */}
      <div className="absolute bottom-4 left-4 text-left">
        {/* username prop displayed here */}
        <h1 className="text-lg font-semibold text-white">{username}</h1>

        <p className="mt-2 text-sm text-gray-300">
          This card demonstrates how props pass data.
        </p>

        {/* btnText prop displayed here (default or custom) */}
        <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
          {btnText} →
        </button>
      </div>
    </div>
  )
}

export default Card
