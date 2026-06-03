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
