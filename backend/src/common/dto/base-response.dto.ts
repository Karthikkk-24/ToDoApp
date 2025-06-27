export class BaseResponseDto<T = any> {
    success: boolean;
    message: string;
    data?: T;
    errors?: string[];
    meta?: {
        timestamp: string;
        correlationId?: string;
        version: string;
    };

    constructor(
        success: boolean,
        message: string,
        data?: T,
        errors?: string[],
        correlationId?: string,
    ) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.errors = errors;
        this.meta = {
            timestamp: new Date().toISOString(),
            correlationId,
            version: '1.0.0',
        };
    }

    static success<T>(
        data: T,
        message: string = 'Operation successful',
        correlationId?: string,
    ): BaseResponseDto<T> {
        return new BaseResponseDto(true, message, data, undefined, correlationId);
    }

    static error(message: string, errors?: string[], correlationId?: string): BaseResponseDto {
        return new BaseResponseDto(false, message, undefined, errors, correlationId);
    }
}
