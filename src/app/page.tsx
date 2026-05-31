"use client";
import { useState, useEffect } from 'react';
import { Search, Plus, X, LayoutGrid, Users, Filter, School, Edit3, Trash2 } from 'lucide-react';
import Image from 'next/image';

export interface StudentData {
    id: number;
    name: string;
    rollNo: string;
    className: string;
    section: string;
    fatherName: string;
    dob: string | Date;
    address: string;
    phone: string;
    photo?: string | null;
    issueDate: string | Date;
    expiryDate: string | Date;
}

export default function AdminDashboard() {
  const [students, setStudents] = useState<StudentData[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    rollNo: '',
    className: '',
    section: '',
    fatherName: '',
    dob: '',
    address: '',
    phone: '',
    expiryDate: '2027-12-31'
  });
  
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      setStudents(data);
    } catch (error) {
      console.error('Failed to fetch students:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudents = students.filter(s => 
    (s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.rollNo.includes(searchTerm)) &&
    (filterClass === '' || s.className === filterClass)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const startEdit = (student: StudentData) => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      rollNo: student.rollNo,
      className: student.className,
      section: student.section,
      fatherName: student.fatherName,
      dob: new Date(student.dob).toISOString().split('T')[0],
      address: student.address,
      phone: student.phone,
      expiryDate: new Date(student.expiryDate).toISOString().split('T')[0],
    });
    setImagePreview(student.photo || null);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) => data.append(key, value));
      if (selectedFile) data.append('photo', selectedFile);

      const url = editingId ? `/api/students/${editingId}` : '/api/students';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, { method, body: data });

      if (res.ok) {
        alert(editingId ? 'Record Updated!' : 'Student Added!');
        resetForm();
        fetchStudents(); 
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '', rollNo: '', className: '', section: '',
      fatherName: '', dob: '', address: '', phone: '',
      expiryDate: '2027-12-31'
    });
    setSelectedFile(null);
    setImagePreview(null);
    setEditingId(null);
    setShowForm(false);
  };

  const deleteStudent = async (id: number) => {
    if (confirm('Delete this record?')) {
      await fetch(`/api/students/${id}`, { method: 'DELETE' });
      fetchStudents();
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-900 p-3 rounded-2xl shadow-lg">
                <School className="text-white" size={32} />
            </div>
            <div>
                <h1 className="text-3xl font-black uppercase tracking-tighter text-blue-900">EduCard Manager</h1>
                <p className="text-slate-500 font-bold text-xs uppercase tracking-widest">School Management Portal</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <a href="/view-cards" className="flex-grow md:flex-grow-0 bg-white border-2 border-slate-200 text-slate-700 px-6 py-3 rounded-2xl font-black hover:border-blue-900 hover:text-blue-900 transition-all flex items-center justify-center gap-2 shadow-sm">
                <LayoutGrid size={18} />
                CARDS VIEW
            </a>
            <button 
                onClick={() => { if(showForm) resetForm(); else setShowForm(true); }}
                className="flex-grow md:flex-grow-0 bg-blue-900 text-white px-8 py-3 rounded-2xl font-black hover:bg-black transition-all flex items-center justify-center gap-2 shadow-xl"
            >
                {showForm ? <X size={18} /> : <Plus size={18} />}
                {showForm ? 'CANCEL' : 'ADD STUDENT'}
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
            <div className="lg:col-span-1 bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="bg-blue-50 p-3 rounded-2xl text-blue-600"><Users size={24} /></div>
                <div>
                    <p className="text-2xl font-black text-slate-800">{students.length}</p>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Students</p>
                </div>
            </div>
            
            <div className="lg:col-span-3 flex gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input 
                        type="text" 
                        placeholder="Search by name or roll number..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white border border-slate-100 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-900 outline-none transition-all font-medium" 
                    />
                </div>
                <div className="relative">
                    <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <select 
                        value={filterClass}
                        onChange={(e) => setFilterClass(e.target.value)}
                        className="pl-10 pr-10 py-4 bg-white border border-slate-100 rounded-3xl shadow-sm focus:ring-2 focus:ring-blue-900 outline-none appearance-none font-bold text-sm text-slate-600 cursor-pointer"
                    >
                        <option value="">ALL CLASSES</option>
                        {Array.from(new Set(students.map(s => s.className))).map(c => (
                            <option key={c} value={c}>{c.toUpperCase()}</option>
                        ))}
                    </select>
                </div>
            </div>
        </div>

        {showForm && (
          <div className="bg-white p-8 rounded-[40px] shadow-2xl mb-12 border border-blue-50 animate-in fade-in zoom-in-95 duration-300">
            <h2 className="text-2xl font-black mb-8 text-blue-900 uppercase tracking-tighter">
                {editingId ? 'Update Student Record' : 'Register New Student'}
            </h2>
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-3 flex flex-col items-center justify-center p-10 border-4 border-dashed border-slate-100 rounded-[32px] bg-slate-50/50 hover:bg-slate-50 hover:border-blue-200 transition-all relative group">
                 {imagePreview ? (
                   <div className="relative w-40 h-40 group">
                     <Image src={imagePreview} alt="Preview" fill className="object-cover rounded-[32px] border-4 border-white shadow-2xl" />
                     <div className="absolute inset-0 bg-black/40 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <p className="text-white font-black text-xs">CHANGE PHOTO</p>
                     </div>
                   </div>
                 ) : (
                   <div className="text-center">
                     <div className="bg-white w-20 h-20 rounded-3xl shadow-xl flex items-center justify-center mx-auto mb-4 text-blue-900">
                        <Plus size={32} />
                     </div>
                     <p className="text-sm text-slate-500 font-black uppercase tracking-widest">Upload Student Photo</p>
                   </div>
                 )}
                 <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    className="absolute inset-0 opacity-0 cursor-pointer" 
                    required={!imagePreview && !editingId}
                 />
              </div>

              <FormInput label="Full Name" name="name" value={formData.name} onChange={handleChange} placeholder="e.g. Sana Khalid" />
              <FormInput label="Roll Number" name="rollNo" value={formData.rollNo} onChange={handleChange} placeholder="e.g. S-101" />
              <FormInput label="Class" name="className" value={formData.className} onChange={handleChange} placeholder="e.g. 10th" />
              <FormInput label="Section" name="section" value={formData.section} onChange={handleChange} placeholder="e.g. A" />
              <FormInput label="Father's Name" name="fatherName" value={formData.fatherName} onChange={handleChange} placeholder="e.g. Khalid Ahmed" />
              <FormInput label="Date of Birth" name="dob" value={formData.dob} onChange={handleChange} type="date" />
              <FormInput label="Phone Number" name="phone" value={formData.phone} onChange={handleChange} placeholder="e.g. 0300-1234567" />
              <FormInput label="Card Expiry" name="expiryDate" value={formData.expiryDate} onChange={handleChange} type="date" />
              
              <div className="space-y-2 col-span-full">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">Residential Address</label>
                <textarea name="address" placeholder="Complete home address..." value={formData.address} onChange={handleChange} required className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-900 focus:bg-white rounded-3xl outline-none transition-all h-32 font-bold text-slate-700"></textarea>
              </div>

              <div className="col-span-full">
                <button type="submit" className="w-full bg-blue-900 text-white py-5 rounded-3xl font-black hover:bg-black transition-all uppercase tracking-[0.3em] shadow-2xl shadow-blue-900/20 text-sm">
                    {editingId ? 'UPDATE STUDENT RECORD' : 'CONFIRM & GENERATE CARD'}
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100">
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Student</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Class/Sec</th>
                    <th className="p-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Actions</th>
                </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                {loading ? (
                    <tr><td colSpan={3} className="py-20 text-center"><div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-900 mx-auto"></div></td></tr>
                ) : filteredStudents.map(student => (
                    <tr key={student.id} className="hover:bg-blue-50/20 transition-all group">
                    <td className="p-6">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 overflow-hidden shadow-inner flex-shrink-0 border-2 border-white relative">
                                {student.photo ? <Image src={student.photo} alt={student.name} fill className="object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300"><Users size={20} /></div>}
                            </div>
                            <div>
                                <p className="font-black text-slate-800 uppercase tracking-tight">{student.name}</p>
                                <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{student.rollNo}</p>
                            </div>
                        </div>
                    </td>
                    <td className="p-6 text-center">
                        <span className="bg-slate-100 text-slate-600 px-4 py-1.5 rounded-full font-black text-[10px] uppercase">{student.className} - {student.section}</span>
                    </td>
                    <td className="p-6 text-center">
                        <div className="flex items-center justify-center gap-3">
                            <button onClick={() => startEdit(student)} className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-900 hover:text-white transition-all"><Edit3 size={18} /></button>
                            <button onClick={() => deleteStudent(student.id)} className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-600 hover:text-white transition-all"><Trash2 size={18} /></button>
                        </div>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
          </div>
          {filteredStudents.length === 0 && !loading && (
            <div className="py-20 text-center">
                <p className="text-slate-400 font-bold uppercase tracking-widest">No matching records found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface FormInputProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    type?: string;
}

const FormInput = ({ label, ...props }: FormInputProps) => (
  <div className="space-y-2">
    <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] ml-2">{label}</label>
    <input 
        {...props} 
        required 
        className="w-full p-4 bg-slate-50 border-2 border-transparent focus:border-blue-900 focus:bg-white rounded-3xl outline-none transition-all font-bold text-slate-700 placeholder:text-slate-300" 
    />
  </div>
);
