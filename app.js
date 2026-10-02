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
    portrait: 'images/meenakshi-portrait.jpg',
    purple: 'images/meenakshi-purple-gown.jpg',
    pink: 'images/meenakshi-pink-lehenga.jpg',
    traditional: 'images/meenakshi-traditional.jpg',
    primary: 'images/meenakshi-portrait.jpg',
    secondary: 'images/meenakshi-traditional.jpg'
  }
};

let currentData = loadData();
let activePhotoKey = 'portrait';
let isContactRevealed = false;

// Royal Lookbook Data
const lookbookData = [
  {
    title: 'Graceful Traditional Portrait',
    hindi: 'सौम्य पारंपरिक भावचित्र',
    src: 'images/meenakshi-portrait.jpg',
    badge: 'Look 1 • Classic Portrait',
    desc: 'Elegant smiling profile photograph radiating warmth, poise, and cultured Rajasthani heritage.'
  },
  {
    title: 'Royal Plum Gown & Traditional Earrings',
    hindi: 'शाही जामुनी परिधान',
    src: 'images/meenakshi-purple-gown.jpg',
    badge: 'Look 2 • Royal Indo-Western',
    desc: 'Graceful full-length outfit with intricate threadwork embroidery and traditional Rajasthani jhumkas.'
  },
  {
    title: 'Celebration Shimmering Pink Lehenga',
    hindi: 'उत्सव गुलाबी लहंगा',
    src: 'images/meenakshi-pink-lehenga.jpg',
    badge: 'Look 3 • Wedding Celebration Attire',
    desc: 'Radiant festive occasion look adorned with ornate choker jewelry and shimmering sequin work.'
  },
  {
    title: 'Traditional Heritage Splendor',
    hindi: 'पारंपरिक धरोहर परिधान',
    src: 'images/meenakshi-traditional.jpg',
    badge: 'Look 4 • Traditional Heritage',
    desc: 'Classic cultural elegance reflecting timeless values, modesty, and grace.'
  }
];

let currentLookIndex = 0;
let isLookbookAutoPlaying = true;
let lookbookInterval = null;

// Royal Shaadi Background Song: Din Shagna Da (Continuous Loop)
const weddingTracks = [
  {
    id: 'din-shagna',
    title: 'Din Shagna Da (विवाह धुन)',
    subtitle: 'Continuous Festive Wedding Loop',
    src: 'audio/wedding-theme.mp3',
    badge: 'Looping 🔁'
  }
];

let currentTrackIndex = 0;
let isAudioPlaying = false;
let audioVolume = 0.6;
let weddingAudioEl = null;
let audioContext = null;
let synthMasterGain = null;
let dholakTimer = null;
let shehnaiTimer = null;
let isMusicPlayerMinimized = false;
let isPetalsActive = true;
let petalsAnimationId = null;

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
    heroImg.src = currentData.photos[activePhotoKey] || currentData.photos.portrait || currentData.photos.primary;
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

// ==========================================
// Royal Shaadi Wedding Music & Visual Atmosphere
// ==========================================

let noteInterval = null;
let previousVolume = 0.6;
let synthStepCount = 0;

function initWeddingAudio() {
  weddingAudioEl = document.getElementById('wedding-audio-player');
  if (weddingAudioEl) {
    weddingAudioEl.volume = audioVolume;
    weddingAudioEl.loop = true;
    weddingAudioEl.addEventListener('ended', () => {
      weddingAudioEl.currentTime = 0;
      weddingAudioEl.play().catch(e => console.log(e));
    });
    weddingAudioEl.addEventListener('timeupdate', updateAudioProgress);
    weddingAudioEl.addEventListener('loadedmetadata', updateAudioProgress);
    weddingAudioEl.addEventListener('error', (e) => {
      console.warn('Audio stream error, switching to rhythmic synthesis fallback:', e);
      if (isAudioPlaying) {
        startRhythmicSynth();
      }
    });
  }
  updatePlayerTrackDisplay();

  // On mobile devices (< 640px), start minimized as a sleek floating bottom pill
  if (window.innerWidth < 640) {
    isMusicPlayerMinimized = true;
    const body = document.getElementById('music-player-expanded-body');
    const icon = document.getElementById('minimize-icon');
    if (body) body.classList.add('hidden');
    if (icon) icon.setAttribute('data-lucide', 'chevron-up');
    if (window.lucide) window.lucide.createIcons();
  }
}

