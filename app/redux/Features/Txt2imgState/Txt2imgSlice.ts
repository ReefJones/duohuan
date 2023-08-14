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
    prompt: "(a portrait of a asian woman:1.2), ([large clothes : (large patches:1.2)]:1.4), (low contract:1.1),full body,solo, realism, professional photo, studio shot, fashion, (simple background:1.3), detailed, (neo-futurism:1.18), (futurism:0.8)",
    negative_prompt: "child, big breasts, (3d, illustration, cartoon, painting:1.2), black and white, ugly, oversaturated, blurry",
    sampler_index: "DPM++ SDE Karras", // 采样方法
    width: 1024, // 宽度
    height: 1280, // 高度
    steps: 35, // 生成步数
    tiling: false, // 可平埔
    enable_hr: false, // 高清修复
    restore_faces: true, // 脸部修复
    n_iter: 1, // 生成批次
    batch_size: 1, // 每批张数
    cfg_scale: 7, // 提示词相关性
    denoising_strength: 0, // 去噪强度
    seed: -1, // 种子数
    override_settings: {
      sd_model_checkpoint: "SDXL/sd_xl_base_1.0.safetensors [31e35c80fc]",
    }, // 使用模型
    script_args: [

    ], // 使用插件
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
