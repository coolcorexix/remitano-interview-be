import { registerAs } from '@nestjs/config';
import { AppConfig } from './config.type';
import { IsString, IsUrl } from 'class-validator';
import validateConfig from 'src/utils/validate-config';

class EnvironmentVariablesValidator {
    @IsUrl()
    FIREBASE_RTDB_URL: string;

    @IsString()
    GOOGLEAPIS_API_KEY: string;
}

export default registerAs<AppConfig>('app', () => {
    validateConfig(process.env, EnvironmentVariablesValidator);

    return {
        firebase: {
            rtdb_url: process.env.FIREBASE_RTDB_URL,
        },
        googleapis: {
            api_key: process.env.GOOGLEAPIS_API_KEY,
        },
    };
});
