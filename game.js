// 职业配置
const jobConfigs = {
    farmer: {
        name: "农民",
        building: "farm",
        resource: "catnip",
        baseProduction: 1,
        traitBonus: { diligent: 0.1 }
    },
    lumberjack: {
        name: "伐木工",
        building: "lumbermill",
        resource: "wood",
        baseProduction: 1,
        traitBonus: { strong: 0.1 }
    },
    miner: {
        name: "矿工",
        building: "mine",
        resource: ["stone", "coal", "steel"],
        baseProduction: 1,
        traitBonus: { tough: 0.1 }
    },
    scientist: {
        name: "科学家",
        building: "library",
        resource: "knowledge",
        baseProduction: 0.5,
        traitBonus: { wise: 0.2 }
    },
    hunter: {
        name: "猎人",
        building: "huntingLodge",
        resource: "fur",
        baseProduction: 0.3,
        traitBonus: { agile: 0.15 }
    },
    engineer: {
        name: "工程师",
        building: "factory",
        resource: "tools",
        baseProduction: 0.2,
        traitBonus: { creative: 0.15 }
    },
    priest: {
        name: "牧师",
        building: "temple",
        resource: "faith",
        baseProduction: 0.2,
        traitBonus: { pious: 0.2 }
    }
};

// 特质配置
const traitConfigs = {
    diligent: { name: "勤劳", description: "提升农民产出 10%", effect: 0.1 },
    strong: { name: "体力", description: "提升伐木工产出 10%", effect: 0.1 },
    tough: { name: "坚韧", description: "提升矿工产出 10%", effect: 0.1 },
    wise: { name: "智慧", description: "提升科学家产出 20%", effect: 0.2 },
    agile: { name: "敏捷", description: "提升猎人产出 15%", effect: 0.15 },
    creative: { name: "创造", description: "提升工程师产出 15%", effect: 0.15 },
    pious: { name: "虔诚", description: "提升牧师产出 20%", effect: 0.2 }
};

// 等级配置
const levelConfigs = {
    apprentice: { name: "学徒", multiplier: 1 },
    skilled: { name: "熟练", multiplier: 1.5 },
    expert: { name: "专家", multiplier: 2 },
    master: { name: "大师", multiplier: 3 }
};

// 游戏状态
let gameState = {
    resources: {
        catnip: 50,
        wood: 20,
        stone: 10,
        coal: 0,
        steel: 0,
        uranium: 0,
        knowledge: 0,
        culture: 0,
        faith: 0,
        fur: 0,
        tools: 0
    },
    
    resourceCaps: {
        catnip: 100,
        wood: 100,
        stone: 100,
        coal: 100,
        steel: 100,
        uranium: 50,
        knowledge: 50,
        culture: 50,
        faith: 50,
        fur: 50,
        tools: 50
    },
    
    buildings: {
        farm: 0,
        lumbermill: 0,
        mine: 0,
        library: 0,
        tent: 1,
        warehouse: 0,
        coalStove: 0,
        university: 0,
        theater: 0,
        temple: 0,
        aqueduct: 0,
        huntingLodge: 0,
        factory: 0,
        house: 0,
        barn: 0,
        workshop: 0
    },
    
    kittens: {
        count: 1,
        max: 5,
        happiness: 80,
        trained: 0,
        jobs: {
            farmer: 0,
            lumberjack: 0,
            miner: 0,
            scientist: 0,
            hunter: 0,
            engineer: 0,
            priest: 0,
            unemployed: 1
        },
        traits: [],
        levels: []
    },
    
    techs: {
        agriculture: false,
        mining: false,
        engineering: false,
        dimension: false,
        steelTech: false,
        advancedTech: false,
        animalHusbandry: false,
        horticulture: false,
        genetics: false,
        geology: false,
        metallurgy: false,
        materials: false,
        mechanics: false,
        automation: false,
        robotics: false,
        mathematics: false,
        physics: false,
        chemistry: false,
        astronomy: false,
        spaceTravel: false,
        interstellar: false,
        theology: false,
        philosophy: false,
        psychology: false
    },
    
    prestige: {
        leadership: 0,
        karma: 0
    },
    
    cycle: 1,
    time: 0,
    
    season: 0,
    seasonTime: 0,
    
    resourceRates: {
        catnip: 0.5,
        wood: 0.2,
        stone: 0,
        coal: 0,
        steel: 0,
        uranium: 0,
        knowledge: 0,
        culture: 0,
        faith: 0,
        fur: 0,
        tools: 0
    }
};

