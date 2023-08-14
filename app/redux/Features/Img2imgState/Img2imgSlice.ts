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
    init_images: [""], // 基础图的base64
    prompt: "(a portrait of a asian woman:1.2), ([large clothes : (large patches:1.2)]:1.4), (low contract:1.1),full body,solo, realism, professional photo, studio shot, fashion, (simple background:1.3), detailed, (neo-futurism:1.18), (futurism:0.8)",
    negative_prompt: "child, big breasts, (3d, illustration, cartoon, painting:1.2), black and white, ugly, oversaturated, blurry",
    sampler_index: "DPM++ SDE Karras", // 采样方法
    width: 1024, // 宽度
    height: 1280, // 高度
    steps: 35, // 生成步数
    tiling: false, // 可平埔
    restore_faces: true, // 脸部修复
    n_iter: 1, // 生成批次
    batch_size: 1, // 每批张数
    cfg_scale: 7, // 提示词相关性
    denoising_strength: 0.72, // 去噪强度
    seed: -1, // 种子数
    override_settings: {
      sd_model_checkpoint: "SDXL/sd_xl_base_1.0.safetensors [31e35c80fc]",
    }, // 使用模型
    script_args: [

    ], // 脚本插件
    // mask: "", // 遮罩 base64
    // mask_blur: 0, // 蒙版模糊 4
    // resize_mode: 0, // 调整模式["Just resize", "Crop and resize", "Resize and fill", "Just resize (latent upscale)"]
    // inpainting_fill: 0, // 蒙版遮住的内容， 0填充， 1原图 2潜空间噪声 3潜空间数值零
    // inpaint_full_res: false, // inpaint 区域, false: 全图 true：仅蒙版
    // inpaint_full_res_padding: 32, // 只遮罩填充，像素32
    // inpainting_mask_invert: false, // 蒙版模式 0重绘蒙版内容 1重绘非蒙版内容
    // alwayson_scripts: {}, // 脚本插件Dict[str, Dict[str, Any]]，同script_args，txt2img也可以用
    // image_cfg_scale: float =  0.72
    // init_latent = None
    // image_mask = ""
    // latent_mask = None
    // mask_for_overlay = None
    // nmask = None
    // image_conditioning = None
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
