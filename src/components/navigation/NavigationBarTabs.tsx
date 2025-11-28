import { Box, Stack, Typography, useTheme } from "@mui/joy";
import { motion, MotionConfig } from "motion/react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const navigationBarTabStructure = [
  { label: "Overview", path: "/" },
  { label: "Integrations", path: "/integrations" },
  { label: "Deployments", path: "/deployments" },
  { label: "Activity", path: "/activity" },
  { label: "Domains", path: "/domains" },
  { label: "Usage", path: "/usage" },
  { label: "Observability", path: "/observability" },
  { label: "Storage", path: "/storage" },
  { label: "Flags", path: "/flags" },
  { label: "AI Gateway", path: "/ai-gateway" },
  { label: "Agent", path: "/agent" },
  { label: "Support", path: "/support" },
  { label: "Settings", path: "/settings" },
] as const;

export default function NavigationBarTabs() {
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const theme = useTheme();

  return (
    <MotionConfig transition={{ type: "spring", bounce: 0, duration: 0.25 }}>
      <Stack
        direction="row"
        spacing={0.5}
        id="navigation-bar-tabs"
        onMouseLeave={() => setHoveredTab(null)}
        sx={{
          px: 2,
          pb: 1,
        }}
      >
        {navigationBarTabStructure.map((tab) => (
          <NavLink
            key={tab.path}
            to={tab.path}
            style={{ textDecoration: "none", position: "relative" }}
            onMouseEnter={() => setHoveredTab(tab.path)}
          >
            {({ isActive }) => (
              <Box
                component={motion.div}
                sx={{
                  px: 1.5,
                  py: 0.75,
                  borderRadius: "sm",
                  position: "relative",
                  cursor: "pointer",
                  color: isActive ? "text.primary" : "text.tertiary",
                  transition: "color 0.2s",
                  "&:hover": {
                    color: "text.primary",
                  },
                }}
              >
                {/* Hover Background */}
                {hoveredTab === tab.path && (
                  <motion.div
                    layoutId="nav-item-hover"
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: theme.vars.palette.neutral.plainHoverBg,
                      borderRadius: "6px",
                      zIndex: 0,
                    }}
                  />
                )}

                {/* Active Underline */}
                {isActive && (
                  <motion.div
                    layoutId="nav-item-active"
                    style={{
                      position: "absolute",
                      bottom: "-9px",
                      left: 0,
                      right: 0,
                      height: "2px",
                      backgroundColor: theme.vars.palette.text.primary,
                      zIndex: 1,
                    }}
                  />
                )}

                <Typography
                  level="body-sm"
                  fontWeight="md"
                  sx={{ position: "relative", zIndex: 1, color: "inherit" }}
                >
                  {tab.label}
                </Typography>
              </Box>
            )}
          </NavLink>
        ))}
      </Stack>
    </MotionConfig>
  );
}
