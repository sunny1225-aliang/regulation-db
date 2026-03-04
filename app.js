// ========================================
// 精细化工安全环保法规库 - 网页版
// ========================================

// 数据存储（localStorage 键名）
const STORAGE_KEYS = {
    FAVORITES: 'regulation_favorites',
    CHECKLIST: 'regulation_checklist',
    LAST_UPDATE: 'regulation_last_update',
    USER_DATA: 'regulation_user_data'
};

// 应用状态
const state = {
    currentView: 'standards',
    currentFilter: 'all',
    searchQuery: '',
    favorites: [],
    checklist: {},
    standards: [],
    isLoading: true
};

// DOM 元素缓存
const elements = {};

// 初始化
function init() {
    cacheElements();
    loadUserData();
    setupEventListeners();
    processData();
    
    // 模拟加载
    setTimeout(() => {
        hideLoading();
        render();
    }, 1000);
}

// 缓存 DOM 元素
function cacheElements() {
    elements.loadingScreen = document.getElementById('loadingScreen');
    elements.appContainer = document.getElementById('appContainer');
    elements.sidebar = document.getElementById('sidebar');
    elements.overlay = document.getElementById('overlay');
    elements.menuToggle = document.getElementById('menuToggle');
    elements.closeSidebar = document.getElementById('closeSidebar');
    elements.globalSearch = document.getElementById('globalSearch');
    elements.searchBtn = document.getElementById('searchBtn');
    elements.standardsGrid = document.getElementById('standardsGrid');
    elements.emptyState = document.getElementById('emptyState');
    elements.viewTitle = document.getElementById('viewTitle');
    elements.filterChips = document.getElementById('filterChips');
    elements.countAll = document.getElementById('countAll');
    elements.countSafety = document.getElementById('countSafety');
    elements.countEnv = document.getElementById('countEnv');
    elements.favoritesGrid = document.getElementById('favoritesGrid');
    elements.favoritesEmpty = document.getElementById('favoritesEmpty');
    elements.checklistContainer = document.getElementById('checklistContainer');
    elements.progressFill = document.getElementById('progressFill');
    elements.progressText = document.getElementById('progressText');
    elements.timeline = document.getElementById('timeline');
    elements.detailModal = document.getElementById('detailModal');
    elements.modalBack = document.getElementById('modalBack');
    elements.modalFavorite = document.getElementById('modalFavorite');
    elements.modalBody = document.getElementById('modalBody');
    elements.toast = document.getElementById('toast');
    elements.toastMessage = document.getElementById('toastMessage');
    elements.updateBtn = document.getElementById('updateBtn');
}

// 加载用户数据
function loadUserData() {
    try {
        const favorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
        const checklist = localStorage.getItem(STORAGE_KEYS.CHECKLIST);
        
        if (favorites) state.favorites = JSON.parse(favorites);
        if (checklist) state.checklist = JSON.parse(checklist);
    } catch (e) {
        console.error('加载用户数据失败:', e);
    }
}

// 保存用户数据
function saveUserData() {
    try {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites));
        localStorage.setItem(STORAGE_KEYS.CHECKLIST, JSON.stringify(state.checklist));
    } catch (e) {
        console.error('保存用户数据失败:', e);
    }
}

// 处理数据
function processData() {
    // 从 data.js 加载数据
    if (typeof regulationDB !== 'undefined') {
        state.standards = regulationDB.standards || [];
        
        // 更新计数
        updateCounts();
    } else {
        console.error('数据加载失败');
        state.standards = [];
    }
}

// 更新计数
function updateCounts() {
    elements.countAll.textContent = state.standards.length;
    elements.countSafety.textContent = state.standards.filter(s => s.category === '安全').length;
    elements.countEnv.textContent = state.standards.filter(s => s.category === '环保').length;
}

// 隐藏加载界面
function hideLoading() {
    elements.loadingScreen.classList.add('hidden');
    elements.appContainer.classList.remove('hidden');
    state.isLoading = false;
}

