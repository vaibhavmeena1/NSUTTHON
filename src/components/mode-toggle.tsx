import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();

  const handleThemeToggle = () => {
    if (theme === 'dark') {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  };

  return (
    <Button onClick={handleThemeToggle} variant="outline" size="icon">
      {theme === 'dark' ? (
        <>
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Switch to light theme</span>
        </>
      ) : (
        <>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <span className="sr-only">Switch to dark theme</span>
        </>
      )}
    </Button>
  );
}
