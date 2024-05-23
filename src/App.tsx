import { Routes } from "./Routes";
import "./index.css";
import { ThemeProvider } from "./components/theme-provider";
import { ModeToggle } from "./components/ModeToggle";

export const App = () => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div
        className={`antialiased min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-50`}
      >
        <div className="max-w-3xl mx-auto py-10 px-4">
          <header>
            <div className="flex items-center justify-between">
              <ModeToggle />
              {/* <nav className="ml-auto text-sm font-medium space-x-6">
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
              </nav> */}
            </div>
          </header>
          <Routes />
        </div>
      </div>
    </ThemeProvider>
  );
};
