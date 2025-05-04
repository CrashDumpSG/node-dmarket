import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { ApiError, ApiOptions, ApiResponse } from './interfaces';
import nacl from 'tweetnacl';

export class Http {
    private client: AxiosInstance;
    private publicKey: string;
    private secretKey: string;

    constructor(
        baseURL: string,
        publicKey: string,
        secretKey: string,
        timeout: number
    ) {
        this.publicKey = publicKey;
        this.secretKey = secretKey;
        this.client = axios.create({
            baseURL,
            timeout,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        });

        this.client.interceptors.request.use(this.authInterceptor);

        this.client.interceptors.response.use(
            (response) => response,
            this.handleError
        );
    }

    private generateSignature(method: string, path: string, body: any, timestamp: string): string {
        const message = `${method}${path}${body}${timestamp}`;
        console.log("message: ", message);
        const messageBuffer = Buffer.from(message, "utf8");
        const signature = nacl.sign.detached(messageBuffer, Buffer.from(this.secretKey, "hex"));
        return Buffer.from(signature).toString("hex");
    }

    private authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        const timestamp = Math.floor(Date.now() / 1000).toString();
        const path = config.url || '';
        const method = config.method?.toUpperCase() || 'GET';

        let body = JSON.stringify(config.data);
        if (method === 'GET') {
            let params = config.params || {};
            const query = Object.entries(params)
                .filter(([, value]) => value != null)
                .map(([key, value]) => {
                    const stringValue = value == null ? '' : value.toString();
                    return `${encodeURIComponent(key).replace(/%20/g, '+')}=${encodeURIComponent(stringValue).replace(/%20/g, '+')}`;
                })
                .join('&');
            body = query ? `?${query}` : '';
        }

        const signature = this.generateSignature(method, path, body, timestamp);

        if (config.headers) {
            config.headers['X-Api-Key'] = this.publicKey;
            config.headers['X-Request-Sign'] = "dmar ed25519 " + signature;
            config.headers['X-Sign-Date'] = timestamp;
        }

        return config;
    };

    private transformResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
        return {
            data: response.data,
            status: response.status,
            statusText: response.statusText,
            headers: response.headers as Record<string, string>,
        };
    };

    private handleError = (error: AxiosError): Promise<never> => {
        const apiError: ApiError = {
            code: error.code || 'UNKNOWN_ERROR',
            message: error.message || 'Une erreur inconnue est survenue',
            status: error.response?.status,
            data: error.response?.data,
        };
        return Promise.reject(apiError);
    };

    public async get<T>(url: string, options?: ApiOptions): Promise<ApiResponse<T>> {
        const config: AxiosRequestConfig = {
            params: options?.params,
            headers: options?.headers,
            timeout: options?.timeout || this.client.defaults.timeout,
        };

        const response = await this.client.get<T>(url, config);
        return this.transformResponse(response);
    }

    public async post<T>(url: string, data?: any, options?: ApiOptions): Promise<ApiResponse<T>> {
        const config: AxiosRequestConfig = {
            params: options?.params,
            headers: options?.headers,
            timeout: options?.timeout || this.client.defaults.timeout,
        };

        const response = await this.client.post<T>(url, data, config);
        return this.transformResponse(response);
    }

    public async put<T>(url: string, data?: any, options?: ApiOptions): Promise<ApiResponse<T>> {
        const config: AxiosRequestConfig = {
            params: options?.params,
            headers: options?.headers,
            timeout: options?.timeout || this.client.defaults.timeout,
        };

        const response = await this.client.put<T>(url, data, config);
        return this.transformResponse(response);
    }

    public async patch<T>(url: string, data?: any, options?: ApiOptions): Promise<ApiResponse<T>> {
        const config: AxiosRequestConfig = {
            params: options?.params,
            headers: options?.headers,
            timeout: options?.timeout || this.client.defaults.timeout,
        };

        const response = await this.client.patch<T>(url, data, config);
        return this.transformResponse(response);
    }

    public async delete<T>(url: string, options?: ApiOptions): Promise<ApiResponse<T>> {
        const config: AxiosRequestConfig = {
            params: options?.params,
            headers: options?.headers,
            data: options?.data,
            timeout: options?.timeout || this.client.defaults.timeout,
        };

        const response = await this.client.delete<T>(url, config);
        return this.transformResponse(response);
    }
} 