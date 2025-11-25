<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Selecionar Perícias</h2>
        <button type="button" @click="$emit('close')" class="btn-close-modal">×</button>
      </div>
      <div class="modal-body">
        <!-- Seleção de modo: Perícia Completa ou Especializações -->
        <div class="skills-mode-selector">
          <button
            type="button"
            @click="skillsMode = 'full'"
            :class="['mode-button', { 'active': skillsMode === 'full' }]"
          >
            Perícia Completa (2 pts)
          </button>
          <button
            type="button"
            @click="skillsMode = 'specializations'"
            :class="['mode-button', { 'active': skillsMode === 'specializations' }]"
          >
            3 Especializações (1 pt)
          </button>
        </div>

        <!-- Modo: Perícia Completa -->
        <div v-if="skillsMode === 'full'" class="skills-full-mode">
          <div class="search-box">
            <input
              type="text"
              ref="skillSearchInput"
              v-model="localSkillSearch"
              placeholder="Buscar perícia..."
              class="search-input"
            />
          </div>
          <div class="advantages-grid">
            <div
              v-for="skill in filteredSkills"
              :key="skill.name"
              class="advantage-option"
              :class="{ 
                'selected': isFullSkillSelected(skill.name)
              }"
              @click="handleToggleFullSkill(skill)"
            >
              <div class="advantage-option-header">
                <span class="advantage-option-name">{{ skill.name }}</span>
                <span class="advantage-option-cost">2 pts</span>
              </div>
              <div v-if="skill.description" class="advantage-option-description">{{ skill.description }}</div>
            </div>
          </div>
        </div>

        <!-- Modo: Especializações -->
        <div v-if="skillsMode === 'specializations'" class="skills-specializations-mode">
          <div class="search-box">
            <input
              type="text"
              ref="specializationSearchInput"
              v-model="localSpecializationSearch"
              placeholder="Buscar especialização..."
              class="search-input"
            />
          </div>
          <div class="specializations-counter">
            Especializações selecionadas: <strong>{{ selectedSpecializations.length }}/3</strong>
          </div>
          <div class="specializations-list">
            <div
              v-for="skill in allSkills"
              :key="skill.name"
              class="skill-group"
            >
              <h3 class="skill-group-title">{{ skill.name }}</h3>
              <div class="specializations-grid">
                <label
                  v-for="spec in getFilteredSpecializations(skill)"
                  :key="spec"
                  class="specialization-item"
                  :class="{ 
                    'disabled': !canSelectSpecialization(spec),
                    'already-acquired': isSpecializationAlreadyAcquired(spec)
                  }"
                >
                  <input
                    type="checkbox"
                    :value="spec"
                    :checked="isSpecializationSelected(spec)"
                    :disabled="!canSelectSpecialization(spec)"
                    @change="handleToggleSpecialization(spec, skill.name)"
                  />
                  <span class="specialization-name">
                    {{ spec }}
                    <span v-if="isSpecializationAlreadyAcquired(spec)" class="already-acquired-badge">(já adquirida)</span>
                  </span>
                </label>
              </div>
            </div>
          </div>
          <div class="specializations-actions">
            <button
              type="button"
              @click="handleConfirmSpecializations"
              :disabled="selectedSpecializations.length !== 3"
              class="btn-confirm-specializations"
            >
              Confirmar 3 Especializações (1 pt)
            </button>
            <button
              type="button"
              @click="clearSpecializations"
              class="btn-clear-specializations"
            >
              Limpar Seleção
            </button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="modal-points-info">
          Pontos gastos em perícias: <strong>{{ skillsCost }}</strong>
        </div>
        <button type="button" @click="$emit('close')" class="btn-close">
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { skills } from '../../data/skills'

export default {
  name: 'SkillsModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    character: {
      type: Object,
      required: true
    },
    skillsCost: {
      type: Number,
      default: 0
    },
    remainingPoints: {
      type: Number,
      required: true
    },
    isFullSkillSelected: {
      type: Function,
      required: true
    },
    canAffordSkill: {
      type: Function,
      required: true
    },
    isSpecializationAlreadyAcquired: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      skillsMode: 'full',
      localSkillSearch: '',
      localSpecializationSearch: '',
      selectedSpecializations: []
    }
  },
  computed: {
    filteredSkills() {
      if (!this.localSkillSearch) return skills
      const search = this.localSkillSearch.toLowerCase()
      return skills.filter(skill => 
        skill.name.toLowerCase().includes(search)
      )
    },
    allSkills() {
      return skills.filter(skill => skill.specializations && skill.specializations.length > 0)
    },
    canAffordSpecializations() {
      return true
    }
  },
  methods: {
    getFilteredSpecializations(skill) {
      if (!this.localSpecializationSearch) return skill.specializations || []
      const search = this.localSpecializationSearch.toLowerCase()
      return (skill.specializations || []).filter(spec =>
        spec.toLowerCase().includes(search)
      )
    },
    isSpecializationSelected(specName) {
      return this.selectedSpecializations.some(s => s.name === specName)
    },
    canSelectSpecialization(specName) {
      if (this.isSpecializationAlreadyAcquired(specName)) return false
      if (this.isSpecializationSelected(specName)) return true
      return this.selectedSpecializations.length < 3
    },
    handleToggleSpecialization(specName, skillName) {
      const index = this.selectedSpecializations.findIndex(s => s.name === specName)
      
      if (index >= 0) {
        this.selectedSpecializations.splice(index, 1)
      } else {
        if (this.selectedSpecializations.length < 3) {
          this.selectedSpecializations.push({ name: specName, skillName })
        }
      }
    },
    handleConfirmSpecializations() {
      if (this.selectedSpecializations.length === 3) {
        this.$emit('confirm-specializations', [...this.selectedSpecializations])
        this.selectedSpecializations = []
      }
    },
    clearSpecializations() {
      this.selectedSpecializations = []
    },
    handleToggleFullSkill(skill) {
      this.$emit('toggle-full-skill', skill)
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (this.skillsMode === 'full' && this.$refs.skillSearchInput) {
            this.$refs.skillSearchInput.focus()
          } else if (this.skillsMode === 'specializations' && this.$refs.specializationSearchInput) {
            this.$refs.specializationSearchInput.focus()
          }
        })
      } else {
        this.localSkillSearch = ''
        this.localSpecializationSearch = ''
        this.selectedSpecializations = []
        this.skillsMode = 'full'
      }
    },
    skillsMode(newVal) {
      if (newVal && this.show) {
        this.$nextTick(() => {
          if (newVal === 'full' && this.$refs.skillSearchInput) {
            this.$refs.skillSearchInput.focus()
          } else if (newVal === 'specializations' && this.$refs.specializationSearchInput) {
            this.$refs.specializationSearchInput.focus()
          }
        })
      }
    }
  }
}
</script>