// 建筑配置
const buildingConfigs = {
    farm: {
        name: "农田",
        baseCost: { catnip: 10, wood: 5 },
        multiplier: 1.2,
        effect: { catnip: 1 },
        maintenance: {}
    },
    lumbermill: {
        name: "伐木场",
        baseCost: { catnip: 15, wood: 10 },
        multiplier: 1.25,
        effect: { wood: 1 },
        maintenance: {}
    },
    mine: {
        name: "矿井",
        baseCost: { catnip: 20, wood: 15, stone: 5 },
        multiplier: 1.3,
        effect: { stone: 1, coal: 0, steel: 0, uranium: 0 },
        maintenance: {}
    },
    library: {
        name: "图书馆",
        baseCost: { catnip: 30, wood: 20, stone: 10 },
        multiplier: 1.35,
        effect: { knowledge: 0.5 },
        maintenance: {}
    },
    tent: {
        name: "帐篷",
        baseCost: { wood: 10 },
        multiplier: 1.4,
        effect: { kittens: 2 },
        maintenance: {}
    },
    warehouse: {
        name: "仓库",
        baseCost: { wood: 20, stone: 10 },
        multiplier: 1.45,
        effect: { caps: 50 },
        maintenance: {}
    },
    coalStove: {
        name: "煤炉",
        baseCost: { wood: 10, stone: 5 },
        multiplier: 1.3,
        effect: { coal: 0.5 },
        maintenance: {}
    },
    university: {
        name: "大学",
        baseCost: { wood: 100, stone: 50, steel: 20 },
        multiplier: 1.4,
        effect: { knowledgeMultiplier: 2 },
        maintenance: { coal: 0.5 }
    },
    theater: {
        name: "剧院",
        baseCost: { wood: 80, stone: 30 },
        multiplier: 1.35,
        effect: { culture: 0.3 },
        maintenance: {}
    },
    temple: {
        name: "寺庙",
        baseCost: { wood: 100, stone: 80 },
        multiplier: 1.4,
        effect: { faith: 0.2 },
        maintenance: {}
    },
    aqueduct: {
        name: "水渠",
        baseCost: { stone: 50, wood: 30 },
        multiplier: 1.3,
        effect: { catnipBonus: 0.25 },
        maintenance: {}
    },
    huntingLodge: {
        name: "狩猎小屋",
        baseCost: { wood: 40, stone: 10 },
        multiplier: 1.25,
        effect: { fur: 0.3 },
        maintenance: {}
    },
    factory: {
        name: "工厂",
        baseCost: { steel: 30, wood: 50, coal: 20 },
        multiplier: 1.45,
        effect: { tools: 0.2 },
        maintenance: { coal: 1 }
    },
    house: {
        name: "小屋",
        baseCost: { wood: 30, stone: 15 },
        multiplier: 1.35,
        effect: { kittens: 4, happinessBonus: 5 },
        maintenance: {}
    },
    barn: {
        name: "谷仓",
        baseCost: { wood: 25, stone: 10 },
        multiplier: 1.3,
        effect: { catnipCaps: 100 },
        maintenance: {}
    },
    workshop: {
        name: "工坊",
        baseCost: { wood: 40, stone: 20, steel: 5 },
        multiplier: 1.35,
        effect: { toolsMultiplier: 1.5 },
        maintenance: {}
    }
};

