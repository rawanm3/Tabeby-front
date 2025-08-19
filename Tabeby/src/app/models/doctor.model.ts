export interface Doctor {
  id?: string;
  name: string;
  title: string; // Professor, Specialist, etc.
  specialty: string; // e.g., urology, ENT
  specialtyDetails?: string; // e.g., male disease and infertility
  image?: string;
  rating: number; // 0-5 stars
  ratingCount: number; // Number of visitors/ratings
  location: string; // Address
  price: number; // Consultation fee in EGP
  waitingTime: string | number; // Minutes
  callCost: string; // e.g., 16676
  acceptPromo?: boolean;
  gender?: 'male' | 'female';
  entity?: 'hospital' | 'clinic' | 'center';
  role?: 'doctor' | 'nurse';
  slots: {
    label: string; // e.g., "Thu 08/21", "Today", "Tomorrow"
    times: {
      time: string; // e.g., "2:00 PM"
      available: boolean;
    }[];
  }[];
}