// 设置事件监听
function setupEventListeners() {
    // 侧边栏
    elements.menuToggle.addEventListener('click', openSidebar);
    elements.closeSidebar.addEventListener('click', closeSidebar);
    elements.overlay.addEventListener('click', closeSidebar);
    
    // 搜索
    elements.globalSearch.addEventListener('input', debounce(handleSearch, 300));
    elements.searchBtn.addEventListener('click', handleSearch);
    
    // 筛选
    document.querySelectorAll('.nav-link[data-filter]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const filter = link.dataset.filter;
            setFilter(filter);
            closeSidebar();
        });
    });
    
    // 视图切换
    document.querySelectorAll('.nav-link[data-view]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const view = link.dataset.view;
            switchView(view);
            closeSidebar();
        });
    });
    
    // Chip 筛选
    elements.filterChips.addEventListener('click', (e) => {
        if (e.target.classList.contains('chip')) {
            document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
            e.target.classList.add('active');
            setFilter(e.target.dataset.chip);
        }
    });
    
    // 模态框
    elements.modalBack.addEventListener('click', closeModal);
    elements.modalFavorite.addEventListener('click', toggleModalFavorite);
    
    // 更新按钮
    elements.updateBtn.addEventListener('click', checkUpdate);
    
    // 键盘快捷键
    document.addEventListener('keydown', handleKeyboard);
}

// 防抖函数
function debounce(fn, delay) {
    let timer = null;
    return function(...args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

// 打开侧边栏
function openSidebar() {
    elements.sidebar.classList.add('open');
    elements.overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

// 关闭侧边栏
function closeSidebar() {
    elements.sidebar.classList.remove('open');
    elements.overlay.classList.remove('show');
    document.body.style.overflow = '';
}

// 搜索处理
function handleSearch() {
    state.searchQuery = elements.globalSearch.value.trim().toLowerCase();
    renderStandards();
}

// 设置筛选
function setFilter(filter) {
    state.currentFilter = filter;
    state.currentView = 'standards';
    
    // 更新侧边栏激活状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.filter === filter) {
            link.classList.add('active');
        }
    });
    
    // 更新视图
    hideAllViews();
    document.getElementById('standardsView').classList.remove('hidden');
    
    // 更新标题
    const titles = {
        'all': '全部标准',
        '安全': '安全生产',
        '环保': '环境保护',
        '即将实施': '即将实施',
        '强制性': '强制性标准'
    };
    elements.viewTitle.textContent = titles[filter] || '标准列表';
    
    renderStandards();
}

// 切换视图
function switchView(view) {
    state.currentView = view;
    hideAllViews();
    
    // 更新导航激活状态
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.view === view) {
            link.classList.add('active');
        }
    });
    
    switch(view) {
        case 'standards':
            document.getElementById('standardsView').classList.remove('hidden');
            renderStandards();
            break;
        case 'favorites':
            document.getElementById('favoritesView').classList.remove('hidden');
            renderFavorites();
            break;
        case 'checklist':
            document.getElementById('checklistView').classList.remove('hidden');
            renderChecklist();
            break;
        case 'timeline':
            document.getElementById('timelineView').classList.remove('hidden');
            renderTimeline();
            break;
    }
}

// 隐藏所有视图
function hideAllViews() {
    document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
}

// 渲染主入口
function render() {
    renderStandards();
}

