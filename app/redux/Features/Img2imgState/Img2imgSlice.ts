"use client";

// 初始化文件

import { Img2imgInterface } from "../../../../app/Types/img2img";
import { createSlice } from "@reduxjs/toolkit";

// 初始化状态类型设定
interface Img2imgState {
  url: string;
  settings: Img2imgInterface;
  status: string;
  result: any;
}

// 定义初始化状态
const initialState: Img2imgState = {
  url: "",
  settings: {
    init_images: [""],
    prompt: "1girl,cute",
    negative_prompt: "",
    sampler_index: "Euler a",
    width: 1280,
    height: 1024,
    steps: 20,
    restore_faces: false,
    tiling: false,
    resize_mode: 0,
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
export const img2imgSlice = createSlice({
  name: "img2img",
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
  img2imgSlice.actions;

export default img2imgSlice.reducer;
