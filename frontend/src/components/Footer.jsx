import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between px-5 md:px-10">
        <div className="flex-1 space-y-3 md:text-left text-center mb-8 md:mb-0">
          <h3 className="text-2xl font-bold">INFO</h3>
          <ul className="space-y-2">
            <li><a href="https://tech.sjp.ac.lk/" className="hover:text-[#f18930]">Faculty of Technology</a></li>
            <li><a href="https://www.sjp.ac.lk/cits/" className="hover:text-[#f18930]">Center for IT Services</a></li>
            <li><a href="https://www.sjp.ac.lk/" className="hover:text-[#f18930]">University of Sri Jayewardenepura</a></li>
            <li><a href="https://web.facebook.com/FOTUSJP/?_rdc=1&_rdr" className="hover:text-[#f18930]">Facebook</a></li>
            <li><a href="https://www.youtube.com/c/FacultyofTechnology/?sub_confirmation=1" className="hover:text-[#f18930]">YouTube</a></li>
          </ul>
        </div>

        <div className="flex-5 space-y-3 md:text-left text-center">
          <h3 className="text-2xl font-bold">Contact Us</h3>
          <p className="leading-7">
            Pitipana, Homagama,<br />Sri Lanka
          </p>
          <p>Email: <a href="mailto:help@fot.sjp.ac.lk" className="hover:text-[#f18930]">help@fot.sjp.ac.lk</a></p>
          <p>Phone: <a href="tel:+94113438555" className="hover:text-[#f18930]">0113 438 555</a></p>
        </div>
      </div>

      <div className="bg-white text-black py-4 mt-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-5 md:px-10">
        <p className="text-center mx-auto md:text-left">&copy; 2023 your company. All rights reserved</p>

          <ul className="flex space-x-4 mt-4 md:mt-0">
            <li><a href="https://web.facebook.com/FOTUSJP/?_rdc=1&_rdr" className="hover:text-[#f18930] text-black"><i className="fab fa-facebook fa-lg"></i></a></li>
            <li><a href="https://www.youtube.com/c/FacultyofTechnology/?sub_confirmation=1" className="hover:text-[#f18930] text-black"><i className="fab fa-youtube fa-lg"></i></a></li>
            <li><a href="#" className="hover:text-[#f18930] text-black"><i className="fab fa-instagram fa-lg"></i></a></li>
            <li><a href="#" className="hover:text-[#f18930] text-black"><i className="fab fa-linkedin fa-lg"></i></a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
