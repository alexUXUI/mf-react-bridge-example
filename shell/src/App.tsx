// ./src/App.tsx
import React from "react";
import { createRemoteComponent } from "@module-federation/bridge-react";
import { init, loadRemote } from "@module-federation/enhanced/runtime";

// Define FallbackErrorComp component
const FallbackErrorComp = ({ error, resetErrorBoundary }: any) => {
  return (
    <div>
      <h2>This is ErrorBoundary Component</h2>
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
      <button onClick={() => resetErrorBoundary()}>
        resetErrorBoundary(try again)
      </button>
    </div>
  );
};

// Define FallbackLoading component
const FallbackComp = <div data-test-id="loading">loading...</div>;

// Use createRemoteComponent to create remote component
const Remote1App = createRemoteComponent({
  // loader is used to load remote modules, e.g.: loadRemote('remote1/export-app'), import('remote1/export-app')
  loader: () => loadRemote("remote1/export-app"),
  // fallback is used for displaying components when remote module loading fails
  fallback: FallbackErrorComp,
  // loading is used for displaying components when loading remote modules
  loading: FallbackComp,
});

////

// Use createRemoteComponent to create remote component
const Remote2App = createRemoteComponent({
  // loader is used to load remote modules, e.g.: loadRemote('remote1/export-app'), import('remote1/export-app')
  loader: () => loadRemote("remote2/export-app"),
  // fallback is used for displaying components when remote module loading fails
  fallback: () => <div>Error</div>,
  // loading is used for displaying components when loading remote modules
  loading: <div>Loading</div>,
});

///

const App = () => {
  return (
    <div>
      <Remote1App
        // Can set className and style, will be automatically injected into the component
        style={{ color: "red" }}
        // name and age are remote component props, will be automatically passed to the remote component
        name={"Ming"}
        age={12}
        // Can set ref, will be forwarded to the remote component, can get ref object to operate DOM
        // ref={ref}
        // Use memoryRoute to control child application routing as memoryRouter, will not directly display URL in browser address bar
        // memoryRoute={{ entryPath: "/detail" }}
      />
      <Remote2App
        // Can set className and style, will be automatically injected into the component
        style={{ color: "blue" }}
        // name and age are remote component props, will be automatically passed to the remote component
        name={"Ming"}
        age={12}
        // Can set ref, will be forwarded to the remote component, can get ref object to operate DOM
        // ref={ref}
      />
    </div>
  );
};

export default App;