function formatTime(seconds) {
  if (isNaN(seconds) || seconds < 0) return '0:00';
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateAudioProgress() {
  const fill = document.getElementById('audio-progress-fill');
  const currentEl = document.getElementById('audio-current-time');
  const durEl = document.getElementById('audio-duration');
  const miniStatus = document.getElementById('player-mini-status');
  const track = weddingTracks[currentTrackIndex];

  if (weddingAudioEl && track.src) {
    const current = weddingAudioEl.currentTime || 0;
    const total = weddingAudioEl.duration || 0;
    if (fill && total > 0) {
      fill.style.width = `${(current / total) * 100}%`;
    }
    if (currentEl) currentEl.textContent = formatTime(current);
    if (durEl) durEl.textContent = total > 0 ? formatTime(total) : '--:--';

    if (miniStatus) {
      if (isAudioPlaying && total > 0) {
        miniStatus.textContent = `${track.title} • ${formatTime(current)} / ${formatTime(total)}`;
      } else {
        miniStatus.textContent = track.title;
      }
    }
  } else {
    // Synth track simulation
    if (currentEl) currentEl.textContent = formatTime(synthStepCount);
    if (durEl) durEl.textContent = 'Live Loop';
    if (fill) fill.style.width = `${(synthStepCount % 60) * 1.66}%`;
    if (miniStatus) {
      miniStatus.textContent = isAudioPlaying ? `${track.title} • Live Dholak` : track.title;
    }
  }
}

function seekAudio(e) {
  const track = weddingTracks[currentTrackIndex];
  if (!track.src || !weddingAudioEl || !weddingAudioEl.duration) return;

  const rect = e.currentTarget.getBoundingClientRect();
  const clickX = e.clientX - rect.left;
  const width = rect.width;
  if (width > 0) {
    const seekTime = (clickX / width) * weddingAudioEl.duration;
    weddingAudioEl.currentTime = seekTime;
    updateAudioProgress();
  }
}

function updatePlayerTrackDisplay() {
  const track = weddingTracks[currentTrackIndex];
  const titleEl = document.getElementById('player-track-title');
  const subEl = document.getElementById('player-track-subtitle');
  const badgeEl = document.getElementById('player-track-badge');
  const miniStatus = document.getElementById('player-mini-status');

  if (titleEl) titleEl.textContent = track.title;
  if (subEl) subEl.textContent = track.subtitle;
  if (badgeEl) badgeEl.textContent = track.badge;
  if (miniStatus) miniStatus.textContent = track.title;

  updateAudioProgress();
}

function toggleAudio() {
  if (isAudioPlaying) {
    pauseAudio();
  } else {
    playCurrentTrack();
  }
}

function playCurrentTrack() {
  const track = weddingTracks[currentTrackIndex];
  isAudioPlaying = true;

  if (track.src && weddingAudioEl) {
    stopRhythmicSynth();
    if (weddingAudioEl.src !== window.location.origin + '/' + track.src && !weddingAudioEl.src.endsWith(track.src)) {
      weddingAudioEl.src = track.src;
    }
    weddingAudioEl.loop = true;
    weddingAudioEl.volume = audioVolume;
    const playPromise = weddingAudioEl.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        updateAudioUI(true);
        startFloatingNotes();
        showToast(`Playing: ${track.title}`);
      }).catch(err => {
        console.log('Audio playback permission or file load error, switching to rhythmic synth:', err);
        startRhythmicSynth();
        updateAudioUI(true);
        startFloatingNotes();
        showToast(`Playing: Din Shagna Da (Looping)`);
      });
    }
  } else {
    if (weddingAudioEl) {
      weddingAudioEl.pause();
    }
    startRhythmicSynth();
    updateAudioUI(true);
    startFloatingNotes();
    showToast(`Playing: ${track.title}`);
  }
  updatePlayerTrackDisplay();
}

