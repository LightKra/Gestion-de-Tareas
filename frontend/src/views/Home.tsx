import Sidebar from "../components/Sidebar/Sidebar";
import CalendarSection from "../components/CalendarSection/CalendarSection";
import TasksSection from "../components/TasksSection/TasksSection";
import MobileHeader from "../components/MobileHeader/MobileHeader";
import MobileNav from "../components/MobileNav/MobileNav";

const Home = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Buenos días";
    if (hour < 18) return "Buenas tardes";
    return "Buenas noches";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white sm:flex">
      <div>
        {/* Desktop Sidebar */}
        <Sidebar/>

        {/* Mobile Header */}
        <MobileHeader />
      </div>

      {/* Main Content */}
      <main className="w-full">
        <div className="max-w-4xl mx-auto p-6 md:p-8">
          {/* Greeting */}
          <h1 className="text-3xl md:text-4xl font-bold mb-8">
            {getGreeting()}, Roger
          </h1>

          {/* Calendar Section */}
          <div className="mb-6">
            <CalendarSection />
          </div>

          {/* Tasks Section */}
          <div>
            <TasksSection />
          </div>
        </div>
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
};

export default Home;
