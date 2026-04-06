import type { Language } from "../i18n/translations";

export type ChildProfile = {
  id: string;
  name: string;
  group: string;
  attendance: string;
  pickupContacts: string[];
  notes: string;
};

export type Invoice = {
  id: string;
  month: string;
  amount: string;
  dueDate: string;
  status: "paid" | "open" | "dueSoon";
};

export type Announcement = {
  id: string;
  title: string;
  date: string;
  body: string;
};

export type ChatThread = {
  id: string;
  contact: string;
  role: string;
  preview: string;
  timestamp: string;
  unreadCount: number;
};

export function getDaycareData(language: Language) {
  const children: ChildProfile[] =
    language === "de"
      ? [
          {
            id: "child-1",
            name: "Lina Keller",
            group: "Sonnenblumen-Gruppe",
            attendance: "Mo, Di, Do 08:00-17:30",
            pickupContacts: ["Mara Keller", "Jonas Keller"],
            notes: "Nussallergie vermerkt. Bitte Zutaten des Nachmittagsznüni bestätigen.",
          },
          {
            id: "child-2",
            name: "Noah Keller",
            group: "Regenbogen-Gruppe",
            attendance: "Mi, Fr 08:30-16:30",
            pickupContacts: ["Mara Keller", "Elena Grossmatt"],
            notes: "Schläft nach dem Mittagessen. Bitte mittwochs das Kuscheltier mitgeben.",
          },
        ]
      : [
          {
            id: "child-1",
            name: "Lina Keller",
            group: "Sunflower Group",
            attendance: "Mon, Tue, Thu 08:00-17:30",
            pickupContacts: ["Mara Keller", "Jonas Keller"],
            notes: "Nut allergy noted. Please confirm afternoon snack ingredients.",
          },
          {
            id: "child-2",
            name: "Noah Keller",
            group: "Rainbow Group",
            attendance: "Wed, Fri 08:30-16:30",
            pickupContacts: ["Mara Keller", "Elena Grossmatt"],
            notes: "Sleeps after lunch. Bring comfort toy on Wednesdays.",
          },
        ];

  const invoices: Invoice[] =
    language === "de"
      ? [
          {
            id: "inv-2026-03",
            month: "März 2026",
            amount: "CHF 1,240.00",
            dueDate: "10. April 2026",
            status: "open",
          },
          {
            id: "inv-2026-02",
            month: "Februar 2026",
            amount: "CHF 1,180.00",
            dueDate: "10. März 2026",
            status: "paid",
          },
          {
            id: "inv-2026-04",
            month: "April 2026",
            amount: "CHF 1,260.00",
            dueDate: "10. Mai 2026",
            status: "dueSoon",
          },
        ]
      : [
          {
            id: "inv-2026-03",
            month: "March 2026",
            amount: "CHF 1,240.00",
            dueDate: "10 April 2026",
            status: "open",
          },
          {
            id: "inv-2026-02",
            month: "February 2026",
            amount: "CHF 1,180.00",
            dueDate: "10 March 2026",
            status: "paid",
          },
          {
            id: "inv-2026-04",
            month: "April 2026",
            amount: "CHF 1,260.00",
            dueDate: "10 May 2026",
            status: "dueSoon",
          },
        ];

  const announcements: Announcement[] =
    language === "de"
      ? [
          {
            id: "announcement-1",
            title: "Frühlings-Ausflugswoche",
            date: "4. April 2026",
            body: "Vom 13. bis 17. April verbringen die Kinder zusätzliche Zeit im Freien. Bitte geben Sie passende Kleidung und eine beschriftete Trinkflasche mit.",
          },
          {
            id: "announcement-2",
            title: "Aktualisierter Abholprozess",
            date: "29. März 2026",
            body: "Ab nächstem Montag fragt das Team nach einer mündlichen Bestätigung, wenn jemand ausserhalb der üblichen Abholliste erscheint. Bitte halten Sie die Notfallkontakte aktuell.",
          },
          {
            id: "announcement-3",
            title: "Elternabend",
            date: "20. März 2026",
            body: "Unser nächster Elternabend findet am Donnerstag um 19:00 statt. Wir teilen aktuelle Informationen zum Lernkonzept und zur Sommerplanung.",
          },
        ]
      : [
          {
            id: "announcement-1",
            title: "Spring Excursion Week",
            date: "4 April 2026",
            body: "From 13 to 17 April the children will spend extra time outdoors. Please send weather-appropriate clothing and a labeled water bottle each day.",
          },
          {
            id: "announcement-2",
            title: "Updated Pickup Procedure",
            date: "29 March 2026",
            body: "Starting next Monday, staff will ask for verbal confirmation when someone outside the usual pickup list arrives. Please keep emergency contacts current.",
          },
          {
            id: "announcement-3",
            title: "Parents Evening",
            date: "20 March 2026",
            body: "Our next parents evening takes place on Thursday at 19:00. We will share updates on the learning concept and summer planning.",
          },
        ];

  const chatThreads: ChatThread[] =
    language === "de"
      ? [
          {
            id: "chat-1",
            contact: "Sarah Moser",
            role: "Kitaleitung",
            preview: "Wir haben Noahs Betreuungsänderung für nächste Woche notiert. Danke.",
            timestamp: "Heute, 09:12",
            unreadCount: 1,
          },
          {
            id: "chat-2",
            contact: "Mila Graf",
            role: "Leitung Sonnenblumen-Gruppe",
            preview: "Lina hat ruhig geschlafen und danach beim Malen mitgemacht.",
            timestamp: "Gestern, 16:42",
            unreadCount: 0,
          },
          {
            id: "chat-3",
            contact: "Empfang",
            role: "Administration",
            preview: "Ihre Rechnung für März ist jetzt in der App verfügbar.",
            timestamp: "2. Apr, 11:08",
            unreadCount: 0,
          },
        ]
      : [
          {
            id: "chat-1",
            contact: "Sarah Moser",
            role: "Daycare Management",
            preview: "We have noted Noah's attendance change for next week. Thank you.",
            timestamp: "Today, 09:12",
            unreadCount: 1,
          },
          {
            id: "chat-2",
            contact: "Mila Graf",
            role: "Sunflower Group Lead",
            preview: "Lina had a calm nap and joined painting after lunch.",
            timestamp: "Yesterday, 16:42",
            unreadCount: 0,
          },
          {
            id: "chat-3",
            contact: "Front Desk",
            role: "Administration",
            preview: "Your invoice for March is available in the app.",
            timestamp: "2 Apr, 11:08",
            unreadCount: 0,
          },
        ];

  return {
    children,
    invoices,
    announcements,
    chatThreads,
  };
}