"use client";
import { useEffect, useState } from 'react';
import IDCardComponent, { StudentData } from '../components/idcard';
import { StudentIDPDF } from '../components/idcard-pdf';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Printer, ChevronLeft, Download } from 'lucide-react';

export default function DisplayIDCards() { 
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState<StudentData | null>(null);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch('/api/students');
        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error('Failed to fetch students:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStudents();
  }, []);

  return (
    <main className="bg-slate-100 min-h-screen font-sans text-slate-900 pb-20">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6 bg-white p-8 rounded-[32px] shadow-sm border border-slate-200">
            <div className="flex items-center gap-5">
                <div className="bg-blue-900 p-4 rounded-3xl shadow-xl">
                    <Printer className="text-white" size={32} />
                </div>
                <div>
                    <h1 className="text-4xl font-black text-blue-900 uppercase tracking-tighter">
                      Print Station
                    </h1>
                    <p className="text-slate-500 font-bold text-xs uppercase tracking-[0.2em] mt-1">Generate High-Quality ID Cards</p>
                </div>
            </div>
            
            <div className="flex gap-4">
                <a href="/" className="bg-slate-100 text-slate-600 px-6 py-3 rounded-2xl font-black hover:bg-slate-200 transition-all flex items-center gap-2">
                    <ChevronLeft size={20} />
                    ADMIN PORTAL
                </a>
                
                {!loading && students.length > 0 && (
                    <PDFDownloadLink document={<StudentIDPDF students={students} />} fileName="all_student_cards.pdf">
                        {({ loading: pdfLoading }) => (
                            <button className="bg-blue-900 text-white px-8 py-3 rounded-2xl font-black shadow-xl hover:bg-black transition-all flex items-center gap-2">
                                <Download size={20} />
                                {pdfLoading ? 'PREPARING...' : 'DOWNLOAD A4 PDF'}
                            </button>
                        )}
                    </PDFDownloadLink>
                )}
            </div>
        </header>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 justify-items-center">
            {students.map((student) => (
              <IDCardComponent 
                key={student.id}
                {...student}
                onClick={() => setSelectedStudent(student)}
              />
            ))}
          </div>
        )}

        {students.length === 0 && !loading && (
          <div className="text-center py-32 bg-white rounded-[40px] shadow-sm border-2 border-dashed border-slate-200">
            <p className="text-slate-300 text-2xl font-black uppercase tracking-widest">No student records to display</p>
            <a href="/" className="inline-block mt-6 text-blue-600 font-black hover:underline underline-offset-8">Go to Admin to add records →</a>
          </div>
        )}
      </div>

      {/* Modal for Selected Card */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300 print:hidden">
          <div className="bg-white rounded-[40px] p-10 max-w-2xl w-full shadow-2xl relative animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setSelectedStudent(null)}
              className="absolute top-6 right-6 text-slate-300 hover:text-red-500 transition-colors bg-slate-50 p-2 rounded-full"
            >
              <X size={28} />
            </button>
            
            <div className="text-center mb-10">
                <div className="inline-block bg-blue-50 text-blue-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-2">Individual Preview</div>
                <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tighter leading-none">Print Preview</h2>
            </div>

            <div className="flex justify-center mb-12">
                <IDCardComponent {...selectedStudent} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <PDFDownloadLink 
                    document={<StudentIDPDF students={[selectedStudent]} />} 
                    fileName={`${selectedStudent.rollNo}_card.pdf`}
                    className="flex-grow"
                >
                    {({ loading: pdfLoading }) => (
                        <button className="w-full bg-blue-900 text-white py-5 rounded-[24px] font-black uppercase tracking-widest hover:bg-black transition-all shadow-2xl shadow-blue-900/30 flex items-center justify-center gap-2 text-sm">
                            <Download size={20} />
                            {pdfLoading ? 'PREPARING PDF...' : 'DOWNLOAD SINGLE PDF'}
                        </button>
                    )}
                </PDFDownloadLink>
                
                <button 
                    onClick={() => window.print()}
                    className="bg-slate-100 text-slate-600 py-5 rounded-[24px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all flex items-center justify-center gap-2 text-sm"
                >
                    <Printer size={20} />
                    SYSTEM PRINT
                </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

const X = ({ size, className }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
