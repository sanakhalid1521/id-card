"use client";
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import { StudentData } from '@/lib/types';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 30,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  cardContainer: {
    width: '45%',
    height: 200,
    margin: 10,
    border: '1pt solid #E2E8F0',
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  header: {
    backgroundColor: '#1E3A8A',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
  },
  schoolName: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  studentBadge: {
    backgroundColor: '#FACC15',
    paddingHorizontal: 4,
    borderRadius: 2,
    fontSize: 7,
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
    flexDirection: 'row',
    gap: 10,
  },
  photoBox: {
    width: 60,
    height: 70,
    border: '1.5pt solid #1E3A8A',
    borderRadius: 8,
  },
  detailsBox: {
    flex: 1,
  },
  studentName: {
    color: '#1E3A8A',
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  rollNo: {
    fontSize: 7,
    color: '#64748B',
    marginBottom: 5,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 2,
    fontSize: 8,
  },
  label: {
    width: 50,
    color: '#1E3A8A',
    fontWeight: 'bold',
  },
  value: {
    color: '#000000',
    fontWeight: 'medium',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 30,
    backgroundColor: '#F8FAFC',
    borderTop: '0.5pt solid #E2E8F0',
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  signatureLine: {
    borderTop: '1pt solid #94A3B8',
    width: 60,
    marginTop: 5,
  },
  signatureText: {
    fontSize: 5,
    color: '#64748B',
    textAlign: 'center',
  }
});

export const StudentIDPDF = ({ students }: { students: StudentData[] }) => {
  const formatDate = (date: string | Date) => new Date(date).toLocaleDateString('en-GB');

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {students.map((student) => (
          <View key={student.id} style={styles.cardContainer}>
            <View style={styles.header}>
               <Text style={styles.schoolName}>Excellence Public School</Text>
               <Text style={styles.studentBadge}>STUDENT</Text>
            </View>

            <View style={styles.content}>
               <View style={styles.photoBox}>
                  {/* eslint-disable-next-line jsx-a11y/alt-text */}
                  {student.photo && <Image src={student.photo} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
               </View>
               <View style={styles.detailsBox}>
                  <Text style={styles.studentName}>{student.name}</Text>
                  <Text style={styles.rollNo}>ID: {student.rollNo}</Text>
                  
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Father:</Text>
                    <Text style={styles.value}>{student.fatherName}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Class:</Text>
                    <Text style={styles.value}>{student.className} - {student.section}</Text>
                  </View>
                  <View style={styles.infoRow}>
                    <Text style={styles.label}>Phone:</Text>
                    <Text style={styles.value}>{student.phone}</Text>
                  </View>
               </View>
            </View>

            <View style={styles.footer}>
               <View>
                  <View style={styles.signatureLine} />
                  <Text style={styles.signatureText}>Principal Signature</Text>
               </View>
               <Text style={{ fontSize: 8, color: '#1E3A8A', fontWeight: 'bold' }}>Valid: {formatDate(student.expiryDate)}</Text>
            </View>
          </View>
        ))}
      </Page>
    </Document>
  );
};
