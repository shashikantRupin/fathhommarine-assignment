import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard,
  Ship,
  Map,
  FileText,
  Settings,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/dashboard' },
    { icon: <Ship size={20} />, label: 'Ships', path: '/ships' },
    { icon: <Map size={20} />, label: 'Mapping', path: '/mapping' },
    { icon: <FileText size={20} />, label: 'Reports', path: '/reports' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/settings' },
  ];

  const isActivePath = (path: string) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-gray-800 bg-opacity-50 z-20"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-blue-900 to-blue-800 text-white z-30 transition-all duration-300 ease-in-out 
          ${isOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full md:translate-x-0 md:w-20'} 
          md:translate-x-0 md:w-20 md:hover:w-64 overflow-hidden`}
      >
        <div className="flex flex-col h-full">
          {/* Close button for mobile */}
          <div className="md:hidden absolute top-4 right-4">
            <button onClick={toggleSidebar} className="text-white">
              <X size={24} />
            </button>
          </div>

          {/* Logo */}
          <div className="flex items-center justify-center h-20 bg-blue-950">
            <Ship className="h-10 w-10 text-blue-400" />
            <span className={`ml-3 font-semibold text-xl whitespace-nowrap transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
              MarineOps
            </span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4">
            <ul className="space-y-2">
              {navItems.map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-4 py-3 rounded-lg transition-colors duration-200 group
                      ${isActivePath(item.path) 
                        ? 'bg-blue-700 text-white' 
                        : 'text-blue-100 hover:bg-blue-800'}`}
                  >
                    <span className="min-w-[20px]">{item.icon}</span>
                    <span className={`ml-4 whitespace-nowrap transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User profile */}
          <div className="p-4 border-t border-blue-800">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-700 flex items-center justify-center">
                <span className="text-lg font-semibold text-white">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div className={`ml-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
                <p className="text-sm font-medium text-white">{user?.name || 'User'}</p>
                <p className="text-xs text-blue-300 truncate max-w-[140px]">{user?.email || 'user@example.com'}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className={`mt-4 flex items-center px-4 py-2 w-full text-sm text-blue-100 rounded-lg hover:bg-blue-800 transition-colors duration-200 ${isOpen ? '' : 'justify-center md:group-hover:justify-start'}`}
            >
              <LogOut size={20} />
              <span className={`ml-3 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}>
                Sign out
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;