const path = require('path');
const fs = require('fs');

class ScreenshotUtil {
    constructor(page) {
        this.page = page;
        this.screenshotDir = path.join(process.cwd(), 'test-results', 'screenshots');
        
        // Create screenshots directory if it doesn't exist
        if (!fs.existsSync(this.screenshotDir)) {
            fs.mkdirSync(this.screenshotDir, { recursive: true });
        }
    }

    async takeScreenshot(name) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const screenshotPath = path.join(this.screenshotDir, `${name}_${timestamp}.png`);
        
        try {
            await this.page.screenshot({ 
                path: screenshotPath,
                fullPage: true 
            });
            console.log(`Screenshot saved: ${screenshotPath}`);
            return screenshotPath;
        } catch (error) {
            console.error('Failed to take screenshot:', error);
            throw error;
        }
    }
}

module.exports = ScreenshotUtil; 