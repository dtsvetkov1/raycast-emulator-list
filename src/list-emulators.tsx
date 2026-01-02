import { ActionPanel, List, Action, Icon, showToast, Toast } from "@raycast/api";
import { useExec } from "@raycast/utils";
import { exec } from "child_process";

export default function Command() {
  const { isLoading, data, error } = useExec("emulator", ["-list-avds"]);

  const emulators = data?.split("\n").filter((name) => name.trim() !== "") ?? [];

  if (error) {
    showToast({
      style: Toast.Style.Failure,
      title: "Failed to list emulators",
      message: error.message,
    });
  }


  return (
    <List isLoading={isLoading} searchBarPlaceholder="Search emulators...">
      {emulators.map((emulator) => (
        <List.Item
          key={emulator}
          icon={Icon.Mobile}
          title={emulator}
          actions={
            <ActionPanel>
              <Action
                title="Start Emulator"
                icon={Icon.Play}
                onAction={async () => {
                  exec(`emulator @${emulator}`, (error) => {
                    if (error) {
                      showToast({
                        style: Toast.Style.Failure,
                        title: "Failed to start emulator",
                        message: error.message,
                      });
                    }
                  });
                  await showToast({
                    style: Toast.Style.Success,
                    title: "Starting emulator",
                    message: emulator,
                  });
                }}
              />
            </ActionPanel>
          }
        />
      ))}
    </List>
  );
}
