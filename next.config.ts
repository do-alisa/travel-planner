import type { NextConfig } from "next";
import { hostname } from "os";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{
      hostname: "3b8u3lie6d.ufs.sh"
    }]
  }
};

export default nextConfig;
