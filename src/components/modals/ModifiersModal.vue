<template>
  <div v-if="show && advantage" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Configurar {{ advantage.name }}</h2>
        <button type="button" @click="$emit('close')" class="btn-close-modal">×</button>
      </div>
      <div class="modal-body">
        <div class="modifiers-info">
          <p v-if="selectedModifiers.length === 0">
            <strong>Custo base:</strong> 
            <span v-if="getAdvantageCostWithRaceDiscount(advantage) !== advantage.cost">
              {{ getAdvantageCostWithRaceDiscount(advantage) }} pontos <span class="discount-badge">(desconto {{ character.uniqueAdvantage?.name }})</span>
            </span>
            <span v-else>{{ advantage.cost }} pontos</span>
          </p>
          <p v-else><strong>Custo por unidade:</strong> {{ calculateAdvantageCostWithModifiers(advantage, selectedModifiers) }} pontos</p>
          <div v-if="advantage.purchasableMultiple" class="quantity-selector-inline">
            <label>Quantidade:</label>
            <div class="quantity-controls">
              <button type="button" @click="decreaseQuantity" class="btn-quantity" :disabled="localQuantity <= 1">−</button>
              <input
                type="number"
                v-model.number="localQuantity"
                min="1"
                class="quantity-input"
              />
              <button type="button" @click="increaseQuantity" class="btn-quantity">+</button>
            </div>
          </div>
          <p>
            <strong>Custo total:</strong> 
            <span v-if="selectedModifiers.length === 0 && getAdvantageCostWithRaceDiscount(advantage) !== advantage.cost">
              {{ getAdvantageCostWithRaceDiscount(advantage) * (advantage.purchasableMultiple ? localQuantity : 1) }} pontos <span class="discount-badge">(desconto {{ character.uniqueAdvantage?.name }})</span>
            </span>
            <span v-else>
              {{ calculateAdvantageCostWithModifiers(advantage, selectedModifiers) * (advantage.purchasableMultiple ? localQuantity : 1) }} pontos
            </span>
          </p>
        </div>
        <div class="modifiers-list">
          <h3>Modificadores Disponíveis</h3>
          <div
            v-for="modifier in advantage.modifiers"
            :key="modifier.id"
            class="modifier-option"
            :class="{ 'selected': isModifierSelected(modifier.id) }"
            @click="toggleModifier(modifier.id)"
          >
            <div class="modifier-header">
              <div class="modifier-name-wrapper">
                <input
                  type="checkbox"
                  :checked="isModifierSelected(modifier.id)"
                  @change="toggleModifier(modifier.id)"
                  @click.stop
                />
                <span class="modifier-name">{{ modifier.name }}</span>
              </div>
              <div class="modifier-cost">
                <span v-if="modifier.costModifier !== 0" class="cost-modifier">
                  {{ modifier.costModifier > 0 ? '+' : '' }}{{ modifier.costModifier }} pts
                </span>
                <span v-if="modifier.pmModifier !== 0 && modifier.pmModifier !== undefined" class="pm-modifier">
                  {{ modifier.pmModifier > 0 ? '+' : '' }}{{ modifier.pmModifier }} PM
                </span>
              </div>
            </div>
            <div class="modifier-description">
              {{ modifier.description }}
            </div>
            <div v-if="modifier.restrictions && modifier.restrictions.includes('pdfOnly')" class="modifier-restriction">
              ⚠️ Apenas para ataques com Poder de Fogo (PdF)
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
        >
          Confirmar (
          <span v-if="selectedModifiers.length === 0">
            {{ getAdvantageCostWithRaceDiscount(advantage) * (advantage.purchasableMultiple ? localQuantity : 1) }}
          </span>
          <span v-else>
            {{ calculateAdvantageCostWithModifiers(advantage, selectedModifiers) * (advantage.purchasableMultiple ? localQuantity : 1) }}
          </span>
          pts)
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModifiersModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    advantage: {
      type: Object,
      default: null
    },
    character: {
      type: Object,
      required: true
    },
    remainingPoints: {
      type: Number,
      required: true
    },
    getAdvantageCostWithRaceDiscount: {
      type: Function,
      required: true
    },
    calculateAdvantageCostWithModifiers: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      selectedModifiers: [],
      localQuantity: 1
    }
  },
  computed: {
    canAfford() {
      return true
    }
  },
  methods: {
    toggleModifier(modifierId) {
      const index = this.selectedModifiers.indexOf(modifierId)
      if (index >= 0) {
        this.selectedModifiers.splice(index, 1)
      } else {
        this.selectedModifiers.push(modifierId)
      }
    },
    isModifierSelected(modifierId) {
      return this.selectedModifiers.includes(modifierId)
    },
    increaseQuantity() {
      this.localQuantity++
    },
    decreaseQuantity() {
      if (this.localQuantity > 1) {
        this.localQuantity--
      }
    },
    handleConfirm() {
      this.$emit('confirm', {
        selectedModifiers: [...this.selectedModifiers],
        quantity: this.localQuantity
      })
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.selectedModifiers = []
        this.localQuantity = 1
      }
    },
    advantage() {
      if (this.advantage) {
        this.selectedModifiers = []
        this.localQuantity = 1
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

.modifiers-info {
  margin-bottom: 20px;
  padding: 15px;
  background: #f7fafc;
  border-radius: 6px;
  border: 2px solid #e2e8f0;
}

.modifiers-info p {
  margin: 8px 0;
  color: #4a5568;
}

.modifiers-info .error-message {
  color: #c53030;
  font-weight: 600;
  margin-top: 10px;
}

.quantity-selector-inline {
  margin: 15px 0;
  padding: 15px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
}

.quantity-selector-inline label {
  display: block;
  margin-bottom: 10px;
  font-weight: 600;
  color: #2d3748;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-quantity {
  width: 40px;
  height: 40px;
  border: 2px solid #cbd5e0;
  background: white;
  border-radius: 6px;
  font-size: 1.5rem;
  font-weight: 600;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-quantity:hover:not(:disabled) {
  background: #4299e1;
  border-color: #4299e1;
  color: white;
}

.btn-quantity:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input {
  width: 80px;
  height: 40px;
  text-align: center;
  border: 2px solid #cbd5e0;
  border-radius: 6px;
  font-size: 1.2rem;
  font-weight: 600;
  color: #2d3748;
}

.quantity-input:focus {
  outline: none;
  border-color: #4299e1;
}

.discount-badge {
  font-size: 0.75rem;
  color: #38a169;
  font-weight: 500;
}

.modifiers-list {
  margin-top: 20px;
}

.modifiers-list h3 {
  margin-bottom: 15px;
  color: #2d3748;
  font-size: 1.1rem;
}

.modifier-option {
  padding: 15px;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
}

.modifier-option:hover {
  border-color: #4299e1;
  box-shadow: 0 2px 4px rgba(66, 153, 225, 0.1);
}

.modifier-option.selected {
  border-color: #4299e1;
  background: #ebf8ff;
}

.modifier-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.modifier-name-wrapper {
  display: flex;
  align-items: center;
  gap: 10px;
}

.modifier-name-wrapper input[type="checkbox"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.modifier-name {
  font-weight: 600;
  color: #2d3748;
  font-size: 1rem;
}

.modifier-cost {
  display: flex;
  gap: 8px;
  align-items: center;
}

.cost-modifier {
  padding: 4px 10px;
  background: #4299e1;
  color: white;
  border-radius: 4px;
  font-size: 0.85em;
  font-weight: 600;
}

.pm-modifier {
  padding: 4px 10px;
  background: #805ad5;
  color: white;
  border-radius: 4px;
  font-size: 0.85em;
  font-weight: 600;
}

.modifier-description {
  color: #4a5568;
  font-size: 0.9em;
  line-height: 1.5;
  margin-top: 8px;
}

.modifier-restriction {
  margin-top: 8px;
  padding: 6px 10px;
  background: #fff5cd;
  border-left: 3px solid #f6ad55;
  border-radius: 4px;
  font-size: 0.85em;
  color: #744210;
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
</style>

