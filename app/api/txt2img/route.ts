import { Txt2imgInterface } from "../../../app/Types/txt2img";
import { setOutputsImages } from "../../utils/setOutputsImages";
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
    timeout: 3600000, // 1小时的毫秒数
  });
  const txt2imgResponseJson = await txt2imgResponse.data;
  console.log("txt2imgResponseJson", txt2imgResponseJson);
  
  // 保存图片
  if (txt2imgResponseJson.error) { //  返回错误
    return new Response(JSON.stringify(txt2imgResponseJson), {
      status: 500,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
      },
    });
  } else { // 无返回错误
    // 将base64格式的图片保存到项目的根目录中的outputs文件夹
    setOutputsImages({
      // 获取image字段的base64图片数据
      imageArry: txt2imgResponseJson.images,
      // 获取seed值
      seedNum: JSON.parse(txt2imgResponseJson.info).seed,
      // 文件夹名称
      folderName: 'txt2img-images',
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
