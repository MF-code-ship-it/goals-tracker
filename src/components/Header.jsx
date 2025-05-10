export default function Header({ activeTab, setActiveTab }) {
  const tabs = ['Goals', 'Archived'];

  return (
    <header className="sticky top-0 z-50 bg-blue-600 text-white p-4 shadow">
      <nav className="flex space-x-4 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded ${
                activeTab === tab ? 'bg-white text-blue-600 font-bold' : 'hover:bg-blue-500'
              }`}
          >
            {tab}
          </button>
        ))}
      </nav>
    </header>
  );
}
