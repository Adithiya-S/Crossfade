export const getCloudinaryUrl = (publicId) => {
    const cloudName = 'dizsc2lqr';
    // f_auto: auto format (webp/avif)
    // q_auto: auto quality
    const url = `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto/${publicId}`;
    console.log('Generatd CDN URL:', url);
    return url;
};
