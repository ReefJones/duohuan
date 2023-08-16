import fs from 'fs';
import path from 'path';

export const setOutputsImages = ({ imageArry, seedNum }: { imageArry: any[]; seedNum: any }) => {

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
    const images = imageArry;
    // 获取seed值
    const seed = seedNum;
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
        fs.writeFile(filePath, imageBuffer, (err: any) => {
            if (err) {
            console.error(`保存图片 ${fileName} 失败:`, err);
            } else {
            console.log(`图片 ${fileName} 已保存至 ${filePath}`);
            }
        });
        counter++;
    }
};
