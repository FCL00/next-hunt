import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { LayoutDashboard, Settings, User } from 'lucide-react';

type SideBarItemProps = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export const SideBarItem = ({ name, path, icon }: SideBarItemProps) => {
  return (
    <div className="flex">
      <Link
        className="hover:text-ink-muted flex  items-center p-2 gap-2 hover:bg-dark-500 w-full rounded-md text-xs"
        href={path}
      >
        {icon}
        <span>{name}</span>
      </Link>
    </div>
  );
};

export function SideBar() {
  const navigation = [
    {
      path: paths.dashboard.app.getHref(),
      icon: <LayoutDashboard />,
      name: 'Dashboard',
    },
    {
      path: paths.dashboard.profile.getHref(),
      icon: <User />,
      name: 'Profile',
    },
    {
      path: paths.dashboard.settings.getHref(),
      icon: <Settings />,
      name: 'Settings',
    },
  ];

  return (
    <div className="flex flex-col flex-start p-4">
      {navigation.map((value, index) => (
        <SideBarItem key={`${value.name}+${index}`} {...value} />
      ))}
    </div>
  );
}
