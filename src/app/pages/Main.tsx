import { Box, Typography, Stack, Container, Alert, Button, Chip } from "@mui/joy";
import IconArrowDown from "~icons/lucide/arrow-down";
import IconDownload from "~icons/lucide/download";
import IconAlertTriangle from "~icons/lucide/alert-triangle";
import IconCheckCircle from "~icons/lucide/check-circle-2";
import IconSparkles from "~icons/lucide/sparkles";
import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useTitleBarRect } from "@/hooks/useTitleBarRect";

export default function Main() {
  const { isInstallable, install, isInstalled } = usePWAInstall();
  const titleBarRect = useTitleBarRect();
  const supportsWCO = titleBarRect !== null;

  return (
    <Box
      sx={{
        minHeight: "300vh",
        backgroundSize: "40px 40px",
        backgroundImage:
          "radial-gradient(circle, var(--joy-palette-neutral-softHoverBg) 1px, transparent 1px)",
        backgroundColor: "background.body",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pt: 20,
      }}
    >
      <Container maxWidth="md">
        <Stack alignItems="center" textAlign="center" spacing={3}>
          <Chip
            color="primary"
            variant="soft"
            startDecorator={<IconSparkles />}
            size="lg"
          >
            Window Controls Overlay Demo
          </Chip>

          <Typography level="h1" fontSize="xl4" mb={1}>
            Experience the Future of Web Apps
          </Typography>
          <Typography level="body-lg" color="neutral" maxWidth="600px">
            This demo showcases the Window Controls Overlay (WCO) API—a cutting-edge
            browser feature that allows Progressive Web Apps to integrate seamlessly
            with native window controls.
          </Typography>

          {!supportsWCO && !isInstalled && (
            <Alert
              color="warning"
              variant="soft"
              startDecorator={<IconAlertTriangle />}
              sx={{ maxWidth: "600px" }}
            >
              <Stack spacing={1}>
                <Typography level="title-md">WCO API Not Detected</Typography>
                <Typography level="body-sm">
                  Your browser doesn't support the Window Controls Overlay API yet.
                  For the full experience, try installing this app as a PWA on a
                  Chromium-based browser (Chrome, Edge, or Brave) on desktop.
                </Typography>
              </Stack>
            </Alert>
          )}

          {isInstalled && supportsWCO && (
            <Alert
              color="success"
              variant="soft"
              startDecorator={<IconCheckCircle />}
              sx={{ maxWidth: "600px" }}
            >
              <Stack spacing={1}>
                <Typography level="title-md">Perfect Setup!</Typography>
                <Typography level="body-sm">
                  You're running this app as a PWA with WCO support. Notice how the
                  navigation bar seamlessly integrates with your window controls!
                </Typography>
              </Stack>
            </Alert>
          )}

          <Box
            sx={{
              mt: 5,
              animation: "bounce 2s infinite",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography level="body-sm" mb={1}>
              Scroll to Explore
            </Typography>
            <IconArrowDown />
          </Box>
        </Stack>

        <Box sx={{ mt: 100, textAlign: "center" }}>
          <Typography level="h2" mb={2}>
            Watch the Magic Happen
          </Typography>
          <Typography level="body-md" color="neutral" mb={4} maxWidth="600px" mx="auto">
            As you scroll, notice how the navigation bar dynamically collapses and
            expands. This isn't just eye candy—it's a carefully orchestrated dance
            using Framer Motion and scroll-linked animations.
          </Typography>
          <Typography level="body-sm" color="neutral" maxWidth="600px" mx="auto">
            The navigation bar uses GPU-accelerated transforms for buttery-smooth
            60fps animations, while intelligently adjusting its padding to accommodate
            window controls when running as a PWA.
          </Typography>
        </Box>

        <Box sx={{ mt: 100, textAlign: "center" }}>
          <Typography level="h2" mb={2}>
            What Makes This Special?
          </Typography>
          <Stack spacing={3} alignItems="center">
            <Box maxWidth="600px">
              <Typography level="title-lg" mb={1}>
                🎯 Progressive Enhancement
              </Typography>
              <Typography level="body-md" color="neutral">
                The app works perfectly in any modern browser, but unlocks extra
                features when installed as a PWA with WCO support.
              </Typography>
            </Box>
            <Box maxWidth="600px">
              <Typography level="title-lg" mb={1}>
                🎨 Native Integration
              </Typography>
              <Typography level="body-md" color="neutral">
                With WCO, the title bar becomes part of your app's canvas, allowing
                for creative layouts that feel truly native.
              </Typography>
            </Box>
            <Box maxWidth="600px">
              <Typography level="title-lg" mb={1}>
                ⚡ Smooth Performance
              </Typography>
              <Typography level="body-md" color="neutral">
                Every animation is optimized for performance, using composited
                transforms and careful state management.
              </Typography>
            </Box>
          </Stack>
        </Box>

        {isInstallable && (
          <Box sx={{ mt: 100, textAlign: "center" }}>
            <Typography level="h2" mb={2}>
              Ready for the Full Experience?
            </Typography>
            <Typography level="body-md" color="neutral" mb={4} maxWidth="600px" mx="auto">
              Install this app to see the Window Controls Overlay in action. Your
              navigation bar will seamlessly blend with native window controls,
              creating a truly immersive experience.
            </Typography>
            <Button
              size="lg"
              color="primary"
              startDecorator={<IconDownload />}
              onClick={install}
            >
              Install as PWA
            </Button>
          </Box>
        )}

        <Box sx={{ mt: 100, mb: 20, textAlign: "center" }}>
          <Typography level="h2" mb={2}>
            You Made It! 🎉
          </Typography>
          <Typography level="body-md" color="neutral" mb={3} maxWidth="600px" mx="auto">
            Thanks for exploring this demo. The WCO API represents an exciting step
            forward in making Progressive Web Apps feel more native and integrated
            with the operating system.
          </Typography>
          <Typography level="body-sm" color="neutral" maxWidth="600px" mx="auto">
            This is just the beginning—imagine the possibilities when developers can
            fully control the title bar space while maintaining all the benefits of
            the web platform.
          </Typography>
        </Box>
      </Container>

      <style>
        {`
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
        `}
      </style>
    </Box>
  );
}
