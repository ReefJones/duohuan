import { RembgInterface } from "../../../app/Types/rembg";
import { setOutputsImages } from "../../utils/setOutputsImages";
import { NextRequest } from "next/server";
import axios from "axios";
import * as _ from "lodash";

export async function POST(req: NextRequest) {
  const { sdUrl, args } = await req.json();

  if (sdUrl === null || sdUrl === undefined) {
    return new Response("No sdUrl provided.", {
      status: 500,
    });
  }

  const body: RembgInterface = args;

  const input_image = _.get(body, "input_image", null);
  if (!input_image || input_image.length == 0) {
    return new Response("No image provided.", {
      status: 500,
    });
  }
  const rembgResponse = await axios(`${sdUrl}/rembg`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": process.env.NEXT_PUBLIC_Authorization ? process.env.NEXT_PUBLIC_Authorization : ''
    },
    data: JSON.stringify(body),
    timeout: 3600000, // 1小时的毫秒数
  });

  const rembgResponseJson = await rembgResponse.data;
  console.log("rembgResponseJson", rembgResponseJson);

  // 保存图片
  if (rembgResponseJson.error) { // 返回错误
    return new Response(JSON.stringify(rembgResponseJson), {
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
      imageArry: [rembgResponseJson.image],
      // 获取seed值
      seedNum: "",
      // 文件夹名称
      folderName: 'rembg-images',
    });
  }

  if (rembgResponseJson.error) {
    return new Response(JSON.stringify(rembgResponseJson), {
      status: 500,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
      },
    });
  }

  return new Response(JSON.stringify(rembgResponseJson), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
