import { MemberRole } from '@prisma/client';
import { useOptimistic } from 'react';

export const useChangeRole = (role: MemberRole) => {
  const [optimisticRole, changeOptimisticRole] = useOptimistic(
    role,
    (_, newRole: MemberRole) => newRole
  );

  return { optimisticRole, changeOptimisticRole };
};
