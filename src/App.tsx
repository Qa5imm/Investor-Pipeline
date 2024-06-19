// @ts-nocheck

import InvestorPipeline from "./pages/InvestorPipeline/InvestorPipeline";
import InternetProvider from "./providers/InternetProvider";
import QueryProvider from "./providers/QueryProvider";
import StateProvider from "./providers/StateProvider";

function App() {
  return (
    <InternetProvider>
      <QueryProvider>
        <StateProvider>
          <InvestorPipeline />
        </StateProvider>
      </QueryProvider>
    </InternetProvider>
  );
}

export default App;
