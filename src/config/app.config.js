 
import CONFIG_DEVELOPMENT from './app.config_development';
import CONFIG_PRODUCTION from './app.config_production';
let CONFIG = CONFIG_DEVELOPMENT; 
if (process.env.NODE_ENV === 'production') { // 生产环境
    CONFIG = {...CONFIG, CONFIG_PRODUCTION};
} 
export default CONFIG;

