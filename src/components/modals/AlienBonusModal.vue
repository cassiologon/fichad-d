<template>
  <div v-if="show" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Vantagem Bônus - Alien</h2>
        <button type="button" @click="$emit('close')" class="btn-close-modal">×</button>
      </div>
      <div class="modal-body">
        <p>Escolha uma opção:</p>
        <div class="alien-bonus-options">
          <label class="alien-bonus-option">
            <input
              type="radio"
              name="alienBonusType"
              value="free1point"
              v-model="localBonusType"
            />
            <span>Ganhar uma vantagem de 1 ponto de graça</span>
          </label>
          <label class="alien-bonus-option">
            <input
              type="radio"
              name="alienBonusType"
              value="discount2point"
              v-model="localBonusType"
            />
            <span>Comprar uma vantagem de 2 pontos por 1 ponto (exceto perícias)</span>
          </label>
        </div>
        
        <div v-if="localBonusType === 'free1point'" class="alien-bonus-selection">
          <h3>Escolha uma vantagem de 1 ponto:</h3>
          <div class="advantages-grid">
            <div
              v-for="advantage in advantages1Point"
              :key="advantage.name"
              class="advantage-option"
              :class="{ 'selected': localSelectedAdvantage === advantage.name }"
              @click="localSelectedAdvantage = advantage.name"
            >
              <div class="advantage-option-header">
                <div class="advantage-option-name-wrapper">
                  <span class="advantage-option-name">{{ advantage.name }}</span>
                </div>
                <span class="advantage-option-badge">Grátis</span>
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
        
        <div v-if="localBonusType === 'discount2point'" class="alien-bonus-selection">
          <h3>Escolha uma vantagem de 2 pontos:</h3>
          <div class="advantages-grid">
            <div
              v-for="advantage in advantages2Points"
              :key="advantage.name"
              class="advantage-option"
              :class="{ 'selected': localSelectedAdvantage === advantage.name }"
              @click="localSelectedAdvantage = advantage.name"
            >
              <div class="advantage-option-header">
                <div class="advantage-option-name-wrapper">
                  <span class="advantage-option-name">{{ advantage.name }}</span>
                </div>
                <span class="advantage-option-cost">1 pt <span class="discount-badge">Desconto</span></span>
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
      </div>
      <div class="modal-footer">
        <button type="button" @click="$emit('close')" class="btn-cancel">Cancelar</button>
        <button
          type="button"
          @click="handleConfirm"
          class="btn-confirm"
          :disabled="!canConfirm"
        >
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AlienBonusModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    character: {
      type: Object,
      required: true
    },
    advantages1Point: {
      type: Array,
      required: true
    },
    advantages2Points: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      localBonusType: null,
      localSelectedAdvantage: null
    }
  },
  computed: {
    canConfirm() {
      return this.localBonusType && this.localSelectedAdvantage
    }
  },
  methods: {
    handleConfirm() {
      if (this.canConfirm) {
        this.$emit('confirm', {
          type: this.localBonusType,
          advantage: this.localSelectedAdvantage
        })
      }
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.localBonusType = null
        this.localSelectedAdvantage = null
      }
    },
    localBonusType() {
      this.localSelectedAdvantage = null
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

.alien-bonus-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.alien-bonus-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: #f7fafc;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.alien-bonus-option:hover {
  border-color: #4299e1;
  background: #edf2f7;
}

.alien-bonus-option input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.alien-bonus-selection {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #e2e8f0;
}

.alien-bonus-selection h3 {
  margin: 0 0 15px 0;
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 600;
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

.advantage-option-badge {
  padding: 4px 10px;
  background: #4299e1;
  color: white;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
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

.btn-cancel {
  padding: 10px 20px;
  background: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-cancel:hover {
  background: #c53030;
}

.btn-confirm {
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

.btn-confirm:hover:not(:disabled) {
  background: #3182ce;
}

.btn-confirm:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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

  .alien-bonus-options {
    gap: 8px;
    margin-bottom: 15px;
  }

  .alien-bonus-option {
    padding: 12px;
    min-height: 44px;
  }

  .alien-bonus-selection {
    margin-top: 15px;
    padding-top: 15px;
  }

  .alien-bonus-selection h3 {
    font-size: 1rem;
    margin-bottom: 12px;
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
    flex-direction: column-reverse;
    gap: 10px;
    padding: 15px;
    align-items: stretch;
  }

  .btn-cancel,
  .btn-confirm {
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

  .alien-bonus-option {
    padding: 10px;
  }

  .alien-bonus-selection h3 {
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

  .btn-cancel,
  .btn-confirm {
    padding: 12px 16px;
    font-size: 0.95rem;
  }

  .discount-badge {
    font-size: 0.7em;
    padding: 2px 6px;
  }
}
</style>

