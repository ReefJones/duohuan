import { NextRequest, NextResponse } from "next/server"
import fs from 'fs';
import path from 'path';

export const GET = (req: NextRequest) =>{
    const filePathArr:any[] = [];
    
    // 定义函数来提取文件夹中的所有图片
    const extractImagesFromFolder = (folderPath:any) => {
        // 读取文件夹中的所有文件和子文件夹
        const files = fs.readdirSync(folderPath);

        // 遍历文件和文件夹
        for (const file of files) {
            // 构建文件/文件夹的完整路径
            const filePath = path.join(folderPath, file);

            // 检查文件的类型
            const fileType = fs.statSync(filePath).isDirectory() ? 'folder' : 'file';

            if (fileType === 'folder') {
                // 如果是文件夹，则递归调用该函数继续提取图片
                extractImagesFromFolder(filePath);
            } else {
                // 如果是文件，则检查文件扩展名是否为图片格式（可以根据实际需求进行调整）
                const imageExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
                const extension = path.extname(filePath).toLowerCase();

                if (imageExtensions.includes(extension)) {
                    // 如果是图片格式，则进行相应的处理，例如复制到其他位置、修改文件名等
                    // 在这里你可以根据你的需求来处理每个图片文件
                    filePathArr.push(convertFileToBase64(filePath));
                    // 进行你的处理操作
                }
            }
        }
    };

    function convertFileToBase64(filePath: string) {
        const fileData = fs.readFileSync(filePath); // 读取文件内容
        const base64Data = fileData.toString('base64'); // 将文件内容转换为Base64编码
        return base64Data;
    }

    // 调用函数来提取图片
    const fs = require('fs');
    const txt2imgImagesDir = './outputs/txt2img-images';
    // 确保目录存在
    if (!fs.existsSync(txt2imgImagesDir)) {
        fs.mkdirSync(txt2imgImagesDir, { recursive: true });
    }
    // 继续其他操作...
    extractImagesFromFolder(txt2imgImagesDir);

    //  成功返回
    return new Response(JSON.stringify(filePathArr), {
        status: 200,
        headers: {
            "content-type": "application/json",
            "cache-control": "public, s-maxage=1200, stale-while-revalidate=600",
        },
    });
}