// 科技配置
const techConfigs = {
    agriculture: {
        name: "农业科技",
        cost: { knowledge: 10 },
        effect: () => {
            buildingConfigs.farm.effect.catnip *= 1.2;
            updateResourceRates();
        }
    },
    mining: {
        name: "矿业科技",
        cost: { knowledge: 15 },
        effect: () => {
            gameState.resourceRates.stone = 0.1;
            updateResourceRates();
        }
    },
    engineering: {
        name: "工程科技",
        cost: { knowledge: 20, stone: 5 },
        effect: () => {
            Object.values(buildingConfigs).forEach(config => {
                config.multiplier *= 0.9;
            });
        }
    },
    steelTech: {
        name: "钢材科技",
        cost: { knowledge: 30, stone: 20 },
        effect: () => {
            buildingConfigs.mine.effect.coal = 0.5;
            buildingConfigs.mine.effect.steel = 0.3;
            updateResourceRates();
        }
    },
    advancedTech: {
        name: "高级科技",
        cost: { knowledge: 150, steel: 50, coal: 30 },
        effect: () => {
            buildingConfigs.mine.effect.uranium = 0.1;
            updateResourceRates();
        }
    },
    dimension: {
        name: "次元超越",
        cost: { knowledge: 100, culture: 50, faith: 50 },
        effect: () => {
            document.getElementById('resetBtn').disabled = false;
        }
    },
    animalHusbandry: {
        name: "畜牧业",
        cost: { knowledge: 25, catnip: 100 },
        effect: () => {
            buildingConfigs.farm.effect.catnip *= 1.3;
            updateResourceRates();
        }
    },
    horticulture: {
        name: "园艺学",
        cost: { knowledge: 40, wood: 50 },
        effect: () => {
            buildingConfigs.farm.effect.catnip *= 1.4;
            updateResourceRates();
        }
    },
    genetics: {
        name: "基因工程",
        cost: { knowledge: 200, steel: 30, faith: 20 },
        effect: () => {
            buildingConfigs.farm.effect.catnip *= 1.5;
            updateResourceRates();
        }
    },
    geology: {
        name: "地质学",
        cost: { knowledge: 50, stone: 100 },
        effect: () => {
            buildingConfigs.mine.effect.stone *= 1.5;
            buildingConfigs.mine.effect.coal *= 1.5;
            updateResourceRates();
        }
    },
    metallurgy: {
        name: "冶金学",
        cost: { knowledge: 80, coal: 50, stone: 50 },
        effect: () => {
            buildingConfigs.mine.effect.steel *= 2;
            updateResourceRates();
        }
    },
    materials: {
        name: "材料科学",
        cost: { knowledge: 200, steel: 100, coal: 100 },
        effect: () => {
            buildingConfigs.mine.effect.steel *= 1.5;
            buildingConfigs.mine.effect.uranium *= 1.5;
            updateResourceRates();
        }
    },
    mechanics: {
        name: "机械学",
        cost: { knowledge: 60, steel: 20, wood: 100 },
        effect: () => {
            gameState.resourceRates.tools += 0.1;
            updateResourceRates();
        }
    },
    automation: {
        name: "自动化",
        cost: { knowledge: 150, steel: 80, coal: 50 },
        effect: () => {
            gameState.resourceRates.tools += 0.3;
            updateResourceRates();
        }
    },
    robotics: {
        name: "机器人技术",
        cost: { knowledge: 300, steel: 150, uranium: 20 },
        effect: () => {
            gameState.resourceRates.tools += 0.5;
            updateResourceRates();
        }
    },
    mathematics: {
        name: "数学",
        cost: { knowledge: 30 },
        effect: () => {
            gameState.resourceRates.knowledge *= 1.2;
            updateResourceRates();
        }
    },
    physics: {
        name: "物理",
        cost: { knowledge: 80, stone: 30 },
        effect: () => {
            gameState.resourceRates.knowledge *= 1.3;
            updateResourceRates();
        }
    },
    chemistry: {
        name: "化学",
        cost: { knowledge: 100, stone: 50, coal: 30 },
        effect: () => {
            gameState.resourceRates.knowledge *= 1.4;
            updateResourceRates();
        }
    },
    astronomy: {
        name: "天文学",
        cost: { knowledge: 150, steel: 50, wood: 100 },
        effect: () => {
            gameState.resourceRates.knowledge *= 1.5;
            updateResourceRates();
        }
    },
    spaceTravel: {
        name: "航天技术",
        cost: { knowledge: 400, steel: 200, uranium: 50 },
        effect: () => {
            gameState.resourceRates.knowledge *= 1.5;
            updateResourceRates();
        }
    },
    interstellar: {
        name: "星际航行",
        cost: { knowledge: 1000, steel: 500, uranium: 100 },
        effect: () => {
            gameState.resourceRates.knowledge *= 2;
            updateResourceRates();
        }
    },
    theology: {
        name: "神学",
        cost: { knowledge: 40, faith: 20 },
        effect: () => {
            gameState.resourceRates.faith *= 1.5;
            updateResourceRates();
        }
    },
    philosophy: {
        name: "哲学",
        cost: { knowledge: 80, culture: 30, faith: 20 },
        effect: () => {
            gameState.resourceRates.faith *= 1.5;
            gameState.resourceRates.culture *= 1.5;
            updateResourceRates();
        }
    },
    psychology: {
        name: "心理学",
        cost: { knowledge: 150, culture: 50, faith: 30 },
        effect: () => {
            gameState.kittens.happiness = Math.min(100, gameState.kittens.happiness + 10);
            updateResourceRates();
        }
    }
};

