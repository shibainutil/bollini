import * as Updates from "expo-updates";

export type AppUpdateStatus = "unsupported" | "upToDate" | "available";

export async function checkForAppUpdate(): Promise<AppUpdateStatus> {
  if (__DEV__ || !Updates.isEnabled) {
    return "unsupported";
  }

  const update = await Updates.checkForUpdateAsync();

  if (!update.isAvailable) {
    return "upToDate";
  }

  await Updates.fetchUpdateAsync();
  return "available";
}

export async function applyFetchedUpdate() {
  if (!Updates.isEnabled) {
    return;
  }

  await Updates.reloadAsync();
}
