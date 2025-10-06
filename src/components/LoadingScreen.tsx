import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="text-center space-y-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-gradient-primary opacity-20 animate-pulse-glow blur-2xl mx-auto"></div>
          <h1 className="absolute inset-0 flex items-center justify-center text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            HS
          </h1>
        </div>
        
        <div className="space-y-3">
          <div className="w-64 h-2 bg-muted rounded-full overflow-hidden mx-auto">
            <div
              className="h-full bg-gradient-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-muted-foreground text-sm">Loading portfolio...</p>
        </div>
      </div>
    </div>
  );
};
