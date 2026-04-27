import { useEffect } from 'react';

interface WidgetUser {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  tenant?: {
    id: string;
    name: string;
  };
}

declare global {
  interface Window {
    __gfpWidget?: {
      setUser: (user: WidgetUser) => void;
      clearUser: () => void;
    };
  }
}

export function useWidgetUser(user: WidgetUser | null) {
  useEffect(() => {
    if (user && window.__gfpWidget) {
      window.__gfpWidget.setUser({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        tenant: user.tenant
      });
    } else if (!user && window.__gfpWidget) {
      window.__gfpWidget.clearUser();
    }
  }, [user]);
}
