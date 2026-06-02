import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const auth = sessionStorage.getItem('e360_auth');
    router.replace(auth === 'true' ? '/dashboard' : '/login');
  }, []);
  return null;
}
