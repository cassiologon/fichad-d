<template>
  <div v-if="show && race" class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <div class="modal-header">
        <h2>Vantagens Gratuitas - {{ race.name }}</h2>
        <button type="button" @click="$emit('close')" class="btn-close-modal">×</button>
      </div>
      <div class="modal-body">
        <div v-for="(freeAdv, index) in race.freeAdvantages" :key="index" class="free-advantage-group">
          <h3 v-if="freeAdv.type === 'choice'">
            Escolha uma das seguintes vantagens:
          </h3>
          <h3 v-else>
            Vantagem gratuita:
          </h3>
          <div v-if="freeAdv.type === 'choice'" class="free-advantages-options">
            <label
              v-for="option in freeAdv.options"
              :key="option"
              class="free-advantage-option"
              :class="{ 'selected': localSelectedFreeAdvantages[index] === option }"
            >
              <input
                type="radio"
                :name="'freeAdvChoice' + index"
                :value="option"
                v-model="localSelectedFreeAdvantages[index]"
              />
              <span class="free-advantage-name">{{ option }}</span>
              <span class="free-advantage-badge">Grátis</span>
            </label>
          </div>
          <div v-else class="free-advantage-auto">
            <span class="free-advantage-name">{{ freeAdv }}</span>
            <span class="free-advantage-badge">Grátis</span>
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
  name: 'FreeAdvantagesModal',
  props: {
    show: {
      type: Boolean,
      default: false
    },
    race: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      localSelectedFreeAdvantages: {}
    }
  },
  computed: {
    canConfirm() {
      if (!this.race || !this.race.freeAdvantages) return false
      
      for (let i = 0; i < this.race.freeAdvantages.length; i++) {
        const freeAdv = this.race.freeAdvantages[i]
        if (freeAdv.type === 'choice' && !this.localSelectedFreeAdvantages[i]) {
          return false
        }
      }
      return true
    }
  },
  methods: {
    handleConfirm() {
      if (this.canConfirm) {
        this.$emit('confirm', { ...this.localSelectedFreeAdvantages })
      }
    }
  },
  watch: {
    show(newVal) {
      if (newVal) {
        this.localSelectedFreeAdvantages = {}
      }
    },
    race() {
      if (this.race) {
        this.localSelectedFreeAdvantages = {}
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

.free-advantage-group {
  margin-bottom: 25px;
  padding: 15px;
  background: #f7fafc;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
}

.free-advantage-group h3 {
  margin: 0 0 15px 0;
  color: #2d3748;
  font-size: 1.1rem;
  font-weight: 600;
}

.free-advantages-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.free-advantage-option {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
}

.free-advantage-option:hover {
  border-color: #4299e1;
  background: #edf2f7;
}

.free-advantage-option.selected {
  border-color: #4299e1;
  background: #bee3f8;
}

.free-advantage-option input[type="radio"] {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.free-advantage-name {
  flex: 1;
  font-weight: 600;
  color: #2d3748;
}

.free-advantage-badge {
  padding: 4px 10px;
  background: #38a169;
  color: white;
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 600;
}

.free-advantage-auto {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 6px;
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

  .free-advantage-group {
    margin-bottom: 15px;
    padding: 12px;
  }

  .free-advantage-group h3 {
    font-size: 1rem;
    margin-bottom: 12px;
  }

  .free-advantages-options {
    gap: 8px;
  }

  .free-advantage-option {
    padding: 12px;
    min-height: 44px;
  }

  .free-advantage-auto {
    padding: 12px;
  }

  .free-advantage-name {
    font-size: 0.95rem;
  }

  .free-advantage-badge {
    font-size: 0.8rem;
    padding: 3px 8px;
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

  .free-advantage-group {
    margin-bottom: 12px;
    padding: 10px;
  }

  .free-advantage-group h3 {
    font-size: 0.95rem;
    margin-bottom: 10px;
  }

  .free-advantage-option {
    padding: 10px;
  }

  .free-advantage-auto {
    padding: 10px;
  }

  .free-advantage-name {
    font-size: 0.9rem;
  }

  .free-advantage-badge {
    font-size: 0.75rem;
    padding: 2px 6px;
  }

  .modal-footer {
    padding: 12px;
  }

  .btn-cancel,
  .btn-confirm {
    padding: 12px 16px;
    font-size: 0.95rem;
  }
}
</style>

