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
    prompt: "1girl,cute",
    negative_prompt: "",
    sampler_index: "Euler a",
    width: 1280,
    height: 1024,
    steps: 20,
    restore_faces: false,
    tiling: false,
    enable_hr: false,
    n_iter: 1,
    batch_size: 1,
    seed: -1,
    override_settings: {
      sd_model_checkpoint: "Realistic_Vision_V2.0-inpainting.ckpt [73c461d2cf]",
    }
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
