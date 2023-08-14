import { Txt2imgInterface } from "../../../app/Types/txt2img";
import { NextRequest } from "next/server";
import axios from "axios";
import * as _ from "lodash"


export async function POST(req: NextRequest) {
  const { sdUrl, args } = await req.json();
  //   console.log("sdUrl", sdUrl, "args", args);
  //  判断请求连接是否为空
  if (sdUrl === null || sdUrl === undefined) {
    return new Response("No sdUrl provided.", {
      status: 500,
    });
  }

  const body: Txt2imgInterface = args;
  //  获取controlnet对象，判断controlnet是否格式正确
  const controlnet = _.get(body, "alwayson_scripts.controlnet", null);

  if (controlnet !== null) {
    const image = _.get(controlnet, "args[0].input_image", null);
    // console.log("image is in controlnet");
    if (!image) {
      return new Response("No image provided.", {
        status: 500,
      });
    }
  }
  //  获取宽高，看看是否漏填宽高
  const width = _.get(body, "width", null);
  const height = _.get(body, "height", null);

  if (width == 0 || height == 0) {
    return new Response("Width or height is 0.", {
      status: 500,
    });
  }
  //  发送请求
  const txt2imgResponse = await axios(`${sdUrl}/sdapi/v1/txt2img`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": process.env.NEXT_PUBLIC_Authorization ? process.env.NEXT_PUBLIC_Authorization : ''
    },
    data: JSON.stringify(body),
    timeout: 600000, // 设置超时时间为10分钟（600,000毫秒）
  });
  const txt2imgResponseJson = await txt2imgResponse.data;
  // console.log(txt2imgResponseJson);

  // 将base64格式的图片保存到项目的根目录中的outputs文件夹
  const fs = require('fs');
  const path = require('path');
  // 创建outputs文件夹
  const outputsDir = './outputs';
  if (!fs.existsSync(outputsDir)) {
    fs.mkdirSync(outputsDir);
  }
  // 获取当前日期
  const currentDate = new Date().toISOString().split('T')[0];
  // 拼接txt2img-images文件夹路径
  const txt2imgImagesDir = path.join(outputsDir, 'txt2img-images', currentDate);
  // 创建txt2img-images文件夹
  if (!fs.existsSync(txt2imgImagesDir)) {
    fs.mkdirSync(txt2imgImagesDir, { recursive: true });
  }
  // 获取image字段的base64图片数据
  const images = txt2imgResponseJson.images;
  // 获取seed值
  const seed = JSON.parse(txt2imgResponseJson.info).seed;
  // 生成文件名的计数器
  let counter = 0;
  // 循环保存每一张图片
  for (const base64Image of images) {
    // 生成文件名
    const fileName = `${counter.toString().padStart(5, '0')}-${seed}.png`;
    // 将base64图片数据解码为Buffer对象
    const imageBuffer = Buffer.from(base64Image, 'base64');
    // 拼接文件保存路径
    const filePath = path.join(txt2imgImagesDir, fileName);
    // 将图片数据写入文件
    fs.writeFile(filePath, imageBuffer, (err) => {
      if (err) {
        console.error(`保存图片 ${fileName} 失败:`, err);
      } else {
        console.log(`图片 ${fileName} 已保存至 ${filePath}`);
      }
    });
    counter++;
  }

  // console.log("txt2imgResponseJson in api", txt2imgResponseJson);
  //  返回错误
  if (txt2imgResponseJson.error) {
    return new Response(JSON.stringify(txt2imgResponseJson), {
      status: 500,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
      },
    });
  }
  //  成功返回
  return new Response(JSON.stringify(txt2imgResponseJson), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