// DOM元素缓存
const elements = {
    catnip: document.getElementById('catnip'),
    catnipMax: document.getElementById('catnipMax'),
    catnipRate: document.getElementById('catnipRate'),
    wood: document.getElementById('wood'),
    woodMax: document.getElementById('woodMax'),
    woodRate: document.getElementById('woodRate'),
    stone: document.getElementById('stone'),
    stoneMax: document.getElementById('stoneMax'),
    stoneRate: document.getElementById('stoneRate'),
    coal: document.getElementById('coal'),
    coalMax: document.getElementById('coalMax'),
    coalRate: document.getElementById('coalRate'),
    steel: document.getElementById('steel'),
    steelMax: document.getElementById('steelMax'),
    steelRate: document.getElementById('steelRate'),
    uranium: document.getElementById('uranium'),
    uraniumMax: document.getElementById('uraniumMax'),
    uraniumRate: document.getElementById('uraniumRate'),
    knowledge: document.getElementById('knowledge'),
    knowledgeMax: document.getElementById('knowledgeMax'),
    knowledgeRate: document.getElementById('knowledgeRate'),
    culture: document.getElementById('culture'),
    cultureMax: document.getElementById('cultureMax'),
    cultureRate: document.getElementById('cultureRate'),
    faith: document.getElementById('faith'),
    faithMax: document.getElementById('faithMax'),
    faithRate: document.getElementById('faithRate'),
    kittenCount: document.getElementById('kittenCount'),
    kittenMax: document.getElementById('kittenMax'),
    happiness: document.getElementById('happiness'),
    farmCount: document.getElementById('farmCount'),
    lumbermillCount: document.getElementById('lumbermillCount'),
    mineCount: document.getElementById('mineCount'),
    libraryCount: document.getElementById('libraryCount'),
    tentCount: document.getElementById('tentCount'),
    warehouseCount: document.getElementById('warehouseCount'),
    coalStoveCount: document.getElementById('coalStoveCount'),
    leadership: document.getElementById('leadership'),
    karma: document.getElementById('karma'),
    cycle: document.getElementById('cycle'),
    time: document.getElementById('time'),
    expectedLeadership: document.getElementById('expectedLeadership'),
    expectedKarma: document.getElementById('expectedKarma'),
    resetBtn: document.getElementById('resetBtn')
};

function updateResourceDisplay() {
    Object.keys(gameState.resources).forEach(resource => {
        const value = Math.floor(gameState.resources[resource]);
        const cap = gameState.resourceCaps[resource];
        const rate = gameState.resourceRates[resource].toFixed(1);
        
        if (elements[resource]) {
            elements[resource].textContent = value;
        }
        if (elements[resource + 'Max']) {
            elements[resource + 'Max'].textContent = cap;
        }
        if (elements[resource + 'Rate']) {
            elements[resource + 'Rate'].textContent = (rate > 0 ? '+' : '') + rate + '/s';
        }
    });
}

function updateKittenDisplay() {
    elements.kittenCount.textContent = gameState.kittens.count;
    elements.kittenMax.textContent = gameState.kittens.max;
    elements.happiness.textContent = gameState.kittens.happiness;
    
    // 更新职业分配显示
    const jobNames = {
        farmer: "农民",
        lumberjack: "伐木工", 
        miner: "矿工",
        scientist: "科学家",
        hunter: "猎人",
        engineer: "工程师",
        priest: "牧师",
        unemployed: "失业"
    };
    
    Object.keys(gameState.kittens.jobs).forEach(job => {
        const elemId = `job${job.charAt(0).toUpperCase() + job.slice(1)}Count`;
        if (elements[elemId]) {
            elements[elemId].textContent = gameState.kittens.jobs[job];
        }
    });
}

function updateBuildingDisplay() {
    Object.keys(gameState.buildings).forEach(building => {
        if (elements[building + 'Count']) {
            elements[building + 'Count'].textContent = gameState.buildings[building];
        }
    });
}

