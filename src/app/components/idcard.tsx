"use client";
import React from "react";
import Image from "next/image";
import logo from '../../../public/images/logo.png';
import { QRCodeSVG } from 'qrcode.react';
import { Edit3, Printer, MapPin, Phone, Calendar, User, School } from 'lucide-react';
import { StudentData } from '@/lib/types';

interface IDCardProps extends StudentData {
    onClick?: () => void;
    onEdit?: () => void;
    onPrint?: () => void;
}

const IDCard = (student: IDCardProps) => {
    const { name, rollNo, className, section, fatherName, dob, address, phone, photo, expiryDate, onClick, onEdit, onPrint } = student;
    
    const formatDate = (date: string | Date) => {
        try {
            return new Date(date).toLocaleDateString('en-GB');
        } catch {
            return 'Invalid Date';
        }
    };

    const handlePrintAction = () => {
        if (onPrint) {
            onPrint();
        } else {
            window.print();
        }
    };

    return (
        <div className="flex flex-col items-center group perspective-1000">
            {/* Action Bar */}
            <div className="flex gap-2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 print:hidden">
                <button 
                    onClick={(e) => { e.stopPropagation(); onEdit?.(); }}
                    className="bg-blue-600 text-white text-[12px] px-5 py-2 rounded-xl font-black hover:bg-black flex items-center gap-2 shadow-xl transition-all"
                >
                    <Edit3 size={14} />
                    EDIT
                </button>
                <button 
                    onClick={(e) => { e.stopPropagation(); handlePrintAction(); }}
                    className="bg-green-600 text-white text-[12px] px-5 py-2 rounded-xl font-black hover:bg-black flex items-center gap-2 shadow-xl transition-all"
                >
                    <Printer size={14} />
                    PRINT
                </button>
            </div>

            {/* Main ID Card Card - OPTIMIZED SIZE FOR VISIBILITY */}
            <div 
                onClick={onClick}
                className={`w-[400px] h-[280px] bg-white rounded-[24px] shadow-2xl border border-gray-200 relative overflow-hidden flex flex-col font-sans transition-all duration-500 ${onClick ? 'cursor-pointer hover:shadow-blue-200/50' : ''}`}
            >
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-blue-900/5 rounded-full -mr-20 -mt-20 z-0"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-900/5 rounded-full -ml-16 -mb-16 z-0"></div>

                {/* Background Watermark */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none flex items-center justify-center">
                     <Image src={logo} alt="Watermark" width={200} height={200} />
                </div>

                {/* Top Header - Compact */}
                <div className="bg-blue-900 text-white py-2 px-5 flex items-center justify-between z-10 relative shadow-md">
                    <div className="flex items-center gap-3">
                        <div className="bg-white p-1 rounded-xl shadow-inner">
                            <Image src={logo} alt="School Logo" width={28} height={28} />
                        </div>
                        <div>
                            <h2 className="text-[12px] font-black leading-tight uppercase tracking-tight text-white">Excellence Public School</h2>
                            <p className="text-[7px] font-bold opacity-80 uppercase tracking-[0.1em] text-blue-100">Official Student Identity</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <span className="text-[9px] font-black bg-yellow-400 text-blue-900 px-2.5 py-0.5 rounded-full shadow-sm">STUDENT</span>
                    </div>
                </div>

                {/* Content Area - Balanced */}
                <div className="flex-grow flex p-4 gap-5 relative z-10 bg-white/80 backdrop-blur-[1px]">
                    {/* Photo & QR Section */}
                    <div className="flex flex-col items-center justify-between py-0.5">
                        <div className="w-24 h-28 border-[3px] border-blue-900 rounded-[18px] overflow-hidden bg-gray-50 shadow-lg relative">
                            {photo ? (
                                <Image src={photo} alt={name} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
                                    <User size={40} />
                                </div>
                            )}
                        </div>
                        
                        <div className="bg-white p-1 rounded-xl shadow-md border border-blue-50">
                            <QRCodeSVG value={rollNo} size={56} level="H" includeMargin={true} />
                        </div>
                    </div>

                    {/* Details Section - Full Visibility */}
                    <div className="flex-grow flex flex-col justify-center space-y-1.5 text-[11px]">
                        <div className="mb-2 pb-1.5 border-b border-blue-900/10">
                            <h3 className="text-blue-900 font-black text-lg leading-tight uppercase tracking-tighter">{name}</h3>
                            <div className="flex items-center gap-2 text-gray-500 font-bold uppercase text-[8px] tracking-widest mt-0.5">
                                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-lg border border-blue-100/50">ID: {rollNo}</span>
                            </div>
                        </div>
                        
                        <div className="space-y-1.5">
                            <InfoRow icon={<User size={12} />} label="Father" value={fatherName} />
                            
                            <div className="flex items-center">
                                <div className="flex items-center w-32">
                                    <School size={12} className="text-blue-900 mr-2" />
                                    <span className="font-black text-blue-900 mr-1.5 uppercase text-[9px]">Class:</span>
                                    <span className="text-gray-900 font-black uppercase text-[10px]">{className}</span>
                                </div>
                                <div className="h-4 w-px bg-gray-200 mx-2"></div>
                                <div className="flex items-center">
                                    <span className="font-black text-blue-900 mr-1.5 uppercase text-[9px]">Sec:</span>
                                    <span className="text-gray-900 font-black uppercase text-[10px]">{section}</span>
                                </div>
                            </div>
                            
                            <InfoRow icon={<Calendar size={12} />} label="D.O.B" value={formatDate(dob)} />
                            <InfoRow icon={<Phone size={12} />} label="Phone" value={phone} />
                            
                            <div className="flex items-start">
                                <MapPin size={12} className="text-blue-900 mr-2 mt-0.5 shrink-0" />
                                <span className="w-14 font-black text-blue-900 shrink-0 uppercase text-[9px]">Address:</span>
                                <span className="text-gray-900 font-black leading-tight line-clamp-2 uppercase italic text-[10px]">{address}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Section - Compact */}
                <div className="bg-blue-50/50 border-t border-gray-100 px-6 py-2 flex justify-between items-end z-10 h-14 relative overflow-hidden">
                    <div className="absolute right-0 top-0 h-full w-40 bg-blue-900/5 -skew-x-[30deg] translate-x-12"></div>
                    
                    <div className="flex flex-col mb-1 relative z-10">
                        <div className="h-4 w-24 border-b border-dotted border-gray-400"></div>
                        <p className="text-[7px] text-gray-500 mt-1 font-black uppercase tracking-[0.2em]">Authority Signature</p>
                    </div>

                    <div className="text-right relative z-10 mb-1">
                        <p className="text-[10px] font-black text-blue-900 uppercase italic tracking-tighter leading-none">Session 2026-2027</p>
                        <div className="bg-blue-900 text-white text-[7px] font-black px-3 py-0.5 rounded-full mt-1 uppercase tracking-[0.15em] inline-block shadow-sm">
                             Valid Upto: {formatDate(expiryDate)}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) => (
    <div className="flex items-center">
        <span className="text-blue-900 mr-2">{icon}</span>
        <span className="w-14 font-black text-blue-900 shrink-0 uppercase text-[9px]">{label}:</span>
        <span className="text-gray-900 font-black uppercase truncate text-[10px]">{value}</span>
    </div>
);

export default IDCard;
