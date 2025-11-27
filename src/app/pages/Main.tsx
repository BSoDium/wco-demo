import {
  AspectRatio,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import IconRocket from "~icons/lucide/rocket";
import IconZap from "~icons/lucide/zap";
import IconShield from "~icons/lucide/shield";

export default function Main() {
  return (
    <Sheet
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        minHeight: 0,
      }}
    >
      {/* Hero Section */}
      <Box
        sx={{
          py: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 2,
          bgcolor: "background.level1",
        }}
      >
        <Typography level="h1" fontSize="xl4">
          WCO Demo
        </Typography>
        <Typography level="body-lg" maxWidth="600px">
          Experience the power of Window Controls Overlay in a modern web
          application. Seamlessly blend your app content with the window title
          bar.
        </Typography>
        <Button size="lg" startDecorator={<IconRocket />}>
          Get Started
        </Button>
      </Box>

      <Container sx={{ py: 5 }}>
        {/* Features Grid */}
        <Typography level="h2" mb={3}>
          Features
        </Typography>
        <Grid container spacing={2} sx={{ mb: 5 }}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid key={item} xs={12} sm={6} md={4}>
              <Card variant="outlined">
                <AspectRatio ratio="2">
                  <img
                    src={`https://picsum.photos/seed/${item}/400/200`}
                    loading="lazy"
                    alt=""
                  />
                </AspectRatio>
                <CardContent>
                  <Typography level="title-lg">Feature {item}</Typography>
                  <Typography level="body-sm">
                    This is a description of feature {item}. It demonstrates how
                    cards look in this layout.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Long Content Section */}
        <Typography level="h2" mb={3}>
          About the Project
        </Typography>
        <Stack spacing={2} sx={{ mb: 5 }}>
          {[...Array(5)].map((_, i) => (
            <Typography key={i} level="body-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Typography>
          ))}
        </Stack>

        {/* Another Section */}
        <Typography level="h2" mb={3}>
          More Details
        </Typography>
        <Grid container spacing={2}>
          <Grid xs={12} md={6}>
            <Sheet variant="soft" sx={{ p: 3, borderRadius: "sm" }}>
              <Typography startDecorator={<IconZap />} level="title-md" mb={1}>
                Fast Performance
              </Typography>
              <Typography>
                Built with Vite and React for lightning fast load times.
              </Typography>
            </Sheet>
          </Grid>
          <Grid xs={12} md={6}>
            <Sheet variant="soft" sx={{ p: 3, borderRadius: "sm" }}>
              <Typography
                startDecorator={<IconShield />}
                level="title-md"
                mb={1}
              >
                Secure by Design
              </Typography>
              <Typography>
                Implementing best practices for security and privacy.
              </Typography>
            </Sheet>
          </Grid>
        </Grid>
      </Container>

      {/* Footer */}
      <Box
        sx={{
          py: 5,
          bgcolor: "neutral.800",
          color: "common.white",
          mt: "auto",
        }}
      >
        <Container>
          <Typography level="body-sm" textColor="common.white">
            © 2025 WCO Demo App. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Sheet>
  );
}
