import { Typography, Box, Container } from "@mui/material";

export default function Home() {
  return (
    <>
      {/* Main Content */}
      <Container maxWidth="md">
        <Box mt={6} textAlign="center">
          <Typography variant="h4" gutterBottom>
            Home Page
          </Typography>
          <Typography variant="body1">
            This is the home page content. You can place dashboards or widgets
            here.
          </Typography>
        </Box>
      </Container>
    </>
  );
}
