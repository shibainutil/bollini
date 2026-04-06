import type { FirebaseError } from "firebase/app";

import type { TranslationSet } from "../i18n/translations";

export function getAuthErrorMessage(error: unknown, messages: TranslationSet["auth"]["errors"]) {
  const code = (error as FirebaseError | undefined)?.code;

  switch (code) {
    case "auth/email-already-in-use":
      return messages.emailInUse;
    case "auth/invalid-email":
      return messages.invalidEmail;
    case "auth/weak-password":
      return messages.weakPassword;
    case "auth/too-many-requests":
      return messages.tooManyRequests;
    case "auth/network-request-failed":
      return messages.network;
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return messages.invalidCredentials;
    default:
      if (error instanceof Error && error.message) {
        return error.message;
      }

      return messages.fallback;
  }
}