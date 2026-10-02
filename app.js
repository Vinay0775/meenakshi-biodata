// Meenakshi Kumawat Matrimonial Profile JavaScript

const STORAGE_KEY = 'meenakshi_biodata_pure_html_v1';

const defaultData = {
  personal: {
    fullName: 'Meenakshi Kumawat',
    gender: 'Female',
    religion: 'Hindu',
    caste: 'Kumawat',
    dateOfBirth: '2000-08-10',
    height: '5 ft 3 in (160 cm)',
    complexion: 'Fair',
    maritalStatus: 'Never Married',
    bloodGroup: 'B+',
    motherTongue: 'Hindi / Rajasthani',
    diet: 'Vegetarian',
    location: 'Jaipur, Rajasthan',
    hobbies: ['Traditional Arts', 'Reading', 'Music', 'Teaching']
  },
  educationCareer: {
    education: 'Post Graduation – M.Com',
    educationDetails: 'Master of Commerce (M.Com)',
    specialization: 'Commerce, Accounting & Business Studies',
    occupation: 'NET Qualified – Aspiring Assistant Professor (Commerce)',
    occupationDetails: 'Qualified UGC NET Examination; pursuing career as Assistant Professor in Higher Education & College Cadre',
    additionalCertifications: 'RS-CIT, Advanced Academic Credentials',
    careerGoal: 'Dedicated to education, academic research, and pedagogical excellence in Commerce'
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
    familyValues: 'Traditional Indian culture with modern progressive outlook'
  },
  gotra: {
    self: 'Sirohiya',
    mama: 'Anavadiya',
    dadi: 'Renewal',
    nani: 'Balodiya'
  },
  contact: {
    contactPerson: 'Parents (Shri Omprakash Kumawat & Smt. Mansha Devi)',
    phoneNumber: '8209399076',
    residenceCity: 'Jaipur, Rajasthan, India',
    isContactSectionEnabled: true
  },
  photos: {
    primary: 'images/meenakshi-portrait.jpg',
    secondary: 'images/meenakshi-traditional.jpg'
  }
};

let currentData = loadData();
let activePhotoKey = 'primary';
let isContactRevealed = false;
let isAudioPlaying = false;
let audioContext = null;
let masterGain = null;
let oscillators = [];
let chimeInterval = null;

function loadData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {}
  return JSON.parse(JSON.stringify(defaultData));
}

function saveData(data) {
  currentData = data;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {}
  renderAll();
  showToast('Profile details updated successfully!');
}

function resetData() {
  if (confirm('Reset all profile details to original biodata values?')) {
    currentData = JSON.parse(JSON.stringify(defaultData));
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    renderAll();
    showToast('Profile reset to original values.');
  }
}

function calculateAge(dobStr) {
  const birthDate = new Date(dobStr);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age > 0 ? age : 25;
}

function formatIndianDate(dobStr) {
  try {
    const parts = dobStr.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  } catch (e) {}
  return dobStr;
}

function showToast(msg) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (toast && toastMsg) {
    toastMsg.textContent = msg;
    toast.classList.remove('hidden');
    setTimeout(() => {
      toast.classList.add('hidden');
    }, 3500);
  }
}

