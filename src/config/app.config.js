 
import CONFIG_DEVELOPMENT from './app.config_development';
import CONFIG_PRODUCTION from './app.config_production';
let CONFIG; 
if (process.env.NODE_ENV === 'production') {
    CONFIG = CONFIG_DEVELOPMENT;
} else {    
    CONFIG = CONFIG_PRODUCTION;     
}

export default CONFIG;

