export interface BiodataProfile {
  personal: {
    fullName: string;
    gender: string;
    religion: string;
    caste: string;
    dateOfBirth: string; // YYYY-MM-DD
    height: string;
    complexion: string;
    maritalStatus: string;
    bloodGroup?: string;
    motherTongue: string;
    diet: string;
    location: string;
    hobbies: string[];
  };
  educationCareer: {
    education: string;
    educationDetails: string;
    specialization: string;
    occupation: string;
    occupationDetails: string;
    additionalCertifications: string;
    careerGoal: string;
  };
  family: {
    grandfather: string;
    grandmother: string;
    fatherName: string;
    fatherOccupation: string;
    motherName: string;
    motherOccupation: string;
    totalSiblings: number;
    brotherNames: string[];
    sisterNames: string[];
    paternalUncles: string[];
    nativePlace: string;
    familyValues: string;
  };
  gotra: {
    self: string;       // Sirohiya
    mama: string;       // Anavadiya
    dadi: string;       // Renewal
    nani: string;       // Balodiya
  };
  contact: {
    contactPerson: string;
    phoneNumber: string;
    email?: string;
    residenceCity: string;
    isContactSectionEnabled: boolean;
  };
  photos: {
    primary: string;
    secondary: string;
  };
}