// Render dynamic elements across page
function renderAll() {
  const age = calculateAge(currentData.personal.dateOfBirth);
  const formattedDob = formatIndianDate(currentData.personal.dateOfBirth);

  // Hero Section
  document.querySelectorAll('.profile-fullname').forEach(el => el.textContent = currentData.personal.fullName);
  document.querySelectorAll('.profile-community').forEach(el => el.textContent = `${currentData.personal.religion} • ${currentData.personal.caste}`);
  document.querySelectorAll('.profile-dob-age').forEach(el => el.textContent = `${formattedDob} (${age} Yrs)`);
  document.querySelectorAll('.profile-height').forEach(el => el.textContent = currentData.personal.height);
  document.querySelectorAll('.profile-complexion').forEach(el => el.textContent = currentData.personal.complexion);
  document.querySelectorAll('.profile-gotra-self').forEach(el => el.textContent = currentData.gotra.self);
  document.querySelectorAll('.profile-location').forEach(el => el.textContent = currentData.personal.location);

  // Hero Image
  const heroImg = document.getElementById('hero-profile-img');
  if (heroImg) {
    heroImg.src = activePhotoKey === 'primary' ? currentData.photos.primary : currentData.photos.secondary;
  }

  // Personal Details
  const pName = document.getElementById('pd-name');
  if (pName) pName.textContent = currentData.personal.fullName;
  const pRel = document.getElementById('pd-religion');
  if (pRel) pRel.textContent = currentData.personal.religion;
  const pCaste = document.getElementById('pd-caste');
  if (pCaste) pCaste.textContent = currentData.personal.caste;
  const pDob = document.getElementById('pd-dob');
  if (pDob) pDob.textContent = `${formattedDob} (${currentData.personal.dateOfBirth})`;
  const pAge = document.getElementById('pd-age');
  if (pAge) pAge.textContent = `${age} Years`;
  const pHeight = document.getElementById('pd-height');
  if (pHeight) pHeight.textContent = currentData.personal.height;
  const pComp = document.getElementById('pd-complexion');
  if (pComp) pComp.textContent = currentData.personal.complexion;
  const pMarital = document.getElementById('pd-marital');
  if (pMarital) pMarital.textContent = currentData.personal.maritalStatus;
  const pLang = document.getElementById('pd-tongue');
  if (pLang) pLang.textContent = currentData.personal.motherTongue;
  const pDiet = document.getElementById('pd-diet');
  if (pDiet) pDiet.textContent = currentData.personal.diet;
  const pLoc = document.getElementById('pd-location');
  if (pLoc) pLoc.textContent = currentData.personal.location;

  // Education & Career
  const eduTitle = document.getElementById('edu-title');
  if (eduTitle) eduTitle.textContent = currentData.educationCareer.education;
  const eduDetails = document.getElementById('edu-details');
  if (eduDetails) eduDetails.textContent = currentData.educationCareer.educationDetails;
  const eduSpec = document.getElementById('edu-spec');
  if (eduSpec) eduSpec.textContent = currentData.educationCareer.specialization;
  const occTitle = document.getElementById('occ-title');
  if (occTitle) occTitle.textContent = currentData.educationCareer.occupation;
  const occDetails = document.getElementById('occ-details');
  if (occDetails) occDetails.textContent = currentData.educationCareer.occupationDetails;
  const occGoal = document.getElementById('occ-goal');
  if (occGoal) occGoal.textContent = currentData.educationCareer.careerGoal;

  // Family Background
  const famGf = document.getElementById('fam-gf');
  if (famGf) famGf.textContent = currentData.family.grandfather;
  const famGm = document.getElementById('fam-gm');
  if (famGm) famGm.textContent = currentData.family.grandmother;
  const famFather = document.getElementById('fam-father');
  if (famFather) famFather.textContent = currentData.family.fatherName;
  const famFatherOcc = document.getElementById('fam-father-occ');
  if (famFatherOcc) famFatherOcc.textContent = currentData.family.fatherOccupation;
  const famMother = document.getElementById('fam-mother');
  if (famMother) famMother.textContent = currentData.family.motherName;
  const famMotherOcc = document.getElementById('fam-mother-occ');
  if (famMotherOcc) famMotherOcc.textContent = currentData.family.motherOccupation;
  const famBrothers = document.getElementById('fam-brothers');
  if (famBrothers) famBrothers.textContent = currentData.family.brotherNames.join(', ');
  const famSisters = document.getElementById('fam-sisters');
  if (famSisters) famSisters.textContent = currentData.family.sisterNames.join(', ');
  const famUncles = document.getElementById('fam-uncles');
  if (famUncles) {
    famUncles.innerHTML = currentData.family.paternalUncles.map(u => `
      <div class="p-3 rounded-xl bg-[#FAF6F0] border border-[#C5A059]/25 flex items-center justify-between">
        <div class="flex items-center gap-2.5">
          <span class="w-2 h-2 rounded-full bg-[#C5A059]"></span>
          <span class="text-sm font-semibold text-[#2D2224]">${u}</span>
        </div>
        <span class="text-[11px] text-[#7A676A] font-medium">Paternal Uncle</span>
      </div>
    `).join('');
  }

  // Gotras
  const gSelf = document.getElementById('gotra-self');
  if (gSelf) gSelf.textContent = currentData.gotra.self;
  const gMama = document.getElementById('gotra-mama');
  if (gMama) gMama.textContent = currentData.gotra.mama;
  const gDadi = document.getElementById('gotra-dadi');
  if (gDadi) gDadi.textContent = currentData.gotra.dadi;
  const gNani = document.getElementById('gotra-nani');
  if (gNani) gNani.textContent = currentData.gotra.nani;

  // Contact Section
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    if (!currentData.contact.isContactSectionEnabled) {
      contactSection.classList.add('hidden');
    } else {
      contactSection.classList.remove('hidden');
    }
  }
  const cPerson = document.getElementById('contact-person');
  if (cPerson) cPerson.textContent = `Point of Contact: ${currentData.contact.contactPerson}`;
  const cCity = document.getElementById('contact-city');
  if (cCity) cCity.textContent = currentData.contact.residenceCity;

  renderContactPhone();
  renderPrintableBiodata();

  // Re-initialize lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function renderContactPhone() {
  const phoneDisplay = document.getElementById('contact-phone-display');
  const revealBtn = document.getElementById('reveal-phone-btn');
  const actionBtns = document.getElementById('phone-action-buttons');
  const raw = currentData.contact.phoneNumber.replace(/\D/g, '');

  if (!phoneDisplay) return;

  if (isContactRevealed) {
    phoneDisplay.textContent = `+91 ${currentData.contact.phoneNumber}`;
    if (revealBtn) revealBtn.classList.add('hidden');
    if (actionBtns) {
      actionBtns.classList.remove('hidden');
      const callLink = document.getElementById('btn-call-now');
      if (callLink) callLink.href = `tel:+91${raw}`;
      const waLink = document.getElementById('btn-whatsapp');
      if (waLink) {
        const msg = encodeURIComponent(`Namaste, we viewed the matrimonial biodata profile of ${currentData.personal.fullName} and would like to respectfully connect with the family.`);
        waLink.href = `https://wa.me/91${raw}?text=${msg}`;
      }
    }
  } else {
    const masked = `+91 ${currentData.contact.phoneNumber.slice(0, 5)} •••••`;
    phoneDisplay.textContent = masked;
    if (revealBtn) revealBtn.classList.remove('hidden');
    if (actionBtns) actionBtns.classList.add('hidden');
  }
}

