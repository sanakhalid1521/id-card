"use client";
import React from "react";
import Image from "next/image";
import background from '../public/images/background.jpg';
import logo from '../public/images/logo.png';
import profilepic from '../public/images/profilepic.jpg';

const IDCard = () => {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <div className="flex-grow flex justify-center p-4">
                <div className="bg-slate-200 p-10 rounded-lg shadow-lg max-w-4x1 w-full border-4 border-sky-300 relative">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src={background}
                            alt="background image"
                            layout="fill"  
                            style={{ objectFit: "cover" }}  // Use style to apply object-fit
                            className="opacity-10"
                        />
                    </div>
                    {/* Logo */}
                    <div className="absolute top-[10px] left-0 w-16 h-16"> {/* Moved logo up */}
                        <Image src={logo} alt="logo" width={64} height={64} />
                    </div>
                    {/* Card Content */}
                    <div className="relative z-10 flex mt-8"> {/* Added margin-top to move content down */}
                        {/* Left Section: Personal Info */}
                        <div className="w-2/3 pr-8">
                            <p className="mb-2">
                                <span className="text-sky-500 font-bold">Name:</span>
                                <span className="text-black ml-2"> Sana Khalid</span>
                            </p>
                            <p className="mb-2">
                                <span className="text-sky-500 font-bold">Roll No:</span>
                                <span className="text-black ml-2"> 218530</span>
                            </p>
                            <p className="mb-2">
                                <span className="text-sky-500 font-bold">City:</span>
                                <span className="text-black ml-2"> Karachi</span>
                            </p>
                            <p className="mb-2">
                                <span className="text-sky-500 font-bold">Center:</span>
                                <span className="text-black ml-2"> Governor House Karachi</span>
                            </p>
                            <p className="mb-2">
                                <span className="text-sky-500 font-bold">Campus:</span>
                                <span className="text-black ml-2"> Main Campus</span>
                            </p>
                            <p className="mb-2">
                                <span className="text-sky-500 font-bold">Day and Time:</span>
                                <span className="text-black ml-2"> Sunday 2 To 5</span>
                            </p>
                            <p className="mb-2">
                                <span className="text-sky-500 font-bold">Batch:</span>
                                <span className="text-black ml-2"> 1</span>
                            </p>
                            {/* Button */}
                            <div className="flex flex-col mt-4">
                                <button className="relative w-full p-2 rounded-lg border border-gray-300 bg-blue-900 text-white flex items-center justify-center">
                                    <span className="absolute inset-0 bg-slate-500 opacity-20"></span>
                                    <span className="relative z-10">Q1 & WMD</span>
                                </button>
                            </div>
                        </div>
                        {/* Right Section: Profile Picture */}
                        <div className="w-1/3 text-center">
                            <Image
                                src={profilepic}
                                alt="Profile pic"
                                width={150}
                                height={150}
                                className="rounded-lg mb-6"
                            />
                            <p className="border-t-2 border-t-slate-400 pt-2 font-bold text-sky-500 mt-10 text-xl">
                                Authorize Signature
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IDCard;
