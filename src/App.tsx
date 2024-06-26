import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";

import { authProvider, dataProvider, liveProvider } from "./providers";
import {ForgotPassword,Login,Register, Home} from "./pages"

import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { createClient } from "graphql-ws";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from "./components/layoout";
import { resources } from "./config/resources";


function App() {
  return (
    <BrowserRouter>
      <GitHubBanner />
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "f2sXMo-X4TY2R-3dvR3r",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  {/* <Route index element={<WelcomePage />} /> */}              
                  <Route path="/register" element={<Register/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/forgot-password" element={<ForgotPassword/>}/>
                  <Route element={<Authenticated key='authenticated-layout' fallback={<CatchAllNavigate to="/login"/>}>
                    <Layout>
                      <Outlet/>
                    </Layout>
                    </Authenticated>}>
                    <Route index element={<Home/>}/>
                  </Route>
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;
