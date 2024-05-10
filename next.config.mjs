import { config } from 'process';

/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config)=>{
        config.externals.push({
            "utf-8-validate":"utf-8-validate",
            bufferutil:"commonjs bufferutil"
        })
        return config;
    },
    images:{
        domains:["utfs.io"]
        
    }
};

export default nextConfig;