function updatePrestigeDisplay() {
    elements.leadership.textContent = gameState.prestige.leadership;
    elements.karma.textContent = gameState.prestige.karma;
}

function updateGameProgress() {
    elements.cycle.textContent = gameState.cycle;
    elements.time.textContent = gameState.time;
}

function updateResetExpectation() {
    const expectedLeadership = Math.floor(
        gameState.kittens.count * 0.1 +
        Object.values(gameState.buildings).reduce((sum, count) => sum + count, 0) * 0.5 +
        Object.values(gameState.techs).filter(tech => tech).length * 5
    );
    
    const expectedKarma = Math.floor(gameState.kittens.happiness * 0.1);
    
    elements.expectedLeadership.textContent = expectedLeadership;
    elements.expectedKarma.textContent = expectedKarma;
}

function calculateBuildingCost(building) {
    const config = buildingConfigs[building];
    const count = gameState.buildings[building];
    const cost = {};
    
    Object.keys(config.baseCost).forEach(resource => {
        cost[resource] = Math.floor(config.baseCost[resource] * Math.pow(config.multiplier, count));
    });
    
    return cost;
}

function hasEnoughResources(cost) {
    return Object.keys(cost).every(resource => {
        return gameState.resources[resource] >= cost[resource];
    });
}

function spendResources(cost) {
    Object.keys(cost).forEach(resource => {
        gameState.resources[resource] -= cost[resource];
    });
}

function buildBuilding(building) {
    const cost = calculateBuildingCost(building);
    
    if (!hasEnoughResources(cost)) {
        alert('资源不足！');
        return false;
    }
    
    spendResources(cost);
    gameState.buildings[building]++;
    
    applyBuildingEffects(building);
    
    updateResourceDisplay();
    updateBuildingDisplay();
    updateResetExpectation();
    
    return true;
}

function applyBuildingEffects(building) {
    const config = buildingConfigs[building];
    
    if (config.effect.catnip) {
        gameState.resourceRates.catnip += config.effect.catnip;
    }
    
    if (config.effect.wood) {
        gameState.resourceRates.wood += config.effect.wood;
    }
    
    if (config.effect.stone) {
        gameState.resourceRates.stone += config.effect.stone;
    }
    
    if (config.effect.coal) {
        gameState.resourceRates.coal += config.effect.coal;
    }
    
    if (config.effect.steel) {
        gameState.resourceRates.steel += config.effect.steel;
    }
    
    if (config.effect.uranium) {
        gameState.resourceRates.uranium += config.effect.uranium;
    }
    
    if (config.effect.knowledge) {
        gameState.resourceRates.knowledge += config.effect.knowledge;
    }
    
    if (config.effect.culture) {
        gameState.resourceRates.culture += config.effect.culture;
    }
    
    if (config.effect.faith) {
        gameState.resourceRates.faith += config.effect.faith;
    }
    
    if (config.effect.fur) {
        gameState.resourceRates.fur += config.effect.fur;
    }
    
    if (config.effect.tools) {
        gameState.resourceRates.tools += config.effect.tools;
    }
    
    if (config.effect.kittens) {
        gameState.kittens.max += config.effect.kittens;
    }
    
    if (config.effect.caps) {
        Object.keys(gameState.resourceCaps).forEach(resource => {
            gameState.resourceCaps[resource] += config.effect.caps;
        });
    }
    
    if (config.effect.catnipCaps) {
        gameState.resourceCaps.catnip += config.effect.catnipCaps;
    }
    
    if (config.effect.catnipBonus) {
        // 季节基础上再加成
        const seasonBonus = gameState.season === 3 ? 0.75 : 1;
        gameState.resourceRates.catnip *= (1 + config.effect.catnipBonus) / seasonBonus;
    }
    
    if (config.effect.knowledgeMultiplier) {
        gameState.resourceRates.knowledge *= config.effect.knowledgeMultiplier;
    }
    
    if (config.effect.toolsMultiplier) {
        gameState.resourceRates.tools *= config.effect.toolsMultiplier;
    }
    
    if (config.effect.happinessBonus) {
        gameState.kittens.happiness = Math.min(100, gameState.kittens.happiness + config.effect.happinessBonus);
    }
}