function pauseAudio() {
  isAudioPlaying = false;
  if (weddingAudioEl) {
    weddingAudioEl.pause();
  }
  stopRhythmicSynth();
  stopFloatingNotes();
  updateAudioUI(false);
  showToast('Wedding music paused');
}

function nextTrack() {
  if (weddingAudioEl) {
    weddingAudioEl.currentTime = 0;
    if (isAudioPlaying) weddingAudioEl.play().catch(e => console.log(e));
  }
}

function prevTrack() {
  if (weddingAudioEl) {
    weddingAudioEl.currentTime = 0;
    if (isAudioPlaying) weddingAudioEl.play().catch(e => console.log(e));
  }
}

function changeVolume(val) {
  audioVolume = parseFloat(val);
  if (weddingAudioEl) {
    weddingAudioEl.volume = audioVolume;
  }
  if (synthMasterGain && audioContext && audioContext.state !== 'closed') {
    synthMasterGain.gain.setValueAtTime(audioVolume * 0.22, audioContext.currentTime);
  }
  const icon = document.getElementById('volume-icon-btn');
  if (icon) {
    icon.setAttribute('data-lucide', audioVolume === 0 ? 'volume-x' : audioVolume < 0.5 ? 'volume-1' : 'volume-2');
    if (window.lucide) window.lucide.createIcons();
  }
}

function toggleMute() {
  const slider = document.getElementById('music-volume-slider');
  if (audioVolume > 0) {
    previousVolume = audioVolume;
    changeVolume(0);
    if (slider) slider.value = '0';
  } else {
    const restore = previousVolume > 0 ? previousVolume : 0.6;
    changeVolume(restore);
    if (slider) slider.value = restore.toString();
  }
}

function toggleMusicPlayerFromHeader(e) {
  if (e.target.closest('button')) return;
  toggleMusicPlayerMinimized();
}

function toggleMusicPlayerMinimized() {
  isMusicPlayerMinimized = !isMusicPlayerMinimized;
  const body = document.getElementById('music-player-expanded-body');
  const icon = document.getElementById('minimize-icon');
  if (body) {
    body.classList.toggle('hidden', isMusicPlayerMinimized);
  }
  if (icon) {
    icon.setAttribute('data-lucide', isMusicPlayerMinimized ? 'chevron-up' : 'chevron-down');
    if (window.lucide) window.lucide.createIcons();
  }
}

function startFloatingNotes() {
  if (noteInterval) clearInterval(noteInterval);
  const notes = ['♪', '♫', '🪷', '✦', '✨'];
  noteInterval = setInterval(() => {
    if (!isAudioPlaying) return;
    const dock = document.getElementById('floating-music-bar');
    if (!dock) return;
    const note = document.createElement('span');
    note.className = 'floating-note';
    note.textContent = notes[Math.floor(Math.random() * notes.length)];
    const randX = (Math.random() - 0.5) * 2;
    note.style.setProperty('--rand-x', randX);
    note.style.left = `${25 + Math.random() * 50}%`;
    note.style.top = '10px';
    dock.appendChild(note);
    setTimeout(() => {
      note.remove();
    }, 2400);
  }, 1400);
}

function stopFloatingNotes() {
  if (noteInterval) {
    clearInterval(noteInterval);
    noteInterval = null;
  }
}

