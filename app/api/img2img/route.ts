import { Img2imgInterface } from "../../../app/Types/img2img";
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

  const body: Img2imgInterface = args;

  const init_images = _.get(body, "init_images", null);
  if (!init_images || init_images.length == 0) {
    return new Response("No image provided.", {
      status: 500,
    });
  }

  const width = _.get(body, "width", null);
  const height = _.get(body, "height", null);

  if (width == 0 || height == 0) {
    return new Response("Width or height is 0.", {
      status: 500,
    });
  }

  const img2imgResponse = await axios(`${sdUrl}/sdapi/v1/img2img`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": process.env.NEXT_PUBLIC_Authorization? process.env.NEXT_PUBLIC_Authorization : ''
    },
    data: JSON.stringify(body),
    timeout: 120000,
  });

  const img2imgResponseJson = await img2imgResponse.data;

  // console.log("img2imgResponseJson in api", img2imgResponseJson);
  if (img2imgResponseJson.error) {
    return new Response(JSON.stringify(img2imgResponseJson), {
      status: 500,
      headers: {
        "content-type": "application/json",
        "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
      },
    });
  }

  return new Response(JSON.stringify(img2imgResponseJson), {
    status: 200,
    headers: {
      "content-type": "application/json",
      "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
    },
  });
}
