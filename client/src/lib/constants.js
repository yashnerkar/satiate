export const INDIAN_STATES = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

export const CATEGORIES = [
  { value: 'hunger', label: '🍽️ Hunger' },
  { value: 'education', label: '📚 Education' },
  { value: 'healthcare', label: '🏥 Healthcare' },
  { value: 'environment', label: '🌿 Environment' },
  { value: 'animals', label: '🐾 Animals' },
  { value: 'disaster', label: '🆘 Disaster' },
  { value: 'other', label: '📦 Other' },
];

// ── Validation helpers ──

export function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone) {
  return /^\d{10}$/.test(phone);
}

export function validateAadhaar(aadhaar) {
  return /^\d{12}$/.test(aadhaar);
}

export function validateUPI(upi) {
  return /^[\w.\-]+@[\w]+$/.test(upi);
}

export function validatePassword(password) {
  if (password.length < 6) return 'Password must be at least 6 characters';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter';
  if (!/\d/.test(password)) return 'Password must contain at least one number';
  return '';
}