function updateAudioUI(playing) {
  // Update Navbar button icon and pill state
  const navIcon = document.getElementById('audio-icon');
  const navBtn = document.getElementById('nav-audio-btn');
  const navEqBars = document.getElementById('nav-eq-bars');
  if (navIcon) {
    navIcon.setAttribute('data-lucide', playing ? 'volume-2' : 'volume-x');
  }
  if (navBtn) {
    if (playing) {
      navBtn.classList.add('playing', 'border-[#88243C]');
    } else {
      navBtn.classList.remove('playing', 'border-[#88243C]');
    }
  }
  if (navEqBars) {
    if (playing) {
      navEqBars.classList.add('playing');
    } else {
      navEqBars.classList.remove('playing');
    }
  }

  // Update floating dock main play button
  const playBtnText = document.getElementById('player-play-text');
  const playBtnIcon = document.getElementById('player-play-icon');
  if (playBtnText) {
    playBtnText.textContent = playing ? 'Pause Din Shagna Da' : 'Play Din Shagna Da';
  }
  if (playBtnIcon) {
    playBtnIcon.setAttribute('data-lucide', playing ? 'pause' : 'play');
  }

  // Update mini play button
  const miniPlayIcon = document.getElementById('player-mini-play-icon');
  if (miniPlayIcon) {
    miniPlayIcon.setAttribute('data-lucide', playing ? 'pause' : 'play');
  }

  // Update Equalizer animation bars
  const eqBars = document.getElementById('audio-eq-bars');
  if (eqBars) {
    if (playing) {
      eqBars.classList.add('playing');
    } else {
      eqBars.classList.remove('playing');
    }
  }

  // Rotate music disc
  const disc = document.getElementById('music-disc-icon');
  if (disc) {
    if (playing) {
      disc.style.transform = 'rotate(360deg)';
      disc.style.transition = 'transform 3s linear infinite';
    } else {
      disc.style.transform = 'none';
      disc.style.transition = 'transform 0.5s ease';
    }
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// ==========================================
// Rhythmic Wedding Synth (Live Dholak & Shehnai)
// ==========================================
function startRhythmicSynth() {
  stopRhythmicSynth();
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;
    audioContext = new AudioCtx();
    synthMasterGain = audioContext.createGain();
    synthMasterGain.gain.setValueAtTime(audioVolume * 0.22, audioContext.currentTime);
    synthMasterGain.connect(audioContext.destination);

    let step = 0;
    const tempoMs = 145; // ~104 BPM energetic festive Keherwa rhythm

    dholakTimer = setInterval(() => {
      if (!audioContext || audioContext.state === 'closed') return;
      playDholakStep(step);
      step = (step + 1) % 8;
      synthStepCount++;
      if (synthStepCount % 4 === 0) updateAudioProgress();
    }, tempoMs);

    // Shehnai melody cycle in Raag Bilawal (Traditional Auspicious Wedding Raga)
    let melodyStep = 0;
    const shehnaiNotes = [
      523.25, 587.33, 659.25, 783.99, 880.00, 783.99, 659.25, 587.33,
      523.25, 659.25, 783.99, 1046.50, 880.00, 783.99, 659.25, 523.25
    ];

    shehnaiTimer = setInterval(() => {
      if (!audioContext || audioContext.state === 'closed') return;
      playShehnaiNote(shehnaiNotes[melodyStep % shehnaiNotes.length]);
      melodyStep++;
    }, tempoMs * 2);

  } catch (err) {
    console.warn('Synth initialization failed:', err);
  }
}

function playDholakStep(step) {
  if (!audioContext || !synthMasterGain || audioContext.state === 'closed') return;
  const now = audioContext.currentTime;

  // Indian Dholak Pattern:
  // Step 0: Dha (Bass + Treble)
  // Step 1: Ge (Bass resonance)
  // Step 2: Na (Treble snap)
  // Step 3: Tin (Treble ring)
  // Step 4: Dha (Bass + Treble accent)
  // Step 5: Ge (Bass resonance)
  // Step 6: Tin (Treble open)
  // Step 7: Ta (Treble crisp snap)

  const isBass = (step === 0 || step === 1 || step === 4 || step === 5);
  const isTreble = (step === 0 || step === 2 || step === 3 || step === 4 || step === 6 || step === 7);

  if (isBass) {
    const bassOsc = audioContext.createOscillator();
    const bassGain = audioContext.createGain();
    bassOsc.type = 'sine';
    const startFreq = (step === 0 || step === 4) ? 140 : 105;
    const endFreq = (step === 0 || step === 4) ? 65 : 55;
    bassOsc.frequency.setValueAtTime(startFreq, now);
    bassOsc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.12);

    bassGain.gain.setValueAtTime(0.35, now);
    bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    bassOsc.connect(bassGain);
    bassGain.connect(synthMasterGain);
    bassOsc.start(now);
    bassOsc.stop(now + 0.19);
  }

  if (isTreble) {
    const trebleOsc = audioContext.createOscillator();
    const trebleGain = audioContext.createGain();
    trebleOsc.type = 'triangle';
    const trebleFreq = (step === 2 || step === 7) ? 480 : 560;
    trebleOsc.frequency.setValueAtTime(trebleFreq, now);
    trebleGain.gain.setValueAtTime(step === 7 ? 0.28 : 0.18, now);
    trebleGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    trebleOsc.connect(trebleGain);
    trebleGain.connect(synthMasterGain);
    trebleOsc.start(now);
    trebleOsc.stop(now + 0.09);
  }
}

