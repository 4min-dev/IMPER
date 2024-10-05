import { axiosInstance } from "../config/axios";

export default {
    login(data) {
        return axiosInstance.post('/accounts/login/', data);
    },
    reg(data) {
        return axiosInstance.post('/accounts/registration/', data);
    },
    passwordReset(data) {
        return axiosInstance.post('/accounts/password/reset/', data);
    },
    passwordResetConfirm(data) {
        return axiosInstance.post('/accounts/password/reset/confirm/', data);
    },
    refreshTokens(data) {
        return axiosInstance.post('/accounts/token/refresh/', data);
    },
    getTokens(data) {
        return axiosInstance.post('/token/', data);
    },
    getProfile() {
        return axiosInstance.get('/accounts/profile/');
    },
    logOut(data) {
        return axiosInstance.post('/accounts/logout/', data);
    },
    getUserStatus() {
        return axiosInstance.post('/user_status/');
    },
    getPaymentPlans() {
        return axiosInstance.post('/get_payment_plans/');
    },
    revokeSubscribtion() {
        return axiosInstance.post('/revoke_my_subscription/');
    }
}