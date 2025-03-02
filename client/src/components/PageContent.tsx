import { ReactNode, ReactElement } from "react"
import { Container } from "@mui/material"

interface PageContentProps {
  children?: ReactNode; 
}

function PageContent(props: PageContentProps): ReactElement<PageContentProps> {
  const { children } = props
  return (
    <Container  sx={{padding: "2rem", height: "100%", width: "100%", boxSizing: "border-box" }}>
      {children}
    </Container>
  );
}

export default PageContent; 