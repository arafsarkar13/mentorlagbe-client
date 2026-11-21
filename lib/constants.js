// Subjects match the banner images in /public/banners
export const SUBJECTS = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English",
  "Programming", "IELTS", "Bangla", "Accounting",
];

export const CLASS_LEVELS = ["Class 6-8", "Class 9-10", "Class 11-12", "University", "All Levels"];

export const defaultBanner = (subject) => `/banners/${subject.toLowerCase()}.svg`;
