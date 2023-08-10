"use client";

// 初始化文件

import { RembgInterface } from "../../../Types/rembg";
import { createSlice } from "@reduxjs/toolkit";

// 初始化状态类型设定
interface RembgState {
  url: string;
  settings: RembgInterface;
  status: string;
  result: any;
}

// 定义初始化状态
const initialState: RembgState = {
  url: "",
  settings: {
    input_image: "",
    model: "u2netp",
    return_mask: false,
    alpha_matting: false,
    alpha_matting_foreground_threshold: 240,
    alpha_matting_background_threshold: 10,
    alpha_matting_erode_size: 10
  },
  status: "idle",
  result: {},
};

// 创建修改状态方法
export const rembgSlice = createSlice({
  name: "rembg",
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
  rembgSlice.actions;

export default rembgSlice.reducer;
