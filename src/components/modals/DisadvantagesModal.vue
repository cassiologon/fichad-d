<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Selecionar Desvantagens</h2>
        <button type="button" @click="$emit('close')" class="btn-close-modal">×</button>
      </div>
      <div class="modal-body">
        <div class="search-box">
          <input
            ref="disadvantageSearchInput"
            type="text"
            v-model="localSearch"
            placeholder="Buscar desvantagem..."
            class="search-input"
          />
        </div>
        <div class="advantages-grid">
          <div
            v-for="disadvantage in filteredDisadvantages"
            :key="disadvantage.name"
            class="advantage-option"
            :class="{ 'selected': isDisadvantageSelected(disadvantage.name) }"
            @click="$emit('toggle-disadvantage', disadvantage)"
          >
            <div class="advantage-option-header">
              <div class="advantage-option-name-wrapper">
                <span class="advantage-option-name">{{ disadvantage.name }}</span>
              </div>
              <span class="advantage-option-cost">{{ disadvantage.cost }} pts</span>
            </div>
            <div v-if="disadvantage.summary" class="advantage-option-summary">
              {{ disadvantage.summary }}
            </div>
            <button
              v-if="disadvantage.description"
              type="button"
              class="advantage-info-btn"
              @click.stop="$emit('show-description', disadvantage)"
              title="Ver descrição completa"
            >
              🔍
            </button>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <div class="modal-points-info">
          Pontos ganhos com desvantagens: <strong>{{ disadvantagesCost }}</strong>
        </div>
        <button type="button" @click="$emit('close')" class="btn-close">
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { disadvantages } from '../../data/disadvantages'

export default {
  name: 'DisadvantagesModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    disadvantagesCost: {
      type: Number,
      default: 0
    },
    isDisadvantageSelected: {
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
    filteredDisadvantages() {
      if (!this.localSearch) return disadvantages
      const search = this.localSearch.toLowerCase()
      return disadvantages.filter(dis => 
        dis.name.toLowerCase().includes(search)
      )
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.$nextTick(() => {
          if (this.$refs.disadvantageSearchInput) {
            this.$refs.disadvantageSearchInput.focus()
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

/* Responsividade Mobile */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
    align-items: flex-end;
  }

  .modal-content {
    max-width: 100%;
    max-height: 95vh;
    border-radius: 12px 12px 0 0;
  }

  .modal-header {
    padding: 15px;
  }

  .modal-header h2 {
    font-size: 1.2rem;
  }

  .btn-close-modal {
    width: 36px;
    height: 36px;
    min-width: 36px;
    min-height: 36px;
    font-size: 1.3rem;
  }

  .modal-body {
    padding: 15px;
  }

  .search-box {
    margin-bottom: 15px;
  }

  .search-input {
    padding: 12px;
    font-size: 1rem;
    min-height: 44px;
  }

  .advantages-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .advantage-option {
    padding: 12px;
    min-height: 60px;
  }

  .advantage-option-name {
    font-size: 0.95rem;
  }

  .advantage-option-cost {
    font-size: 0.9rem;
  }

  .advantage-info-btn {
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
    bottom: 10px;
    right: 10px;
  }

  .modal-footer {
    flex-direction: column;
    gap: 12px;
    padding: 15px;
    align-items: stretch;
  }

  .modal-points-info {
    text-align: center;
    font-size: 0.9rem;
  }

  .modal-points-info strong {
    font-size: 1rem;
  }

  .btn-close {
    width: 100%;
    min-height: 44px;
    padding: 12px 20px;
  }
}

@media (max-width: 480px) {
  .modal-overlay {
    padding: 0;
  }

  .modal-content {
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-header {
    padding: 12px;
  }

  .modal-header h2 {
    font-size: 1.1rem;
  }

  .btn-close-modal {
    width: 32px;
    height: 32px;
    min-width: 32px;
    min-height: 32px;
    font-size: 1.2rem;
  }

  .modal-body {
    padding: 12px;
  }

  .search-box {
    margin-bottom: 12px;
  }

  .search-input {
    padding: 10px;
    font-size: 0.95rem;
  }

  .advantages-grid {
    gap: 8px;
  }

  .advantage-option {
    padding: 10px;
  }

  .advantage-option-name {
    font-size: 0.9rem;
  }

  .advantage-option-cost {
    font-size: 0.85rem;
  }

  .advantage-option-summary {
    font-size: 0.7rem;
    margin-top: 4px;
  }

  .advantage-info-btn {
    width: 28px;
    height: 28px;
    min-width: 28px;
    min-height: 28px;
  }

  .modal-footer {
    padding: 12px;
  }

  .modal-points-info {
    font-size: 0.85rem;
  }

  .modal-points-info strong {
    font-size: 0.95rem;
  }

  .btn-close {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
}
</style>

