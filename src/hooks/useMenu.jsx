import React from 'react'
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const useMenu = () => {
    const axiosPublic = useAxiosPublic();
    const {data: menu = [], refetch, isLoading} = useQuery({
        queryKey: ['menu'],
        queryFn: async () => {
            const res = await axiosPublic.get('/menu');
            // console.log(res.data)
            return res.data;
        }
    })
  return [menu, refetch, isLoading]
}

export default useMenu