// 渲染标准列表
function renderStandards() {
    let filtered = state.standards;
    
    // 筛选
    if (state.currentFilter !== 'all') {
        if (state.currentFilter === '强制性') {
            filtered = filtered.filter(s => s.type.includes('强制'));
        } else if (state.currentFilter === '即将实施') {
            filtered = filtered.filter(s => s.status === '即将实施');
        } else {
            filtered = filtered.filter(s => s.category === state.currentFilter);
        }
    }
    
    // 搜索
    if (state.searchQuery) {
        filtered = filtered.filter(s => 
            s.code.toLowerCase().includes(state.searchQuery) ||
            s.name.toLowerCase().includes(state.searchQuery) ||
            s.keywords.some(k => k.toLowerCase().includes(state.searchQuery))
        );
    }
    
    // 渲染
    if (filtered.length === 0) {
        elements.standardsGrid.innerHTML = '';
        elements.emptyState.classList.remove('hidden');
    } else {
        elements.emptyState.classList.add('hidden');
        elements.standardsGrid.innerHTML = filtered.map(standard => createCardHTML(standard)).join('');
        
        // 绑定卡片点击事件
        document.querySelectorAll('.standard-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('card-favorite')) {
                    openDetail(card.dataset.id);
                }
            });
        });
        
        // 绑定收藏按钮
        document.querySelectorAll('.card-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(btn.dataset.id);
            });
        });
    }
}

// 创建卡片 HTML
function createCardHTML(standard) {
    const isFav = state.favorites.includes(standard.id);
    const tags = [];
    
    if (standard.status === '即将实施') {
        tags.push('<span class="card-tag urgent">即将实施</span>');
    }
    if (standard.type.includes('强制')) {
        tags.push('<span class="card-tag mandatory">强制</span>');
    }
    
    return `
        <div class="standard-card" data-id="${standard.id}">
            <div class="card-header">
                <span class="card-code">${standard.code}</span>
                <button class="card-favorite ${isFav ? 'active' : ''}" data-id="${standard.id}">${isFav ? '★' : '☆'}</button>
            </div>
            <div class="card-title">${standard.name}</div>
            <div class="card-meta">
                <span>${standard.category}</span>
                <span>${standard.effectiveDate}</span>
            </div>
            <div class="card-tags">
                ${tags.join('')}
            </div>
        </div>
    `;
}

// 渲染收藏夹
function renderFavorites() {
    const favs = state.standards.filter(s => state.favorites.includes(s.id));
    
    if (favs.length === 0) {
        elements.favoritesGrid.innerHTML = '';
        elements.favoritesEmpty.classList.remove('hidden');
    } else {
        elements.favoritesEmpty.classList.add('hidden');
        elements.favoritesGrid.innerHTML = favs.map(s => createCardHTML(s)).join('');
        
        document.querySelectorAll('.standard-card').forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('card-favorite')) {
                    openDetail(card.dataset.id);
                }
            });
        });
        
        document.querySelectorAll('.card-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(btn.dataset.id);
                renderFavorites();
            });
        });
    }
}

// 渲染检查清单
function renderChecklist() {
    if (typeof regulationDB === 'undefined' || !regulationDB.checklists) {
        elements.checklistContainer.innerHTML = '<div class="empty-state"><p>暂无检查清单数据</p></div>';
        return;
    }
    
    const allItems = regulationDB.checklists.flatMap(g => g.items);
    const completed = allItems.filter(item => state.checklist[item.id]).length;
    const total = allItems.length;
    const percent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    elements.progressFill.style.width = percent + '%';
    elements.progressText.textContent = percent + '%';
    
    elements.checklistContainer.innerHTML = regulationDB.checklists.map(group => {
        const groupCompleted = group.items.filter(item => state.checklist[item.id]).length;
        return `
            <div class="checklist-group">
                <div class="checklist-header">
                    <h3>${group.name}</h3>
                    <span class="checklist-count">${groupCompleted}/${group.items.length}</span>
                </div>
                <div class="checklist-items">
                    ${group.items.map(item => `
                        <div class="checklist-item" data-id="${item.id}">
                            <input type="checkbox" class="checklist-checkbox" 
                                ${state.checklist[item.id] ? 'checked' : ''}
                                data-id="${item.id}">
                            <div class="checklist-content">
                                <div class="checklist-title ${state.checklist[item.id] ? 'completed' : ''}">${item.item}</div>
                                <div class="checklist-meta">${item.standard} · ${item.method}</div>
                            </div>
                            <span class="checklist-freq">${item.frequency}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }).join('');
    
    // 绑定复选框事件
    document.querySelectorAll('.checklist-checkbox').forEach(cb => {
        cb.addEventListener('change', (e) => {
            const id = e.target.dataset.id;
            state.checklist[id] = e.target.checked;
            saveUserData();
            
            // 更新样式
            const title = e.target.nextElementSibling.querySelector('.checklist-title');
            title.classList.toggle('completed', e.target.checked);
            
            // 重新渲染进度
            renderChecklist();
        });
    });
}

