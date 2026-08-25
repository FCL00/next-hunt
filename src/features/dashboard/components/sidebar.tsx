import { Link } from '@/components/ui/link';
import { paths } from '@/config/paths';
import { LayoutDashboard, Settings, User, Search, FilePenLine } from 'lucide-react';

type SideBarItemProps = {
  name: string;
  path: string;
  icon: React.ReactNode;
};

export const SideBarItem = ({ name, path, icon }: SideBarItemProps) => {
  return (
    <div className="flex">
      <Link className="hover:text-ink-muted flex  items-center p-2 gap-2 hover:bg-dark-500 w-full rounded-md text-xs" href={path}>
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
      icon: <LayoutDashboard  className='w-4 h-4'/>,
      name: 'Job Applications',
    },
    {
      path: paths.dashboard.jobs.getHref(),
      icon: <Search  className='w-4 h-4'/>,
      name: 'Job Search',
    },
    {
      path: paths.dashboard.resume.getHref(),
      icon: <FilePenLine  className='w-4 h-4'/>,
      name: 'Resume Builder',
    },
    {
      path: paths.dashboard.profile.getHref(),
      icon: <User  className='w-4 h-4'/>,
      name: 'Profile',
    },
    {
      path: paths.dashboard.settings.getHref(),
      icon: <Settings  className='w-4 h-4'/>,
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
