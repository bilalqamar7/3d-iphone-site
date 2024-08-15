import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//...
import * as Sentry from "@sentry/react";

Sentry.init({
   dsn: "https://d7ad75e6c2c2b14d9f83ba38ff370c63@o4507770402308096.ingest.us.sentry.io/4507770406699008",
   integrations: [
      Sentry.browserTracingIntegration(),
      //Sentry.metricsAggregatorIntegration(),  //This is no longer supported because metrics work out of the box inside init()
      Sentry.reactRouterV6BrowserTracingIntegration({
         useEffect: React.useEffect,
      }),
      Sentry.replayIntegration(),
   ],
   // Performance Monitoring
   tracesSampleRate: 1.0, //  Capture 100% of the transactions
   // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
   tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
   // Session Replay
   replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
   replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <App />
   </StrictMode>,
)