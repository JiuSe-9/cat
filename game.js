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
            description: "增加人口上限",
            effect: { maxPopulation: 5 },
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
            description: "提高科技研究效率",
            effect: { techSpeed: 0.2 },
            workers: 0,
            maxWorkers: 1
        },
        adventureCamp: {
            name: "探险营",
            count: 0,
            cost: { catnip: 700, catnipWood: 250, catToy: 100 },
            description: "探索获得随机资源",
            effect: { exploration: 0.1 },
            workers: 0,
            maxWorkers: 3
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
        { id: "scholar", name: "学者", building: "library" },
        { id: "adventurer", name: "探险家", building: "adventureCamp" }
    ],
    
    // 科技树数据
    technologies: {
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
        this.setupEventListeners();
        this.updateUI();
        this.startGameLoop();
        this.generateBuildings();
        this.generateJobs();
        this.generateTechnologies();
        this.generateTasks('main');
        this.generateTasks('daily');
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
        
        // 贸易系统事件监听器
        this.setupTradeEventListeners();
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
        this.checkTasks();
        this.checkEventTrigger();
        this.updateUI();
    },
    
    // 计算资源生产速率
    calculateProduction: function() {
        // 重置所有速率
        for (let resource in this.resources) {
            this.resources[resource].rate = 0;
        }
        
        // 计算建筑生产
        for (let buildingId in this.buildings) {
            const building = this.buildings[buildingId];
            if (building.count > 0 && building.production) {
                for (let resource in building.production) {
                    // 考虑工人数量和科技加成
                    const workerMultiplier = building.workers / building.maxWorkers || 1;
                    const techMultiplier = this.getTechMultiplier(buildingId, 'productionMultiplier') || 1;
                    this.resources[resource].rate += building.production[resource] * building.count * workerMultiplier * techMultiplier;
                }
            }
            
            // 计算建筑效果
            if (building.count > 0 && building.effect) {
                for (let resource in building.effect) {
                    const techMultiplier = this.getTechMultiplier(buildingId, 'effectMultiplier') || 1;
                    this.resources[resource].amount = building.effect[resource] * building.count * techMultiplier;
                }
            }
        }
        
        // 人口增长速率
        this.resources.population.rate = Math.max(0, 0.1 * (this.resources.population.amount / this.resources.maxPopulation.amount));
    },
    
    // 生产资源
    produceResources: function(deltaTime) {
        for (let resource in this.resources) {
            if (resource !== 'maxPopulation') {
                this.resources[resource].amount += this.resources[resource].rate * deltaTime;
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
            if (tech.unlocked && tech.effect && tech.effect.building === buildingId && tech.effect[multiplierType]) {
                multiplier *= tech.effect[multiplierType];
            }
        }
        return multiplier;
    },
    
    // 购买建筑
    buyBuilding: function(buildingId) {
        const building = this.buildings[buildingId];
        
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
        return true;
    },
    
    // 分配工人
    assignWorker: function(buildingId, direction) {
        const building = this.buildings[buildingId];
        const availableWorkers = this.resources.population.amount - this.getTotalWorkers();
        
        if (direction === '+' && availableWorkers > 0 && building.workers < building.maxWorkers * building.count) {
            building.workers++;
        } else if (direction === '-' && building.workers > 0) {
            building.workers--;
        }
        
        this.calculateProduction();
        this.updateUI();
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
        
        // 检查科技是否已解锁
        if (tech.unlocked) return false;
        
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
        
        // 解锁科技
        tech.unlocked = true;
        
        this.calculateProduction();
        this.updateUI();
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
        
        // 构建成本文本
        let costText = '成本: ';
        for (let resource in building.cost) {
            costText += `${resource}: ${building.cost[resource]} `;
        }
        
        div.innerHTML = `
            <div class="building-header">
                <span class="building-name">${building.name}</span>
                <span class="building-count">${building.count}</span>
            </div>
            <div class="building-description">${building.description}</div>
            <div class="building-cost">${costText}</div>
            <button class="building-btn" id="build_${buildingId}">建造</button>
        `;
        
        // 添加建造按钮事件
        div.querySelector(`#build_${buildingId}`).addEventListener('click', () => {
            this.buyBuilding(buildingId);
            this.generateBuildings();
        });
        
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
        
        div.innerHTML = `
            <div class="tech-name">${tech.name}</div>
            <div class="tech-description">${tech.description}</div>
            <div class="tech-cost">${costText}</div>
            <button class="tech-btn ${tech.unlocked ? 'unlocked' : ''}" id="tech_${techId}" ${tech.unlocked ? 'disabled' : ''}>
                ${tech.unlocked ? '已解锁' : '研究'}
            </button>
        `;
        
        // 添加研究按钮事件
        if (!tech.unlocked) {
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
                    description: "增加人口上限",
                    effect: { maxPopulation: 5 },
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
                    description: "提高科技研究效率",
                    effect: { techSpeed: 0.2 },
                    workers: 0,
                    maxWorkers: 1
                },
                adventureCamp: {
                    name: "探险营",
                    count: 0,
                    cost: { catnip: 700, catnipWood: 250, catToy: 100 },
                    description: "探索获得随机资源",
                    effect: { exploration: 0.1 },
                    workers: 0,
                    maxWorkers: 3
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