export type EventItem = {
  image: string;
  title: string;
  slug: string;
  location: string;
  date: string; // e.g., "2025-11-07"
  time: string; // e.g., "09:00 AM"
};

export const events: EventItem[] = [
  {
    title: "React Summit 2024",
    image: "/images/event1.png",
    slug: "react-summit-2024",
    location: "Amsterdam, Netherlands",
    date: "2025-06-14",
    time: "09:00 AM",
  },
  {
    title: "JSConf EU 2024",
    image: "/images/event2.png",
    slug: "jsconf-eu-2024",
    location: "Berlin, Germany",
    date: "2025-09-20",
    time: "10:00 AM",
  },
  {
    title: "HackMIT 2024",
    image: "/images/event3.png",
    slug: "hackmit-2024",
    location: "Cambridge, MA, USA",
    date: "2025-10-04",
    time: "08:00 AM",
  },
  {
    title: "Google I/O Extended",
    image: "/images/event4.png",
    slug: "google-io-extended-2025",
    location: "Mountain View, CA, USA",
    date: "2025-05-15",
    time: "10:00 AM",
  },
  {
    title: "PyCon US 2024",
    image: "/images/event5.png",
    slug: "pycon-us-2024",
    location: "Pittsburgh, PA, USA",
    date: "2025-04-23",
    time: "09:30 AM",
  },
  {
    title: "Next.js Conf",
    image: "/images/event6.png",
    slug: "nextjs-conf-2025",
    location: "San Francisco, CA, USA",
    date: "2025-10-18",
    time: "11:00 AM",
  },
  {
    title: "GitHub Universe",
    image: "/images/event4.png",
    slug: "github-universe-2025",
    location: "San Francisco, CA, USA",
    date: "2025-11-07",
    time: "09:00 AM",
  },
  {
    title: "Women Who Code Connect",
    image: "/images/event1.png",
    slug: "wwcode-connect-2025",
    location: "London, UK",
    date: "2025-08-12",
    time: "10:30 AM",
  },
  {
    title: "AWS re:Invent",
    image: "/images/event2.png",
    slug: "aws-reinvent-2025",
    location: "Las Vegas, NV, USA",
    date: "2025-12-01",
    time: "08:30 AM",
  },
];
