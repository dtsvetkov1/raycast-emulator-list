import { platform, homedir } from "os";
import { getPreferenceValues } from "@raycast/api";

interface Preferences {
    androidEmulatorPathWindows: string;
    androidEmulatorPathMacOS: string;
}

export const IS_MACOS = platform() === "darwin";

function getAndroidEmulatorPath(): string {
    const preferences = getPreferenceValues<Preferences>();

    if (IS_MACOS) {
        const path = preferences.androidEmulatorPathMacOS || "~/Library/Android/sdk/emulator/emulator";
        // Expand ~ to home directory
        return path.startsWith("~") ? path.replace("~", homedir()) : path;
    } else {
        // Windows: use preference or default to 'emulator' (expects it in PATH)
        return preferences.androidEmulatorPathWindows || "emulator";
    }
}

export const ANDROID_EMULATOR_PATH = getAndroidEmulatorPath();
