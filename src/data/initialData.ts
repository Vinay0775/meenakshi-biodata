import type { BiodataProfile } from '../types';

export const initialBiodata: BiodataProfile = {
  personal: {
    fullName: 'Meenakshi Kumawat',
    gender: 'Female',
    religion: 'Hindu',
    caste: 'Kumawat',
    dateOfBirth: '2000-08-10', // 10 August 2000
    height: '5 ft 3 in (160 cm)',
    complexion: 'Fair',
    maritalStatus: 'Never Married',
    bloodGroup: 'B+',
    motherTongue: 'Hindi / Rajasthani',
    diet: 'Vegetarian',
    location: 'Jaipur, Rajasthan',
    hobbies: ['Traditional Arts', 'Reading', 'Music', 'Teaching'],
  },
  educationCareer: {
    education: 'Post Graduation – M.Com',
    educationDetails: 'Master of Commerce (M.Com)',
    specialization: 'Commerce, Accounting & Business Studies',
    occupation: 'NET Qualified – Aspiring Assistant Professor (Commerce)',
    occupationDetails: 'Qualified UGC NET Examination; pursuing career as Assistant Professor in Higher Education & College Cadre',
    additionalCertifications: 'RS-CIT, Advanced Academic Credentials',
    careerGoal: 'Dedicated to education, academic research, and pedagogical excellence in Commerce',
  },
  family: {
    grandfather: 'Late Shri Nanda Ram Kumawat',
    grandmother: 'Smt. Manfuli Devi',
    fatherName: 'Shri Omprakash Kumawat',
    fatherOccupation: 'Artist (Miniature Traditional Art)',
    motherName: 'Smt. Mansha Devi',
    motherOccupation: 'Homemaker',
    totalSiblings: 4,
    brotherNames: ['Vikram Kumawat'],
    sisterNames: ['Kanta Kumawat', 'Priyanka Kumawat'],
    paternalUncles: ['Shri Hari Narayan Kumawat', 'Shri Shivam Kumawat'],
    nativePlace: 'Rajasthan, India',
    familyValues: 'Traditional Indian culture with modern progressive outlook',
  },
  gotra: {
    self: 'Sirohiya',
    mama: 'Anavadiya',
    dadi: 'Renewal',
    nani: 'Balodiya',
  },
  contact: {
    contactPerson: 'Parents (Shri Omprakash Kumawat & Smt. Mansha Devi)',
    phoneNumber: '8209399076',
    email: 'contact.kumawatfamily@gmail.com',
    residenceCity: 'Jaipur, Rajasthan, India',
    isContactSectionEnabled: true,
  },
  photos: {
    primary: '/images/meenakshi-portrait.jpg',
    secondary: '/images/meenakshi-traditional.jpg',
  },
};

/**
 * Calculates current age dynamically from birth date string (YYYY-MM-DD)
 */
export function calculateAge(dobString: string): number {
  const birthDate = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age > 0 ? age : 25;
}

/**
 * Formats YYYY-MM-DD into a royal readable Indian date e.g. "10 August 2000"
 */
export function formatIndianDate(dobString: string): string {
  try {
    const parts = dobString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    }
  } catch (e) {
    // fallback
  }
  return dobString;
}
