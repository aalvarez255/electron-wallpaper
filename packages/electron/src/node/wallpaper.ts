import wallpaper from 'wallpaper'

export default new class Wallpaper {
    async set(imagePath: string): Promise<void> {
        await wallpaper.set(imagePath)
    }
}