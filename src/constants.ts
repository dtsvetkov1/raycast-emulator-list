import { platform, homedir } from "os";

export const IS_MACOS = platform() === "darwin";

export const ANDROID_EMULATOR_PATH = IS_MACOS ? `${homedir()}/Library/Android/sdk/emulator/emulator` : "emulator";