function updateResourceRates() {
    const seasonBonus = gameState.season === 3 ? 0.75 : 1;
    
    gameState.resourceRates = {
        catnip: (0.5 + (gameState.buildings.farm * buildingConfigs.farm.effect.catnip)) * seasonBonus,
        wood: 0.2 + (gameState.buildings.lumbermill * buildingConfigs.lumbermill.effect.wood),
        stone: gameState.techs.mining ? (0.1 + gameState.buildings.mine * buildingConfigs.mine.effect.stone) : 0,
        coal: 0,
        steel: 0,
        uranium: 0,
        knowledge: gameState.buildings.library * buildingConfigs.library.effect.knowledge,
        culture: gameState.buildings.theater ? (gameState.buildings.theater * buildingConfigs.theater.effect.culture) : 0,
        faith: gameState.buildings.temple ? (gameState.buildings.temple * buildingConfigs.temple.effect.faith) : 0,
        fur: gameState.buildings.huntingLodge ? (gameState.buildings.huntingLodge * buildingConfigs.huntingLodge.effect.fur) : 0,
        tools: gameState.buildings.factory ? (gameState.buildings.factory * buildingConfigs.factory.effect.tools) : 0
    };
    
    // 大学加成
    if (gameState.buildings.university > 0) {
        gameState.resourceRates.knowledge *= buildingConfigs.university.effect.knowledgeMultiplier;
    }
    
    // 水渠加成
    if (gameState.buildings.aqueduct > 0) {
        gameState.resourceRates.catnip *= (1 + buildingConfigs.aqueduct.effect.catnipBonus);
    }
    
    // 工坊加成
    if (gameState.buildings.workshop > 0) {
        gameState.resourceRates.tools *= buildingConfigs.workshop.effect.toolsMultiplier;
    }
    
    // 矿井资源产量
    if (gameState.techs.mining) {
        if (gameState.techs.steelTech) {
            gameState.resourceRates.coal += gameState.buildings.mine * buildingConfigs.mine.effect.coal;
            gameState.resourceRates.steel += gameState.buildings.mine * buildingConfigs.mine.effect.steel;
        }
        if (gameState.techs.advancedTech) {
            gameState.resourceRates.uranium += gameState.buildings.mine * buildingConfigs.mine.effect.uranium;
        }
    }
    
    // 煤炉生产煤炭
    gameState.resourceRates.coal += gameState.buildings.coalStove * buildingConfigs.coalStove.effect.coal;
    
    // 领导力加成
    const leadershipBonus = 1 + (gameState.prestige.leadership * 0.05);
    Object.keys(gameState.resourceRates).forEach(resource => {
        gameState.resourceRates[resource] *= leadershipBonus;
    });
    
    // 幸福度影响
    const happinessBonus = 0.5 + (gameState.kittens.happiness / 100);
    Object.keys(gameState.resourceRates).forEach(resource => {
        gameState.resourceRates[resource] *= happinessBonus;
    });
    
    updateResourceDisplay();
}

function trainKitten() {
    if (gameState.resources.catnip < 20) {
        alert('猫薄荷不足！');
        return;
    }
    
    spendResources({ catnip: 20 });
    gameState.kittens.trained++;
    gameState.kittens.happiness = Math.min(100, gameState.kittens.happiness + 5);
    
    // 每训练5次增加一只猫咪
    if (gameState.kittens.trained % 5 === 0 && gameState.kittens.count < gameState.kittens.max) {
        gameState.kittens.count++;
        gameState.kittens.jobs.unemployed++;
        // 给新猫咪随机特质
        const traitKeys = Object.keys(traitConfigs);
        const randomTrait = traitKeys[Math.floor(Math.random() * traitKeys.length)];
        gameState.kittens.traits.push(randomTrait);
        gameState.kittens.levels.push('apprentice');
    }
    
    // 升级猫咪等级
    if (gameState.kittens.trained % 10 === 0) {
        // 随机升级一只猫咪的等级
        const unemployedKittens = [];
        gameState.kittens.levels.forEach((level, index) => {
            if (gameState.kittens.jobs.unemployed > 0 || level !== 'unemployed') {
                unemployedKittens.push(index);
            }
        });
        
        if (unemployedKittens.length > 0) {
            const kittenIndex = unemployedKittens[Math.floor(Math.random() * unemployedKittens.length)];
            const currentLevel = gameState.kittens.levels[kittenIndex];
            const levels = ['apprentice', 'skilled', 'expert', 'master'];
            const currentIndex = levels.indexOf(currentLevel);
            
            if (currentIndex < levels.length - 1) {
                gameState.kittens.levels[kittenIndex] = levels[currentIndex + 1];
                alert(`一只猫咪升级为${levels[currentIndex + 1]}！工作效率大幅提升！`);
            }
        }
    }
    
    updateResourceDisplay();
    updateKittenDisplay();
    updateResetExpectation();
}

