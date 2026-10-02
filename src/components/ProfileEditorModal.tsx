import React, { useState } from 'react';
import type { BiodataProfile } from '../types';
import { initialBiodata } from '../data/initialData';
import { 
  X, 
  Save, 
  RotateCcw, 
  User, 
  GraduationCap, 
  Users, 
  Shield, 
  Phone, 
  Check, 
  Upload,
  AlertCircle
} from 'lucide-react';

interface ProfileEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: BiodataProfile;
  onSave: (updatedData: BiodataProfile) => void;
  onReset: () => void;
  onPhotoUpload: (file: File) => void;
}

export const ProfileEditorModal: React.FC<ProfileEditorModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  onReset,
  onPhotoUpload,
}) => {
  const [formData, setFormData] = useState<BiodataProfile>(data);
  const [activeTab, setActiveTab] = useState<'personal' | 'education' | 'family' | 'gotra' | 'contact'>('personal');
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Sync state if initial prop changes
  React.useEffect(() => {
    setFormData(data);
  }, [data]);

  if (!isOpen) return null;

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPhotoUpload(e.target.files[0]);
    }
  };

  const handlePersonalChange = (field: keyof BiodataProfile['personal'], value: any) => {
    setFormData((prev) => ({
      ...prev,
      personal: { ...prev.personal, [field]: value },
    }));
  };

  const handleEducationChange = (field: keyof BiodataProfile['educationCareer'], value: any) => {
    setFormData((prev) => ({
      ...prev,
      educationCareer: { ...prev.educationCareer, [field]: value },
    }));
  };

  const handleFamilyChange = (field: keyof BiodataProfile['family'], value: any) => {
    setFormData((prev) => ({
      ...prev,
      family: { ...prev.family, [field]: value },
    }));
  };

  const handleGotraChange = (field: keyof BiodataProfile['gotra'], value: string) => {
    setFormData((prev) => ({
      ...prev,
      gotra: { ...prev.gotra, [field]: value },
    }));
  };

  const handleContactChange = (field: keyof BiodataProfile['contact'], value: any) => {
    setFormData((prev) => ({
      ...prev,
      contact: { ...prev.contact, [field]: value },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      onClose();
    }, 800);
  };

  const handleReset = () => {
    if (window.confirm('Reset all details to the original extracted biodata values?')) {
      onReset();
      setFormData(initialBiodata);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn no-print">
      <div className="bg-[#FAF6F0] rounded-3xl border border-[#C5A059] shadow-2xl w-full max-w-3xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="px-6 py-4 bg-[#FDFBF7] border-b border-[#C5A059]/30 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg">🪷</span>
            <div>
              <h2 className="text-lg font-serif font-bold text-[#6E1A2D]">
                Edit Biodata Information
              </h2>
              <span className="text-xs text-[#7A676A]">
                Update and personalize any details. Changes update the live profile and PDF instantly.
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#7A676A] hover:text-[#2D2224] rounded-full hover:bg-[#FAF6F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#C5A059]/20 bg-[#FDFBF7] px-4 overflow-x-auto gap-1 text-xs font-semibold">
          {[
            { id: 'personal', label: 'Personal', icon: <User className="w-3.5 h-3.5" /> },
            { id: 'education', label: 'Education & Career', icon: <GraduationCap className="w-3.5 h-3.5" /> },
            { id: 'family', label: 'Family', icon: <Users className="w-3.5 h-3.5" /> },
            { id: 'gotra', label: 'Gotras', icon: <Shield className="w-3.5 h-3.5" /> },
            { id: 'contact', label: 'Contact', icon: <Phone className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-1.5 py-3 px-3.5 border-b-2 whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-[#88243C] text-[#88243C]'
                  : 'border-transparent text-[#7A676A] hover:text-[#2D2224]'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          
          {/* Personal Tab */}
          {activeTab === 'personal' && (
            <div className="space-y-4 animate-fadeIn">
              {/* Photo Upload Row */}
              <div className="p-3.5 rounded-2xl bg-white border border-[#C5A059]/30 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-[#6E1A2D] block">Update Profile Photograph</span>
                  <span className="text-[11px] text-[#7A676A]">Upload a new photograph to test on the profile</span>
                </div>
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FCEEE9] text-[#88243C] text-xs font-medium border border-[#C5A059]/40 hover:bg-[#F7D6D0] transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Image</span>
                  <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={formData.personal.fullName}
                    onChange={(e) => handlePersonalChange('fullName', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Date of Birth (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    value={formData.personal.dateOfBirth}
                    onChange={(e) => handlePersonalChange('dateOfBirth', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Height</label>
                  <input
                    type="text"
                    value={formData.personal.height}
                    onChange={(e) => handlePersonalChange('height', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Complexion</label>
                  <input
                    type="text"
                    value={formData.personal.complexion}
                    onChange={(e) => handlePersonalChange('complexion', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Religion</label>
                  <input
                    type="text"
                    value={formData.personal.religion}
                    onChange={(e) => handlePersonalChange('religion', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Caste / Community</label>
                  <input
                    type="text"
                    value={formData.personal.caste}
                    onChange={(e) => handlePersonalChange('caste', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Mother Tongue</label>
                  <input
                    type="text"
                    value={formData.personal.motherTongue}
                    onChange={(e) => handlePersonalChange('motherTongue', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Current Location</label>
                  <input
                    type="text"
                    value={formData.personal.location}
                    onChange={(e) => handlePersonalChange('location', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Education & Career Tab */}
          {activeTab === 'education' && (
            <div className="space-y-4 animate-fadeIn">
              <div>
                <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Highest Education</label>
                <input
                  type="text"
                  value={formData.educationCareer.education}
                  onChange={(e) => handleEducationChange('education', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Education Details</label>
                <input
                  type="text"
                  value={formData.educationCareer.educationDetails}
                  onChange={(e) => handleEducationChange('educationDetails', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Academic Specialization</label>
                <input
                  type="text"
                  value={formData.educationCareer.specialization}
                  onChange={(e) => handleEducationChange('specialization', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Occupation / Examination</label>
                <input
                  type="text"
                  value={formData.educationCareer.occupation}
                  onChange={(e) => handleEducationChange('occupation', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Career Goal & Vision</label>
                <textarea
                  rows={2}
                  value={formData.educationCareer.careerGoal}
                  onChange={(e) => handleEducationChange('careerGoal', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                />
              </div>
            </div>
          )}

          {/* Family Tab */}
          {activeTab === 'family' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Father's Name</label>
                  <input
                    type="text"
                    value={formData.family.fatherName}
                    onChange={(e) => handleFamilyChange('fatherName', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Father's Occupation</label>
                  <input
                    type="text"
                    value={formData.family.fatherOccupation}
                    onChange={(e) => handleFamilyChange('fatherOccupation', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Mother's Name</label>
                  <input
                    type="text"
                    value={formData.family.motherName}
                    onChange={(e) => handleFamilyChange('motherName', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Mother's Occupation</label>
                  <input
                    type="text"
                    value={formData.family.motherOccupation}
                    onChange={(e) => handleFamilyChange('motherOccupation', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Grandfather's Name</label>
                  <input
                    type="text"
                    value={formData.family.grandfather}
                    onChange={(e) => handleFamilyChange('grandfather', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Grandmother's Name</label>
                  <input
                    type="text"
                    value={formData.family.grandmother}
                    onChange={(e) => handleFamilyChange('grandmother', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Brother's Name(s) (comma separated)</label>
                  <input
                    type="text"
                    value={formData.family.brotherNames.join(', ')}
                    onChange={(e) => handleFamilyChange('brotherNames', e.target.value.split(',').map((s) => s.trim()))}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Sister's Name(s) (comma separated)</label>
                  <input
                    type="text"
                    value={formData.family.sisterNames.join(', ')}
                    onChange={(e) => handleFamilyChange('sisterNames', e.target.value.split(',').map((s) => s.trim()))}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Paternal Uncles (Chacha / Tauji) (comma separated)</label>
                  <input
                    type="text"
                    value={formData.family.paternalUncles.join(', ')}
                    onChange={(e) => handleFamilyChange('paternalUncles', e.target.value.split(',').map((s) => s.trim()))}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Gotras Tab */}
          {activeTab === 'gotra' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="p-3 bg-[#FAF6F0] rounded-xl border border-[#C5A059]/30 text-xs text-[#523F42] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-[#C5A059] shrink-0" />
                <span>You can verify or update spelling for each of the 4 gotras below:</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Self Gotra (Father)</label>
                  <input
                    type="text"
                    value={formData.gotra.self}
                    onChange={(e) => handleGotraChange('self', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Mama's Gotra (Maternal Uncle)</label>
                  <input
                    type="text"
                    value={formData.gotra.mama}
                    onChange={(e) => handleGotraChange('mama', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Dadi's Gotra (Paternal Grandmother)</label>
                  <input
                    type="text"
                    value={formData.gotra.dadi}
                    onChange={(e) => handleGotraChange('dadi', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Nani's Gotra (Maternal Grandmother)</label>
                  <input
                    type="text"
                    value={formData.gotra.nani}
                    onChange={(e) => handleGotraChange('nani', e.target.value)}
                    className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Contact Tab */}
          {activeTab === 'contact' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-white border border-[#C5A059]/30">
                <div>
                  <span className="text-xs font-semibold text-[#6E1A2D] block">Enable Contact Information Section</span>
                  <span className="text-[11px] text-[#7A676A]">Allow matrimonial visitors to view point of contact</span>
                </div>
                <input
                  type="checkbox"
                  checked={formData.contact.isContactSectionEnabled}
                  onChange={(e) => handleContactChange('isContactSectionEnabled', e.target.checked)}
                  className="w-5 h-5 accent-[#88243C] cursor-pointer"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Contact Person</label>
                <input
                  type="text"
                  value={formData.contact.contactPerson}
                  onChange={(e) => handleContactChange('contactPerson', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Contact Phone Number</label>
                <input
                  type="text"
                  value={formData.contact.phoneNumber}
                  onChange={(e) => handleContactChange('phoneNumber', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#6E1A2D] block mb-1">Residence City / Location</label>
                <input
                  type="text"
                  value={formData.contact.residenceCity}
                  onChange={(e) => handleContactChange('residenceCity', e.target.value)}
                  className="w-full px-3.5 py-2 text-sm rounded-xl bg-white border border-[#C5A059]/40 focus:outline-none focus:ring-2 focus:ring-[#88243C]"
                />
              </div>
            </div>
          )}

          {/* Modal Footer Actions */}
          <div className="pt-4 border-t border-[#C5A059]/20 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-[#88243C] hover:bg-[#FCEEE9] transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset to Defaults</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#7A676A] hover:bg-[#FAF6F0] transition-colors"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-gradient-to-r from-[#88243C] to-[#6E1A2D] text-white text-xs font-semibold shadow-md hover:brightness-110 transition-all border border-[#DFBE76]/40 cursor-pointer"
              >
                {saveSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-green-300" />
                    <span>Saved!</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-[#F3E5AB]" />
                    <span>Save & Update</span>
                  </>
                )}
              </button>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
