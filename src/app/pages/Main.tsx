import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Container,
  Grid,
  IconButton,
  Input,
  LinearProgress,
  List,
  ListItem,
  ListItemContent,
  ListItemDecorator,
  Sheet,
  Stack,
  Typography,
} from "@mui/joy";
import IconSearch from "~icons/lucide/search";
import IconPlus from "~icons/lucide/plus";
import IconLayoutGrid from "~icons/lucide/layout-grid";
import IconList from "~icons/lucide/list";
import IconMoreHorizontal from "~icons/lucide/more-horizontal";
import IconActivity from "~icons/lucide/activity";
import IconGitBranch from "~icons/lucide/git-branch";
import IconGithub from "~icons/lucide/github";
import IconTriangle from "~icons/lucide/triangle";
import IconCircle from "~icons/lucide/circle";
import IconBox from "~icons/lucide/box";
import IconTarget from "~icons/lucide/target";
import IconHexagon from "~icons/lucide/hexagon";
import IconFlaskConical from "~icons/lucide/flask-conical";
import IconPaintBucket from "~icons/lucide/paint-bucket";
import IconCommand from "~icons/lucide/command";

const projects = [
  {
    name: "wco-demo",
    domain: "wco-demo.bsodium.fr",
    repo: "BSoDium/wco-demo",
    commit: "refactor improve code structure for better readability",
    time: "7m ago",
    branch: "main",
    icon: <IconTriangle />,
    color: "primary",
  },
  {
    name: "bsodium",
    domain: "www.bsodium.fr",
    repo: "BSoDium/bsodium.fr",
    commit: "Merge pull request #210 from BSoDium/feat/improve-nav...",
    time: "Oct 27",
    branch: "main",
    icon: <IconCircle />,
    color: "neutral",
  },
  {
    name: "bsodium-api",
    domain: "api.bsodium.fr",
    repo: "BSoDium/api.bsodium.fr",
    commit: "chore: freeze api responses",
    time: "22h ago",
    branch: "main",
    icon: <IconCircle />,
    color: "primary",
  },
  {
    name: "material-sticky-header",
    domain: "material-sticky-header.vercel.app",
    repo: "BSoDium/material-sticky-header",
    commit: "Merge pull request #8 from BSoDium/feat/implement-procedu...",
    time: "Jun 16",
    branch: "main",
    icon: <IconBox />,
    color: "danger",
  },
  {
    name: "geo-decay-api",
    domain: "geo-decay-api.vercel.app",
    repo: "BSoDium/GeoDecay-API",
    commit: "Initial commit from Create Next App",
    time: "8/3/24",
    branch: "main",
    icon: <IconTriangle />,
    color: "neutral",
  },
  {
    name: "lidar",
    domain: "lidar.bsodium.fr",
    repo: "BSoDium/lidar",
    commit: "Merge pull request #2 from BSoDium/dependabot/npm_and_y...",
    time: "10/29/24",
    branch: "main",
    icon: <IconHexagon />,
    color: "success",
  },
  {
    name: "randomite",
    domain: "randomite.bsodium.fr",
    repo: "BSoDium/randomite",
    commit: "Merge branch 'main' of https://github.com/BSoDium/randomite",
    time: "4/8/23",
    branch: "main",
    icon: <IconTarget />,
    color: "danger",
  },
  {
    name: "amaze-me",
    domain: "amaze.me.bsodium.fr",
    repo: "BSoDium/amaze.me",
    commit: "Merge pull request #2 from BSoDium/dependabot/npm_and_y...",
    time: "6/22/24",
    branch: "main",
    icon: <IconBox />,
    color: "primary",
  },
  {
    name: "svg-gradients",
    domain: "svg-gradients.vercel.app",
    repo: "BSoDium/svg-gradients",
    commit: "refactor: improve masking in Abstract gradient art",
    time: "6/7/24",
    branch: "main",
    icon: <IconFlaskConical />,
    color: "success",
  },
  {
    name: "avatar",
    domain: "avatar.bsodium.fr",
    repo: "BSoDium/avatar",
    commit: "fix: adjust position of Socials component",
    time: "6/14/24",
    branch: "main",
    icon: <IconPaintBucket />,
    color: "warning",
  }
] as const;

const recentPreviews = [
  {
    repo: "feat/implement-dynamic-navbar",
    status: "ready",
    user: "BSoDium",
    time: "2m",
  },
  {
    repo: "Improve mobile navigation",
    status: "ready",
    user: "BSoDium",
    time: "1h",
  },
  {
    repo: "build(deps-dev): bump storybook",
    status: "building",
    user: "dependabot",
    time: "3h",
  },
];

