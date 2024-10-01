import { useContext } from "react"
import { AuntContext } from "../context/AuntProvider"
import { useQuery } from "@tanstack/react-query"


const useCart = () => {
    const {user} = useContext(AuntContext)
    const {refetch,data: cart = []} = useQuery({
        queryKey: ['cards', user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:6001/cards?email=${user?.email}`)
            return res.json()
          },
    })
  return [cart, refetch]
}

export default useCart