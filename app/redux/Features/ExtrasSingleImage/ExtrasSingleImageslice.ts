"use client";

// 初始化文件

import { ExtrasSingleImageInterface } from "../../../Types/ExtrasSingleImage";
import { createSlice } from "@reduxjs/toolkit";

// 初始化状态类型设定
interface ExtrasSingleImageState {
  url: string;
  settings: ExtrasSingleImageInterface;
  status: string;
  result: any;
}

// 定义初始化状态
const initialState: ExtrasSingleImageState = {
    url: "",
    settings: {
        resize_mode: 0, // 放大模式：0倍数放大，1宽高放大
        show_extras_results: true,
        gfpgan_visibility: 0,
        codeformer_visibility: 0,
        codeformer_weight: 0,
        upscaling_resize: 2, // 放大倍数
        upscaling_resize_w: 512, // 放大宽
        upscaling_resize_h: 512, // 放大高
        upscaling_crop: true,
        upscaler_1: "R-ESRGAN 4x+", // 采样器 ESRGAN_4x、R-ESRGAN 4x+
        upscaler_2: "None",
        extras_upscaler_2_visibility: 0,
        upscale_first: false,
        image: ""
    },
  status: "idle",
  result: {},
};

// 创建修改状态方法
export const ExtrasSingleImageSlice = createSlice({
  name: "ExtrasSingleImage",
  initialState,
  reducers: {
    setUrl: (state, action) => {
      state.url = action.payload;
    },
    setSettings: (state, action) => {
      state.settings = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

export const { setUrl, setSettings, setResult, setStatus } =
  ExtrasSingleImageSlice.actions;

export default ExtrasSingleImageSlice.reducer;
