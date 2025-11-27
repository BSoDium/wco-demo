import { Button } from "@mui/joy";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import DownloadIcon from "~icons/lucide/download";

export default function InstallButton() {
  const { isInstallable, install } = usePWAInstall();

  if (!isInstallable) {
    return null;
  }

  return (
    <Button
      variant="soft"
      color="primary"
      startDecorator={<DownloadIcon />}
      onClick={install}
      size="sm"
    >
      Install App
    </Button>
  );
}
