import React from 'react';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useAdmin = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const { refetch, data: isAdmin, isPending: isAdminLoading} = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
           const res = await axiosSecure.get(`user/admin/${user?.email}`)
           console.log(res.data)
            return res.data?.admin;
        }
    })
    // const { refetch, data: isAdmin, isPending: isAdminLoading } = useQuery({
    //     queryKey: [user?.email, 'isAdmin'],
    //     queryFn: async () => {
    //         const res = await axiosSecure.get(`user/admin/${user?.email}`);
    //         console.log('Response data:', res.data);
    //         return res.data?.isadmin; // Pastikan mengakses isadmin, bukan admin
    //     },
    //     // Set query ini untuk di-fetch ulang ketika user berubah
    //     enabled: !!user?.email, // Hanya jalankan query jika ada email
    // });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
