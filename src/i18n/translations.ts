export type Language = "en" | "de";

type AuthErrors = {
  emailInUse: string;
  invalidCredentials: string;
  invalidEmail: string;
  weakPassword: string;
  tooManyRequests: string;
  network: string;
  fallback: string;
};

export type TranslationSet = {
  common: {
    english: string;
    german: string;
    backToMenu: string;
    signOut: string;
    registeredFamiliesOnly: string;
    familyFallback: string;
  };
  nav: {
    subline: string;
    home: string;
    children: string;
    invoices: string;
    announcements: string;
    chat: string;
  };
  auth: {
    headingLogin: string;
    headingSignup: string;
    supportingCopy: string;
    loginTab: string;
    createAccountTab: string;
    fullNamePlaceholder: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    confirmPasswordPlaceholder: string;
    loginButton: string;
    createAccountButton: string;
    resendVerificationButton: string;
    configMissing: string;
    enterEmailPassword: string;
    enterFullName: string;
    choosePassword: string;
    passwordMismatch: string;
    accountCreated: string;
    verificationResent: string;
    resendPrompt: string;
    errors: AuthErrors;
  };
  home: {
    eyebrow: string;
    greeting: (name: string) => string;
    subtitle: string;
    childrenTitle: string;
    childrenCopy: string;
    invoicesTitle: string;
    invoicesCopy: string;
    announcementsTitle: string;
    announcementsCopy: string;
    chatTitle: string;
    chatCopy: string;
    nextPayment: string;
    latestAnnouncement: string;
    paymentSummary: (amount: string, dueDate: string) => string;
  };
  children: {
    eyebrow: string;
    title: string;
    subtitle: string;
    attendanceLabel: string;
    pickupContactsLabel: string;
  };
  invoices: {
    eyebrow: string;
    title: string;
    subtitle: string;
    dueDateLabel: string;
    statuses: {
      paid: string;
      open: string;
      dueSoon: string;
    };
  };
  announcements: {
    eyebrow: string;
    title: string;
    subtitle: string;
  };
  chat: {
    eyebrow: string;
    title: string;
    subtitle: string;
    unread: (count: number) => string;
  };
  settings: {
    eyebrow: string;
    title: string;
    subtitle: string;
    account: string;
    language: string;
    languageCopy: string;
    updates: string;
    updatesCopy: string;
    checkUpdates: string;
    updatesChecking: string;
    updatesAvailable: string;
    updatesCurrent: string;
    updatesUnsupported: string;
    updatesFailed: string;
    changePhoto: string;
    resetPhoto: string;
    photoUpdated: string;
    photoReset: string;
    photoUpdating: string;
    photoPermission: string;
    photoFailed: string;
  };
};

