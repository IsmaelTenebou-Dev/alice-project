"use client";

import Link from 'next/link';
import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface SidebarItemProps {
  icon: ReactNode;
  label: string;
  href: string;
  active?: boolean;
}

const SidebarItem = ({ icon, label, href, active }: SidebarItemProps) => {
  return (
    <Link href={href} 
      className={`flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-purple-50 transition-colors`}
      style={{ color: active ? '#8b5cf6' : '#4b5563' }}
    >
      <span className="text-lg">{icon}</span>
      <span className={active ? 'font-medium' : ''}>{label}</span>
    </Link>
  );
};

const Sidebar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
  
    setIsMobileMenuOpen(false);
  }, [pathname]);
  
 
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  if (!mounted) {
    return null;
  }
  
  // Mobile menu toggle button
  const MobileMenuButton = () => (
    <button 
      onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
      aria-label="Toggle menu"
    >
      {isMobileMenuOpen ? (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
      ) : (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      )}
    </button>
  );

  return (
    <>
      <MobileMenuButton />
      <aside 
        className={`${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static top-0 left-0 z-40 w-[240px] h-full flex flex-col bg-white shadow-sm border-r border-gray-100 transition-transform duration-300 ease-in-out`}
      >
      <div className="p-6">
        <h1 className="text-2xl font-bold" style={{ color: '#8b5cf6' }}>RemitNow</h1>
      </div>
      
      <nav className="flex-1 px-3 py-2">
        <div className="space-y-1">
          <div style={{ backgroundColor: pathname === '/dashboard' ? '#f3e8ff' : 'transparent', borderRadius: '8px' }}>
            <SidebarItem 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={pathname === '/dashboard' ? '#8b5cf6' : 'currentColor'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1" /><rect width="7" height="5" x="14" y="3" rx="1" /><rect width="7" height="9" x="14" y="12" rx="1" /><rect width="7" height="5" x="3" y="16" rx="1" /></svg>}
              label="Dashboard" 
              href="/dashboard" 
              active={pathname === '/dashboard'} 
            />
          </div>
          <SidebarItem 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /><polyline points="10 17 15 12 10 7" /><line x1="15" x2="3" y1="12" y2="12" /></svg>}
            label="Transactions" 
            href="/dashboard/transactions" 
            active={pathname === '/dashboard/transactions'} 
          />
          {/* Users and Referrals links removed as these pages haven't been built yet */}
          <SidebarItem 
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" /><circle cx="12" cy="12" r="3" /></svg>}
            label="Settings" 
            href="/dashboard/settings" 
            active={pathname === '/dashboard/settings'} 
          />
        </div>
      </nav>

      <div className="flex flex-col flex-1 justify-end px-4 pb-6">

        <Link href="/logout" className="flex items-center gap-3 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" y2="12" x2="9" /></svg>
          <span>Log Out</span>
        </Link>
      </div>
    </aside>
    </>
  );
};

export default Sidebar;
