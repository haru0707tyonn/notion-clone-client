// commonは共通するコンポーネントを格納する 65user

import { 
    Drawer, 
    IconButton, 
    List, 
    ListItemButton, 
    Typography 
} from '@mui/material';
import { Box } from '@mui/system';
import  LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import  AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import React, { useEffect, useState } from 'react';
import assets from '../../assets/images';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"; // 73
import memoApi from '../../api/memoApi';
import { setMemo } from '../../redux/features/memoSlice';

const Sidebar = () => {

    const [activeIndex, setActiveIndex] = useState(0); // 86
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { memoId } = useParams(); // 86
    const user = useSelector((state) => state.user.value); // 今のユーザーのヴァリュー 73
    const memos = useSelector((state) => state.memo.value); // 84
    
    const logout = () => { // 66
        localStorage.removeItem("token"); // JWTトークンをなくすことにより
        navigate("/login"); // ログイン画面にリダイレクト
    };

    useEffect(() => {
        const getMemos = async () => { // asyncをつけるために関数を作成
            try {
                const res = await memoApi.getAll();
                // console.log(res);
                dispatch(setMemo(res)); // 84
                // console.log(memos);
            } catch (err) {
                alert(err);
            }
        };
        getMemos();
    }, [dispatch]); 

    useEffect(() => { // 86 選択したメモを背景色を変えてわかりやすくする
        const activeIndex = memos.findIndex((e) => e._id === memoId);
        setActiveIndex(activeIndex);
    }, [navigate]); // メモをクリックするたびに発火

    const addMemo = async () => { // 97
        try {
            const res = await memoApi.create();
            const newMemos = [res, ...memos];
            dispatch(setMemo(newMemos)); // スーパーグローバルで管理 ★自動リロードされる（下のmemosが更新されるから）
            navigate(`memo/${res._id}`); // 作成したメモにリダイレクト
        } catch (err) {
            alert(err);
        }
    };

  return (
    <Drawer 
        container={window.document.body} 
        variant='permanent' 
        open={true} // 表示・非表示
        sx={{ width: 250, height: "100vh" }}
    >
        <List sx={{ width: 250, height: "100vh", backgroundColor: assets.colors.secondary }}>
            <ListItemButton>
                <Box sx={{ 
                    width: "100%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    }}
                >
                    <Typography variant='body2' fontWeight="700">
                        {/* 73 ユーザー名 */}
                        {user.username} 
                    </Typography>
                    <IconButton onClick={logout}>
                        <LogoutOutlinedIcon />
                    </IconButton>
                </Box>
            </ListItemButton>
            <Box sx={{ paddingTop: "10px" }}></Box>  
            <ListItemButton>
                <Box sx={{ 
                    width: "100%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    }}
                >
                    <Typography variant='body2' fontWeight="700">
                        お気に入り
                    </Typography>
                    
                </Box>
            </ListItemButton>
            <Box sx={{ paddingTop: "10px" }}></Box>
            <ListItemButton>
                <Box sx={{ 
                    width: "100%", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "space-between", 
                    }}
                >
                    <Typography variant='body2' fontWeight="700">
                        プライベート
                    </Typography>
                    <IconButton onClick={() => addMemo()}>
                        <AddBoxOutlinedIcon fontSize="small" />
                    </IconButton>
                </Box>
            </ListItemButton>
            {/* 85 */}
            {memos.map((item, index) => ( 
                <ListItemButton 
                    sx={{ pl: "20px" }} 
                    component={Link} 
                    to={`/memo/${item._id}`} 
                    key={item._id} 
                    selected={index === activeIndex}
                >
                    <Typography>{item.icon} {item.title}</Typography>
                </ListItemButton>
            ))}
            
        </List>
    </Drawer>
  )
}

export default Sidebar