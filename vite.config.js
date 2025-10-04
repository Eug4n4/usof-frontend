import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// https://vite.dev/config/


function getConfig(configEnv) {
    const envData = loadEnv(configEnv.mode, process.cwd(), 'VITE')
    return {
        plugins: [react()],
        server: { port: parseInt(envData.VITE_REACT_PORT) }
    }
}

export default defineConfig(getConfig)
