export interface LoginDto {
    correctData: LoginDataDto;
    incorrectData: LoginDataDto;
}

export interface LoginDataDto {
    subId: string;
    xApiKey: string;
}
