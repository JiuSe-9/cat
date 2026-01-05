// 游戏主对象
const Game = {
    // 资源数据
    resources: {
        catnip: { amount: 0, rate: 0 },
        catnipWood: { amount: 0, rate: 0 },
        fish: { amount: 0, rate: 0 },
        catSnack: { amount: 0, rate: 0 },
        catToy: { amount: 0, rate: 0 },
        catCoin: { amount: 0, rate: 0 },
        mineral: { amount: 0, rate: 0 },
        ironOre: { amount: 0, rate: 0 },
        copperOre: { amount: 0, rate: 0 },
        goldOre: { amount: 0, rate: 0 },
        ironIngot: { amount: 0, rate: 0 },
        copperIngot: { amount: 0, rate: 0 },
        goldIngot: { amount: 0, rate: 0 },
        oil: { amount: 0, rate: 0 },
        plastic: { amount: 0, rate: 0 },
        electronicParts: { amount: 0, rate: 0 },
        advancedMaterial: { amount: 0, rate: 0 },
        researchPoints: { amount: 0, rate: 0 },
        population: { amount: 1, rate: 0 },
        maxPopulation: { amount: 5, rate: 0 }
    },
    
    // 建筑数据
    buildings: {
        catnipFarm: {
            name: "猫薄荷田",
            count: 0,
            cost: { catnip: 10 },
            description: "自动生产猫薄荷",
            production: { catnip: 0.5 },
            workers: 0,
            maxWorkers: 1
        },
        refinery: {
            name: "精炼厂",
            count: 0,
            cost: { catnip: 50, catnipWood: 10 },
            description: "将猫薄荷精炼为猫薄荷木",
            production: { catnipWood: 0.3 },
            input: { catnip: 1 },
            workers: 0,
            maxWorkers: 1
        },
        cottage: {
            name: "小屋",
            count: 0,
            cost: { catnip: 100, catnipWood: 20 },
            description: "增加1名小猫咪工人",
            effect: { maxPopulation: 1 },
            workers: 0,
            maxWorkers: 0
        },
        fishFarm: {
            name: "鱼场",
            count: 0,
            cost: { catnip: 200, catnipWood: 50 },
            description: "生产鱼干",
            production: { fish: 0.4 },
            workers: 0,
            maxWorkers: 1
        },
        restaurant: {
            name: "餐厅",
            count: 0,
            cost: { catnip: 300, catnipWood: 80, fish: 50 },
            description: "生产猫零食",
            production: { catSnack: 0.5 },
            input: { fish: 1 },
            workers: 0,
            maxWorkers: 2
        },
        toyFactory: {
            name: "玩具厂",
            count: 0,
            cost: { catnip: 400, catnipWood: 120, fish: 80 },
            description: "生产猫玩具",
            production: { catToy: 0.4 },
            input: { catnipWood: 2 },
            workers: 0,
            maxWorkers: 2
        },
        market: {
            name: "市场",
            count: 0,
            cost: { catnip: 500, catnipWood: 150, fish: 100 },
            description: "生产猫币",
            production: { catCoin: 0.6 },
            input: { catSnack: 1, catToy: 1 },
            workers: 0,
            maxWorkers: 2
        },
        library: {
            name: "图书馆",
            count: 0,
            cost: { catnip: 600, catnipWood: 200, catCoin: 50 },
            description: "生产研究点数，需要科学家才能工作",
            production: { researchPoints: 1 },
            workers: 0,
            maxWorkers: 2
        },
        adventureCamp: {
            name: "探险营",
            count: 0,
            cost: { catnip: 700, catnipWood: 250, catToy: 100 },
            description: "探索获得随机资源",
            effect: { exploration: 0.1 },
            workers: 0,
            maxWorkers: 3
        },
        lumberMill: {
            name: "伐木场",
            count: 0,
            cost: { catnip: 300 },
            description: "生产猫薄荷木，需要伐木工才能工作",
            production: { catnipWood: 1 },
            workers: 0,
            maxWorkers: 2
        },
        mine: {
            name: "矿场",
            count: 0,
            cost: { catnip: 500, catnipWood: 100 },
            description: "生产矿产资源，需要矿工才能工作",
            production: { mineral: 0.5 },
            input: { catnip: 2 }, // 持续消耗猫薄荷
            workers: 0,
            maxWorkers: 2
        },
        ironMine: {
            name: "铁矿",
            count: 0,
            cost: { catnip: 1000, catnipWood: 300, mineral: 100 },
            description: "生产铁矿石，需要矿工才能工作",
            production: { ironOre: 0.5 },
            input: { catnip: 3 }, // 持续消耗猫薄荷
            workers: 0,
            maxWorkers: 3
        },
        copperMine: {
            name: "铜矿",
            count: 0,
            cost: { catnip: 1500, catnipWood: 500, ironOre: 100 },
            description: "生产铜矿石，需要矿工才能工作",
            production: { copperOre: 0.5 },
            input: { catnip: 4 }, // 持续消耗猫薄荷
            workers: 0,
            maxWorkers: 3
        },
        goldMine: {
            name: "金矿",
            count: 0,
            cost: { catnip: 2500, catnipWood: 800, copperOre: 200 },
            description: "生产金矿石，需要矿工才能工作",
            production: { goldOre: 0.3 },
            input: { catnip: 5 }, // 持续消耗猫薄荷
            workers: 0,
            maxWorkers: 4
        },
        smelter: {
            name: "冶炼厂",
            count: 0,
            cost: { catnip: 800, catnipWood: 200, mineral: 150 },
            description: "将矿石冶炼成锭，需要工人才能工作",
            production: { ironIngot: 0.4, copperIngot: 0.4 },
            input: { ironOre: 2, copperOre: 2, catnip: 5 }, // 持续消耗资源
            workers: 0,
            maxWorkers: 3
        },
        oilWell: {
            name: "油井",
            count: 0,
            cost: { catnip: 3000, ironIngot: 300, copperIngot: 200 },
            description: "开采石油，需要工人才能工作",
            production: { oil: 0.3 },
            input: { catnip: 8, ironIngot: 0.1 }, // 持续消耗资源
            workers: 0,
            maxWorkers: 4
        },
        refinery: {
            name: "精炼厂",
            count: 0,
            cost: { catnip: 5000, ironIngot: 500, oil: 200 },
            description: "将石油精炼成塑料和其他产品，需要工人才能工作",
            production: { plastic: 0.4, electronicParts: 0.2 },
            input: { oil: 2, copperIngot: 1, catnip: 10 }, // 持续消耗资源
            workers: 0,
            maxWorkers: 5
        },
        advancedFactory: {
            name: "高级工厂",
            count: 0,
            cost: { catnip: 10000, ironIngot: 800, plastic: 500, electronicParts: 300 },
            description: "生产高级材料，需要工人才能工作",
            production: { advancedMaterial: 0.2 },
            input: { ironIngot: 2, copperIngot: 2, plastic: 3, electronicParts: 1, catnip: 15 }, // 持续消耗资源
            workers: 0,
            maxWorkers: 6
        },
        nuclearPlant: {
            name: "核电站",
            count: 0,
            cost: { catnip: 20000, advancedMaterial: 1000, electronicParts: 800 },
            description: "提供大量能源，需要工人才能工作",
            production: { catnip: 10 }, // 生产猫薄荷作为能源产物
            input: { advancedMaterial: 0.5, electronicParts: 0.3, catnip: 20 }, // 持续消耗大量资源
            workers: 0,
            maxWorkers: 8
        }
    },
    
    // 工作类型
    jobs: [
        { id: "farmer", name: "农民", building: "catnipFarm" },
        { id: "refiner", name: "精炼工", building: "refinery" },
        { id: "fisher", name: "渔夫", building: "fishFarm" },
        { id: "chef", name: "厨师", building: "restaurant" },
        { id: "toyMaker", name: "玩具师", building: "toyFactory" },
        { id: "merchant", name: "商人", building: "market" },
        { id: "scientist", name: "科学家", building: "library" },
        { id: "adventurer", name: "探险家", building: "adventureCamp" },
        { id: "lumberjack", name: "伐木工", building: "lumberMill" },
        { id: "miner", name: "矿工", building: "mine" },
        { id: "ironMiner", name: "铁矿工", building: "ironMine" },
        { id: "copperMiner", name: "铜矿工", building: "copperMine" },
        { id: "goldMiner", name: "金矿工", building: "goldMine" },
        { id: "smelterWorker", name: "冶炼工", building: "smelter" },
        { id: "oilWorker", name: "石油工人", building: "oilWell" },
        { id: "refineryWorker", name: "精炼工人", building: "refinery" },
        { id: "advancedWorker", name: "高级工人", building: "advancedFactory" },
        { id: "nuclearEngineer", name: "核工程师", building: "nuclearPlant" }
    ],
    
    // 科技树数据
    technologies: {
        advancedFarming: {
            name: "高级农业",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 100,
            cost: { catnip: 200, catnipWood: 50 },
            description: "提高猫薄荷田产量",
            effect: { building: "catnipFarm", productionMultiplier: 1.5 }
        },
        efficientRefining: {
            name: "高效精炼",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 200,
            cost: { catnip: 300, catnipWood: 100, fish: 50 },
            description: "提高精炼厂产量",
            effect: { building: "refinery", productionMultiplier: 1.5 }
        },
        improvedHousing: {
            name: "改良住房",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 300,
            cost: { catnip: 500, catnipWood: 200 },
            description: "提高小屋的人口上限",
            effect: { building: "cottage", effectMultiplier: 1.5 }
        },
        advancedFishing: {
            name: "高级渔业",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 400,
            cost: { catnip: 400, catnipWood: 150, fish: 100 },
            description: "提高鱼场产量",
            effect: { building: "fishFarm", productionMultiplier: 1.5 }
        },
        advancedCooking: {
            name: "高级烹饪",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 500,
            cost: { catnip: 500, catnipWood: 100, fish: 150 },
            description: "提高餐厅产量",
            effect: { building: "restaurant", productionMultiplier: 1.5 }
        },
        nutritiousSnacks: {
            name: "营养零食",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 600,
            cost: { catnip: 600, catnipWood: 120, catSnack: 100 },
            description: "猫零食提高人口增长",
            effect: { populationGrowth: 0.2 }
        },
        advancedToyMaking: {
            name: "高级玩具制造",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 700,
            cost: { catnip: 700, catnipWood: 180, fish: 200 },
            description: "提高玩具厂产量",
            effect: { building: "toyFactory", productionMultiplier: 1.5 }
        },
        educationalToys: {
            name: "教育玩具",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 800,
            cost: { catnip: 800, catnipWood: 200, catToy: 150 },
            description: "猫玩具提高科技研究速度",
            effect: { techSpeed: 0.3 }
        },
        efficientTrading: {
            name: "高效贸易",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 900,
            cost: { catnip: 900, catnipWood: 250, catCoin: 100 },
            description: "提高市场产量",
            effect: { building: "market", productionMultiplier: 1.5 }
        },
        catEconomy: {
            name: "猫币经济",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 1000,
            cost: { catnip: 1000, catnipWood: 300, catCoin: 200 },
            description: "使用猫币降低建筑成本",
            effect: { buildingCostReduction: 0.2 }
        },
        advancedLearning: {
            name: "高级学习",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 1100,
            cost: { catnip: 1100, catnipWood: 350, catCoin: 250 },
            description: "进一步提高图书馆研究速度",
            effect: { building: "library", effectMultiplier: 2 }
        },
        explorationTechniques: {
            name: "探索技巧",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 1200,
            cost: { catnip: 1200, catnipWood: 400, catToy: 300 },
            description: "提高探险营发现资源的频率",
            effect: { building: "adventureCamp", effectMultiplier: 1.5 }
        },
        treasureHunting: {
            name: "寻宝",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 1300,
            cost: { catnip: 1300, catnipWood: 450, catCoin: 350 },
            description: "提高探险营发现资源的质量",
            effect: { explorationQuality: 1.5 }
        },
        resourceEfficiency: {
            name: "资源效率",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 1400,
            cost: { catnip: 1400, catnipWood: 500, catCoin: 400 },
            description: "降低所有建筑的输入成本",
            effect: { inputReduction: 0.3 }
        },
        automation: {
            name: "自动化",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 1500,
            cost: { catnip: 1500, catnipWood: 550, catCoin: 450 },
            description: "提高建筑产量而不需要更多工人",
            effect: { automationBonus: 0.4 }
        },
        ironMining: {
            name: "铁矿开采",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 1600,
            cost: { catnip: 2000, catnipWood: 800, mineral: 300, researchPoints: 50 },
            description: "解锁铁矿开采技术",
            effect: { unlockBuilding: "ironMine" }
        },
        copperMining: {
            name: "铜矿开采",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 1700,
            cost: { catnip: 2500, catnipWood: 1000, ironOre: 200, researchPoints: 80 },
            description: "解锁铜矿开采技术",
            effect: { unlockBuilding: "copperMine" }
        },
        goldMining: {
            name: "金矿开采",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 1800,
            cost: { catnip: 3500, catnipWood: 1500, copperOre: 300, researchPoints: 120 },
            description: "解锁金矿开采技术",
            effect: { unlockBuilding: "goldMine" }
        },
        advancedSmelting: {
            name: "高级冶炼",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 1900,
            cost: { catnip: 4000, ironOre: 400, copperOre: 300, researchPoints: 150 },
            description: "解锁高级冶炼技术，提高冶炼厂效率",
            effect: { building: "smelter", productionMultiplier: 1.5, unlockBuilding: "smelter" }
        },
        oilExtraction: {
            name: "石油提取",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 2000,
            cost: { catnip: 5000, ironIngot: 500, copperIngot: 400, researchPoints: 200 },
            description: "解锁石油提取技术",
            effect: { unlockBuilding: "oilWell" }
        },
        oilRefining: {
            name: "石油精炼",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 2100,
            cost: { catnip: 6000, ironIngot: 600, oil: 300, researchPoints: 250 },
            description: "解锁石油精炼技术",
            effect: { unlockBuilding: "refinery" }
        },
        advancedMaterials: {
            name: "高级材料",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 2200,
            cost: { catnip: 8000, plastic: 500, electronicParts: 400, researchPoints: 300 },
            description: "解锁高级材料生产技术",
            effect: { unlockBuilding: "advancedFactory" }
        },
        nuclearEnergy: {
            name: "核能技术",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 2300,
            cost: { catnip: 10000, advancedMaterial: 500, electronicParts: 600, researchPoints: 400 },
            description: "解锁核能技术",
            effect: { unlockBuilding: "nuclearPlant" }
        },
        resourceEfficiency2: {
            name: "资源效率II",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 2400,
            cost: { catnip: 12000, advancedMaterial: 600, goldIngot: 200, researchPoints: 500 },
            description: "进一步降低所有建筑的输入成本",
            effect: { inputReduction: 0.5 }
        },
        automation2: {
            name: "高级自动化",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 2500,
            cost: { catnip: 15000, advancedMaterial: 800, electronicParts: 700, researchPoints: 600 },
            description: "进一步提高建筑产量而不需要更多工人",
            effect: { automationBonus: 0.8 }
        },
        superEfficiency: {
            name: "超级效率",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 2600,
            cost: { catnip: 20000, advancedMaterial: 1000, goldIngot: 500, researchPoints: 800 },
            description: "极大提高建筑产量和资源效率",
            effect: { productionMultiplier: 2, inputReduction: 0.7 }
        },
        catnipSynthesis: {
            name: "猫薄荷合成",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 2700,
            cost: { catnip: 25000, plastic: 1500, electronicParts: 1000, researchPoints: 1000 },
            description: "解锁猫薄荷合成技术，使用高级材料合成猫薄荷",
            effect: { unlockBuilding: "catnipSynthesizer" }
        },
        advancedPopulation: {
            name: "高级人口增长",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 2800,
            cost: { catnip: 30000, advancedMaterial: 1200, goldIngot: 600, researchPoints: 1200 },
            description: "提高小屋的人口上限",
            effect: { building: "cottage", effectMultiplier: 3 }
        },
        ultimateResearch: {
            name: "终极研究",
            unlocked: false,
            isResearching: false,
            progress: 0,
            requiredPoints: 3000,
            cost: { catnip: 50000, advancedMaterial: 2000, goldIngot: 1000, researchPoints: 2000 },
            description: "解锁终极研究技术，极大提高研究点数生产",
            effect: { building: "library", productionMultiplier: 5 }
        }
    },
    
    // 游戏循环相关
    lastUpdate: Date.now(),
    gameLoop: null,
    
    // 任务系统
    tasks: {
        // 主线任务
        main: [
            {
                id: "build_farm",
                name: "建造猫薄荷田",
                description: "建造你的第一个猫薄荷田",
                requirements: { buildings: { catnipFarm: 1 } },
                rewards: { catnip: 100, catnipWood: 50 },
                completed: false
            },
            {
                id: "build_refinery",
                name: "建造精炼厂",
                description: "建造你的第一个精炼厂",
                requirements: { buildings: { refinery: 1 } },
                rewards: { catnip: 200, catnipWood: 100, fish: 50 },
                completed: false
            },
            {
                id: "research_tech",
                name: "研究第一个科技",
                description: "研究任意一个科技",
                requirements: { technologies: 1 },
                rewards: { catnip: 300, catnipWood: 150, fish: 100 },
                completed: false
            },
            {
                id: "build_cottage",
                name: "扩大人口",
                description: "建造小屋以增加人口上限",
                requirements: { buildings: { cottage: 1 } },
                rewards: { catnip: 400, catnipWood: 200, fish: 150 },
                completed: false
            },
            {
                id: "build_restaurant",
                name: "开设餐厅",
                description: "建造餐厅开始生产猫零食",
                requirements: { buildings: { restaurant: 1 } },
                rewards: { catnip: 500, catnipWood: 250, catSnack: 100 },
                completed: false
            }
        ],
        
        // 日常任务
        daily: [
            {
                id: "collect_catnip",
                name: "采集猫薄荷",
                description: "采集100个猫薄荷",
                requirements: { resources: { catnip: 100 } },
                rewards: { catnip: 50, catCoin: 20 },
                completed: false,
                resetDaily: true
            },
            {
                id: "produce_fish",
                name: "生产鱼干",
                description: "生产50个鱼干",
                requirements: { resources: { fish: 50 } },
                rewards: { fish: 30, catCoin: 30 },
                completed: false,
                resetDaily: true
            },
            {
                id: "build_structure",
                name: "建造建筑",
                description: "建造任意一个新建筑",
                requirements: { buildings: 1 },
                rewards: { catnipWood: 50, catCoin: 40 },
                completed: false,
                resetDaily: true
            },
            {
                id: "assign_workers",
                name: "分配工人",
                description: "分配5个工人到不同建筑",
                requirements: { workers: 5 },
                rewards: { catSnack: 20, catCoin: 50 },
                completed: false,
                resetDaily: true
            },
            {
                id: "research_daily",
                name: "日常研究",
                description: "研究任意一个科技",
                requirements: { technologies: 1 },
                rewards: { catToy: 10, catCoin: 60 },
                completed: false,
                resetDaily: true
            }
        ]
    },
    
    // 随机事件系统
    events: {
        // 事件定义
        definitions: [
            {
                id: "catnip_boom",
                title: "猫薄荷大丰收",
                description: "你的猫薄荷田获得了大丰收！你可以选择立即收获更多猫薄荷，或者投资改善农场设施。",
                options: [
                    {
                        text: "立即收获",
                        effects: { resources: { catnip: 200 } }
                    },
                    {
                        text: "投资设施",
                        effects: { resources: { catnip: -50 }, buildings: { catnipFarm: { productionMultiplier: 0.2 } } }
                    }
                ]
            },
            {
                id: "stray_cat",
                title: "流浪猫到访",
                description: "一只流浪猫来到了你的猫城。你可以选择收养它，或者给它一些食物让它离开。",
                options: [
                    {
                        text: "收养它",
                        effects: { resources: { population: 1 } }
                    },
                    {
                        text: "给食物",
                        effects: { resources: { fish: -20, catCoin: 30 } }
                    }
                ]
            },
            {
                id: "trader",
                title: "商人到访",
                description: "一个商人带着特殊商品来到了你的市场。你可以选择购买一些稀有资源，或者与他进行贸易。",
                options: [
                    {
                        text: "购买稀有资源",
                        effects: { resources: { catCoin: -100, catToy: 50 } }
                    },
                    {
                        text: "进行贸易",
                        effects: { resources: { catnip: -100, catnipWood: -50, catCoin: 150 } }
                    }
                ]
            },
            {
                id: "storm",
                title: "暴风雨来袭",
                description: "一场暴风雨即将来临。你可以选择加固建筑，或者将资源转移到安全地方。",
                options: [
                    {
                        text: "加固建筑",
                        effects: { resources: { catnipWood: -80 } }
                    },
                    {
                        text: "转移资源",
                        effects: { resources: { catnip: -50, fish: -30 } }
                    }
                ]
            },
            {
                id: "festival",
                title: "猫城节日",
                description: "猫城居民想要举办一个节日。你可以选择举办盛大的庆祝活动，或者简单地举行一个小型聚会。",
                options: [
                    {
                        text: "盛大庆祝",
                        effects: { resources: { catCoin: -150, catSnack: -100, population: 2 } }
                    },
                    {
                        text: "小型聚会",
                        effects: { resources: { catCoin: -50, catSnack: -30, population: 1 } }
                    }
                ]
            }
        ],
        
        // 事件状态
        currentEvent: null,
        eventTimer: 0,
        eventInterval: 300 // 事件触发间隔（秒）
    },
    
    // 初始化游戏
    init: function() {
        // 自动加载游戏
        this.autoLoad();
        this.setupEventListeners();
        this.updateUI();
        this.startGameLoop();
        this.generateBuildings();
        this.generateJobs();
        this.generateTechnologies();
        
        // 设置定期自动保存（每30秒）
        this.autoSaveInterval = setInterval(() => this.autoSave(), 30000);
        
        // 页面关闭前自动保存
        window.addEventListener('beforeunload', () => this.autoSave());
    },
    
    // 设置事件监听器
    setupEventListeners: function() {
        // 手动采集按钮
        document.getElementById('collectBtn').addEventListener('click', () => {
            this.collectCatnip();
        });
        
        // 保存/加载/重置按钮
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveGame();
        });
        
        document.getElementById('loadBtn').addEventListener('click', () => {
            this.loadGame();
        });
        
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetGame();
        });
        
        // 任务标签页切换
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTaskTab(tab);
            });
        });
        
        // 事件选项按钮
        document.getElementById('eventOption1').addEventListener('click', () => {
            this.handleEventOption(0);
        });
        
        document.getElementById('eventOption2').addEventListener('click', () => {
            this.handleEventOption(1);
        });
        
        
    },
    
    // 设置贸易系统事件监听器
    setupTradeEventListeners: function() {
        // 出售资源数量控制
        document.getElementById('decreaseSell').addEventListener('click', () => {
            this.adjustTradeAmount('sell', -5);
        });
        
        document.getElementById('increaseSell').addEventListener('click', () => {
            this.adjustTradeAmount('sell', 5);
        });
        
        document.getElementById('sellAmount').addEventListener('input', () => {
            this.updateTradeStatus();
        });
        
        // 购买资源数量控制
        document.getElementById('decreaseBuy').addEventListener('click', () => {
            this.adjustTradeAmount('buy', -5);
        });
        
        document.getElementById('increaseBuy').addEventListener('click', () => {
            this.adjustTradeAmount('buy', 5);
        });
        
        document.getElementById('buyAmount').addEventListener('input', () => {
            this.updateTradeStatus();
        });
        
        // 资源选择变化
        document.getElementById('sellResource').addEventListener('change', () => {
            this.updateTradeStatus();
        });
        
        document.getElementById('buyResource').addEventListener('change', () => {
            this.updateTradeStatus();
        });
        
        // 执行贸易按钮
        document.getElementById('tradeBtn').addEventListener('click', () => {
            this.executeTrade();
        });
    },
    
    // 调整贸易数量
    adjustTradeAmount: function(type, delta) {
        const input = document.getElementById(`${type}Amount`);
        let currentValue = parseInt(input.value);
        let newValue = Math.max(1, currentValue + delta);
        input.value = newValue;
        this.updateTradeStatus();
    },
    
    // 更新贸易状态
    updateTradeStatus: function() {
        const sellResource = document.getElementById('sellResource').value;
        const buyResource = document.getElementById('buyResource').value;
        const sellAmount = parseInt(document.getElementById('sellAmount').value);
        const buyAmount = parseInt(document.getElementById('buyAmount').value);
        
        // 更新贸易比率显示
        const ratioText = `交换比率: ${sellAmount} ${sellResource} → ${buyAmount} ${buyResource}`;
        document.getElementById('tradeRatio').textContent = ratioText;
        
        // 检查贸易是否可行
        const hasEnoughResources = this.resources[sellResource].amount >= sellAmount;
        const isValidTrade = sellResource !== buyResource && hasEnoughResources;
        
        // 更新贸易状态文本
        const statusElement = document.getElementById('tradeStatus');
        const tradeBtn = document.getElementById('tradeBtn');
        
        if (sellResource === buyResource) {
            statusElement.textContent = '不能交换相同的资源';
            statusElement.style.color = '#ff6348';
            tradeBtn.disabled = true;
        } else if (!hasEnoughResources) {
            statusElement.textContent = '资源不足';
            statusElement.style.color = '#ff6348';
            tradeBtn.disabled = true;
        } else {
            statusElement.textContent = '准备交易';
            statusElement.style.color = '#2ed573';
            tradeBtn.disabled = false;
        }
    },
    
    // 执行贸易
    executeTrade: function() {
        const sellResource = document.getElementById('sellResource').value;
        const buyResource = document.getElementById('buyResource').value;
        const sellAmount = parseInt(document.getElementById('sellAmount').value);
        const buyAmount = parseInt(document.getElementById('buyAmount').value);
        
        // 检查贸易是否可行
        if (sellResource === buyResource) {
            alert('不能交换相同的资源！');
            return;
        }
        
        if (this.resources[sellResource].amount < sellAmount) {
            alert('你没有足够的资源可以出售！');
            return;
        }
        
        // 执行贸易
        this.resources[sellResource].amount -= sellAmount;
        this.resources[buyResource].amount += buyAmount;
        
        // 更新UI
        this.updateUI();
        this.updateTradeStatus();
        
        alert('贸易成功！');
    },
    
    // 检查事件触发
    checkEventTrigger: function() {
        if (this.events.currentEvent) return;
        
        this.events.eventTimer++;
        
        // 每300秒（5分钟）有一定几率触发事件
        if (this.events.eventTimer >= this.events.eventInterval) {
            // 20%的几率触发事件
            if (Math.random() < 0.2) {
                this.triggerRandomEvent();
            }
            this.events.eventTimer = 0;
        }
    },
    
    // 触发随机事件
    triggerRandomEvent: function() {
        const events = this.events.definitions;
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        this.events.currentEvent = randomEvent;
        this.showEventNotification(randomEvent);
    },
    
    // 显示事件通知
    showEventNotification: function(event) {
        const notification = document.getElementById('eventNotification');
        const title = document.getElementById('eventTitle');
        const description = document.getElementById('eventDescription');
        const option1 = document.getElementById('eventOption1');
        const option2 = document.getElementById('eventOption2');
        
        title.textContent = event.title;
        description.textContent = event.description;
        option1.textContent = event.options[0].text;
        option2.textContent = event.options[1].text;
        
        notification.classList.remove('hidden');
    },
    
    // 隐藏事件通知
    hideEventNotification: function() {
        const notification = document.getElementById('eventNotification');
        notification.classList.add('hidden');
    },
    
    // 处理事件选项
    handleEventOption: function(optionIndex) {
        const event = this.events.currentEvent;
        if (!event) return;
        
        const option = event.options[optionIndex];
        this.applyEventEffects(option.effects);
        
        this.events.currentEvent = null;
        this.hideEventNotification();
        this.updateUI();
    },
    
    // 应用事件效果
    applyEventEffects: function(effects) {
        // 应用资源效果
        if (effects.resources) {
            for (let resource in effects.resources) {
                if (this.resources[resource]) {
                    this.resources[resource].amount += effects.resources[resource];
                    // 确保资源不会为负数
                    this.resources[resource].amount = Math.max(0, this.resources[resource].amount);
                }
            }
        }
        
        // 应用建筑效果
        if (effects.buildings) {
            for (let buildingId in effects.buildings) {
                if (this.buildings[buildingId]) {
                    const buildingEffects = effects.buildings[buildingId];
                    for (let effect in buildingEffects) {
                        // 这里可以扩展更多建筑效果类型
                        if (effect === 'productionMultiplier') {
                            // 建筑产量加成效果可以在calculateProduction中处理
                            // 这里可以添加建筑特定的加成数据
                            if (!this.buildings[buildingId].eventEffects) {
                                this.buildings[buildingId].eventEffects = {};
                            }
                            this.buildings[buildingId].eventEffects.productionMultiplier = 
                                (this.buildings[buildingId].eventEffects.productionMultiplier || 1) + buildingEffects[effect];
                        }
                    }
                }
            }
        }
    },
    
    // 切换任务标签页
    switchTaskTab: function(tab) {
        // 移除所有标签和内容的活动状态
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tasks-list').forEach(list => list.classList.remove('active'));
        
        // 添加当前标签和内容的活动状态
        document.querySelector(`[data-tab="${tab}"]`).classList.add('active');
        document.getElementById(`${tab}Tasks`).classList.add('active');
        
        // 生成对应标签的任务
        this.generateTasks(tab);
    },
    
    // 生成任务UI
    generateTasks: function(type) {
        const container = document.getElementById(`${type}Tasks`);
        container.innerHTML = '';
        
        const tasks = this.tasks[type];
        
        tasks.forEach(task => {
            const taskElement = this.createTaskElement(task, type);
            container.appendChild(taskElement);
        });
    },
    
    // 创建任务元素
    createTaskElement: function(task, type) {
        const div = document.createElement('div');
        div.className = 'task-item';
        
        // 构建奖励文本
        let rewardsText = '奖励: ';
        for (let resource in task.rewards) {
            rewardsText += `${resource}: ${task.rewards[resource]} `;
        }
        
        div.innerHTML = `
            <div class="task-header">
                <span class="task-name">${task.name}</span>
                <span class="task-status ${task.completed ? 'completed' : 'pending'}">
                    ${task.completed ? '已完成' : '进行中'}
                </span>
            </div>
            <div class="task-description">${task.description}</div>
            <div class="task-rewards">${rewardsText}</div>
            <button class="task-btn ${task.completed ? 'claimed' : ''}" id="task_${type}_${task.id}" ${task.completed ? 'disabled' : ''}>
                ${task.completed ? '已领取' : '领取奖励'}
            </button>
        `;
        
        // 添加领取奖励按钮事件
        if (!task.completed) {
            div.querySelector(`#task_${type}_${task.id}`).addEventListener('click', () => {
                this.claimTaskReward(task, type);
            });
        }
        
        return div;
    },
    
    // 检查任务完成情况
    checkTasks: function() {
        // 检查主线任务
        this.tasks.main.forEach(task => {
            if (!task.completed && this.isTaskCompleted(task)) {
                task.completed = true;
            }
        });
        
        // 检查日常任务
        this.tasks.daily.forEach(task => {
            if (!task.completed && this.isTaskCompleted(task)) {
                task.completed = true;
            }
        });
        
        // 更新任务UI
        this.generateTasks('main');
        this.generateTasks('daily');
    },
    
    // 检查单个任务是否完成
    isTaskCompleted: function(task) {
        const requirements = task.requirements;
        
        // 检查建筑要求
        if (requirements.buildings) {
            if (typeof requirements.buildings === 'number') {
                // 任意建筑数量要求
                let totalBuildings = 0;
                for (let building in this.buildings) {
                    totalBuildings += this.buildings[building].count;
                }
                if (totalBuildings < requirements.buildings) {
                    return false;
                }
            } else {
                // 特定建筑数量要求
                for (let building in requirements.buildings) {
                    if ((this.buildings[building]?.count || 0) < requirements.buildings[building]) {
                        return false;
                    }
                }
            }
        }
        
        // 检查资源要求
        if (requirements.resources) {
            for (let resource in requirements.resources) {
                if (this.resources[resource].amount < requirements.resources[resource]) {
                    return false;
                }
            }
        }
        
        // 检查工人要求
        if (requirements.workers) {
            if (this.getTotalWorkers() < requirements.workers) {
                return false;
            }
        }
        
        // 检查科技要求
        if (requirements.technologies) {
            if (typeof requirements.technologies === 'number') {
                // 任意科技数量要求
                let unlockedTechs = 0;
                for (let tech in this.technologies) {
                    if (this.technologies[tech].unlocked) {
                        unlockedTechs++;
                    }
                }
                if (unlockedTechs < requirements.technologies) {
                    return false;
                }
            }
        }
        
        return true;
    },
    
    // 领取任务奖励
    claimTaskReward: function(task, type) {
        if (this.isTaskCompleted(task)) {
            // 发放奖励
            for (let resource in task.rewards) {
                this.resources[resource].amount += task.rewards[resource];
            }
            
            task.completed = true;
            this.updateUI();
            this.generateTasks(type);
            alert('任务完成！已获得奖励！');
        }
    },
    
    // 手动采集猫薄荷
    collectCatnip: function() {
        this.resources.catnip.amount += 1;
        this.updateUI();
        
        // 添加点击动画
        const btn = document.getElementById('collectBtn');
        btn.classList.add('pulse-animation');
        setTimeout(() => btn.classList.remove('pulse-animation'), 300);
    },
    
    // 开始游戏循环
    startGameLoop: function() {
        this.lastUpdate = Date.now();
        this.gameLoop = setInterval(() => this.update(), 1000);
    },
    
    // 更新游戏状态
    update: function() {
        const now = Date.now();
        const deltaTime = (now - this.lastUpdate) / 1000;
        this.lastUpdate = now;
        
        this.calculateProduction();
        this.produceResources(deltaTime);
        
        // 更新研究进度
        for (let techId in this.technologies) {
            const tech = this.technologies[techId];
            if (tech.isResearching && !tech.unlocked) {
                // 使用研究点数推进研究进度
                if (this.resources.researchPoints.amount > 0) {
                    const pointsToUse = Math.min(this.resources.researchPoints.amount, deltaTime * this.resources.researchPoints.rate);
                    tech.progress += pointsToUse;
                    this.resources.researchPoints.amount -= pointsToUse;
                    
                    // 确保资源不会为负数
                    this.resources.researchPoints.amount = Math.max(0, this.resources.researchPoints.amount);
                }
                
                // 检查研究是否完成
                if (tech.progress >= tech.requiredPoints) {
                    tech.unlocked = true;
                    tech.isResearching = false;
                    this.calculateProduction();
                }
            }
        }
        
        this.checkEventTrigger();
        this.updateUI();
    },
    
    // 计算资源生产速率
    calculateProduction: function() {
        // 重置所有速率
        for (let resource in this.resources) {
            this.resources[resource].rate = 0;
        }
        
        // 计算建筑生产和消耗
        for (let buildingId in this.buildings) {
            const building = this.buildings[buildingId];
            if (building.count > 0) {
                // 计算建筑生产
                if (building.production) {
                    for (let resource in building.production) {
                        // 考虑工人数量和科技加成
                        const workerMultiplier = building.workers / building.maxWorkers || 1;
                        const techMultiplier = this.getTechMultiplier(buildingId, 'productionMultiplier') || 1;
                        const automationBonus = this.getTechMultiplier(buildingId, 'automationBonus') || 1;
                        const productionMultiplier = this.getTechMultiplier(buildingId, 'productionMultiplier') || 1;
                        
                        // 计算总产量
                        let production = building.production[resource] * building.count * workerMultiplier * techMultiplier * automationBonus * productionMultiplier;
                        this.resources[resource].rate += production;
                    }
                }
                
                // 计算建筑消耗
                if (building.input) {
                    for (let resource in building.input) {
                        // 考虑工人数量和科技加成
                        const workerMultiplier = building.workers / building.maxWorkers || 1;
                        const inputReduction = this.getTechMultiplier(buildingId, 'inputReduction') || 1;
                        
                        // 计算总消耗（负值）
                        let consumption = building.input[resource] * building.count * workerMultiplier * inputReduction;
                        this.resources[resource].rate -= consumption;
                    }
                }
                
                // 计算建筑效果
                if (building.count > 0 && building.effect) {
                    for (let resource in building.effect) {
                        const techMultiplier = this.getTechMultiplier(buildingId, 'effectMultiplier') || 1;
                        if (resource === 'maxPopulation') {
                            // 对于人口上限，设置为建筑数量乘以效果值
                            this.resources[resource].amount = building.effect[resource] * building.count * techMultiplier;
                            // 同时增加人口数量，确保人口与上限匹配
                            this.resources.population.amount = this.resources.maxPopulation.amount;
                        } else {
                            this.resources[resource].amount = building.effect[resource] * building.count * techMultiplier;
                        }
                    }
                }
            }
        }
        
        // 取消人口自然增长
        this.resources.population.rate = 0;
        
        // 计算工人消耗猫薄荷
        const totalWorkers = this.getTotalWorkers();
        let catnipConsumption = 0;
        
        if (totalWorkers <= 5) {
            // 5名及以下工人，每人每秒消耗5猫薄荷
            catnipConsumption = totalWorkers * 5;
        } else {
            // 5名以上工人，前5名每人5，新增每人10
            catnipConsumption = 5 * 5 + (totalWorkers - 5) * 10;
        }
        
        // 设置猫薄荷消耗速率（负值）
        this.resources.catnip.rate -= catnipConsumption;
    },
    
    // 生产资源
    produceResources: function(deltaTime) {
        // 先检查所有建筑的输入需求是否满足
        let canProduce = {};
        for (let buildingId in this.buildings) {
            const building = this.buildings[buildingId];
            canProduce[buildingId] = true;
            
            // 检查建筑是否有输入需求且资源是否足够
            if (building.count > 0 && building.input) {
                for (let resource in building.input) {
                    const requiredPerSecond = building.input[resource] * building.count * (building.workers / building.maxWorkers || 1);
                    if (this.resources[resource].amount < requiredPerSecond * deltaTime) {
                        canProduce[buildingId] = false;
                        break;
                    }
                }
            }
        }
        
        // 生产资源
        for (let resource in this.resources) {
            if (resource !== 'maxPopulation') {
                let productionRate = this.resources[resource].rate;
                
                // 如果是消耗型资源，确保不会超过当前拥有量
                if (productionRate < 0) {
                    const maxConsumption = this.resources[resource].amount / deltaTime;
                    productionRate = Math.max(productionRate, -maxConsumption);
                }
                
                // 更新资源数量
                this.resources[resource].amount += productionRate * deltaTime;
                
                // 确保资源不会是负数
                this.resources[resource].amount = Math.max(0, this.resources[resource].amount);
                
                // 人口不能超过上限
                if (resource === 'population') {
                    this.resources[resource].amount = Math.min(this.resources[resource].amount, this.resources.maxPopulation.amount);
                }
            }
        }
    },
    
    // 获取科技加成
    getTechMultiplier: function(buildingId, multiplierType) {
        let multiplier = 1;
        for (let techId in this.technologies) {
            const tech = this.technologies[techId];
            if (tech.unlocked && tech.effect) {
                // 全局科技加成
                if (tech.effect[multiplierType] && !tech.effect.building) {
                    multiplier *= tech.effect[multiplierType];
                }
                // 特定建筑科技加成
                else if (tech.effect.building === buildingId && tech.effect[multiplierType]) {
                    multiplier *= tech.effect[multiplierType];
                }
            }
        }
        return multiplier;
    },
    
    // 检查建筑是否已解锁
    isBuildingUnlocked: function(buildingId) {
        // 基础建筑默认解锁
        const basicBuildings = ['catnipFarm', 'refinery', 'cottage', 'fishFarm', 'restaurant', 'toyFactory', 'market', 'library', 'adventureCamp', 'lumberMill', 'mine'];
        if (basicBuildings.includes(buildingId)) {
            return true;
        }
        
        // 检查是否有科技解锁了该建筑
        for (let techId in this.technologies) {
            const tech = this.technologies[techId];
            if (tech.unlocked && tech.effect && tech.effect.unlockBuilding === buildingId) {
                return true;
            }
        }
        
        return false;
    },
    
    // 购买建筑
    buyBuilding: function(buildingId) {
        const building = this.buildings[buildingId];
        
        // 检查建筑是否已解锁
        if (!this.isBuildingUnlocked(buildingId)) {
            return false;
        }
        
        // 检查资源是否足够
        for (let resource in building.cost) {
            if (this.resources[resource].amount < building.cost[resource]) {
                return false;
            }
        }
        
        // 扣除资源
        for (let resource in building.cost) {
            this.resources[resource].amount -= building.cost[resource];
        }
        
        // 增加建筑数量
        building.count++;
        
        // 更新成本（每次购买后成本增加）
        for (let resource in building.cost) {
            building.cost[resource] = Math.floor(building.cost[resource] * 1.15);
        }
        
        this.calculateProduction();
        this.updateUI();
        
        // 自动保存游戏
        this.autoSave();
        return true;
    },
    
    // 分配工人
    assignWorker: function(buildingId, direction) {
        const building = this.buildings[buildingId];
        const availableWorkers = this.resources.population.amount - this.getTotalWorkers();
        let hasChanged = false;
        
        if (direction === '+' && availableWorkers > 0 && building.workers < building.maxWorkers * building.count) {
            building.workers++;
            hasChanged = true;
        } else if (direction === '-' && building.workers > 0) {
            building.workers--;
            hasChanged = true;
        }
        
        if (hasChanged) {
            this.calculateProduction();
            this.updateUI();
            // 自动保存游戏
            this.autoSave();
        }
    },
    
    // 获取当前总工人数量
    getTotalWorkers: function() {
        let total = 0;
        for (let buildingId in this.buildings) {
            total += this.buildings[buildingId].workers;
        }
        return total;
    },
    
    // 研究科技
    researchTech: function(techId) {
        const tech = this.technologies[techId];
        
        // 检查科技是否已解锁或正在研究
        if (tech.unlocked || tech.isResearching) return false;
        
        // 检查资源是否足够
        for (let resource in tech.cost) {
            if (this.resources[resource].amount < tech.cost[resource]) {
                return false;
            }
        }
        
        // 扣除资源
        for (let resource in tech.cost) {
            this.resources[resource].amount -= tech.cost[resource];
        }
        
        // 开始研究
        tech.isResearching = true;
        tech.progress = 0;
        
        this.updateUI();
        // 自动保存游戏
        this.autoSave();
        return true;
    },
    
    // 生成建筑UI
    generateBuildings: function() {
        const container = document.getElementById('buildingsGrid');
        container.innerHTML = '';
        
        for (let buildingId in this.buildings) {
            const building = this.buildings[buildingId];
            const buildingElement = this.createBuildingElement(buildingId, building);
            container.appendChild(buildingElement);
        }
    },
    
    // 创建建筑元素
    createBuildingElement: function(buildingId, building) {
        const div = document.createElement('div');
        div.className = 'building-item';
        
        // 检查建筑是否已解锁
        const isUnlocked = this.isBuildingUnlocked(buildingId);
        
        // 构建成本文本
        let costText = '成本: ';
        for (let resource in building.cost) {
            costText += `${resource}: ${building.cost[resource]} `;
        }
        
        // 构建输入消耗文本
        let inputText = '';
        if (building.input) {
            inputText = '持续消耗: ';
            for (let resource in building.input) {
                inputText += `${resource}: ${building.input[resource]}/s `;
            }
        }
        
        // 构建建筑HTML
        div.innerHTML = `
            <div class="building-header">
                <span class="building-name">${building.name}</span>
                <span class="building-count">${building.count}</span>
            </div>
            <div class="building-description">${building.description}</div>
            ${inputText ? `<div class="building-input">${inputText}</div>` : ''}
            <div class="building-cost">${costText}</div>
            <button class="building-btn ${!isUnlocked ? 'locked' : ''}" id="build_${buildingId}" ${!isUnlocked ? 'disabled' : ''}>
                ${!isUnlocked ? '未解锁' : '建造'}
            </button>
        `;
        
        // 添加建造按钮事件
        if (isUnlocked) {
            div.querySelector(`#build_${buildingId}`).addEventListener('click', () => {
                this.buyBuilding(buildingId);
                this.generateBuildings();
            });
        }
        
        return div;
    },
    
    // 生成工作分配UI
    generateJobs: function() {
        const container = document.getElementById('jobsContainer');
        container.innerHTML = '';
        
        const availableWorkers = this.resources.population.amount - this.getTotalWorkers();
        
        // 添加可用工人显示
        const availableWorkersDiv = document.createElement('div');
        availableWorkersDiv.className = 'job-item';
        availableWorkersDiv.innerHTML = `
            <div class="job-header">
                <span class="job-name">可用工人</span>
                <span class="job-count">${availableWorkers.toFixed(0)}</span>
            </div>
        `;
        container.appendChild(availableWorkersDiv);
        
        // 生成每个工作的分配界面
        for (let job of this.jobs) {
            const building = this.buildings[job.building];
            if (building.count > 0) {
                const jobElement = this.createJobElement(job, building);
                container.appendChild(jobElement);
            }
        }
    },
    
    // 创建工作元素
    createJobElement: function(job, building) {
        const div = document.createElement('div');
        div.className = 'job-item';
        
        div.innerHTML = `
            <div class="job-header">
                <span class="job-name">${job.name}</span>
                <div class="job-controls">
                    <button class="job-btn" id="job_minus_${job.id}">-</button>
                    <span class="job-count" id="job_count_${job.id}">${building.workers}</span>
                    <button class="job-btn" id="job_plus_${job.id}">+</button>
                </div>
            </div>
        `;
        
        // 添加事件监听
        div.querySelector(`#job_plus_${job.id}`).addEventListener('click', () => {
            this.assignWorker(job.building, '+');
            this.generateJobs();
        });
        
        div.querySelector(`#job_minus_${job.id}`).addEventListener('click', () => {
            this.assignWorker(job.building, '-');
            this.generateJobs();
        });
        
        return div;
    },
    
    // 生成科技UI
    generateTechnologies: function() {
        const container = document.getElementById('techGrid');
        container.innerHTML = '';
        
        for (let techId in this.technologies) {
            const tech = this.technologies[techId];
            const techElement = this.createTechElement(techId, tech);
            container.appendChild(techElement);
        }
    },
    
    // 创建科技元素
    createTechElement: function(techId, tech) {
        const div = document.createElement('div');
        div.className = 'tech-item';
        
        // 构建成本文本
        let costText = '研究成本: ';
        for (let resource in tech.cost) {
            costText += `${resource}: ${tech.cost[resource]} `;
        }
        
        // 构建研究进度HTML
        let researchProgressHTML = '';
        if (tech.isResearching) {
            const progressPercent = Math.min(100, (tech.progress / tech.requiredPoints) * 100);
            researchProgressHTML = `
                <div class="tech-progress-container">
                    <div class="tech-progress-bar">
                        <div class="tech-progress-fill" style="width: ${progressPercent}%"></div>
                    </div>
                    <div class="tech-progress-text">
                        ${Math.floor(tech.progress)}/${tech.requiredPoints} 研究点数
                    </div>
                </div>
            `;
        }
        
        div.innerHTML = `
            <div class="tech-name">${tech.name}</div>
            <div class="tech-description">${tech.description}</div>
            <div class="tech-cost">${costText}</div>
            ${researchProgressHTML}
            <button class="tech-btn ${tech.unlocked ? 'unlocked' : ''} ${tech.isResearching ? 'researching' : ''}" id="tech_${techId}" ${tech.unlocked || tech.isResearching ? 'disabled' : ''}>
                ${tech.unlocked ? '已解锁' : tech.isResearching ? '研究中' : '研究'}
            </button>
        `;
        
        // 添加研究按钮事件
        if (!tech.unlocked && !tech.isResearching) {
            div.querySelector(`#tech_${techId}`).addEventListener('click', () => {
                this.researchTech(techId);
                this.generateTechnologies();
            });
        }
        
        return div;
    },
    
    // 更新UI
    updateUI: function() {
        // 更新资源显示
        document.getElementById('catnip').textContent = this.resources.catnip.amount.toFixed(0);
        document.getElementById('catnipRate').textContent = `+${this.resources.catnip.rate.toFixed(1)}/s`;
        
        document.getElementById('catnipWood').textContent = this.resources.catnipWood.amount.toFixed(0);
        document.getElementById('catnipWoodRate').textContent = `+${this.resources.catnipWood.rate.toFixed(1)}/s`;
        
        document.getElementById('fish').textContent = this.resources.fish.amount.toFixed(0);
        document.getElementById('fishRate').textContent = `+${this.resources.fish.rate.toFixed(1)}/s`;
        
        document.getElementById('catSnack').textContent = this.resources.catSnack.amount.toFixed(0);
        document.getElementById('catSnackRate').textContent = `+${this.resources.catSnack.rate.toFixed(1)}/s`;
        
        document.getElementById('catToy').textContent = this.resources.catToy.amount.toFixed(0);
        document.getElementById('catToyRate').textContent = `+${this.resources.catToy.rate.toFixed(1)}/s`;
        
        document.getElementById('catCoin').textContent = this.resources.catCoin.amount.toFixed(0);
        document.getElementById('catCoinRate').textContent = `+${this.resources.catCoin.rate.toFixed(1)}/s`;
        
        document.getElementById('mineral').textContent = this.resources.mineral.amount.toFixed(0);
        document.getElementById('mineralRate').textContent = `+${this.resources.mineral.rate.toFixed(1)}/s`;
        
        document.getElementById('researchPoints').textContent = this.resources.researchPoints.amount.toFixed(0);
        document.getElementById('researchPointsRate').textContent = `+${this.resources.researchPoints.rate.toFixed(1)}/s`;
        
        document.getElementById('population').textContent = this.resources.population.amount.toFixed(0);
        document.getElementById('populationRate').textContent = `+${this.resources.population.rate.toFixed(1)}/s`;
        
        // 更新建筑和科技状态
        this.generateBuildings();
        this.generateJobs();
        this.generateTechnologies();
    },
    
    // 保存游戏
    saveGame: function() {
        const gameData = {
            resources: this.resources,
            buildings: this.buildings,
            technologies: this.technologies
        };
        localStorage.setItem('catCityBuilderSave', JSON.stringify(gameData));
        alert('游戏已保存');
    },
    
    // 自动保存游戏
    autoSave: function() {
        const gameData = {
            resources: this.resources,
            buildings: this.buildings,
            technologies: this.technologies
        };
        localStorage.setItem('catCityBuilderSave', JSON.stringify(gameData));
    },
    
    // 加载游戏
    loadGame: function() {
        const savedData = localStorage.getItem('catCityBuilderSave');
        if (savedData) {
            const gameData = JSON.parse(savedData);
            this.resources = gameData.resources;
            this.buildings = gameData.buildings;
            this.technologies = gameData.technologies;
            this.calculateProduction();
            this.updateUI();
            alert('游戏已加载');
        } else {
            alert('没有找到保存的游戏');
        }
    },
    
    // 自动加载游戏
    autoLoad: function() {
        const savedData = localStorage.getItem('catCityBuilderSave');
        if (savedData) {
            const gameData = JSON.parse(savedData);
            this.resources = gameData.resources;
            this.buildings = gameData.buildings;
            this.technologies = gameData.technologies;
            this.calculateProduction();
        }
    },
    
    // 重置游戏
    resetGame: function() {
        if (confirm('确定要重置游戏吗？所有进度将丢失！')) {
            // 重置资源
            this.resources = {
                catnip: { amount: 0, rate: 0 },
                catnipWood: { amount: 0, rate: 0 },
                fish: { amount: 0, rate: 0 },
                catSnack: { amount: 0, rate: 0 },
                catToy: { amount: 0, rate: 0 },
                catCoin: { amount: 0, rate: 0 },
                mineral: { amount: 0, rate: 0 },
                ironOre: { amount: 0, rate: 0 },
                copperOre: { amount: 0, rate: 0 },
                goldOre: { amount: 0, rate: 0 },
                ironIngot: { amount: 0, rate: 0 },
                copperIngot: { amount: 0, rate: 0 },
                goldIngot: { amount: 0, rate: 0 },
                oil: { amount: 0, rate: 0 },
                plastic: { amount: 0, rate: 0 },
                electronicParts: { amount: 0, rate: 0 },
                advancedMaterial: { amount: 0, rate: 0 },
                researchPoints: { amount: 0, rate: 0 },
                population: { amount: 1, rate: 0 },
                maxPopulation: { amount: 5, rate: 0 }
            };
            
            // 重置建筑
            this.buildings = {
                catnipFarm: {
                    name: "猫薄荷田",
                    count: 0,
                    cost: { catnip: 10 },
                    description: "自动生产猫薄荷",
                    production: { catnip: 0.5 },
                    workers: 0,
                    maxWorkers: 1
                },
                refinery: {
                    name: "精炼厂",
                    count: 0,
                    cost: { catnip: 50, catnipWood: 10 },
                    description: "将猫薄荷精炼为猫薄荷木",
                    production: { catnipWood: 0.3 },
                    input: { catnip: 1 },
                    workers: 0,
                    maxWorkers: 1
                },
                cottage: {
                    name: "小屋",
                    count: 0,
                    cost: { catnip: 100, catnipWood: 20 },
                    description: "增加1名小猫咪工人",
                    effect: { maxPopulation: 1 },
                    workers: 0,
                    maxWorkers: 0
                },
                fishFarm: {
                    name: "鱼场",
                    count: 0,
                    cost: { catnip: 200, catnipWood: 50 },
                    description: "生产鱼干",
                    production: { fish: 0.4 },
                    workers: 0,
                    maxWorkers: 1
                },
                restaurant: {
                    name: "餐厅",
                    count: 0,
                    cost: { catnip: 300, catnipWood: 80, fish: 50 },
                    description: "生产猫零食",
                    production: { catSnack: 0.5 },
                    input: { fish: 1 },
                    workers: 0,
                    maxWorkers: 2
                },
                toyFactory: {
                    name: "玩具厂",
                    count: 0,
                    cost: { catnip: 400, catnipWood: 120, fish: 80 },
                    description: "生产猫玩具",
                    production: { catToy: 0.4 },
                    input: { catnipWood: 2 },
                    workers: 0,
                    maxWorkers: 2
                },
                market: {
                    name: "市场",
                    count: 0,
                    cost: { catnip: 500, catnipWood: 150, fish: 100 },
                    description: "生产猫币",
                    production: { catCoin: 0.6 },
                    input: { catSnack: 1, catToy: 1 },
                    workers: 0,
                    maxWorkers: 2
                },
                library: {
                    name: "图书馆",
                    count: 0,
                    cost: { catnip: 600, catnipWood: 200, catCoin: 50 },
                    description: "生产研究点数，需要科学家才能工作",
                    production: { researchPoints: 1 },
                    workers: 0,
                    maxWorkers: 2
                },
                adventureCamp: {
                    name: "探险营",
                    count: 0,
                    cost: { catnip: 700, catnipWood: 250, catToy: 100 },
                    description: "探索获得随机资源",
                    effect: { exploration: 0.1 },
                    workers: 0,
                    maxWorkers: 3
                },
                lumberMill: {
                    name: "伐木场",
                    count: 0,
                    cost: { catnip: 300 },
                    description: "生产猫薄荷木，需要伐木工才能工作",
                    production: { catnipWood: 1 },
                    workers: 0,
                    maxWorkers: 2
                },
                mine: {
                    name: "矿场",
                    count: 0,
                    cost: { catnip: 500, catnipWood: 100 },
                    description: "生产矿产资源，需要矿工才能工作",
                    production: { mineral: 0.5 },
                    input: { catnip: 2 }, // 持续消耗猫薄荷
                    workers: 0,
                    maxWorkers: 2
                },
                ironMine: {
                    name: "铁矿",
                    count: 0,
                    cost: { catnip: 1000, catnipWood: 300, mineral: 100 },
                    description: "生产铁矿石，需要矿工才能工作",
                    production: { ironOre: 0.5 },
                    input: { catnip: 3 }, // 持续消耗猫薄荷
                    workers: 0,
                    maxWorkers: 3
                },
                copperMine: {
                    name: "铜矿",
                    count: 0,
                    cost: { catnip: 1500, catnipWood: 500, ironOre: 100 },
                    description: "生产铜矿石，需要矿工才能工作",
                    production: { copperOre: 0.5 },
                    input: { catnip: 4 }, // 持续消耗猫薄荷
                    workers: 0,
                    maxWorkers: 3
                },
                goldMine: {
                    name: "金矿",
                    count: 0,
                    cost: { catnip: 2500, catnipWood: 800, copperOre: 200 },
                    description: "生产金矿石，需要矿工才能工作",
                    production: { goldOre: 0.3 },
                    input: { catnip: 5 }, // 持续消耗猫薄荷
                    workers: 0,
                    maxWorkers: 4
                },
                smelter: {
                    name: "冶炼厂",
                    count: 0,
                    cost: { catnip: 800, catnipWood: 200, mineral: 150 },
                    description: "将矿石冶炼成锭，需要工人才能工作",
                    production: { ironIngot: 0.4, copperIngot: 0.4 },
                    input: { ironOre: 2, copperOre: 2, catnip: 5 }, // 持续消耗资源
                    workers: 0,
                    maxWorkers: 3
                },
                oilWell: {
                    name: "油井",
                    count: 0,
                    cost: { catnip: 3000, ironIngot: 300, copperIngot: 200 },
                    description: "开采石油，需要工人才能工作",
                    production: { oil: 0.3 },
                    input: { catnip: 8, ironIngot: 0.1 }, // 持续消耗资源
                    workers: 0,
                    maxWorkers: 4
                },
                refinery: {
                    name: "精炼厂",
                    count: 0,
                    cost: { catnip: 5000, ironIngot: 500, oil: 200 },
                    description: "将石油精炼成塑料和其他产品，需要工人才能工作",
                    production: { plastic: 0.4, electronicParts: 0.2 },
                    input: { oil: 2, copperIngot: 1, catnip: 10 }, // 持续消耗资源
                    workers: 0,
                    maxWorkers: 5
                },
                advancedFactory: {
                    name: "高级工厂",
                    count: 0,
                    cost: { catnip: 10000, ironIngot: 800, plastic: 500, electronicParts: 300 },
                    description: "生产高级材料，需要工人才能工作",
                    production: { advancedMaterial: 0.2 },
                    input: { ironIngot: 2, copperIngot: 2, plastic: 3, electronicParts: 1, catnip: 15 }, // 持续消耗资源
                    workers: 0,
                    maxWorkers: 6
                },
                nuclearPlant: {
                    name: "核电站",
                    count: 0,
                    cost: { catnip: 20000, advancedMaterial: 1000, electronicParts: 800 },
                    description: "提供大量能源，需要工人才能工作",
                    production: { catnip: 10 }, // 生产猫薄荷作为能源产物
                    input: { advancedMaterial: 0.5, electronicParts: 0.3, catnip: 20 }, // 持续消耗大量资源
                    workers: 0,
                    maxWorkers: 8
                }
            };
            
            // 重置科技
            this.technologies = {
                advancedFarming: {
                    name: "高级农业",
                    unlocked: false,
                    cost: { catnip: 200, catnipWood: 50 },
                    description: "提高猫薄荷田产量",
                    effect: { building: "catnipFarm", productionMultiplier: 1.5 }
                },
                efficientRefining: {
                    name: "高效精炼",
                    unlocked: false,
                    cost: { catnip: 300, catnipWood: 100, fish: 50 },
                    description: "提高精炼厂产量",
                    effect: { building: "refinery", productionMultiplier: 1.5 }
                },
                improvedHousing: {
                    name: "改良住房",
                    unlocked: false,
                    cost: { catnip: 500, catnipWood: 200 },
                    description: "提高小屋的人口上限",
                    effect: { building: "cottage", effectMultiplier: 1.5 }
                },
                advancedFishing: {
                    name: "高级渔业",
                    unlocked: false,
                    cost: { catnip: 400, catnipWood: 150, fish: 100 },
                    description: "提高鱼场产量",
                    effect: { building: "fishFarm", productionMultiplier: 1.5 }
                },
                advancedCooking: {
                    name: "高级烹饪",
                    unlocked: false,
                    cost: { catnip: 500, catnipWood: 100, fish: 150 },
                    description: "提高餐厅产量",
                    effect: { building: "restaurant", productionMultiplier: 1.5 }
                },
                nutritiousSnacks: {
                    name: "营养零食",
                    unlocked: false,
                    cost: { catnip: 600, catnipWood: 120, catSnack: 100 },
                    description: "猫零食提高人口增长",
                    effect: { populationGrowth: 0.2 }
                },
                advancedToyMaking: {
                    name: "高级玩具制造",
                    unlocked: false,
                    cost: { catnip: 700, catnipWood: 180, fish: 200 },
                    description: "提高玩具厂产量",
                    effect: { building: "toyFactory", productionMultiplier: 1.5 }
                },
                educationalToys: {
                    name: "教育玩具",
                    unlocked: false,
                    cost: { catnip: 800, catnipWood: 200, catToy: 150 },
                    description: "猫玩具提高科技研究速度",
                    effect: { techSpeed: 0.3 }
                },
                efficientTrading: {
                    name: "高效贸易",
                    unlocked: false,
                    cost: { catnip: 900, catnipWood: 250, catCoin: 100 },
                    description: "提高市场产量",
                    effect: { building: "market", productionMultiplier: 1.5 }
                },
                catEconomy: {
                    name: "猫币经济",
                    unlocked: false,
                    cost: { catnip: 1000, catnipWood: 300, catCoin: 200 },
                    description: "使用猫币降低建筑成本",
                    effect: { buildingCostReduction: 0.2 }
                },
                advancedLearning: {
                    name: "高级学习",
                    unlocked: false,
                    cost: { catnip: 1100, catnipWood: 350, catCoin: 250 },
                    description: "进一步提高图书馆研究速度",
                    effect: { building: "library", effectMultiplier: 2 }
                },
                explorationTechniques: {
                    name: "探索技巧",
                    unlocked: false,
                    cost: { catnip: 1200, catnipWood: 400, catToy: 300 },
                    description: "提高探险营发现资源的频率",
                    effect: { building: "adventureCamp", effectMultiplier: 1.5 }
                },
                treasureHunting: {
                    name: "寻宝",
                    unlocked: false,
                    cost: { catnip: 1300, catnipWood: 450, catCoin: 350 },
                    description: "提高探险营发现资源的质量",
                    effect: { explorationQuality: 1.5 }
                },
                resourceEfficiency: {
                    name: "资源效率",
                    unlocked: false,
                    cost: { catnip: 1400, catnipWood: 500, catCoin: 400 },
                    description: "降低所有建筑的输入成本",
                    effect: { inputReduction: 0.3 }
                },
                automation: {
                    name: "自动化",
                    unlocked: false,
                    cost: { catnip: 1500, catnipWood: 550, catCoin: 450 },
                    description: "提高建筑产量而不需要更多工人",
                    effect: { automationBonus: 0.4 }
                }
            };
            
            this.calculateProduction();
            this.updateUI();
            alert('游戏已重置');
        }
    }
};

// 游戏初始化
window.addEventListener('DOMContentLoaded', () => {
    Game.init();
});