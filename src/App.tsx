import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Navbar } from './components/Navbar';
import { Home } from './screens/Home';
import { AddExpense } from './screens/AddExpense';
import { Insights } from './screens/Insights';
import { Profile } from './screens/Profile';
import { Auth } from './screens/Auth';
import { useState, useEffect } from 'react';
import { auth, onAuthStateChanged, FirebaseUser } from './firebase';

export default function App() {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-cyan font-black animate-pulse uppercase tracking-[0.5em]">
          INITIALIZING_GRID...
        </div>
      </div>
    );
  }

  if (!user) {
    return <Auth onAuthSuccess={() => {}} />;
  }

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<AddExpense />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
      <Navbar />
    </Router>
  );
}