// 渲染时间轴
function renderTimeline() {
    const milestones = [];
    
    // 从标准中提取
    state.standards.forEach(s => {
        if (s.effectiveDate && s.effectiveDate.match(/^\d{4}/)) {
            milestones.push({
                date: s.effectiveDate,
                title: `${s.code} 实施`,
                desc: s.name,
                type: s.status === '即将实施' ? 'urgent' : 'normal'
            });
        }
        
        if (s.checkItems) {
            s.checkItems.forEach(ci => {
                if (ci.deadline && ci.deadline.match(/\d{4}/)) {
                    const isUrgent = ci.deadline.includes('2025') && !ci.deadline.includes('2026');
                    milestones.push({
                        date: ci.deadline,
                        title: ci.item,
                        desc: `依据：${s.code}`,
                        type: isUrgent ? 'urgent' : 'warning'
                    });
                }
            });
        }
    });
    
    // 从政策中提取
    if (typeof regulationDB !== 'undefined' && regulationDB.policies) {
        regulationDB.policies.forEach(p => {
            if (p.milestones) {
                p.milestones.forEach(m => {
                    milestones.push({
                        date: m.date,
                        title: m.task,
                        desc: `依据：${p.code}`,
                        type: m.status === '应已完成' ? 'normal' : 'urgent'
                    });
                });
            }
        });
    }
    
    // 排序
    milestones.sort((a, b) => {
        const dateA = a.date.replace(/[年月]/g, '-').replace(/日?$/, '');
        const dateB = b.date.replace(/[年月]/g, '-').replace(/日?$/, '');
        return new Date(dateA) - new Date(dateB);
    });
    
    // 去重并限制数量
    const unique = milestones.slice(0, 20);
    
    elements.timeline.innerHTML = unique.map(m => `
        <div class="timeline-item">
            <div class="timeline-dot ${m.type}"></div>
            <div class="timeline-content">
                <div class="timeline-date ${m.type}">${m.date}</div>
                <div class="timeline-title">${m.title}</div>
                <div class="timeline-desc">${m.desc}</div>
            </div>
        </div>
    `).join('');
}