function renderPrintableBiodata() {
  const age = calculateAge(currentData.personal.dateOfBirth);
  const formattedDob = formatIndianDate(currentData.personal.dateOfBirth);

  const container = document.getElementById('printable-biodata');
  if (!container) return;

  container.innerHTML = `
    <div class="border-2 border-[#88243C] p-6 relative flex flex-col justify-between" style="min-height: 275mm;">
      <div class="text-center mb-4">
        <span class="text-xs text-[#88243C] tracking-widest font-semibold block">|| श्री गणेशाय नमः ||</span>
        <h1 class="text-2xl font-serif font-bold text-[#6E1A2D] uppercase tracking-wider mt-1">${currentData.personal.fullName}</h1>
        <p class="text-xs uppercase tracking-widest text-[#99742B] font-semibold">Marriage Biodata</p>
        <div class="flex items-center justify-center my-2">
          <div class="h-[1px] w-24 bg-[#C5A059]"></div>
          <span class="mx-2 text-[#C5A059] text-xs">🪷</span>
          <div class="h-[1px] w-24 bg-[#C5A059]"></div>
        </div>
      </div>

      <div class="flex items-center gap-6 pb-4 mb-4 border-b border-[#C5A059]/40">
        <div class="w-36 h-48 shrink-0 rounded-t-[70px] rounded-b-lg border-2 border-[#C5A059] p-1 bg-[#FAF6F0] overflow-hidden shadow-sm">
          <img src="${currentData.photos.primary}" alt="${currentData.personal.fullName}" class="w-full h-full object-cover rounded-t-[65px] rounded-b-md" style="object-position: center 15%;">
        </div>
        <div class="flex-1 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <div><span class="text-[#7A676A] block text-[10px] uppercase font-semibold">Date of Birth</span><span class="font-bold text-[#2D2224]">${formattedDob}</span></div>
          <div><span class="text-[#7A676A] block text-[10px] uppercase font-semibold">Age & Height</span><span class="font-bold text-[#2D2224]">${age} Years, ${currentData.personal.height}</span></div>
          <div><span class="text-[#7A676A] block text-[10px] uppercase font-semibold">Religion & Caste</span><span class="font-bold text-[#2D2224]">${currentData.personal.religion} — ${currentData.personal.caste}</span></div>
          <div><span class="text-[#7A676A] block text-[10px] uppercase font-semibold">Complexion</span><span class="font-bold text-[#2D2224]">${currentData.personal.complexion}</span></div>
          <div><span class="text-[#7A676A] block text-[10px] uppercase font-semibold">Marital Status</span><span class="font-bold text-[#2D2224]">${currentData.personal.maritalStatus}</span></div>
          <div><span class="text-[#7A676A] block text-[10px] uppercase font-semibold">Mother Tongue</span><span class="font-bold text-[#2D2224]">${currentData.personal.motherTongue}</span></div>
        </div>
      </div>

      <div class="mb-4 pb-3 border-b border-[#C5A059]/40">
        <h2 class="text-xs uppercase tracking-wider font-bold text-[#88243C] mb-2">✦ Education & Career Details</h2>
        <div class="grid grid-cols-2 gap-4 text-xs bg-[#FAF6F0] p-3 rounded-lg border border-[#C5A059]/30">
          <div>
            <span class="text-[#7A676A] block text-[10px] uppercase font-semibold">Highest Education</span>
            <span class="font-bold text-[#2D2224]">${currentData.educationCareer.education}</span>
            <span class="text-[11px] text-[#5C4B4E] block">${currentData.educationCareer.educationDetails}</span>
          </div>
          <div>
            <span class="text-[#7A676A] block text-[10px] uppercase font-semibold">Occupation & Qualification</span>
            <span class="font-bold text-[#88243C] block">${currentData.educationCareer.occupation}</span>
            <span class="text-[11px] text-[#5C4B4E] block">${currentData.educationCareer.specialization}</span>
          </div>
        </div>
      </div>

      <div class="mb-4 pb-3 border-b border-[#C5A059]/40">
        <h2 class="text-xs uppercase tracking-wider font-bold text-[#88243C] mb-2">✦ Family Details</h2>
        <div class="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
          <div><span class="text-[#7A676A] text-[10px] uppercase font-semibold block">Grandfather</span><span class="font-bold text-[#2D2224]">${currentData.family.grandfather}</span></div>
          <div><span class="text-[#7A676A] text-[10px] uppercase font-semibold block">Grandmother</span><span class="font-bold text-[#2D2224]">${currentData.family.grandmother}</span></div>
          <div><span class="text-[#7A676A] text-[10px] uppercase font-semibold block">Father's Name & Profession</span><span class="font-bold text-[#2D2224]">${currentData.family.fatherName} (${currentData.family.fatherOccupation})</span></div>
          <div><span class="text-[#7A676A] text-[10px] uppercase font-semibold block">Mother's Name & Profession</span><span class="font-bold text-[#2D2224]">${currentData.family.motherName} (${currentData.family.motherOccupation})</span></div>
          <div><span class="text-[#7A676A] text-[10px] uppercase font-semibold block">Brothers</span><span class="font-bold text-[#2D2224]">${currentData.family.brotherNames.join(', ')}</span></div>
          <div><span class="text-[#7A676A] text-[10px] uppercase font-semibold block">Sisters</span><span class="font-bold text-[#2D2224]">${currentData.family.sisterNames.join(', ')}</span></div>
          <div class="col-span-2"><span class="text-[#7A676A] text-[10px] uppercase font-semibold block">Paternal Uncles (Chacha / Tauji)</span><span class="font-bold text-[#2D2224]">${currentData.family.paternalUncles.join(', ')}</span></div>
        </div>
      </div>

      <div class="mb-4 pb-3 border-b border-[#C5A059]/40">
        <h2 class="text-xs uppercase tracking-wider font-bold text-[#88243C] mb-2">✦ Gotra Heritage (4-Gotra System)</h2>
        <div class="grid grid-cols-4 gap-2 text-center text-xs">
          <div class="p-2 bg-[#FAF6F0] rounded border border-[#C5A059]/30"><span class="text-[9px] uppercase font-semibold text-[#7A676A] block">Self (Father)</span><span class="font-bold text-sm text-[#88243C]">${currentData.gotra.self}</span></div>
          <div class="p-2 bg-[#FAF6F0] rounded border border-[#C5A059]/30"><span class="text-[9px] uppercase font-semibold text-[#7A676A] block">Mama (Maternal)</span><span class="font-bold text-sm text-[#88243C]">${currentData.gotra.mama}</span></div>
          <div class="p-2 bg-[#FAF6F0] rounded border border-[#C5A059]/30"><span class="text-[9px] uppercase font-semibold text-[#7A676A] block">Dadi</span><span class="font-bold text-sm text-[#88243C]">${currentData.gotra.dadi}</span></div>
          <div class="p-2 bg-[#FAF6F0] rounded border border-[#C5A059]/30"><span class="text-[9px] uppercase font-semibold text-[#7A676A] block">Nani</span><span class="font-bold text-sm text-[#88243C]">${currentData.gotra.nani}</span></div>
        </div>
      </div>

      <div>
        <h2 class="text-xs uppercase tracking-wider font-bold text-[#88243C] mb-2">✦ Contact Information</h2>
        <div class="flex items-center justify-between text-xs bg-[#FAF6F0] p-3 rounded-lg border border-[#C5A059]/30">
          <div><span class="text-[10px] text-[#7A676A] uppercase font-semibold block">Contact Person</span><span class="font-bold text-[#2D2224]">${currentData.contact.contactPerson}</span><span class="text-[11px] text-[#7A676A] block">${currentData.contact.residenceCity}</span></div>
          <div class="text-right"><span class="text-[10px] text-[#7A676A] uppercase font-semibold block">Phone Number</span><span class="font-bold text-sm text-[#6E1A2D] tracking-wide">+91 ${currentData.contact.phoneNumber}</span></div>
        </div>
      </div>

      <div class="text-center pt-3 mt-4 border-t border-[#C5A059]/30 text-[10px] text-[#7A676A]">
        <span>माङ्गल्यं तन्तुनानेन लोकभव्येन धार्यते • Kumawat Family Matrimonial Profile</span>
      </div>
    </div>
  `;
}

