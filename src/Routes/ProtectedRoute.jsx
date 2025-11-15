import {Navigate} from 'react-router-dom';
import { useAuth } from '../Contexts/Global/VendorContext';

export default function ProtectedRoute({children}){
    const {isAuthenticated, loading} = useAuth()
    if (loading) return <div>Loading...</div>;

    
    if(!isAuthenticated) return <Navigate to='/vendorLogin' />
    return children;
};
