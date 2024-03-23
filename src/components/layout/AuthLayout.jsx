import { Container } from '@mui/system';
import { Box } from "@mui/material";
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import notionLogo from "../../assets/images/notion-logo.png"; // JSX記法でないと画像パスを指定できないため
import authUtils from '../../utils/authUtils';

const AuthLayout = () => {
  const navigate = useNavigate();

  useEffect(() => { // 61
    // JWTを持っているのかを確認する
    const checkAuth = async () => {
      // 認証チェック
      const isAuth = await authUtils.isAuthenticated();
      if (isAuth) { // JWTがある場合 63
        navigate("/"); // リダイレクト
      }
    };
    checkAuth();
  }, [navigate]); // 61 ページ遷移するたびに発火する

  return (
    <div>
        <Container component="main" maxWidth="xs">
          <Box sx={{
            marginTop: 6, // 直接CSSを書き込むこともできる
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            }}
          >
            <img src={notionLogo} alt="" 
              style={{width: 100, height: 100, marginBottom: 3}}
            />
            Notionクローン開発
          </Box>
          {/* 子コンポーネントを表示するにはOutletを記述する */}
          <Outlet /> 
        </Container>
    </div>
  )
}

export default AuthLayout