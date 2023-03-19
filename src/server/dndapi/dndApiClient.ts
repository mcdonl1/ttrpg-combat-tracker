/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { FetchHttpRequest } from './core/FetchHttpRequest';

import { CharacterDataService } from './services/CharacterDataService';
import { ClassService } from './services/ClassService';
import { ClassLevelsService } from './services/ClassLevelsService';
import { ClassResourceListsService } from './services/ClassResourceListsService';
import { CommonService } from './services/CommonService';
import { EquipmentService } from './services/EquipmentService';
import { FeatsService } from './services/FeatsService';
import { FeaturesService } from './services/FeaturesService';
import { GameMechanicsService } from './services/GameMechanicsService';
import { MonstersService } from './services/MonstersService';
import { RacesService } from './services/RacesService';
import { RulesService } from './services/RulesService';
import { SpellsService } from './services/SpellsService';
import { SubclassesService } from './services/SubclassesService';
import { SubracesService } from './services/SubracesService';
import { TraitsService } from './services/TraitsService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class dndApiClient {

    public readonly characterData: CharacterDataService;
    public readonly class: ClassService;
    public readonly classLevels: ClassLevelsService;
    public readonly classResourceLists: ClassResourceListsService;
    public readonly common: CommonService;
    public readonly equipment: EquipmentService;
    public readonly feats: FeatsService;
    public readonly features: FeaturesService;
    public readonly gameMechanics: GameMechanicsService;
    public readonly monsters: MonstersService;
    public readonly races: RacesService;
    public readonly rules: RulesService;
    public readonly spells: SpellsService;
    public readonly subclasses: SubclassesService;
    public readonly subraces: SubracesService;
    public readonly traits: TraitsService;

    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'https://www.dnd5eapi.co',
            VERSION: config?.VERSION ?? '0.1',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });

        this.characterData = new CharacterDataService(this.request);
        this.class = new ClassService(this.request);
        this.classLevels = new ClassLevelsService(this.request);
        this.classResourceLists = new ClassResourceListsService(this.request);
        this.common = new CommonService(this.request);
        this.equipment = new EquipmentService(this.request);
        this.feats = new FeatsService(this.request);
        this.features = new FeaturesService(this.request);
        this.gameMechanics = new GameMechanicsService(this.request);
        this.monsters = new MonstersService(this.request);
        this.races = new RacesService(this.request);
        this.rules = new RulesService(this.request);
        this.spells = new SpellsService(this.request);
        this.subclasses = new SubclassesService(this.request);
        this.subraces = new SubracesService(this.request);
        this.traits = new TraitsService(this.request);
    }
}

