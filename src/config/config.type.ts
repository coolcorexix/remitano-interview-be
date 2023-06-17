export type AuthConfig = {
    secret?: string;
    expires?: string;
};

export type AppConfig = {
    firebase?: {
        rtdb_url: string;
    };
    googleapis?: {
        api_key: string;
    };
};
