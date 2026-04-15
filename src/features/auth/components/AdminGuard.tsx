import { useAuth } from '@/features/auth/hooks/useAuth';

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: user } = useAuth();

  if (!user?.isAdmin) return null;

  return <>{children}</>;
}
