import { defineStore } from 'pinia'
import { mockFiles } from '../mockData/mockFiles'

export const useFileStore = defineStore('file', {
  state: () => ({
    files: mockFiles,
    mode: 'single', // 'single' or 'summary'
    selectedFiles: [],
    singleSelectedFile: null,
    error: null
  }),

  getters: {
    analyzedFiles: (state) => state.files.filter(f => f.analyzed),
    unanalyzedFiles: (state) => state.files.filter(f => !f.analyzed),
    
    hasSelection: (state) => {
      return state.singleSelectedFile !== null || state.selectedFiles.length > 0
    },

    canStartAnalysis: (state) => {
      if (state.mode === 'single') {
        return state.singleSelectedFile !== null
      } else {
        return state.selectedFiles.length >= 2
      }
    }
  },

  actions: {
    setMode(mode) {
      this.mode = mode
      this.clearSelection()
    },

    selectFile(file) {
      if (this.mode === 'single') {
        this.singleSelectedFile = this.singleSelectedFile?.name === file.name ? null : file
      } else {
        const index = this.selectedFiles.findIndex(f => f.name === file.name)
        if (index === -1) {
          this.selectedFiles.push(file)
        } else {
          this.selectedFiles.splice(index, 1)
        }
      }
    },

    selectAllFiles() {
      this.selectedFiles = [...this.analyzedFiles]
    },

    clearSelection() {
      this.selectedFiles = []
      this.singleSelectedFile = null
    },

    updateFileStatus(fileName, analyzed = true) {
      const file = this.files.find(f => f.name === fileName)
      if (file) {
        file.analyzed = analyzed
      }
    }
  }
})