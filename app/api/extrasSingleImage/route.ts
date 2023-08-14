import { ExtrasSingleImageInterface } from "../../../app/Types/ExtrasSingleImage";
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

    const body: ExtrasSingleImageInterface = args;

    const image = _.get(body, "image", null);
    if (!image || image.length == 0) {
        return new Response("No image provided.", {
            status: 500,
        });
    }

    const extrasSingleImageResponse = await axios(`${sdUrl}/sdapi/v1/extra-single-image`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": process.env.NEXT_PUBLIC_Authorization ? process.env.NEXT_PUBLIC_Authorization : ''
        },
        data: JSON.stringify(body),
        timeout: 600000, // 设置超时时间为10分钟（600,000毫秒）
    });

    const extrasSingleImageResponseJson = await extrasSingleImageResponse.data;

    if (extrasSingleImageResponseJson.error) {
        return new Response(JSON.stringify(extrasSingleImageResponseJson), {
            status: 500,
            headers: {
                "content-type": "application/json",
                "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
            },
        });
    }

    return new Response(JSON.stringify(extrasSingleImageResponseJson), {
        status: 200,
        headers: {
            "content-type": "application/json",
            "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
        },
    });
}