// Lightbox
function openLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  if (modal && img) {
    img.src = activePhotoKey === 'primary' ? currentData.photos.primary : currentData.photos.secondary;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'unset';
  }
}

// Editor Modal
function openEditor() {
  const modal = document.getElementById('editor-modal');
  if (!modal) return;

  // Populate inputs
  document.getElementById('edit-fullname').value = currentData.personal.fullName;
  document.getElementById('edit-dob').value = currentData.personal.dateOfBirth;
  document.getElementById('edit-height').value = currentData.personal.height;
  document.getElementById('edit-complexion').value = currentData.personal.complexion;
  document.getElementById('edit-religion').value = currentData.personal.religion;
  document.getElementById('edit-caste').value = currentData.personal.caste;
  document.getElementById('edit-tongue').value = currentData.personal.motherTongue;
  document.getElementById('edit-location').value = currentData.personal.location;

  document.getElementById('edit-edu').value = currentData.educationCareer.education;
  document.getElementById('edit-edudetails').value = currentData.educationCareer.educationDetails;
  document.getElementById('edit-spec').value = currentData.educationCareer.specialization;
  document.getElementById('edit-occ').value = currentData.educationCareer.occupation;
  document.getElementById('edit-occgoal').value = currentData.educationCareer.careerGoal;

  document.getElementById('edit-gf').value = currentData.family.grandfather;
  document.getElementById('edit-gm').value = currentData.family.grandmother;
  document.getElementById('edit-father').value = currentData.family.fatherName;
  document.getElementById('edit-fatherocc').value = currentData.family.fatherOccupation;
  document.getElementById('edit-mother').value = currentData.family.motherName;
  document.getElementById('edit-motherocc').value = currentData.family.motherOccupation;
  document.getElementById('edit-brothers').value = currentData.family.brotherNames.join(', ');
  document.getElementById('edit-sisters').value = currentData.family.sisterNames.join(', ');
  document.getElementById('edit-uncles').value = currentData.family.paternalUncles.join(', ');

  document.getElementById('edit-gotra-self').value = currentData.gotra.self;
  document.getElementById('edit-gotra-mama').value = currentData.gotra.mama;
  document.getElementById('edit-gotra-dadi').value = currentData.gotra.dadi;
  document.getElementById('edit-gotra-nani').value = currentData.gotra.nani;

  document.getElementById('edit-contact-person').value = currentData.contact.contactPerson;
  document.getElementById('edit-phone').value = currentData.contact.phoneNumber;
  document.getElementById('edit-city').value = currentData.contact.residenceCity;
  document.getElementById('edit-contact-enabled').checked = currentData.contact.isContactSectionEnabled;

  switchEditorTab('personal');
  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeEditor() {
  const modal = document.getElementById('editor-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = 'unset';
  }
}

function switchEditorTab(tabName) {
  const tabs = ['personal', 'education', 'family', 'gotra', 'contact'];
  tabs.forEach(t => {
    const pane = document.getElementById(`tab-pane-${t}`);
    const btn = document.getElementById(`tab-btn-${t}`);
    if (pane) {
      if (t === tabName) {
        pane.classList.remove('hidden');
      } else {
        pane.classList.add('hidden');
      }
    }
    if (btn) {
      if (t === tabName) {
        btn.classList.add('border-[#88243C]', 'text-[#88243C]');
        btn.classList.remove('border-transparent', 'text-[#7A676A]');
      } else {
        btn.classList.remove('border-[#88243C]', 'text-[#88243C]');
        btn.classList.add('border-transparent', 'text-[#7A676A]');
      }
    }
  });
}

function saveEditorForm(e) {
  e.preventDefault();
  const updated = JSON.parse(JSON.stringify(currentData));

  updated.personal.fullName = document.getElementById('edit-fullname').value;
  updated.personal.dateOfBirth = document.getElementById('edit-dob').value;
  updated.personal.height = document.getElementById('edit-height').value;
  updated.personal.complexion = document.getElementById('edit-complexion').value;
  updated.personal.religion = document.getElementById('edit-religion').value;
  updated.personal.caste = document.getElementById('edit-caste').value;
  updated.personal.motherTongue = document.getElementById('edit-tongue').value;
  updated.personal.location = document.getElementById('edit-location').value;

  updated.educationCareer.education = document.getElementById('edit-edu').value;
  updated.educationCareer.educationDetails = document.getElementById('edit-edudetails').value;
  updated.educationCareer.specialization = document.getElementById('edit-spec').value;
  updated.educationCareer.occupation = document.getElementById('edit-occ').value;
  updated.educationCareer.careerGoal = document.getElementById('edit-occgoal').value;

  updated.family.grandfather = document.getElementById('edit-gf').value;
  updated.family.grandmother = document.getElementById('edit-gm').value;
  updated.family.fatherName = document.getElementById('edit-father').value;
  updated.family.fatherOccupation = document.getElementById('edit-fatherocc').value;
  updated.family.motherName = document.getElementById('edit-mother').value;
  updated.family.motherOccupation = document.getElementById('edit-motherocc').value;
  updated.family.brotherNames = document.getElementById('edit-brothers').value.split(',').map(s => s.trim()).filter(Boolean);
  updated.family.sisterNames = document.getElementById('edit-sisters').value.split(',').map(s => s.trim()).filter(Boolean);
  updated.family.paternalUncles = document.getElementById('edit-uncles').value.split(',').map(s => s.trim()).filter(Boolean);

  updated.gotra.self = document.getElementById('edit-gotra-self').value;
  updated.gotra.mama = document.getElementById('edit-gotra-mama').value;
  updated.gotra.dadi = document.getElementById('edit-gotra-dadi').value;
  updated.gotra.nani = document.getElementById('edit-gotra-nani').value;

  updated.contact.contactPerson = document.getElementById('edit-contact-person').value;
  updated.contact.phoneNumber = document.getElementById('edit-phone').value;
  updated.contact.residenceCity = document.getElementById('edit-city').value;
  updated.contact.isContactSectionEnabled = document.getElementById('edit-contact-enabled').checked;

  saveData(updated);
  closeEditor();
}

function handlePhotoUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      currentData.photos[activePhotoKey] = event.target.result;
      saveData(currentData);
      showToast('Photo uploaded successfully!');
    };
    reader.readAsDataURL(file);
  }
}