function playShehnaiNote(freq) {
  if (!audioContext || !synthMasterGain || audioContext.state === 'closed') return;
  const now = audioContext.currentTime;

  const osc1 = audioContext.createOscillator();
  const osc2 = audioContext.createOscillator();
  const filter = audioContext.createBiquadFilter();
  const noteGain = audioContext.createGain();

  // Nasal, joyous, reedy timbre of Shehnai
  osc1.type = 'sawtooth';
  osc2.type = 'triangle';
  osc1.frequency.setValueAtTime(freq, now);
  osc2.frequency.setValueAtTime(freq * 1.004, now);

  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1800, now);
  filter.Q.setValueAtTime(2.5, now);

  noteGain.gain.setValueAtTime(0.001, now);
  noteGain.gain.linearRampToValueAtTime(0.14, now + 0.04);
  noteGain.gain.exponentialRampToValueAtTime(0.001, now + 0.26);

  osc1.connect(filter);
  osc2.connect(filter);
  filter.connect(noteGain);
  noteGain.connect(synthMasterGain);

  osc1.start(now);
  osc2.start(now);
  osc1.stop(now + 0.28);
  osc2.stop(now + 0.28);
}

function stopRhythmicSynth() {
  if (dholakTimer) {
    clearInterval(dholakTimer);
    dholakTimer = null;
  }
  if (shehnaiTimer) {
    clearInterval(shehnaiTimer);
    shehnaiTimer = null;
  }
  if (audioContext && audioContext.state !== 'closed') {
    try {
      audioContext.close();
    } catch (e) {}
    audioContext = null;
    synthMasterGain = null;
  }
}

