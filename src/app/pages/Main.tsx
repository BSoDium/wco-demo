import { usePWAInstall } from "@/hooks/usePWAInstall";
import { useTitleBarRect } from "@/hooks/useTitleBarRect";
import {
  Box,
  Button,
  Container,
  Divider,
  Link,
  Stack,
  Typography,
} from "@mui/joy";
import IconArrowUpRight from "~icons/lucide/arrow-up-right";
import IconArrowDown from "~icons/lucide/arrow-down";
import IconDownload from "~icons/lucide/download";

export default function Main() {
  const { isInstallable, install, isInstalled } = usePWAInstall();
  const titleBarRect = useTitleBarRect();
  const supportsWCO = titleBarRect !== null;
  const isWCOEnabled = supportsWCO && titleBarRect.height !== 0;

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
        <Stack alignItems="flex-start" gap={3}>
          <Typography level="h1" fontSize="4rem" lineHeight={0.9} mb={1}>
            Experience the&nbsp;
            <Typography color="primary">Web</Typography>
            &nbsp;of&nbsp;
            <Typography color="warning">Tomorrow</Typography>
          </Typography>
          <Typography
            level="body-lg"
            fontSize="1.2rem"
            lineHeight={1.2}
            color="neutral"
          >
            You may not be familiar with the{" "}
            <Link
              href="https://developer.mozilla.org/en-US/docs/Web/API/Window_Controls_Overlay_API"
              target="_blank"
              endDecorator={<IconArrowUpRight />}
            >
              Window Controls Overlay (WCO) API
            </Link>
            , but it's a game-changer for{" "}
            <Typography textColor="text.primary" fontWeight="lg">
              Progressive Web Apps (PWAs)
            </Typography>
            .
          </Typography>
          <Typography
            level="body-lg"
            fontSize="1.2rem"
            lineHeight={1.2}
            color="neutral"
          >
            This demo showcases how WCO can transform your app's title bar into
            a dynamic, immersive experience that feels{" "}
            <Typography textColor="text.primary" fontWeight="lg">
              truly native
            </Typography>
            .
          </Typography>
        </Stack>

        <Divider
          sx={{
            my: 7,
            backgroundColor: "var(--joy-palette-neutral-outlinedBorder)",
          }}
        />

        <Stack alignItems="flex-start" gap={1}>
          <Typography level="h2" fontWeight="sm">
            {supportsWCO ? "Good News! " : "Heads Up! "}
            Your <Typography fontWeight="md">browser</Typography>{" "}
            {supportsWCO ? (
              <Typography color="success" fontWeight="md">
                supports
              </Typography>
            ) : (
              <Typography color="danger" fontWeight="md">
                does not support
              </Typography>
            )}{" "}
            the WCO API.
          </Typography>
          {isInstalled ? (
            isWCOEnabled ? (
              <Typography
                level="body-lg"
                fontSize="1.2rem"
                lineHeight={1.2}
                color="neutral"
              >
                Awesome! The Window Controls Overlay is currently{" "}
                <Typography fontWeight="lg" textColor="text.primary">
                  enabled
                </Typography>
                . Enjoy the seamless integration of the app with the native
                window controls.
              </Typography>
            ) : (
              <Typography
                level="body-lg"
                fontSize="1.2rem"
                lineHeight={1.2}
                color="neutral"
              >
                It looks like the Window Controls Overlay is currently{" "}
                <Typography fontWeight="lg" textColor="text.primary">
                  disabled
                </Typography>
                . Click on the arrow button in the title bar to enable it and
                see the magic!
              </Typography>
            )
          ) : supportsWCO ? (
            <>
              <Typography
                level="body-lg"
                fontSize="1.2rem"
                lineHeight={1.2}
                color="neutral"
              >
                All that's left is to
                <Typography fontWeight="lg" textColor="text.primary">
                  {" "}
                  install{" "}
                </Typography>
                this app as a PWA. Don't worry, we make it easy for you, simply
                click the button below, or the one in the address bar:
              </Typography>
              <Button
                variant="outlined"
                color="neutral"
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "md",
                  minWidth: "initial",
                  minHeight: "initial",
                  pr: 1.5,
                  pl: 1,
                  py: 0.75,
                  gap: 1,
                  mt: 1,
                }}
                onClick={install}
              >
                <IconArrowDown style={{ fontSize: "1.1em" }} />
                Install PWA
              </Button>
            </>
          ) : (
            <Typography
              level="body-lg"
              fontSize="1.2rem"
              lineHeight={1.2}
              color="neutral"
            >
              We're sorry, but your current browser{" "}
              <Typography fontWeight="lg" textColor="text.primary">
                is not compatible
              </Typography>{" "}
              with the Window Controls Overlay API. At the time of writing, WCO is
              supported in Chromium-based browsers like Chrome, or Edge on
              desktop platforms.
            </Typography>
          )}
        </Stack>

        <Box sx={{ mt: 100, textAlign: "center" }}>
          <Typography level="h2" mb={2}>
            Watch the Magic Happen
          </Typography>
          <Typography
            level="body-md"
            color="neutral"
            mb={4}
            maxWidth="600px"
            mx="auto"
          >
            As you scroll, notice how the navigation bar dynamically collapses
            and expands. This isn't just eye candy—it's a carefully orchestrated
            dance using Framer Motion and scroll-linked animations.
          </Typography>
          <Typography
            level="body-sm"
            color="neutral"
            maxWidth="600px"
            mx="auto"
          >
            The navigation bar uses GPU-accelerated transforms for
            buttery-smooth 60fps animations, while intelligently adjusting its
            padding to accommodate window controls when running as a PWA.
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
                With WCO, the title bar becomes part of your app's canvas,
                allowing for creative layouts that feel truly native.
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
            <Typography
              level="body-md"
              color="neutral"
              mb={4}
              maxWidth="600px"
              mx="auto"
            >
              Install this app to see the Window Controls Overlay in action.
              Your navigation bar will seamlessly blend with native window
              controls, creating a truly immersive experience.
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
          <Typography
            level="body-md"
            color="neutral"
            mb={3}
            maxWidth="600px"
            mx="auto"
          >
            Thanks for exploring this demo. The WCO API represents an exciting
            step forward in making Progressive Web Apps feel more native and
            integrated with the operating system.
          </Typography>
          <Typography
            level="body-sm"
            color="neutral"
            maxWidth="600px"
            mx="auto"
          >
            This is just the beginning—imagine the possibilities when developers
            can fully control the title bar space while maintaining all the
            benefits of the web platform.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
