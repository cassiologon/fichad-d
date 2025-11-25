<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Selecionar Vantagens</h2>
        <button type="button" @click="$emit('close')" class="btn-close-modal">×</button>
      </div>
      <div class="modal-body">
        <div class="search-box">
          <input
            ref="advantageSearchInput"
            type="text"
            v-model="localSearch"
            placeholder="Buscar vantagem..."
            class="search-input"
          />
        </div>
        <div class="advantages-grid">
          <div
            v-for="advantage in filteredAdvantages"
            :key="advantage.name"
            class="advantage-option"
            :class="{ 'selected': isAdvantageSelected(advantage.name) }"
            @click="handleToggleAdvantage(advantage)"
          >
            <div class="advantage-option-header">
              <div class="advantage-option-name-wrapper">
                <span class="advantage-option-name">{{ advantage.name }}</span>
              </div>
              <span class="advantage-option-cost">
                <span v-if="getAdvantageCostWithRaceDiscount(advantage) === 0">Grátis</span>
                <span v-else-if="getAdvantageCostWithRaceDiscount(advantage) !== advantage.cost">
                  {{ getAdvantageCostWithRaceDiscount(advantage) }} pts <span class="discount-badge">Desconto</span>
                </span>
                <span v-else>{{ advantage.cost }} pts</span>
              </span>
            </div>
            <div v-if="advantage.summary" class="advantage-option-summary">
              {{ advantage.summary }}
            </div>
            <button
              v-if="advantage.description"
              type="button"
              class="advantage-info-btn"
              @click.stop="$emit('show-description', advantage)"
              title="Ver descrição completa"
            >
              🔍
            </button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="modal-points-info">
          Pontos gastos em vantagens: <strong>{{ advantagesCost }}</strong>
        </div>
        <button type="button" @click="$emit('close')" class="btn-close">
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { advantages } from '../../data/advantages'

export default {
  name: 'AdvantagesModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    character: {
      type: Object,
      required: true
    },
    advantagesCost: {
      type: Number,
      default: 0
    },
    remainingPoints: {
      type: Number,
      required: true
    },
    getAdvantageCostWithRaceDiscount: {
      type: Function,
      required: true
    },
    isAdvantageSelected: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      localSearch: ''
    }
  },
  computed: {
    filteredAdvantages() {
      if (!this.localSearch) return advantages
      const search = this.localSearch.toLowerCase()
      return advantages.filter(adv => 
        adv.name.toLowerCase().includes(search)
      )
    }
  },
  methods: {
    canAffordAdvantage(advantage) {
      return true
    },
    handleToggleAdvantage(advantage) {
      this.$emit('toggle-advantage', advantage)
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (this.$refs.advantageSearchInput) {
            this.$refs.advantageSearchInput.focus()
          }
        })
      } else {
        this.localSearch = ''
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
  position: relative;
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

.advantage-option-name-wrapper {
  display: flex;
  align-items: center;
  gap: 6px;
  flex: 1;
  min-width: 0;
  overflow: visible;
}

.advantage-option-name {
  font-weight: 600;
  color: #2d3748;
  font-size: 0.9rem;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.advantage-option-cost {
  color: #4a5568;
  font-weight: 600;
  font-size: 0.85rem;
}

.advantage-option-summary {
  font-size: 0.75rem;
  color: #718096;
  margin-top: 6px;
  line-height: 1.4;
  font-style: italic;
}

.advantage-info-btn {
  position: absolute;
  bottom: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  border: none;
  background: rgba(66, 153, 225, 0.1);
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, opacity 0.2s, background 0.2s;
  padding: 0;
  flex-shrink: 0;
  opacity: 0.8;
  line-height: 1;
  z-index: 10;
}

.advantage-info-btn:hover {
  transform: scale(1.2);
  opacity: 1;
}

.discount-badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  background: #f6ad55;
  color: #744210;
  border-radius: 10px;
  font-size: 0.75em;
  font-weight: 600;
  white-space: nowrap;
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

