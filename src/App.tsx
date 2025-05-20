
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { ScheduleProvider } from "@/context/ScheduleContext";
import { useEffect } from "react";

const queryClient = new QueryClient();

const App = () => {
  // Initialize Capacitor push notifications when available
  useEffect(() => {
    const setupCapacitor = async () => {
      if (window.Capacitor && window.Capacitor.isNativePlatform()) {
        try {
          // Check and request permission for notifications
          if (window.Capacitor.Plugins.LocalNotifications) {
            const { display } = await window.Capacitor.Plugins.LocalNotifications.checkPermissions();
            
            if (display !== 'granted') {
              await window.Capacitor.Plugins.LocalNotifications.requestPermissions();
            }
          }
        } catch (error) {
          console.error("Error initializing notifications:", error);
        }
      }
    };
    
    setupCapacitor();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ScheduleProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ScheduleProvider>
    </QueryClientProvider>
  );
};

export default App;
