import "@/styles/globals.css";
import Layout from "../src/components/layout/index";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";

export default function App({ Component, pageProps }) {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });
  return (
   <ThemeProvider theme={darkTheme}>
     <Layout>
      <Component {...pageProps} />
    </Layout>
   </ThemeProvider>
  );
}