function assignJob(job, amount) {
    if (amount <= 0) return;
    if (gameState.kittens.jobs.unemployed < amount) {
        alert('没有足够的失业猫咪！');
        return;
    }
    
    gameState.kittens.jobs.unemployed -= amount;
    gameState.kittens.jobs[job] += amount;
    
    updateKittenDisplay();
}

function unassignJob(job, amount) {
    if (amount <= 0) return;
    if (gameState.kittens.jobs[job] < amount) {
        alert('该职业没有足够的猫咪！');
        return;
    }
    
    gameState.kittens.jobs[job] -= amount;
    gameState.kittens.jobs.unemployed += amount;
    
    updateKittenDisplay();
}

function researchTech(tech) {
    const config = techConfigs[tech];
    
    if (gameState.techs[tech]) {
        alert('该科技已解锁！');
        return;
    }
    
    if (!hasEnoughResources(config.cost)) {
        alert('资源不足！');
        return;
    }
    
    spendResources(config.cost);
    gameState.techs[tech] = true;
    
    config.effect();
    
    updateResourceDisplay();
    updateResetExpectation();
    
    const btn = document.querySelector(`[data-tech="${tech}"]`);
    if (btn) {
        btn.disabled = true;
        btn.textContent = '已研发';
    }
    
    return true;
}

function calculateResetRewards() {
    const leadership = Math.floor(
        gameState.kittens.count * 0.1 +
        Object.values(gameState.buildings).reduce((sum, count) => sum + count, 0) * 0.5 +
        Object.values(gameState.techs).filter(tech => tech).length * 5
    );
    
    const karma = Math.floor(gameState.kittens.happiness * 0.1);
    
    return { leadership, karma };
}

function performReset() {
    if (!gameState.techs.dimension) {
        alert('请先研发次元超越科技！');
        return;
    }
    
    if (!confirm('确定要进行次元超越吗？这将重置所有资源、建筑和猫咪，但保留领导力和业力。')) {
        return;
    }
    
    const rewards = calculateResetRewards();
    
    gameState.prestige.leadership += rewards.leadership;
    gameState.prestige.karma += rewards.karma;
    
    resetGameState();
    
    updateResourceDisplay();
    updateKittenDisplay();
    updateBuildingDisplay();
    updatePrestigeDisplay();
    updateGameProgress();
    updateResetExpectation();
    
    alert(`次元超越完成！获得领导力：${rewards.leadership}，业力：${rewards.karma}`);
}

function resetGameState() {
    gameState.resources = {
        catnip: 50,
        wood: 20,
        stone: 10,
        coal: 0,
        steel: 0,
        uranium: 0,
        knowledge: 0,
        culture: 0,
        faith: 0,
        fur: 0,
        tools: 0
    };
    
    gameState.resourceCaps = {
        catnip: 100,
        wood: 100,
        stone: 100,
        coal: 100,
        steel: 100,
        uranium: 50,
        knowledge: 50,
        culture: 50,
        faith: 50,
        fur: 50,
        tools: 50
    };
    
    gameState.buildings = {
        farm: 0,
        lumbermill: 0,
        mine: 0,
        library: 0,
        tent: 1,
        warehouse: 0,
        coalStove: 0,
        university: 0,
        theater: 0,
        temple: 0,
        aqueduct: 0,
        huntingLodge: 0,
        factory: 0,
        house: 0,
        barn: 0,
        workshop: 0
    };
    
    gameState.kittens = {
        count: 1,
        max: 5,
        happiness: 80,
        trained: 0,
        jobs: {
            farmer: 0,
            lumberjack: 0,
            miner: 0,
            scientist: 0,
            hunter: 0,
            engineer: 0,
            priest: 0,
            unemployed: 1
        },
        traits: [],
        levels: []
    };
    
    // 保留次元超越科技
    const hadDimension = gameState.techs.dimension;
    gameState.techs = {
        agriculture: false,
        mining: false,
        engineering: false,
        dimension: hadDimension,
        steelTech: false,
        advancedTech: false,
        animalHusbandry: false,
        horticulture: false,
        genetics: false,
        geology: false,
        metallurgy: false,
        materials: false,
        mechanics: false,
        automation: false,
        robotics: false,
        mathematics: false,
        physics: false,
        chemistry: false,
        astronomy: false,
        spaceTravel: false,
        interstellar: false,
        theology: false,
        philosophy: false,
        psychology: false
    };
    
    gameState.season = 0;
    gameState.seasonTime = 0;
    
    gameState.cycle++;
    gameState.time = 0;
    
    updateResourceRates();
    
    document.querySelectorAll('.research-btn').forEach(btn => {
        btn.disabled = false;
        btn.textContent = '研发';
    });
    
    const dimensionBtn = document.querySelector('[data-tech="dimension"]');
    if (dimensionBtn) {
        dimensionBtn.disabled = true;
        dimensionBtn.textContent = '已研发';
    }
}

