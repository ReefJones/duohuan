"use client";

// 初始化文件

import { Txt2imgInterface } from "../../../../app/Types/txt2img";
import { createSlice } from "@reduxjs/toolkit";

// 初始化状态类型设定
interface Txt2imgState {
  url: string;
  settings: Txt2imgInterface;
  status: string;
  result: any;
}

// 定义初始化状态
const initialState: Txt2imgState = {
  url: "",
  settings: {
    prompt: "",
    seed: -1,
    steps: 20,
    sampler_index: "Euler a",
  },
  status: "idle",
  result: {},
};

// 创建修改状态方法
export const txt2imgSlice = createSlice({
  name: "txt2img",
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
  txt2imgSlice.actions;

export default txt2imgSlice.reducer;
