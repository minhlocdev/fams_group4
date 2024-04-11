import apiClient from "./apiClient";
export const getDeliveryDashboard = async () => {
    return await apiClient({
        method: 'get',
        url: `/delivery-types`,
    });
};