function gameLoop() {
    gameState.time++;
    gameState.seasonTime++;
    
    if (gameState.seasonTime >= 1000) {
        gameState.season = (gameState.season + 1) % 4;
        gameState.seasonTime = 0;
        updateResourceRates();
        
        const seasons = ['春季', '夏季', '秋季', '冬季'];
        console.log(`季节变化：现在是${seasons[gameState.season]}！`);
        if (gameState.season === 3) {
            alert('冬季来临！猫薄荷产量将降低25%，请提前储备足够的资源！');
        }
    }
    
    // 建筑维护消耗
    Object.keys(buildingConfigs).forEach(building => {
        const config = buildingConfigs[building];
        if (config.maintenance && gameState.buildings[building] > 0) {
            Object.keys(config.maintenance).forEach(resource => {
                const cost = config.maintenance[resource] * gameState.buildings[building] / 10;
                if (gameState.resources[resource] >= cost) {
                    gameState.resources[resource] -= cost;
                }
            });
        }
    });
    
    // 生产资源
    Object.keys(gameState.resourceRates).forEach(resource => {
        const rate = gameState.resourceRates[resource] / 10;
        gameState.resources[resource] = Math.min(
            gameState.resourceCaps[resource],
            gameState.resources[resource] + rate
        );
    });
    
    // 煤炉消耗木材生产煤炭
    const coalFromStove = gameState.buildings.coalStove * buildingConfigs.coalStove.effect.coal / 10;
    if (coalFromStove > 0) {
        const woodCost = coalFromStove * 0.5;
        if (gameState.resources.wood >= woodCost) {
            gameState.resources.wood -= woodCost;
            gameState.resources.coal = Math.min(
                gameState.resourceCaps.coal,
                gameState.resources.coal + coalFromStove
            );
        }
    }
    
    // 猫咪食物消耗
    const catnipConsumption = gameState.kittens.count * 0.05 / 10;
    if (gameState.resources.catnip >= catnipConsumption) {
        gameState.resources.catnip -= catnipConsumption;
    } else {
        // 饥饿状态，效率降低
        gameState.kittens.happiness = Math.max(0, gameState.kittens.happiness - 0.1);
    }
    
    if (gameState.prestige.karma > 0) {
        gameState.kittens.happiness = Math.min(100, gameState.kittens.happiness + (gameState.prestige.karma * 0.01));
    }
    
    // 幸福度自然衰减
    gameState.kittens.happiness = Math.max(0, gameState.kittens.happiness - 0.05);
    
    updateResourceDisplay();
    updateKittenDisplay();
    updateGameProgress();
    updateResetExpectation();
    
    setTimeout(gameLoop, 100);
}

function initGame() {
    updateResourceDisplay();
    updateKittenDisplay();
    updateBuildingDisplay();
    updatePrestigeDisplay();
    updateGameProgress();
    updateResetExpectation();
    
    document.querySelectorAll('.build-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const building = btn.dataset.building;
            buildBuilding(building);
        });
    });
    
    document.querySelectorAll('.research-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const tech = btn.dataset.tech;
            researchTech(tech);
        });
    });
    
    document.getElementById('trainKitten').addEventListener('click', trainKitten);
    elements.resetBtn.addEventListener('click', performReset);
    
    elements.resetBtn.disabled = true;
    
    gameLoop();
}

window.addEventListener('load', initGame);
