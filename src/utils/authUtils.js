import authApi from "../api/authApi";

const authUtils = {
    // JWTチェック 62
    isAuthenticated: async () => {
        const token = localStorage.getItem("token");
        if(!token) return false;
        
        try {
            const res = await authApi.verifyToken();
            return res.user;
        } catch {
            return false;
        }
    },
};

export default authUtils;