export const translations: Record<Language, TranslationSet> = {
  en: {
    common: {
      english: "English",
      german: "German",
      backToMenu: "Back to menu",
      signOut: "Sign out",
      registeredFamiliesOnly: "Registered families only",
      familyFallback: "Family",
    },
    nav: {
      subline: "Family area",
      home: "Home",
      children: "Children",
      invoices: "Invoices",
      announcements: "Announcements",
      chat: "Chat",
    },
    auth: {
      headingLogin: "Welcome back to the daycare",
      headingSignup: "Create a secure account for your family",
      supportingCopy:
        "Sign in to view your daycare space, or create a secure account stored in your Firebase project. New accounts must confirm their email before access is granted.",
      loginTab: "Log in",
      createAccountTab: "Create account",
      fullNamePlaceholder: "Full name",
      emailPlaceholder: "Email address",
      passwordPlaceholder: "Password",
      confirmPasswordPlaceholder: "Confirm password",
      loginButton: "Log in",
      createAccountButton: "Create account",
      resendVerificationButton: "Resend verification email",
      configMissing: "Add your Firebase app configuration to the environment file before using authentication.",
      enterEmailPassword: "Enter both email and password.",
      enterFullName: "Enter your full name.",
      choosePassword: "Choose a password with at least 6 characters.",
      passwordMismatch: "Passwords do not match.",
      accountCreated: "Account created. Check your inbox and confirm your email before logging in.",
      verificationResent: "Verification email sent. Check your inbox and spam folder before trying to log in again.",
      resendPrompt: "Enter the email and password for the existing account first.",
      errors: {
        emailInUse: "This email address is already registered.",
        invalidCredentials: "The email or password is incorrect.",
        invalidEmail: "Enter a valid email address.",
        weakPassword: "Choose a stronger password with at least 6 characters.",
        tooManyRequests: "Too many attempts. Please wait a moment and try again.",
        network: "Network error. Check your connection and try again.",
        fallback: "Something went wrong during authentication.",
      },
    },
    home: {
      eyebrow: "Family Menu",
      greeting: (name) => `Hello, ${name}`,
      subtitle: "Everything important for your daycare account is grouped here: your children, invoices, announcements, and messages.",
      childrenTitle: "Children",
      childrenCopy: "Registered profiles and pickup details",
      invoicesTitle: "Invoices",
      invoicesCopy: "Billing history and upcoming payments",
      announcementsTitle: "Announcements",
      announcementsCopy: "Messages from daycare management",
      chatTitle: "Chat",
      chatCopy: "Current conversations with the team",
      nextPayment: "Next payment",
      latestAnnouncement: "Latest announcement",
      paymentSummary: (amount, dueDate) => `${amount} due by ${dueDate}`,
    },
    children: {
      eyebrow: "Children",
      title: "Registered children",
      subtitle: "See the children linked to this family account, their groups, attendance days, and pickup contacts.",
      attendanceLabel: "Attendance",
      pickupContactsLabel: "Pickup contacts",
    },
    invoices: {
      eyebrow: "Invoices",
      title: "Billing overview",
      subtitle: "Track current and past invoices so families always know what is open, due soon, or already settled.",
      dueDateLabel: "Due date",
      statuses: {
        paid: "Paid",
        open: "Open",
        dueSoon: "Due soon",
      },
    },
    announcements: {
      eyebrow: "Announcements",
      title: "Updates from the daycare",
      subtitle: "Important operational updates, events, and parent information appear here in one place.",
    },
    chat: {
      eyebrow: "Chat",
      title: "Messages with the team",
      subtitle: "A family communication hub for management, educators, and administration.",
      unread: (count) => `${count} new`,
    },
    settings: {
      eyebrow: "Settings",
      title: "Settings",
      subtitle: "Manage your account preferences and app language from one place.",
      account: "Account",
      language: "Language",
      languageCopy: "Choose whether the app should be shown in English or German.",
      updates: "App updates",
      updatesCopy: "Android can be installed privately and receive over-the-air updates for app content and code changes that do not require a new native build.",
      checkUpdates: "Check for updates",
      updatesChecking: "Checking for updates...",
      updatesAvailable: "An update was downloaded. The app will restart to apply it.",
      updatesCurrent: "This app is already up to date.",
      updatesUnsupported: "Update checks only work in an installed production build, not in Expo development mode.",
      updatesFailed: "The update check failed. Please try again in a moment.",
      changePhoto: "Change profile picture",
      resetPhoto: "Use default picture",
      photoUpdated: "Profile picture updated.",
      photoReset: "Profile picture reset to the default silhouette.",
      photoUpdating: "Updating picture...",
      photoPermission: "Allow access to your photo library to choose a profile picture.",
      photoFailed: "Could not read the selected image. Please try another one.",
    },
  },
  de: {
    common: {
      english: "Englisch",
      german: "Deutsch",
      backToMenu: "Zurück zum Menü",
      signOut: "Abmelden",
      registeredFamiliesOnly: "Nur für registrierte Familien",
      familyFallback: "Familie",
    },
    nav: {
      subline: "Familienbereich",
      home: "Start",
      children: "Kinder",
      invoices: "Rechnungen",
      announcements: "Mitteilungen",
      chat: "Chat",
    },
    auth: {
      headingLogin: "Willkommen zurück in der Kita",
      headingSignup: "Erstellen Sie ein sicheres Konto für Ihre Familie",
      supportingCopy:
        "Melden Sie sich an, um Ihren Kita-Bereich zu sehen, oder erstellen Sie ein sicheres Konto in Ihrem Firebase-Projekt. Neue Konten müssen die E-Mail-Adresse bestätigen, bevor Zugriff gewährt wird.",
      loginTab: "Anmelden",
      createAccountTab: "Konto erstellen",
      fullNamePlaceholder: "Vollständiger Name",
      emailPlaceholder: "E-Mail-Adresse",
      passwordPlaceholder: "Passwort",
      confirmPasswordPlaceholder: "Passwort bestätigen",
      loginButton: "Anmelden",
      createAccountButton: "Konto erstellen",
      resendVerificationButton: "Bestätigungs-E-Mail erneut senden",
      configMissing: "Fügen Sie zuerst die Firebase-Konfiguration in die Umgebungsdatei ein.",
      enterEmailPassword: "Bitte E-Mail und Passwort eingeben.",
      enterFullName: "Bitte den vollständigen Namen eingeben.",
      choosePassword: "Wählen Sie ein Passwort mit mindestens 6 Zeichen.",
      passwordMismatch: "Die Passwörter stimmen nicht überein.",
      accountCreated: "Konto erstellt. Bitte prüfen Sie Ihr Postfach und bestätigen Sie Ihre E-Mail, bevor Sie sich anmelden.",
      verificationResent: "Bestätigungs-E-Mail wurde gesendet. Prüfen Sie Posteingang und Spam-Ordner, bevor Sie sich erneut anmelden.",
      resendPrompt: "Geben Sie zuerst E-Mail und Passwort für das bestehende Konto ein.",
      errors: {
        emailInUse: "Diese E-Mail-Adresse ist bereits registriert.",
        invalidCredentials: "E-Mail oder Passwort ist nicht korrekt.",
        invalidEmail: "Bitte geben Sie eine gültige E-Mail-Adresse ein.",
        weakPassword: "Wählen Sie ein stärkeres Passwort mit mindestens 6 Zeichen.",
        tooManyRequests: "Zu viele Versuche. Bitte warten Sie kurz und versuchen Sie es erneut.",
        network: "Netzwerkfehler. Prüfen Sie die Verbindung und versuchen Sie es erneut.",
        fallback: "Bei der Anmeldung ist ein Fehler aufgetreten.",
      },
    },
    home: {
      eyebrow: "Familienmenü",
      greeting: (name) => `Hallo, ${name}`,
      subtitle: "Alles Wichtige für Ihr Kita-Konto ist hier gebündelt: Ihre Kinder, Rechnungen, Mitteilungen und Nachrichten.",
      childrenTitle: "Kinder",
      childrenCopy: "Registrierte Profile und Abholkontakte",
      invoicesTitle: "Rechnungen",
      invoicesCopy: "Abrechnungen und anstehende Zahlungen",
      announcementsTitle: "Mitteilungen",
      announcementsCopy: "Nachrichten der Kitaleitung",
      chatTitle: "Chat",
      chatCopy: "Aktuelle Unterhaltungen mit dem Team",
      nextPayment: "Nächste Zahlung",
      latestAnnouncement: "Neueste Mitteilung",
      paymentSummary: (amount, dueDate) => `${amount} fällig bis ${dueDate}`,
    },
    children: {
      eyebrow: "Kinder",
      title: "Registrierte Kinder",
      subtitle: "Sehen Sie die mit diesem Familienkonto verknüpften Kinder, ihre Gruppen, Betreuungstage und Abholkontakte.",
      attendanceLabel: "Betreuung",
      pickupContactsLabel: "Abholkontakte",
    },
    invoices: {
      eyebrow: "Rechnungen",
      title: "Rechnungsübersicht",
      subtitle: "Behalten Sie aktuelle und vergangene Rechnungen im Blick, damit Familien immer wissen, was offen, bald fällig oder bereits bezahlt ist.",
      dueDateLabel: "Fällig am",
      statuses: {
        paid: "Bezahlt",
        open: "Offen",
        dueSoon: "Bald fällig",
      },
    },
    announcements: {
      eyebrow: "Mitteilungen",
      title: "Aktuelles aus der Kita",
      subtitle: "Wichtige betriebliche Informationen, Anlässe und Elternhinweise erscheinen hier an einem Ort.",
    },
    chat: {
      eyebrow: "Chat",
      title: "Nachrichten mit dem Team",
      subtitle: "Ein Kommunikationsbereich für Familien, Leitung, Betreuungspersonen und Administration.",
      unread: (count) => `${count} neu`,
    },
    settings: {
      eyebrow: "Einstellungen",
      title: "Einstellungen",
      subtitle: "Verwalten Sie hier Kontoeinstellungen und die Sprache der App.",
      account: "Konto",
      language: "Sprache",
      languageCopy: "Wählen Sie, ob die App auf Englisch oder Deutsch angezeigt werden soll.",
      updates: "App-Updates",
      updatesCopy: "Android kann privat installiert werden und Over-the-Air-Updates für App-Inhalte und Code-Änderungen erhalten, solange kein neuer nativer Build nötig ist.",
      checkUpdates: "Nach Updates suchen",
      updatesChecking: "Es wird nach Updates gesucht...",
      updatesAvailable: "Ein Update wurde geladen. Die App wird neu gestartet, um es anzuwenden.",
      updatesCurrent: "Die App ist bereits auf dem neuesten Stand.",
      updatesUnsupported: "Update-Prüfungen funktionieren nur in einer installierten Produktionsversion, nicht im Expo-Entwicklungsmodus.",
      updatesFailed: "Die Update-Prüfung ist fehlgeschlagen. Bitte versuchen Sie es gleich noch einmal.",
      changePhoto: "Profilbild ändern",
      resetPhoto: "Standardbild verwenden",
      photoUpdated: "Profilbild aktualisiert.",
      photoReset: "Profilbild wurde auf die Standardsilhouette zurückgesetzt.",
      photoUpdating: "Bild wird aktualisiert...",
      photoPermission: "Erlauben Sie den Zugriff auf Ihre Fotomediathek, um ein Profilbild auszuwählen.",
      photoFailed: "Das ausgewählte Bild konnte nicht gelesen werden. Bitte versuchen Sie ein anderes.",
    },
  },
};