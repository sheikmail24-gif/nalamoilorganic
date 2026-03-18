export default function App() {
  const [showAdmin, setShowAdmin] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);

  const handleAdminLogin = () => {
    const pass = prompt("Enter Administrator Access Key:");
    if (pass === "NalamAdmin2026!") { // CHANGE THIS PASSWORD
      setIsAdminAuthenticated(true);
      setShowAdmin(true);
    } else {
      alert("Access Denied.");
    }
  };

  if (showAdmin && isAdminAuthenticated) {
    return (
      <StoreProvider>
        <AdminDashboard onClose={() => setShowAdmin(false)} />
      </StoreProvider>
    );
  }
  
  // ... rest of your App return remains same, but update the button:
  // <button onClick={handleAdminLogin} ... > <Settings /> </button>
}
