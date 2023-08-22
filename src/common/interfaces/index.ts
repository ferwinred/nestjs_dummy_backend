import { OpenAPIObject } from "@nestjs/swagger"

export interface User {
    email: string
    role: string
}

export interface RequestWithUser extends Request{
    user: User
}

export interface ResponseBreedApi {
    length: string
    origin: string
    name: string
    image_link: string
    family_friendly: number,
    shedding: number
    general_health: number
    playfulness: number
    meowing: number
    children_friendly: number
    stranger_friendly: number
    intelligence: number
    grooming: number
    other_pets_friendly: number
    min_weight: number
    max_weight: number
    max_life_expectancy: number
    min_life_expectancy: number
}

export interface ExpressSwaggerCustomOptions {
  explorer?: boolean;
  swaggerOptions?: Record<string, any>;
  customCss?: string;
  customCssUrl?: string;
  customJs?: string;
  customfavIcon?: string;
  swaggerUrl?: string;
  customSiteTitle?: string;
  validatorUrl?: string;
  url?: string;
  urls?: Record<'url' | 'name', string>[];
  patchDocumentOnRequest?: <TRequest = any, TResponse = any> (req: TRequest, res: TResponse, document: OpenAPIObject) => OpenAPIObject;
}