export default function Main() {
  return (
    <Sheet
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
        minHeight: 0,
        bgcolor: "background.body",
      }}
    >
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* Top Bar */}
        <Box sx={{ display: "flex", gap: 2, mb: 4, alignItems: "center" }}>
          <Input
            startDecorator={<IconSearch />}
            placeholder="Search Projects..."
            sx={{ maxWidth: 400 }}
            slotProps={{ root: { sx: { flex: 1 } } }}
            endDecorator={
              <Chip size="sm" variant="outlined" sx={{ borderRadius: "sm" }}>
                <IconCommand
                  style={{ width: 12, height: 12, marginRight: 4 }}
                />
                &nbsp;K
              </Chip>
            }
          />
          <Box sx={{ ml: "auto", display: "flex", gap: 1 }}>
            <IconButton variant="outlined" color="neutral">
              <IconLayoutGrid />
            </IconButton>
            <IconButton variant="plain" color="neutral">
              <IconList />
            </IconButton>
            <Button
              endDecorator={<IconPlus />}
              variant="solid"
              color="neutral"
              sx={{
                bgcolor: "common.white",
                color: "common.black",
                "&:hover": { bgcolor: "neutral.200" },
              }}
            >
              Add New...
            </Button>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {/* Sidebar */}
          <Grid xs={12} lg={3}>
            <Stack spacing={3}>
              {/* Usage Card */}
              <Box>
                <Typography level="title-sm" mb={2} textColor="text.tertiary">
                  Usage
                </Typography>
                <Card variant="outlined" sx={{ bgcolor: "background.surface" }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <Typography level="title-sm">Last 30 days</Typography>
                    <Chip
                      size="sm"
                      variant="solid"
                      color="neutral"
                      sx={{ borderRadius: "sm" }}
                    >
                      Upgrade
                    </Chip>
                  </Box>

                  <Stack spacing={2}>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      >
                        <Typography level="body-xs">
                          Speed Insights Data Points
                        </Typography>
                        <Typography level="body-xs">1.2K / 10K</Typography>
                      </Box>
                      <LinearProgress
                        determinate
                        value={12}
                        thickness={4}
                        sx={{ color: "primary.500", bgcolor: "neutral.700" }}
                      />
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      >
                        <Typography level="body-xs">Edge Requests</Typography>
                        <Typography level="body-xs">69K / 1M</Typography>
                      </Box>
                      <LinearProgress
                        determinate
                        value={7}
                        thickness={4}
                        sx={{ color: "primary.500", bgcolor: "neutral.700" }}
                      />
                    </Box>
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          mb: 0.5,
                        }}
                      >
                        <Typography level="body-xs">
                          Fast Data Transfer
                        </Typography>
                        <Typography level="body-xs">
                          1.95 GB / 100 GB
                        </Typography>
                      </Box>
                      <LinearProgress
                        determinate
                        value={2}
                        thickness={4}
                        sx={{ color: "primary.500", bgcolor: "neutral.700" }}
                      />
                    </Box>
                  </Stack>
                </Card>
              </Box>

              {/* Alerts */}
              <Box>
                <Typography level="title-sm" mb={2} textColor="text.tertiary">
                  Alerts
                </Typography>
                <Card
                  variant="outlined"
                  sx={{ bgcolor: "background.surface", textAlign: "center" }}
                >
                  <Typography level="title-sm" mb={1}>
                    Get alerted for anomalies
                  </Typography>
                  <Typography level="body-xs" mb={2}>
                    Automatically monitor your projects for anomalies and get
                    notified.
                  </Typography>
                  <Button variant="outlined" size="sm" fullWidth>
                    Upgrade to Observability Plus
                  </Button>
                </Card>
              </Box>

              {/* Recent Previews */}
              <Box>
                <Typography level="title-sm" mb={2} textColor="text.tertiary">
                  Recent Previews
                </Typography>
                <List
                  variant="outlined"
                  sx={{ borderRadius: "sm", bgcolor: "background.surface" }}
                >
                  {recentPreviews.map((preview, i) => (
                    <ListItem key={i}>
                      <ListItemDecorator>
                        <Avatar
                          size="sm"
                          src={`https://github.com/${preview.user}.png`}
                        />
                      </ListItemDecorator>
                      <ListItemContent>
                        <Typography level="title-sm" noWrap>
                          {preview.repo}
                        </Typography>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <IconGitBranch style={{ fontSize: 12 }} />
                          <Typography level="body-xs">Preview</Typography>
                        </Box>
                      </ListItemContent>
                      <IconButton size="sm" variant="plain" color="neutral">
                        <IconMoreHorizontal />
                      </IconButton>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Stack>
          </Grid>

          {/* Main Content */}
          <Grid xs={12} lg={9}>
            <Typography level="title-sm" mb={2} textColor="text.tertiary">
              Your Favorites
            </Typography>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
              }}
            >
              {projects.map((project) => (
                <Card
                  key={project.name}
                  variant="outlined"
                  sx={{ height: "100%", bgcolor: "background.surface" }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      mb: 2,
                      gap: 2,
                    }}
                  >
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar variant="solid" color={project.color} size="lg">
                        {project.icon}
                      </Avatar>
                      <Box>
                        <Typography level="title-md" fontWeight="bold">
                          {project.name}
                        </Typography>
                        <Typography level="body-sm" textColor="text.tertiary">
                          {project.domain}
                        </Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <IconButton
                        size="sm"
                        variant="outlined"
                        color="neutral"
                        sx={{ borderRadius: "50%" }}
                      >
                        <IconActivity />
                      </IconButton>
                      <IconButton size="sm" variant="plain" color="neutral">
                        <IconMoreHorizontal />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ mt: "auto" }}>
                    <Chip
                      variant="soft"
                      size="sm"
                      startDecorator={<IconGithub />}
                      sx={{ mb: 1, maxWidth: "100%" }}
                    >
                      {project.repo}
                    </Chip>
                    <Typography level="body-sm" noWrap mb={2}>
                      {project.commit}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        color: "text.tertiary",
                        fontSize: "sm",
                      }}
                    >
                      <Typography level="body-xs">{project.time}</Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <IconGitBranch style={{ fontSize: 14 }} />
                        <Typography level="body-xs">
                          {project.branch}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Card>
              ))}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Sheet>
  );
}
