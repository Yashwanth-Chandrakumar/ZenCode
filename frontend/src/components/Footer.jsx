import React from 'react'

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 shadow-md mt-8">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Zencode. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer