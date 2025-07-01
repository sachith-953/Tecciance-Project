
'use client';

import { Provider } from 'react-redux';
import { store } from '../store';
import Navbar from '../components/ui/NavBar';

const ClientWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <Navbar />
      <main className="min-h-screen p-4">{children}</main>
    </Provider>
  );
};

export default ClientWrapper;