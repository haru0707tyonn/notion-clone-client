import axios from "axios";

const BASE_URL = "http://localhost:5000/api/v1";
const getToken = () => localStorage.getItem("token");

const axiosClient = axios.create({
    baseURL: BASE_URL,
});

// APIを叩く前に前処理を行う 46
axiosClient.interceptors.request.use(async (config) => {
    return {
        ...config,
        headers: { // この情報をconfigの中に入れる　スプレッド構文を忘れずに 50
            "Content-Type": "application/json", // JSON形式でのやり取りを設定
            authorization: `Bearer ${getToken()}`, // 46 リクエストヘッダにJWTを付けてサーバーに渡す
        },
    };
});

axiosClient.interceptors.response.use(
    (response) => {
    return response.data; // 58 .dataをつけないとJWTが格納されない
    }, 
    (err) => {
        throw err.response; // そのまま返す
    }
);

export default axiosClient;