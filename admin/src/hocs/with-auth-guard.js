import { AuthGuard } from 'src/guards/auth-guard';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export const withAuthGuard = (Component) => (props) => {
    const { isLoggedIn } = useSelector(store => store.auth);

    const router = useRouter();

    useEffect(() => {
        if (!isLoggedIn){
            router.push("/auth/login");
        }else {
            router.push("/")
        }
    }, [isLoggedIn, router]);

    return (
      <AuthGuard>
          <Component {...props} />
      </AuthGuard>
    )
};