<style scoped>
/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 2px solid #e2e8f0;
}

.modal-header h2 {
  margin: 0;
  color: #2d3748;
  font-size: 1.5rem;
}

.btn-close-modal {
  width: 32px;
  height: 32px;
  border: none;
  background: #e2e8f0;
  color: #4a5568;
  border-radius: 50%;
  font-size: 1.5rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.btn-close-modal:hover {
  background: #cbd5e0;
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.search-box {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px;
  border: 2px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: #4299e1;
}

.advantages-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.advantage-option {
  padding: 12px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.advantage-option:hover:not(.disabled) {
  border-color: #4299e1;
  box-shadow: 0 2px 8px rgba(66, 153, 225, 0.2);
}

.advantage-option.selected {
  background: #bee3f8;
  border-color: #4299e1;
}

.advantage-option.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background: #f7fafc;
}

.advantage-option-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.advantage-option-name {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
}

.advantage-option-cost {
  color: #4a5568;
  font-weight: 600;
  font-size: 0.85rem;
}

.advantage-option-description {
  font-size: 0.8rem;
  color: #4a5568;
  margin-top: 6px;
  font-style: italic;
}

.skills-mode-selector {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e2e8f0;
}

.mode-button {
  flex: 1;
  padding: 12px 20px;
  border: 2px solid #cbd5e0;
  border-radius: 6px;
  background: white;
  color: #4a5568;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
}

.mode-button:hover {
  border-color: #4299e1;
  background: #edf2f7;
}

.mode-button.active {
  background: #4299e1;
  color: white;
  border-color: #4299e1;
}

.skills-full-mode,
.skills-specializations-mode {
  margin-top: 20px;
}

.specializations-counter {
  padding: 10px;
  background: #edf2f7;
  border-radius: 6px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: 600;
  color: #4a5568;
}

.specializations-counter strong {
  color: #2d3748;
  font-size: 1.1rem;
}

.specializations-list {
  max-height: 400px;
  overflow-y: auto;
  margin-bottom: 20px;
}

.skill-group {
  margin-bottom: 25px;
  padding: 15px;
  background: #f7fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.skill-group-title {
  margin: 0 0 15px 0;
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 600;
  padding-bottom: 10px;
  border-bottom: 2px solid #cbd5e0;
}

.specializations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 10px;
}

.specialization-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.specialization-item:hover:not(.disabled) {
  border-color: #4299e1;
  background: #edf2f7;
}

.specialization-item.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.specialization-item.already-acquired {
  background: #fed7d7;
  border-color: #fc8181;
}

.specialization-item.already-acquired .specialization-name {
  color: #742a2a;
}

.already-acquired-badge {
  font-size: 0.75rem;
  color: #c53030;
  font-weight: 600;
  margin-left: 5px;
}

.specialization-item input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.specialization-item.disabled input[type="checkbox"] {
  cursor: not-allowed;
}

.specialization-name {
  flex: 1;
  font-size: 0.9rem;
  color: #2d3748;
}

.specializations-actions {
  display: flex;
  gap: 10px;
  padding-top: 20px;
  border-top: 2px solid #e2e8f0;
}

.btn-confirm-specializations {
  flex: 1;
  padding: 12px 20px;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-confirm-specializations:hover:not(:disabled) {
  background: #3182ce;
}

.btn-confirm-specializations:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-clear-specializations {
  padding: 12px 20px;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-clear-specializations:hover {
  background: #c53030;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top: 2px solid #e2e8f0;
}

.modal-points-info {
  color: #4a5568;
  font-weight: 600;
}

.modal-points-info strong {
  color: #2d3748;
  font-size: 1.1rem;
}

.btn-close {
  padding: 10px 20px;
  background: #4299e1;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-close:hover {
  background: #3182ce;
}
</style>

