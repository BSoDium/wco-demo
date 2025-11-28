import { Box, Typography, Stack, Container } from "@mui/joy";
import IconArrowDown from "~icons/lucide/arrow-down";

export default function Main() {
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
        <Stack alignItems="center" textAlign="center">
          <Typography level="h1" fontSize="xl4" mb={1}>
            This is a hypothetical dashboard
          </Typography>
          <Typography level="body-lg" color="neutral">
            Watch as the navbar dynamically adjusts while you scroll through the
            content.
          </Typography>

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
              Scroll Down
            </Typography>
            <IconArrowDown />
          </Box>
        </Stack>

        <Box sx={{ mt: 100, textAlign: "center" }}>
          <Typography level="h2">
            This isn't simply about scrolling...
          </Typography>
          <Typography level="body-md" color="neutral">
            It's also about exploring experimental features of modern browsers.
          </Typography>
        </Box>

        <Box sx={{ mt: 100, textAlign: "center" }}>
          <Typography level="h2">Almost there...</Typography>
          <Typography level="body-md" color="neutral">
            Just a little bit further.
          </Typography>
        </Box>

        <Box sx={{ mt: 100, mb: 20, textAlign: "center" }}>
          <Typography level="h2">You made it!</Typography>
          <Typography level="body-md" color="neutral">
            Thanks for scrolling all the way down.
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
