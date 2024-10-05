import { axiosInstance } from "../config/axios";

export default {
    createPaymetnLink(data) {
        return axiosInstance.post('/create_payment_link/', data);
    },
    getMyEvents() {
        return axiosInstance.post('/my_events/');
    },
    subscribeToEvent(data) {
        return axiosInstance.post('/subscribe_to_event/', data);
    },
    unsubscribeFromEvent(data) {
        return axiosInstance.post('/unsubscribe_from_event/', data);
    }
}