// ==========================================
// Auspicious Flower Petals Shower Engine (पुष्प वर्षा)
// ==========================================
function initWeddingPetals() {
  const canvas = document.getElementById('wedding-petals-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Dynamic touch & mouse interaction
  let touchX = -9999;
  let touchY = -9999;

  window.addEventListener('pointermove', (e) => {
    touchX = e.clientX;
    touchY = e.clientY;
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
    }
  }, { passive: true });

  window.addEventListener('touchend', () => {
    touchX = -9999;
    touchY = -9999;
  }, { passive: true });

  const petalColors = [
    { fill: '#88243C', stroke: '#6E1A2D' }, // Velvet Rose
    { fill: '#C0392B', stroke: '#96281B' }, // Crimson Rose
    { fill: '#E67E22', stroke: '#D35400' }, // Saffron Marigold
    { fill: '#F39C12', stroke: '#E67E22' }, // Golden Marigold
    { fill: '#F1C40F', stroke: '#F39C12' }  // Bright Genda Petal
  ];

  const petalsCount = window.innerWidth < 640 ? 16 : 30;
  const petals = [];

  for (let i = 0; i < petalsCount; i++) {
    petals.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 9 + Math.random() * 9,
      speedY: 0.6 + Math.random() * 1.1,
      speedX: -0.4 + Math.random() * 0.8,
      angle: Math.random() * 360,
      angularSpeed: (Math.random() - 0.5) * 1.5,
      flutter: Math.random() * Math.PI,
      flutterSpeed: 0.02 + Math.random() * 0.03,
      color: petalColors[Math.floor(Math.random() * petalColors.length)]
    });
  }

  function renderPetals() {
    if (!isPetalsActive) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < petals.length; i++) {
      const p = petals[i];
      p.y += p.speedY;
      p.x += p.speedX + Math.sin(p.flutter) * 0.5;
      p.angle += p.angularSpeed;
      p.flutter += p.flutterSpeed;

      // Dynamic touch / pointer gentle deflection
      const dx = p.x - touchX;
      const dy = p.y - touchY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100 && dist > 0) {
        const force = (100 - dist) / 100;
        p.x += (dx / dist) * force * 3.5;
        p.y += (dy / dist) * force * 3.5;
      }

      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }
      if (p.x > canvas.width + 20) p.x = -20;
      if (p.x < -20) p.x = canvas.width + 20;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.angle * Math.PI) / 180);
      const scaleX = Math.cos(p.flutter);
      ctx.scale(scaleX, 1);

      ctx.beginPath();
      ctx.moveTo(0, -p.size);
      ctx.bezierCurveTo(p.size * 0.8, -p.size * 0.8, p.size, p.size * 0.5, 0, p.size);
      ctx.bezierCurveTo(-p.size, p.size * 0.5, -p.size * 0.8, -p.size * 0.8, 0, -p.size);
      ctx.fillStyle = p.color.fill;
      ctx.globalAlpha = 0.65;
      ctx.fill();
      ctx.strokeStyle = p.color.stroke;
      ctx.lineWidth = 0.8;
      ctx.stroke();
      ctx.restore();
    }

    petalsAnimationId = requestAnimationFrame(renderPetals);
  }

  renderPetals();
}

