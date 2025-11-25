<template>
  <div v-if="show && advantage" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Adicionar {{ advantage.name }}</h2>
        <button type="button" @click="$emit('close')" class="btn-close-modal">×</button>
      </div>
      <div class="modal-body">
        <div class="quantity-info">
          <p>
            <strong>Custo por unidade:</strong> 
            <span v-if="getAdvantageCostWithRaceDiscount(advantage) !== advantage.cost">
              {{ getAdvantageCostWithRaceDiscount(advantage) }} pontos <span class="discount-badge">(desconto {{ character.uniqueAdvantage?.name }})</span>
            </span>
            <span v-else>{{ advantage.cost }} pontos</span>
          </p>
          <p><strong>Custo total:</strong> {{ getAdvantageCostWithRaceDiscount(advantage) * localQuantity }} pontos</p>
        </div>
        <div class="quantity-selector">
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
      </div>
      <div class="modal-footer">
        <button type="button" @click="$emit('close')" class="btn-cancel">Cancelar</button>
        <button
          type="button"
          @click="handleConfirm"
          class="btn-confirm"
        >
          Confirmar ({{ getAdvantageCostWithRaceDiscount(advantage) * localQuantity }} pts)
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'QuantityModal',
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
    }
  },
  data() {
    return {
      localQuantity: 1
    }
  },
  computed: {
    canAfford() {
      return true
    }
  },
  methods: {
    increaseQuantity() {
      this.localQuantity++
    },
    decreaseQuantity() {
      if (this.localQuantity > 1) {
        this.localQuantity--
      }
    },
    handleConfirm() {
      this.$emit('confirm', this.localQuantity)
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.localQuantity = 1
      }
    },
    advantage() {
      if (this.advantage) {
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
  max-width: 600px;
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

.quantity-info {
  margin-bottom: 20px;
  padding: 15px;
  background: #f7fafc;
  border-radius: 6px;
  border: 2px solid #e2e8f0;
}

.quantity-info p {
  margin: 8px 0;
  color: #4a5568;
}

.quantity-info .error-message {
  color: #c53030;
  font-weight: 600;
  margin-top: 10px;
}

.quantity-selector {
  margin-top: 20px;
}

.quantity-selector label {
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

  .quantity-info {
    padding: 12px;
    margin-bottom: 15px;
  }

  .quantity-info p {
    font-size: 0.9rem;
    margin: 6px 0;
  }

  .quantity-selector {
    margin-top: 15px;
  }

  .quantity-selector label {
    font-size: 0.95rem;
    margin-bottom: 8px;
  }

  .btn-quantity {
    width: 44px;
    height: 44px;
    min-width: 44px;
    min-height: 44px;
  }

  .quantity-input {
    width: 100px;
    height: 44px;
    font-size: 1.1rem;
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

  .quantity-info {
    padding: 10px;
  }

  .quantity-info p {
    font-size: 0.85rem;
  }

  .quantity-selector label {
    font-size: 0.9rem;
  }

  .btn-quantity {
    width: 44px;
    height: 44px;
    font-size: 1.3rem;
  }

  .quantity-input {
    width: 90px;
    height: 44px;
    font-size: 1rem;
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
    font-size: 0.7rem;
  }
}
</style>

