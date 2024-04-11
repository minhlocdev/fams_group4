
import { useQuery } from '@tanstack/react-query';
import { getDeliveryDashboard } from '../DeliveryType';
export const useGetDeliveryDashboard = () =>
    useQuery({
        queryKey: ["Dashboard", "DeliveryType"],
        queryFn: () => getDeliveryDashboard().then((res) => res.data),
        staleTime: 20000,
    }
    );
