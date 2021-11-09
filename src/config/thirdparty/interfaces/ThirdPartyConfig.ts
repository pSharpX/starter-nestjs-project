interface ThirdPartyConfig {
  cloudinary: CloudinaryConfig;
}

interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  apiKey: string;
  apiSecret: string;
}
