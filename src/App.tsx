// @ts-nocheck

import ThemeProvider from "./providers/ThemeProvider";
import InvestorPipeline from "./pages/InvestorPipeline";
import InternetProvider from "./providers/InternetProvider";
import QueryProvider from "./providers/QueryProvider";
import StateProvider from "./providers/StateProvider";

function App() {
  return (
    <ThemeProvider>
      <InternetProvider>
        <QueryProvider>
          <StateProvider>
            <InvestorPipeline />
          </StateProvider>
        </QueryProvider>
      </InternetProvider>
    </ThemeProvider>
  );
}

export default App;
