// ダッシュボードの初期化
const dashboard = new Vue({
    el: '#dashboard',
    data: {
        activeTab: 'single',
        tasks: [],
        sourceFiles: [],
        selectedTask: null,
        analysisResults: null,
        loading: false,
        error: null,
        charts: {
            codeMetrics: null,
            complexityDistribution: null,
            dataFlow: null,
            qualityMetrics: null,
            securityMetrics: null,
            timelineChart: null
        }
    },
    computed: {
        analyzedFiles() {
            return this.sourceFiles.filter(file => file.analyzed);
        },
        unanalyzedFiles() {
            return this.sourceFiles.filter(file => !file.analyzed);
        },
        inProgressTasks() {
            return this.tasks.filter(task => task.status === 'processing');
        }
    },
    methods: {
        // ソースファイル一覧の取得
        async loadSourceFiles() {
            try {
                const response = await fetch('/api/source-files', {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                const data = await response.json();
                this.sourceFiles = data.files;
            } catch (error) {
                this.error = 'ファイル一覧の読み込みに失敗しました';
                console.error(error);
            }
        },

        // タスクの進捗監視
        async monitorTaskProgress(taskId) {
            const checkProgress = async () => {
                try {
                    const response = await fetch(`/api/tasks/${taskId}/progress`, {
                        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                    });
                    const data = await response.json();
                    
                    // タスクの状態を更新
                    const taskIndex = this.tasks.findIndex(t => t.id === taskId);
                    if (taskIndex !== -1) {
                        this.tasks[taskIndex] = { ...this.tasks[taskIndex], ...data };
                    }

                    // 完了していない場合は継続監視
                    if (data.status === 'processing') {
                        setTimeout(checkProgress, 2000);
                    } else {
                        // 完了したらソースファイル一覧を更新
                        await this.loadSourceFiles();
                    }
                } catch (error) {
                    console.error('Progress monitoring error:', error);
                }
            };

            checkProgress();
        },

        // 解析タスクの開始
        async startAnalysis(fileNames) {
            try {
                const response = await fetch('/api/analysis/start', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        files: fileNames,
                        type: this.activeTab
                    })
                });

                const data = await response.json();
                if (response.ok) {
                    // タスクリストに追加
                    this.tasks.push(data.task);
                    // 進捗監視の開始
                    this.monitorTaskProgress(data.task.id);
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                this.error = '解析の開始に失敗しました';
                console.error(error);
            }
        },

        // 既存のメソッド（initializeCharts, updateCharts, viewResults）は変更なし
    },
    mounted() {
        this.initializeCharts();
        this.loadSourceFiles();
        this.loadTasks(this.activeTab);
    }
});