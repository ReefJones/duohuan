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
    prompt: "1girl, moyou, collared shirt, full body, standing, Pure white background, professional photograph",
    negative_prompt: "EasyNegativeV2,(badhandv4:1.2)",
    sampler_index: "DPM++ SDE Karras", // 采样方法
    width: 512, // 宽度
    height: 768, // 高度
    steps: 50, // 生成步数
    tiling: false, // 可平埔
    restore_faces: true, // 脸部修复
    n_iter: 1, // 生成批次
    batch_size: 1, // 每批张数
    cfg_scale: 7, // 提示词相关性
    seed: -1, // 种子数
    clip_skip: 2, // 跳过Clip数

    // 高清修复
    enable_hr: false, // 是否启用
    // hr_scale: 2, // 放大倍数
    // hr_upscaler: "ESRGAN_4x", // 采样器 ESRGAN_4x、R-ESRGAN 4x+
    // hr_sampler_name: "", // 采样器名称
    // hr_second_pass_steps: 0, // 步数
    // denoising_strength: 0.2, // 去噪强度

    // 使用的模型
    override_settings: {
      // sd_model_checkpoint: "SDXL/sd_xl_base_1.0.safetensors [31e35c80fc]",
      sd_model_checkpoint: "SD1.5/MoYouRenZaoRen_v10.safetensors [6a226dd292]",
    },

    // 使用插件
    alwayson_scripts: {
      "ControlNet": {
        "args": [
          {
            "enabled": true,
            "module": "none",
            "model": "control_openpose-fp16 [9ca67cc5]",
            "weight": 1,
            "image": "data:image/png;base64,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",
            "mask": null,
            "invert_image": false,
            "resize_mode": 0,
            "rgbbgr_mode": false,
            "lowvram": false,
            "processor_res": 0,
            "threshold_a": 64,
            "threshold_b": 64,
            "guidance_start": 0,
            "guidance_end": 1,
            "guessmode": false
          }
        ]
      }
    },

    // {
    //   "ControlNet 0": {
    //     "preprocessor": "openpose_full",
    //     "model": "control_v11p_sd15_openpose_fp16 [73c2b67d]",
    //     "weight": 1,
    //     "starting/ending": "(0, 1)",
    //     "resize mode": "Crop and Resize",
    //     "pixel perfect": false,
    //     "control mode": "Balanced",
    //     "preprocessor params": "(512, 64, 64)"
    //   }
    // }

    // 额外的参数
    extra_generation_params: {
      "ADetailer model": "face_yolov8n.pt", // ADetailer 模型的名称或路径，用于面部特征的处理
      "ADetailer confidence": 0.3, // ADetailer 模型的置信度阈值，用于筛选面部特征
      "ADetailer dilate/erode": 4, // ADetailer 模型的膨胀/腐蚀参数，用于调整面部特征的形状
      "ADetailer mask blur": 4, // ADetailer 模型的掩模模糊程度，用于平滑面部特征的边缘
      "ADetailer denoising strength": 0.4, // ADetailer 模型的去噪强度，用于降低面部特征中的噪声
      "ADetailer inpaint only masked": true, // 是否仅对掩模区域进行修复
      "ADetailer inpaint padding": 32, // 修复时的填充大小
      "ADetailer version": "23.7.11", // ADetailer 模型的版本号
      "TI hashes": "EasyNegativeV2: 339cc9210f70, badhandv4: 5e40d722fc3d" // 额外的哈希值，这里指定了EasyNegativeV2 和 badhandv4 的哈希值
   },

    // sampler_name: "DPM++ SDE Karras", // 采样方法
    // styles: [], // 使用的样式
    // script_args: [], // 使用插件
    // all_prompts: [], // 包含所有提示文本的列表
    // all_negative_prompts: [], // 包含所有负面提示文本的列表
    // all_seeds: [], // 包含所有随机种子的列表
    // all_subseeds: [], // 包含所有子种子的列表
    // subseed_strength: 0, // 子种子强度，用于调整子种子对生成图像的影响程度
    // sd_model_hash: "6a226dd292", // 模型哈希值，用于指定生成器模型的版本
    // index_of_first_image: 0, // 第一张图像的索引
    // infotexts: [], // 信息文本，提供有关生成设置和参数的详细描述
    // is_using_inpainting_conditioning: false, // 是否使用修复图像的条件
    // subseed: -1, // 子种子数
    // subseed_strength: 0, // 子种子数强度
    // seed_resize_from_w: -1, // 调整种子大小时的宽度基准
    // seed_resize_from_h: -1, // 调整种子大小时的高度基准
    // hr_resize_x: 0, // 高清修复宽度
    // hr_resize_y: 0, // 高清修复高度
    // hr_prompt: "", // 高清生成提示词
    // hr_negative_prompt: "", // 高清生成负面提示词
    // firstphase_width: 0,
    // firstphase_height: 0,
    // send_images: true,
    // save_images: false,
    // sampler_name: "string",
    // do_not_save_samples: false,
    // do_not_save_grid: false,
    // eta: 0,
    // s_min_uncond: 0,
    // s_churn: 0,
    // s_tmax: 0,
    // s_tmin: 0,
    // s_noise: 1,
    // override_settings_restore_afterwards: true,
    // script_name: "string",
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