// PDF Download
async function downloadPDF() {
  if (window.confetti) {
    window.confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#DFBE76', '#C5A059', '#88243C', '#FCEEE9']
    });
  }

  showToast('Generating Marriage Biodata PDF...');
  const element = document.getElementById('printable-biodata');
  if (!element) {
    window.print();
    return;
  }

  if (window.html2pdf) {
    const opt = {
      margin: 5,
      filename: `${currentData.personal.fullName.replace(/\s+/g, '_')}_Marriage_Biodata.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    try {
      await window.html2pdf().set(opt).from(element).save();
      showToast('Biodata PDF downloaded successfully!');
      return;
    } catch (err) {
      console.warn('html2pdf fallback to print:', err);
    }
  }
  window.print();
}

// Share profile
async function shareProfile() {
  const shareData = {
    title: `${currentData.personal.fullName} — Marriage Biodata`,
    text: `Matrimonial Profile of ${currentData.personal.fullName} (${currentData.educationCareer.education}, NET Qualified).`,
    url: window.location.href
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
      showToast('Shared successfully!');
      return;
    } catch (e) {}
  }
  navigator.clipboard.writeText(window.location.href);
  showToast('Profile link copied to clipboard!');
}

// Ambient Audio
function toggleAudio() {
  if (isAudioPlaying) {
    stopAudio();
    isAudioPlaying = false;
    showToast('Ambient music muted');
    updateAudioIcon(false);
  } else {
    playAudio();
    isAudioPlaying = true;
    showToast('Playing traditional ambient music');
    updateAudioIcon(true);
  }
}

function playAudio() {
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    audioContext = new AudioCtx();
    masterGain = audioContext.createGain();
    masterGain.gain.setValueAtTime(0.01, audioContext.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.12, audioContext.currentTime + 3);
    masterGain.connect(audioContext.destination);

    const baseFreq = 138.59;
    const notes = [baseFreq * 0.75, baseFreq, baseFreq * 1.5, baseFreq * 2];

    oscillators = notes.map((freq, idx) => {
      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, audioContext.currentTime);
      gain.gain.setValueAtTime(0.2, audioContext.currentTime);
      osc.connect(gain);
      gain.connect(masterGain);
      osc.start();
      return osc;
    });

    chimeInterval = setInterval(() => {
      if (!audioContext || !masterGain) return;
      playBell();
    }, 4500);
  } catch (e) {
    console.warn(e);
  }
}

function playBell() {
  try {
    const pentatonic = [554.37, 622.25, 698.46, 830.61, 932.33];
    const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
    const osc = audioContext.createOscillator();
    const gain = audioContext.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, audioContext.currentTime);
    const now = audioContext.currentTime;
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.035, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.0);
    osc.connect(gain);
    gain.connect(masterGain);
    osc.start(now);
    osc.stop(now + 3.1);
  } catch (e) {}
}

function stopAudio() {
  if (chimeInterval) clearInterval(chimeInterval);
  if (masterGain && audioContext) {
    masterGain.gain.linearRampToValueAtTime(0.001, audioContext.currentTime + 1);
    setTimeout(() => {
      oscillators.forEach(o => {
        try { o.stop(); o.disconnect(); } catch (e) {}
      });
      oscillators = [];
      if (audioContext) {
        audioContext.close();
        audioContext = null;
      }
    }, 1100);
  }
}

function updateAudioIcon(playing) {
  const icon = document.getElementById('audio-icon');
  if (icon) {
    icon.setAttribute('data-lucide', playing ? 'volume-2' : 'volume-x');
    if (window.lucide) window.lucide.createIcons();
  }
}

// Event Listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  renderAll();

  // Photo Switcher
  const btnPortrait = document.getElementById('btn-photo-portrait');
  const btnTrad = document.getElementById('btn-photo-traditional');
  if (btnPortrait) {
    btnPortrait.addEventListener('click', () => {
      activePhotoKey = 'primary';
      btnPortrait.classList.add('bg-[#88243C]', 'text-white');
      btnPortrait.classList.remove('text-[#6E1A2D]');
      if (btnTrad) {
        btnTrad.classList.remove('bg-[#88243C]', 'text-white');
        btnTrad.classList.add('text-[#6E1A2D]');
      }
      renderAll();
    });
  }
  if (btnTrad) {
    btnTrad.addEventListener('click', () => {
      activePhotoKey = 'secondary';
      btnTrad.classList.add('bg-[#88243C]', 'text-white');
      btnTrad.classList.remove('text-[#6E1A2D]');
      if (btnPortrait) {
        btnPortrait.classList.remove('bg-[#88243C]', 'text-white');
        btnPortrait.classList.add('text-[#6E1A2D]');
      }
      renderAll();
    });
  }

  // Photo Upload
  const photoInput = document.getElementById('photo-upload-input');
  if (photoInput) photoInput.addEventListener('change', handlePhotoUpload);

  // Reveal Contact Number
  const revealBtn = document.getElementById('reveal-phone-btn');
  if (revealBtn) {
    revealBtn.addEventListener('click', () => {
      isContactRevealed = true;
      renderContactPhone();
      if (window.confetti) {
        window.confetti({ particleCount: 30, spread: 50, origin: { y: 0.9 } });
      }
    });
  }

  // Hide Contact Number
  const hideBtn = document.getElementById('btn-hide-phone');
  if (hideBtn) {
    hideBtn.addEventListener('click', () => {
      isContactRevealed = false;
      renderContactPhone();
    });
  }

  // Copy Phone Number
  const copyBtn = document.getElementById('btn-copy-phone');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const raw = currentData.contact.phoneNumber.replace(/\D/g, '');
      navigator.clipboard.writeText(`+91${raw}`);
      showToast('Phone number copied to clipboard!');
    });
  }

  // Mobile menu toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Close modals on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      closeEditor();
    }
  });
});
