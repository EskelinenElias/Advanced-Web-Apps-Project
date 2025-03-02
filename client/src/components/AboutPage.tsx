import { Card, CardContent, Typography } from "@mui/material";
import PageContent from "./PageContent";

function AboutPage() {
  return (
    <PageContent>
      <Card sx={{ height: '100%', boxSizing: "border-box" }}>
        <CardContent>
          <Typography variant='h3'>About</Typography>
        </CardContent>
      </Card>
    </PageContent>
  );
}

export default AboutPage; 