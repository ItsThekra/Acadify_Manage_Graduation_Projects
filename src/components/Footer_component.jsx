import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-10 py-6 text-center border-t">
      <p className="text-gray-500">© {new Date().getFullYear()} Graduation Project Management System. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
