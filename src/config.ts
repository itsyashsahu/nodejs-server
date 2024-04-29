import { config as env_config } from 'dotenv';

/* 
Environment values should be enum
- production
- development or empty/undefined
- testing
- staging
*/
const envFile = `.env${'.'+process.env.NODE_ENV || ''}`;
env_config({ path: envFile });


const config = {
  PORT: process.env.PORT
};

export default config;
