import {Body, Controller, Inject, Post} from '@nestjs/common';
import {ProxyServicesDynamicModule} from "../../infrastructure/use_cases_proxy/proxy-services-dynamic.module";
import {UseCaseProxy} from "../../infrastructure/use_cases_proxy/use-case-proxy";
import {CreateCharacter} from "../../domain/character/usecases/create-character";
import {Character} from "../../domain/character/models/character";
import {CreateCharacterDto} from "../../domain/character/models/dto/create-character.dto";

@Controller('characters')
export class CharacterController {

    constructor(@Inject(ProxyServicesDynamicModule.CREATE_CHARACTER_DATA_PROXY_SERVICE) private readonly createCharacter: UseCaseProxy<CreateCharacter>) {}

    @Post()
    create(@Body() createCharacter: CreateCharacterDto): Promise<Character> {
        return this.createCharacter.getInstance().create(createCharacter);
    }
}