function togglePetals() {
  isPetalsActive = !isPetalsActive;
  const statusEl = document.getElementById('petals-status-text');
  const btn = document.getElementById('btn-toggle-petals');

  if (statusEl) {
    statusEl.textContent = isPetalsActive ? 'Petals ON' : 'Petals OFF';
  }
  if (btn) {
    if (isPetalsActive) {
      btn.classList.add('bg-[#FCEEE9]', 'text-[#88243C]');
    } else {
      btn.classList.remove('bg-[#FCEEE9]', 'text-[#88243C]');
    }
  }

  if (isPetalsActive) {
    initWeddingPetals();
    showToast('Auspicious flower petals shower enabled 🌸');
  } else {
    if (petalsAnimationId) cancelAnimationFrame(petalsAnimationId);
    const canvas = document.getElementById('wedding-petals-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    showToast('Flower shower paused');
  }
}

// ==========================================
// Royal Lookbook & Gallery Slideshow Controller
// ==========================================

function showLook(index) {
  currentLookIndex = (index + lookbookData.length) % lookbookData.length;
  
  // Update main slideshow viewport slides
  const slides = document.querySelectorAll('.lookbook-slide');
  slides.forEach((s) => {
    const sIndex = parseInt(s.getAttribute('data-index'), 10);
    if (sIndex === currentLookIndex) {
      s.classList.add('active');
    } else {
      s.classList.remove('active');
    }
  });

  // Update thumbnail cards
  for (let i = 0; i < lookbookData.length; i++) {
    const thumb = document.getElementById(`thumb-look-${i}`);
    if (thumb) {
      if (i === currentLookIndex) {
        thumb.classList.add('active');
      } else {
        thumb.classList.remove('active');
      }
    }
  }

  // Update slide dots
  const dotsContainer = document.getElementById('lookbook-dots');
  if (dotsContainer) {
    const dots = dotsContainer.querySelectorAll('button');
    dots.forEach((dot, idx) => {
      if (idx === currentLookIndex) {
        dot.className = 'w-4 h-2.5 rounded-full bg-[#DFBE76] transition-all';
      } else {
        dot.className = 'w-2.5 h-2.5 rounded-full bg-white/50 hover:bg-white transition-all';
      }
    });
  }
}

function nextLook() {
  showLook(currentLookIndex + 1);
}

function prevLook() {
  showLook(currentLookIndex - 1);
}

function toggleLookbookAutoPlay() {
  isLookbookAutoPlaying = !isLookbookAutoPlaying;
  const icon = document.getElementById('slideshow-ctrl-icon');
  const text = document.getElementById('slideshow-ctrl-text');
  const pill = document.getElementById('lookbook-status-pill');

  if (isLookbookAutoPlaying) {
    startLookbookTimer();
    if (icon) icon.setAttribute('data-lucide', 'pause');
    if (text) text.textContent = 'Pause';
    if (pill) pill.textContent = 'Slideshow Auto-Playing';
    showToast('Lookbook auto-slideshow active');
  } else {
    stopLookbookTimer();
    if (icon) icon.setAttribute('data-lucide', 'play');
    if (text) text.textContent = 'Play';
    if (pill) pill.textContent = 'Slideshow Paused';
    showToast('Lookbook auto-slideshow paused');
  }
  if (window.lucide) window.lucide.createIcons();
}

function startLookbookTimer() {
  stopLookbookTimer();
  lookbookInterval = setInterval(() => {
    if (isLookbookAutoPlaying) {
      nextLook();
    }
  }, 4500);
}

function stopLookbookTimer() {
  if (lookbookInterval) {
    clearInterval(lookbookInterval);
    lookbookInterval = null;
  }
}

// Lightbox modal handlers
function openLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  const heroImg = document.getElementById('hero-profile-img');
  if (modal && img && heroImg) {
    img.src = heroImg.src;
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
}

function openGalleryLightbox() {
  openCustomLightbox(currentLookIndex);
}

function openCustomLightbox(index) {
  const modal = document.getElementById('lightbox-modal');
  const img = document.getElementById('lightbox-img');
  if (modal && img && lookbookData[index]) {
    img.src = lookbookData[index].src;
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

// Event Listeners on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
  initWeddingAudio();
  initWeddingPetals();
  startLookbookTimer();

  // Pause slideshow on hover over viewport for seamless reading
  const viewport = document.getElementById('lookbook-viewport');
  if (viewport) {
    viewport.addEventListener('mouseenter', () => stopLookbookTimer());
    viewport.addEventListener('mouseleave', () => {
      if (isLookbookAutoPlaying) startLookbookTimer();
    });
  }

  // 4-Look Hero Photo Switcher
  const btnPortrait = document.getElementById('btn-photo-portrait');
  const btnPurple = document.getElementById('btn-photo-purple');
  const btnPink = document.getElementById('btn-photo-pink');
  const btnTrad = document.getElementById('btn-photo-traditional');
  
  const heroButtons = [
    { el: btnPortrait, key: 'portrait', src: 'images/meenakshi-portrait.jpg' },
    { el: btnPurple, key: 'purple', src: 'images/meenakshi-purple-gown.jpg' },
    { el: btnPink, key: 'pink', src: 'images/meenakshi-pink-lehenga.jpg' },
    { el: btnTrad, key: 'traditional', src: 'images/meenakshi-traditional.jpg' }
  ];

  heroButtons.forEach(btn => {
    if (btn.el) {
      btn.el.addEventListener('click', () => {
        activePhotoKey = btn.key;
        heroButtons.forEach(b => {
          if (b.el) {
            if (b.key === btn.key) {
              b.el.className = 'px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#88243C] text-white shadow-xs transition-all';
            } else {
              b.el.className = 'px-2.5 py-1 rounded-full text-[11px] font-semibold text-[#6E1A2D] hover:bg-[#FCEEE9] transition-all';
            }
          }
        });
        const heroImg = document.getElementById('hero-profile-img');
        if (heroImg) {
          heroImg.src = currentData.photos[btn.key] || btn.src;
        }
      });
    }
  });

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