// 打开详情
function openDetail(id) {
    const standard = state.standards.find(s => s.id === id);
    if (!standard) return;
    
    const isFav = state.favorites.includes(id);
    elements.modalFavorite.textContent = isFav ? '★' : '☆';
    elements.modalFavorite.classList.toggle('active', isFav);
    elements.modalFavorite.dataset.id = id;
    
    elements.modalBody.innerHTML = generateDetailHTML(standard);
    elements.detailModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

// 获取下载链接 HTML
function getDownloadLink(standardId) {
    const pdfFiles = {
        'AQ-3062-2025': 'AQ 3062-2025 精细化工企业安全管理规范.pdf'
    };
    
    if (!pdfFiles[standardId]) return '';
    
    const pdfName = pdfFiles[standardId];
    return `
        <div class="detail-section">
            <h3>标准原文下载</h3>
            <a href="https://github.com/sunny1225-aliang/regulation-db/raw/main/标准原文/${encodeURIComponent(pdfName)}" 
               class="download-btn" target="_blank" download>
                <span>📄</span>
                <span>${pdfName}</span>
                <span style="margin-left:auto;">⬇️</span>
            </a>
            <p style="font-size:12px;color:#64748b;margin-top:8px;">
                如无法下载，请访问 GitHub 仓库手动下载
            </p>
        </div>
    `;
}

// 生成详情 HTML
function generateDetailHTML(s) {
    let html = `
        <div class="detail-section">
            <h3>基本信息</h3>
            <div class="detail-grid">
                <div class="detail-item"><div class="detail-label">标准编号</div><div class="detail-value">${s.code}</div></div>
                <div class="detail-item"><div class="detail-label">类别</div><div class="detail-value">${s.category} · ${s.subcategory}</div></div>
                <div class="detail-item"><div class="detail-label">性质</div><div class="detail-value">${s.type}</div></div>
                <div class="detail-item"><div class="detail-label">实施日期</div><div class="detail-value">${s.effectiveDate}</div></div>
            </div>
        </div>
        
        <div class="detail-section">
            <h3>标准摘要</h3>
            <p>${s.summary}</p>
        </div>
        
        ${getDownloadLink(s.id)}
        
        <div class="detail-section">
            <h3>核心要点</h3>
            <ul class="detail-list">
                ${s.keyPoints.map(k => `<li>${k}</li>`).join('')}
            </ul>
        </div>
    `;
    
    if (s.checkItems) {
        html += `
            <div class="detail-section">
                <h3>检查要点</h3>
                <ul class="detail-list">
                    ${s.checkItems.map(ci => `
                        <li>
                            <strong>${ci.item}</strong><br>
                            <span style="font-size:12px;color:#64748b;">${ci.required ? '【必须】' : '【建议】'} 截止时间：${ci.deadline}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
    
    if (s.dangerLevels) {
        html += `
            <div class="detail-section">
                <h3>反应工艺危险度分级</h3>
                <div style="overflow-x:auto;">
                    <table class="danger-table">
                        <tr><th>等级</th><th>判定条件</th><th>控制要求</th></tr>
                        ${s.dangerLevels.map(d => `
                            <tr>
                                <td><span class="danger-level l${d.level}">${d.level}级</span></td>
                                <td>${d.condition}</td>
                                <td>${d.control}</td>
                            </tr>
                        `).join('')}
                    </table>
                </div>
            </div>
        `;
    }
    
    return html;
}

// 关闭模态框
function closeModal() {
    elements.detailModal.classList.add('hidden');
    document.body.style.overflow = '';
}

// 切换收藏
function toggleFavorite(id) {
    const index = state.favorites.indexOf(id);
    if (index === -1) {
        state.favorites.push(id);
        showToast('已添加到收藏');
    } else {
        state.favorites.splice(index, 1);
        showToast('已取消收藏');
    }
    saveUserData();
    
    // 更新按钮状态
    const btn = document.querySelector(`.card-favorite[data-id="${id}"]`);
    if (btn) {
        btn.textContent = index === -1 ? '★' : '☆';
        btn.classList.toggle('active', index === -1);
    }
}

// 模态框内切换收藏
function toggleModalFavorite() {
    const id = elements.modalFavorite.dataset.id;
    if (id) {
        toggleFavorite(id);
        const isFav = state.favorites.includes(id);
        elements.modalFavorite.textContent = isFav ? '★' : '☆';
        elements.modalFavorite.classList.toggle('active', isFav);
    }
}

// 检查更新
function checkUpdate() {
    showToast('当前已是最新版本 v1.0.0');
}

// 显示提示
function showToast(message) {
    elements.toastMessage.textContent = message;
    elements.toast.classList.remove('hidden');
    
    setTimeout(() => {
        elements.toast.classList.add('hidden');
    }, 2000);
}

// 键盘处理
function handleKeyboard(e) {
    if (e.key === 'Escape') {
        if (!elements.detailModal.classList.contains('hidden')) {
            closeModal();
        } else if (elements.sidebar.classList.contains('open')) {
            closeSidebar();
        }
    }
    
    if (e.key === '/' && document.activeElement !== elements.globalSearch) {
        e.preventDefault();
        elements.globalSearch.focus();
    }
}

// 启动
document.addEventListener('DOMContentLoaded', init);
