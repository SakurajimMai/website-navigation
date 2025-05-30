/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // 如果需要支持国际化的图像优化，可以添加以下配置
  images: {
    domains: [
      "example.com", // 根据需要替换为实际的图片域名
    ],
  },
};

export default nextConfig;
