import { Container } from '@mui/system';
import { Box } from "@mui/material";
import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import notionLogo from "../../assets/images/notion-logo.png"; // JSX記法でないと画像パスを指定できないため
import authUtils from '../../utils/authUtils';
import Sidebar from '../common/Sidebar';
import { useDispatch } from "react-redux"; // 73
import { setUser } from '../../redux/features/userSlice';

const AppLayout = () => { //65
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => { // 61
    // JWTを持っているのかを確認する
    const checkAuth = async () => {
      // 認証チェック
      const user = await authUtils.isAuthenticated();
      if (!user) { // ユーザーがいない場合
        navigate("/login"); // リダイレクト
      } else { // ユーザーが存在する場合
        // ユーザーを保存する 73
        dispatch(setUser(user)); // JWTで確認してログインしているユーザー
      }
    };
    checkAuth();
  }, [navigate]); // 61 ページ遷移するたびに発火する

  return (
    <div>
        <Box sx={{ display: "flex" }}>
            <Sidebar />
            <Box sx={{ flexGrow: 1, p: 1, width: "max-content "}}>
                <Outlet />
            </Box>
        </Box>
    </div>
  )
};

export default AppLayout