export interface OrganizationItem {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: string;
  location: string;
  bullets: string[];
}

export const LEADERSHIP_DATA: OrganizationItem[] = [
  {
    id: "ukki-pens",
    role: "HEAD OF BPM DIVISION",
    organization: "UKKI PENS",
    period: "Sep 2024 - Present",
    type: "Campus Organization (UKM)",
    location: "Surabaya, Indonesia",
    bullets: [
      "Led the BPM (Badan Perwakilan Majelis) division within UKKI PENS, directing organizational stewardship, policy oversight, and community outreach programs.",
      "Coordinated public service initiatives and religious social programs serving both campus students and surrounding local communities in Surabaya.",
      "Facilitated cross-division coordination, event evaluation meetings, and strategic planning across major annual student events.",
    ],
  },
  {
    id: "opp-himit-pens",
    role: "EQUIPMENT & LOGISTICS COMMITTEE",
    organization: "OPP HIMIT PENS",
    period: "2023",
    type: "Student Association (Himpunan)",
    location: "Surabaya, Indonesia",
    bullets: [
      "Served as Equipment & Logistics committee member for OPP HIMIT (Informatics Student Association Orientation Program) at PENS.",
      "Managed event hardware, stage setups, technical infrastructure, and logistical operational workflows across orientation sessions.",
      "Guided freshmen in adapting to the Informatics department culture, code of conduct, academic habits, and campus environment.",
    ],
  },
  {
    id: "lkmm-pens",
    role: "LEADERSHIP & MANAGEMENT TRAINEE",
    organization: "LKMM PENS",
    period: "2022 - 2023",
    type: "Leadership Training",
    location: "Surabaya, Indonesia",
    bullets: [
      "Completed Latihan Keterampilan Manajemen Mahasiswa (LKMM PRA-TD & TD) at PENS to cultivate self-management, team leadership, and problem-solving skills.",
      "Participated in structured workshops on organizational ethics, team dynamics, communication strategies, and project management.",
      "Applied structured decision-making and project planning frameworks in collaborative student group simulations.",
    ],
  },
];
